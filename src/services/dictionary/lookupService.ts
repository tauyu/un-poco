import type { DictEntry, LookupResult, TokenItem } from './types';
import { CORE_SPANISH_DICTIONARY, DICTIONARY_MAP, NORMALIZED_DICTIONARY_MAP } from './dictionaryData';
import { analyzeConjugation, removeAccents } from './conjugations';

/**
 * Normalizes text for accent-insensitive and tilde-insensitive matching
 * e.g. "mañana" -> "manana", "canción" -> "cancion", "Música" -> "musica"
 */
export function normalizeSearchKey(str: string): string {
  return removeAccents(str.trim().toLowerCase()).replace(/[^a-z0-9]/g, '');
}

/**
 * Perform a comprehensive offline lookup for a Spanish or Chinese/English query
 * Supports:
 * 1. Exact match
 * 2. Accent-insensitive & tilde-insensitive match (e.g. "manana" -> "mañana")
 * 3. Verb conjugation de-inflection (with direct infinitive meaning inheritance)
 * 4. Plural / feminine noun/adjective de-inflection (e.g. "mananas" -> "mañana", "amigas" -> "amigo/amiga")
 * 5. Prefix & fuzzy keyword suggestions
 */
export function lookupWord(rawQuery: string): LookupResult {
  const query = rawQuery.trim();
  const lower = query.toLowerCase();
  const cleanWord = lower.replace(/^[¿¡"'(«“—\s]+|[.,;:!?"')»”—…\s]+$/gu, '');

  if (!cleanWord) {
    return {
      query,
      matchedWord: query,
      isConjugatedForm: false
    };
  }

  // 1. Exact lowercase match in dictionary
  if (DICTIONARY_MAP.has(cleanWord)) {
    const entry = DICTIONARY_MAP.get(cleanWord)!;
    return {
      query,
      matchedWord: entry.word,
      isConjugatedForm: false,
      entry
    };
  }

  // 2. Accent & tilde insensitive match (e.g. "manana" -> "mañana", "musica" -> "música")
  const normKey = normalizeSearchKey(cleanWord);
  if (NORMALIZED_DICTIONARY_MAP.has(normKey)) {
    const entries = NORMALIZED_DICTIONARY_MAP.get(normKey)!;
    if (entries.length > 0) {
      return {
        query,
        matchedWord: entries[0].word,
        isConjugatedForm: false,
        entry: entries[0],
        alternatives: entries.slice(1)
      };
    }
  }

  // 3. Verb conjugation analysis (find infinitive and directly inherit infinitive meaning)
  const conjugationCandidates = analyzeConjugation(cleanWord);
  // Also try accent-normalized candidate search if plain search yielded nothing
  if (conjugationCandidates.length === 0 && normKey !== cleanWord) {
    conjugationCandidates.push(...analyzeConjugation(normKey));
  }

  if (conjugationCandidates.length > 0) {
    // Check if any candidate infinitive is in our dictionary
    for (const cand of conjugationCandidates) {
      const infLower = cand.infinitive.toLowerCase();
      const infNorm = normalizeSearchKey(infLower);

      let infEntry: DictEntry | undefined = DICTIONARY_MAP.get(infLower);
      if (!infEntry && NORMALIZED_DICTIONARY_MAP.has(infNorm)) {
        infEntry = NORMALIZED_DICTIONARY_MAP.get(infNorm)![0];
      }

      // Only accept if the infinitive actually exists in our dictionary as a verified verb
      if (infEntry && (infEntry.partOfSpeech === 'verb' || infLower.endsWith('ar') || infLower.endsWith('er') || infLower.endsWith('ir'))) {
        return {
          query,
          matchedWord: cand.infinitive,
          isConjugatedForm: true,
          conjugationInfo: cand.info,
          entry: {
            ...infEntry,
            meaningZh: infEntry.meaningZh,
            meaningEn: infEntry.meaningEn
          }
        };
      }
    }
    // If infinitive isn't in dictionary, DO NOT guess or fabricate a verb! Fall through to noun/plural checks.
  }

  // 4. Plural & Gender de-inflection (e.g. "habitaciones" -> "habitación", "amigos" -> "amigo", "tostadas" -> "tostada")
  const potentialLemmas: string[] = [];
  if (cleanWord.endsWith('es') && cleanWord.length > 3) {
    potentialLemmas.push(cleanWord.slice(0, -2)); // e.g. canciones -> cancion, habitaciones -> habitacion
  }
  if (cleanWord.endsWith('s') && cleanWord.length > 2) {
    potentialLemmas.push(cleanWord.slice(0, -1)); // e.g. mananas -> manana, amigos -> amigo
  }
  if (cleanWord.endsWith('as') && cleanWord.length > 3) {
    potentialLemmas.push(cleanWord.slice(0, -2) + 'a'); // e.g. tostadas -> tostada, casitas -> casita
    potentialLemmas.push(cleanWord.slice(0, -2) + 'o'); // e.g. chicas -> chico
  }
  if (cleanWord.endsWith('os') && cleanWord.length > 3) {
    potentialLemmas.push(cleanWord.slice(0, -2) + 'o'); // e.g. viejos -> viejo
  }
  if (cleanWord.endsWith('a') && cleanWord.length > 3) {
    potentialLemmas.push(cleanWord.slice(0, -1) + 'o'); // e.g. nueva -> nuevo
  }

  for (const pl of potentialLemmas) {
    const plLower = pl.toLowerCase();
    const plNorm = normalizeSearchKey(plLower);
    let entry: DictEntry | undefined = DICTIONARY_MAP.get(plLower);
    if (!entry && NORMALIZED_DICTIONARY_MAP.has(plNorm)) {
      entry = NORMALIZED_DICTIONARY_MAP.get(plNorm)![0];
    }
    if (entry) {
      return {
        query,
        matchedWord: entry.word,
        isConjugatedForm: false,
        entry
      };
    }
  }

  // 5. Search by Chinese or English meaning
  const altMatches: DictEntry[] = [];
  for (const item of CORE_SPANISH_DICTIONARY) {
    if (
      item.meaningZh.toLowerCase().includes(lower) ||
      item.meaningEn.toLowerCase().includes(lower) ||
      item.word.toLowerCase().includes(lower)
    ) {
      altMatches.push(item);
    }
  }

  if (altMatches.length > 0) {
    return {
      query,
      matchedWord: altMatches[0].word,
      isConjugatedForm: false,
      entry: altMatches[0],
      alternatives: altMatches.slice(1, 6)
    };
  }

  // 6. Prefix suggestion fallback (only for prefix search, e.g. typing initial characters)
  if (normKey.length >= 2) {
    const prefixSuggestions: DictEntry[] = [];
    for (const [key, entries] of NORMALIZED_DICTIONARY_MAP.entries()) {
      if (key.startsWith(normKey)) {
        prefixSuggestions.push(...entries);
        if (prefixSuggestions.length >= 5) break;
      }
    }

    if (prefixSuggestions.length > 0) {
      return {
        query,
        matchedWord: prefixSuggestions[0].word,
        isConjugatedForm: false,
        entry: prefixSuggestions[0],
        alternatives: prefixSuggestions.slice(1)
      };
    }
  }

  // Not found in local dictionary
  return {
    query,
    matchedWord: cleanWord,
    isConjugatedForm: false,
    entry: {
      word: cleanWord,
      partOfSpeech: 'noun',
      meaningZh: '本地词库暂未收录该生词，可在生词本中查看与复习',
      meaningEn: '(Not found in local database)'
    }
  };
}

/**
 * Quick search suggestions for auto-complete
 */
export function getSearchSuggestions(query: string, limit = 5): DictEntry[] {
  const norm = normalizeSearchKey(query);
  if (!norm || norm.length < 2) return [];

  const results: DictEntry[] = [];
  const seen = new Set<string>();

  for (const [key, entries] of NORMALIZED_DICTIONARY_MAP.entries()) {
    if (key.startsWith(norm)) {
      for (const e of entries) {
        if (!seen.has(e.word.toLowerCase())) {
          seen.add(e.word.toLowerCase());
          results.push(e);
          if (results.length >= limit) return results;
        }
      }
    }
  }

  // If not enough prefix matches, search contains
  if (results.length < limit) {
    for (const [key, entries] of NORMALIZED_DICTIONARY_MAP.entries()) {
      if (!key.startsWith(norm) && key.includes(norm)) {
        for (const e of entries) {
          if (!seen.has(e.word.toLowerCase())) {
            seen.add(e.word.toLowerCase());
            results.push(e);
            if (results.length >= limit) return results;
          }
        }
      }
    }
  }

  return results;
}

/**
 * Tokenize a paragraph of Spanish text into words and punctuation
 */
export function tokenizeSpanishText(text: string): TokenItem[] {
  if (!text) return [];

  const tokenRegex = /([\p{L}\p{M}]+(?:['’][\p{L}\p{M}]+)?)|([^\p{L}\p{M}\s]+)|(\s+)/gu;
  const tokens: TokenItem[] = [];
  let match: RegExpExecArray | null;
  let counter = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    const rawMatch = match[0];
    const isWord = Boolean(match[1]);

    tokens.push({
      id: `token-${counter++}`,
      text: rawMatch,
      cleanWord: isWord ? rawMatch.toLowerCase() : '',
      isWord
    });
  }

  return tokens;
}
