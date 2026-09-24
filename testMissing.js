import fs from 'fs';
import { CORE_SPANISH_DICTIONARY, DICTIONARY_MAP, NORMALIZED_DICTIONARY_MAP } from './src/services/dictionary/dictionaryData.ts';
import { normalizeSearchKey } from './src/services/dictionary/lookupService.ts';

const allWords = JSON.parse(fs.readFileSync('allLessonWords.json', 'utf-8'));

let foundExact = 0;
let foundNorm = 0;
const missing = [];

for (const w of allWords) {
  const lower = w.toLowerCase();
  const norm = normalizeSearchKey(lower);
  if (DICTIONARY_MAP.has(lower)) {
    foundExact++;
  } else if (NORMALIZED_DICTIONARY_MAP.has(norm)) {
    foundNorm++;
  } else {
    missing.push(w);
  }
}

console.log(`Total: ${allWords.length}, Found Exact: ${foundExact}, Found Normalized: ${foundNorm}, Missing: ${missing.length}`);
fs.writeFileSync('missingWords.json', JSON.stringify(missing, null, 2), 'utf-8');
console.log('Saved missingWords.json!');
