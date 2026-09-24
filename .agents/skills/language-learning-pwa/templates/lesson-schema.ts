/**
 * Standardized Data Contracts for Graded Reading & Multilingual Learning PWAs
 */

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface DictionaryEntry {
  word: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'pronoun' | 'phrase' | 'other';
  meaningZh: string;
  meaningEn?: string;
  pronunciation?: string;
  examples?: Array<{
    es: string; // or target language text
    zh: string; // native language translation
    en?: string;
  }>;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanationZh: string;
}

export interface LessonSentence {
  id: string;
  text: string;
  translationZh: string;
  notes?: string;
}

export interface LessonParagraph {
  id: string;
  sentences: LessonSentence[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  titleZh: string;
  level: CEFRLevel;
  estimatedMinutes: number;
  coverImage?: string;
  culturalNotes?: string;
  targetVocab: string[];
  paragraphs: LessonParagraph[];
  quiz?: QuizQuestion[];
}

export interface Course {
  id: string;
  title: string;
  titleZh: string;
  description: string;
  level: CEFRLevel;
  badge: string;
  coverImage: string;
  mapRouteImage?: string;
  themeColor: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  lessons: Lesson[];
}

export interface SavedWord {
  id: string;
  word: string;
  originalWord?: string;
  meaningZh: string;
  meaningEn?: string;
  partOfSpeech: string;
  conjugationNotes?: string;
  contextSentence?: string;
  customMeaningZh?: string;
  mastered: boolean;
  reviewCount: number;
  addedAt: string;
}

export interface SavedSentence {
  id: string;
  text: string;
  translationZh: string;
  sourceLessonId: string;
  addedAt: string;
}
