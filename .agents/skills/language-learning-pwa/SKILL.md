---
name: language-learning-pwa
description: >-
  Blueprint, architectural patterns, and step-by-step procedures for building immersive,
  offline-first multilingual graded reading web applications (PWAs) like 'Un Poco'.
  Use when creating, architecting, or extending language learning apps for any target language
  (French, German, Italian, Japanese, Russian, Spanish, etc.) with narrative route maps,
  3-tier reading modes, morphological word lookup drawers, zero-backend local persistence,
  and native mobile PWA integration.
---

# Graded Language Reader & Multilingual Learning PWA Blueprint

This skill encapsulates the full production architecture, educational interaction models, and UX design patterns developed and validated in **Un Poco (v1.0.0)**. It serves as a comprehensive runbook for rapidly scaffolding, building, and deploying world-class language graded readers for any target language.

---

## 🏛️ Core Architecture Principles

1. **Zero-Backend Sovereignty & Offline PWA**:
   - 100% client-side execution (React + TypeScript + Tailwind CSS + Vite).
   - `LocalStorage` + `IndexedDB` for user notes, vocabulary, mastery metrics, and course progress.
   - Service Worker caching (`sw.js`) and Web App Manifest (`manifest.webmanifest`) enabling installable fullscreen PWA on iOS & Android with zero app store friction.
   - Complete data ownership: 1-click JSON backup/restore and standard Anki flashcard (.txt) exports.

2. **Zero-Cost Speech & Evaluation**:
   - Text-To-Speech (TTS): Browser `speechSynthesis` API with language tag (e.g. `es-ES`, `fr-FR`, `de-DE`, `ja-JP`) and variable speed controls (0.75x, 1.0x, 1.25x).
   - Shadowing & Pronunciation Evaluation: Browser `webkitSpeechRecognition` API comparing user voice input with sentence text via Levenshtein distance similarity scoring (0 tokens, zero API cost).

3. **Narrative Cultural Journey**:
   - Lessons are grouped into cultural/geographic routes (e.g., city walks, regional heritage, daily lifestyle) with thematic cover artwork and progress tracking.

4. **Context-First Morphological Lookup**:
   - In-app interactive text where every word is clickable.
   - Inflected forms (verb tenses, plurals, gender agreement) automatically map to dictionary lemmas.
   - Context sentence and examples are strictly prioritized over external lookups.
   - Allows users to add and edit custom Chinese/native definitions for unlisted words.

---

## 🚀 Quick Step-by-Step Procedure for a New Language App

### Phase 1: Project Scaffolding
1. Initialize Vite + React + TypeScript + Tailwind CSS:
   ```bash
   npm create vite@latest my-language-app -- --template react-ts
   cd my-language-app
   npm i -D tailwindcss @tailwindcss/vite lucide-react
   ```
2. Configure PWA & Mobile Touch Assets:
   - Provide standard **non-transparent** 180x180 PNG `apple-touch-icon.png` (Apple iOS renders transparent PNGs as black boxes).
   - Create `manifest.webmanifest` with `"display": "standalone"`.
   - Setup `sw.js` with versioned cache name.

### Phase 2: Schema & Data Pipeline
Implement standard interfaces matching [lesson-schema.ts](./templates/lesson-schema.ts):
- `Course`: Cultural route with `id`, `title`, `description`, `level` (A1-C2), `coverImage`, and `lessons[]`.
- `Lesson`: Structured story text with paragraphs, translations, comprehension quizzes, and target vocabulary.
- `DictionaryEntry`: `word`, `partOfSpeech`, `meaningZh`, `meaningEn`, `pronunciation`, `examples[]`.

### Phase 3: Lexical & Morphological Lookup Engine
Refer to [lexical-engine.md](./references/lexical-engine.md):
- Build a lightweight offline dictionary of core vocabulary + high-frequency irregular inflections.
- Implement regex-based stemmer / rule table for regular verb conjugations and plural endings.
- Support user-defined custom definitions (`customMeaningZh`) saved to LocalStorage.

### Phase 4: Reading View & 3 Audio Modes
Refer to [pedagogy-and-ux.md](./references/pedagogy-and-ux.md):
1. **Blind Listening Mode ("磨耳朵")**: Text hidden/blurred; train auditory comprehension before reading.
2. **Original Read-Along ("原声伴读")**: Sentence-by-sentence synchronized audio playback with toggleable bilingual translation.
3. **Shadow Speaking Evaluation ("影子跟读")**: Zero-token SpeechRecognition feedback with accuracy gauge.

### Phase 5: Drill-Down Profile & Review System
Implement active recall and spaced review:
- Clickable vocabulary cards with 3-state mastery filter (`全部` / `学习中` / `已掌握`).
- Immediate "重新学" (reactivate to learning) button.
- Finished lesson review drawer with one-tap deep navigation back to the reader.
- Sentence clipbook for memorizing authentic idioms.

### Phase 6: Edge Deployment
- Deploy via Cloudflare Pages or Vercel:
  - Framework preset: `Vite`
  - Build command: `npm run build`
  - Output directory: `dist`
- Cloudflare Pages single-page routing rule: Ensure `_routes.json` or fallback serves `index.html` for 404 prevention.

---

## 📂 Reference Guides

- [Architecture & Storage Guide](./references/architecture.md)
- [Pedagogical UX & 3 Audio Modes](./references/pedagogy-and-ux.md)
- [Lexical Engine & Word Drawer Pattern](./references/lexical-engine.md)
- [Data Contract Template](./templates/lesson-schema.ts)
