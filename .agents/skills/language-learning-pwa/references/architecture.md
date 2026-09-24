# Architecture & Storage Guide

## 1. Zero-Backend Local Persistence

Language learners frequently read in transit, on flights, or in subways with intermittent connectivity. Storing user progress in the browser guarantees 100% offline uptime and zero maintenance burden.

### Storage Service Architecture (`storageService.ts`)

Store core entities in structured keys:
- `vocab_items`: Array of `SavedWord` (`id`, `word`, `meaningZh`, `customMeaningZh`, `mastered`, `reviewCount`, `addedAt`).
- `saved_sentences`: Array of `SavedSentence` (`id`, `text`, `translationZh`, `sourceLessonId`, `addedAt`).
- `course_progress`: Record of completed lesson IDs and quiz scores.
- `app_settings`: User audio preferences (`speechRate`, `autoPlayNext`).

```typescript
// Sample Storage Pattern with Data Persistence Assurance
export class StorageService {
  // Request durable storage permission on modern browsers (prevents iOS Safari eviction)
  public async ensureStoragePersisted(): Promise<boolean> {
    if (navigator.storage && navigator.storage.persist) {
      return await navigator.storage.persist();
    }
    return false;
  }

  // Backup & Export to JSON
  public exportBackup(): string {
    const backup = {
      vocabulary: this.getVocabulary(),
      sentences: this.getSavedSentences(),
      progress: this.getCourseProgress(),
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(backup, null, 2);
  }

  // Export to Anki Flashcard Format (TSV)
  public exportAnkiTSV(): string {
    const items = this.getVocabulary();
    return items.map(w => `${w.word}\t${w.customMeaningZh || w.meaningZh}\t${w.contextSentence || ''}`).join('\n');
  }
}
```

---

## 2. PWA Mobile Engineering

### iOS Touch Icon Best Practice
- **Strict Requirement**: Apple iOS will fill any transparent regions in web app icons with solid black.
- **Rule**: Always supply a **non-transparent, flattened 180x180 PNG** named `apple-touch-icon.png` in `/public`.
- Link in `index.html`:
  ```html
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  ```

### Cache Busting Service Worker (`sw.js`)
- Increment cache name on major builds (e.g. `un-poco-v1` -> `un-poco-v2`).
- Cache critical local assets (fonts, icons, bundle chunk) and gracefully fall back to network.

---

## 3. Deployment on Cloudflare Pages / Vercel

1. **Build Config**:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
2. **SPA Routing**:
   - Ensure `public/_routes.json` or Cloudflare Pages 404 rule rewrites non-file routes to `/index.html`.
