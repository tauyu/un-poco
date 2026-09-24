import fs from 'fs';
import { ALL_COURSES_POOL } from './src/data/courses/allCoursesData.ts';
import { CORE_SPANISH_DICTIONARY } from './src/services/dictionary/dictionaryData.ts';

const textWords = new Set();
for (const course of ALL_COURSES_POOL) {
  for (const group of course.paragraphs) {
    for (const sent of group) {
      if (!sent?.es) continue;
      const words = sent.es.toLowerCase().replace(/[^a-záéíóúüñ]/g, ' ').split(/\s+/).filter(w => w.length > 0);
      for (const w of words) textWords.add(w);
    }
  }
}

const sortedWords = Array.from(textWords).sort();
console.log('Total unique words count:', sortedWords.length);
fs.writeFileSync('allLessonWords.json', JSON.stringify(sortedWords, null, 2), 'utf-8');
console.log('Saved allLessonWords.json successfully!');
