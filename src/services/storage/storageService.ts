export interface SavedWord {
  id: string;
  word: string; // Lemma
  originalWord: string; // The word as appeared in text (e.g. "fuimos")
  meaningZh: string;
  meaningEn: string;
  partOfSpeech: string;
  conjugationNotes?: string;
  contextSentence?: string;
  dateAdded: number;
  mastered: boolean;
}

export type LessonStatus = 'not_started' | 'in_progress' | 'completed';

export interface CourseProgress {
  lessonId: string;
  status?: LessonStatus;
  completedAt?: number;
  lastStudiedAt?: number;
  bestQuizScore?: number;
  totalQuestions?: number;
}

export interface SavedSentence {
  id: string;
  es: string;
  zh: string;
  en?: string;
  sourceLessonTitle?: string;
  dateAdded: number;
}

const STORAGE_KEYS = {
  VOCABULARY: 'unpoco_vocab_items',
  COURSE_PROGRESS: 'unpoco_course_progress',
  SAVED_SENTENCES: 'unpoco_saved_sentences',
  PERSISTENCE_PROMPTED: 'unpoco_persistence_prompted'
};

class StorageService {
  /**
   * Request persistent storage permission on iOS/Browsers
   */
  public async requestPersistentStorage(): Promise<{ persisted: boolean; quota?: number }> {
    if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persist) {
      try {
        const isPersisted = await navigator.storage.persisted();
        if (isPersisted) {
          return { persisted: true };
        }
        const granted = await navigator.storage.persist();
        return { persisted: granted };
      } catch (e) {
        console.warn('Storage persistence request failed:', e);
      }
    }
    return { persisted: false };
  }

  /**
   * Check if storage is currently persisted
   */
  public async isStoragePersisted(): Promise<boolean> {
    if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.persisted) {
      try {
        return await navigator.storage.persisted();
      } catch {
        return false;
      }
    }
    return false;
  }

  // === VOCABULARY CRUD ===
  public getVocabulary(): SavedWord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VOCABULARY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to read vocabulary from storage:', e);
      return [];
    }
  }

  public saveWord(word: Omit<SavedWord, 'id' | 'dateAdded' | 'mastered'>): SavedWord {
    const items = this.getVocabulary();
    const existingIndex = items.findIndex(
      (item) => item.word.toLowerCase() === word.word.toLowerCase()
    );

    const now = Date.now();
    let savedItem: SavedWord;

    if (existingIndex >= 0) {
      savedItem = {
        ...items[existingIndex],
        ...word,
        dateAdded: now
      };
      items[existingIndex] = savedItem;
    } else {
      savedItem = {
        id: `word_${now}_${Math.random().toString(36).substr(2, 5)}`,
        ...word,
        dateAdded: now,
        mastered: false
      };
      items.unshift(savedItem);
    }

    localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(items));
    return savedItem;
  }

  public removeWord(id: string): void {
    const items = this.getVocabulary().filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(items));
  }

  public toggleWordMastery(id: string): boolean {
    const items = this.getVocabulary();
    const item = items.find((i) => i.id === id);
    if (item) {
      item.mastered = !item.mastered;
      localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(items));
      return item.mastered;
    }
    return false;
  }

  public isWordSaved(wordLemma: string): boolean {
    const items = this.getVocabulary();
    return items.some((item) => item.word.toLowerCase() === wordLemma.toLowerCase());
  }

  // === SAVED SENTENCES (句子摘抄) ===
  public getSavedSentences(): SavedSentence[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_SENTENCES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public saveSentence(sentence: Omit<SavedSentence, 'id' | 'dateAdded'>): SavedSentence {
    const items = this.getSavedSentences();
    const existingIndex = items.findIndex((s) => s.es.trim() === sentence.es.trim());

    const now = Date.now();
    let result: SavedSentence;

    if (existingIndex >= 0) {
      result = { ...items[existingIndex], ...sentence, dateAdded: now };
      items[existingIndex] = result;
    } else {
      result = {
        id: `sent_${now}_${Math.random().toString(36).substr(2, 5)}`,
        ...sentence,
        dateAdded: now
      };
      items.unshift(result);
    }

    localStorage.setItem(STORAGE_KEYS.SAVED_SENTENCES, JSON.stringify(items));
    return result;
  }

  public removeSentence(id: string): void {
    const items = this.getSavedSentences().filter((s) => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SAVED_SENTENCES, JSON.stringify(items));
  }

  public isSentenceSaved(esText: string): boolean {
    const items = this.getSavedSentences();
    return items.some((s) => s.es.trim().toLowerCase() === esText.trim().toLowerCase());
  }

  // === COURSE PROGRESS & STATUS ===
  public getCourseProgress(): Record<string, CourseProgress> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COURSE_PROGRESS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  public getLessonStatus(lessonId: string): LessonStatus {
    const progress = this.getCourseProgress();
    return progress[lessonId]?.status || 'not_started';
  }

  public setLessonStatus(lessonId: string, status: LessonStatus): void {
    const progress = this.getCourseProgress();
    const prev = progress[lessonId] || { lessonId };
    progress[lessonId] = {
      ...prev,
      status,
      lastStudiedAt: Date.now(),
      completedAt: status === 'completed' ? Date.now() : prev.completedAt
    };
    localStorage.setItem(STORAGE_KEYS.COURSE_PROGRESS, JSON.stringify(progress));
  }

  public recordQuizScore(lessonId: string, score: number, total: number): void {
    const progress = this.getCourseProgress();
    const prev = progress[lessonId] || { lessonId };
    progress[lessonId] = {
      ...prev,
      lessonId,
      status: 'completed',
      completedAt: Date.now(),
      lastStudiedAt: Date.now(),
      bestQuizScore: Math.max(score, prev.bestQuizScore ?? 0),
      totalQuestions: total
    };
    localStorage.setItem(STORAGE_KEYS.COURSE_PROGRESS, JSON.stringify(progress));
  }

  public getCompletedLessonsCount(): number {
    const progress = this.getCourseProgress();
    return Object.values(progress).filter((p) => p.status === 'completed').length;
  }

  // === BACKUP EXPORT & IMPORT ===

  public exportBackupJSON(): void {
    const backupData = {
      appName: 'Un Poco',
      version: '1.2.0',
      exportedAt: new Date().toISOString(),
      vocabulary: this.getVocabulary(),
      sentences: this.getSavedSentences(),
      progress: this.getCourseProgress()
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `un-poco-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  public exportAnkiCards(): void {
    const vocab = this.getVocabulary();
    if (vocab.length === 0) return;

    let ankiContent = '#separator:tab\n#html:true\n#tags column:4\n';
    for (const v of vocab) {
      const front = `<b>${v.word}</b> ${v.originalWord && v.originalWord !== v.word ? `<i>(${v.originalWord})</i>` : ''}`;
      const back = `[${v.partOfSpeech}] ${v.meaningZh} <br><small style="color:gray">${v.meaningEn}</small>${v.conjugationNotes ? `<br><small style="color:#0d9488">变位: ${v.conjugationNotes}</small>` : ''}`;
      const context = v.contextSentence ? `例句: <i>${v.contextSentence}</i>` : '';
      const tags = 'UnPoco_Espanol';
      ankiContent += `${front}\t${back}\t${context}\t${tags}\n`;
    }

    const blob = new Blob([ankiContent], { type: 'text/tab-separated-values;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `un-poco-anki-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  public async importBackupJSON(file: File): Promise<{ success: boolean; importedCount: number }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content);
          let count = 0;

          if (Array.isArray(data.vocabulary)) {
            const currentVocab = this.getVocabulary();
            const existingMap = new Map(currentVocab.map((i) => [i.word.toLowerCase(), i]));

            for (const item of data.vocabulary) {
              if (item.word) {
                existingMap.set(item.word.toLowerCase(), item);
              }
            }
            const merged = Array.from(existingMap.values());
            localStorage.setItem(STORAGE_KEYS.VOCABULARY, JSON.stringify(merged));
            count += data.vocabulary.length;
          }

          if (Array.isArray(data.sentences)) {
            const currentSentences = this.getSavedSentences();
            const sentMap = new Map(currentSentences.map((s) => [s.es.trim(), s]));
            for (const s of data.sentences) {
              if (s.es) {
                sentMap.set(s.es.trim(), s);
              }
            }
            localStorage.setItem(STORAGE_KEYS.SAVED_SENTENCES, JSON.stringify(Array.from(sentMap.values())));
          }

          if (data.progress) {
            const currentProgress = this.getCourseProgress();
            localStorage.setItem(
              STORAGE_KEYS.COURSE_PROGRESS,
              JSON.stringify({ ...currentProgress, ...data.progress })
            );
          }

          resolve({ success: true, importedCount: count });
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }
}

export const storageService = new StorageService();
