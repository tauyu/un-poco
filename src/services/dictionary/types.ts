export type PartOfSpeech =
  | 'verb'
  | 'noun'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'preposition'
  | 'conjunction'
  | 'interjection'
  | 'phrase'
  | 'article';

export interface ConjugationInfo {
  infinitive: string;
  tense: string; // e.g. "Presente", "Pretérito Indefinido", "Pretérito Imperfecto", "Futuro", "Condicional", "Subjuntivo Presente", "Imperativo"
  person: string; // e.g. "yo (第一人称单数)", "tú (第二人称单数)", "él/ella/usted (第三人称单数)", etc.
  irregular?: boolean;
  notes?: string;
}

export interface DictEntry {
  word: string; // Lemma / Headword
  pronunciation?: string; // IPA or phonetic tip
  partOfSpeech: PartOfSpeech;
  gender?: 'm' | 'f' | 'mf';
  meaningZh: string; // 中文释义
  meaningEn: string; // 英文释义
  conjugation?: ConjugationInfo; // If matched as a conjugated verb form
  examples?: Array<{
    es: string;
    zh: string;
    en?: string;
  }>;
  commonPhrases?: string[];
}

export interface LookupResult {
  query: string;
  matchedWord: string;
  isConjugatedForm: boolean;
  conjugationInfo?: ConjugationInfo;
  entry?: DictEntry;
  alternatives?: DictEntry[];
}

export interface TokenItem {
  id: string;
  text: string;
  cleanWord: string; // Stripped of punctuation, accents preserved
  isWord: boolean;
}
