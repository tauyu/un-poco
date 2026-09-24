# Pedagogical UX & 3 Audio Modes Guide

Graded reading apps excel when they bridge comprehension, listening, and speaking into a seamless, low-friction loop.

---

## 1. The 3 Audio Modes

Language learners require different modalities depending on their learning phase and environment:

```
[模式 1: 磨耳朵 (Blind Listening)] ──► [模式 2: 原声伴读 (Read-Along)] ──► [模式 3: 影子跟读 (Shadowing)]
  Train auditory comprehension            Synchronized text & audio                 Speaking & pronunciation practice
```

### Mode 1: 磨耳朵 (Blind Listening)
- **Goal**: Overcome reliance on text and build pure listening comprehension.
- **UX**:
  - The lesson text is blurred or masked initially (`filter: blur(8px)`).
  - Tapping "播放" plays the full section or sentence via TTS.
  - Tapping "偷看原文" reveals the text line by line.

### Mode 2: 原声伴读 (Sentence Read-Along)
- **Goal**: Assisted reading flow.
- **UX**:
  - Click any sentence to play standard pronunciation at customizable speed (0.75x, 1.0x, 1.25x).
  - Active sentence is highlighted with an ambient brand accent border (`border-l-4 border-accent-500`).
  - Toggleable translation display (hide, hover, or show).

### Mode 3: 影子跟读 (Zero-Token Shadowing)
- **Goal**: Speaking practice without expensive AI server tokens.
- **Implementation**:
  - Uses browser `webkitSpeechRecognition` API set to the target language code (e.g. `es-ES`, `fr-FR`).
  - Calculates accuracy score via normalized **Levenshtein Distance**:
    ```typescript
    function calculatePronunciationScore(target: string, spoken: string): number {
      const cleanTarget = target.toLowerCase().replace(/[^\p{L}\s]/gu, '').trim();
      const cleanSpoken = spoken.toLowerCase().replace(/[^\p{L}\s]/gu, '').trim();
      if (!cleanSpoken) return 0;
      const distance = levenshteinDistance(cleanTarget, cleanSpoken);
      const maxLen = Math.max(cleanTarget.length, cleanSpoken.length);
      return Math.max(0, Math.round((1 - distance / maxLen) * 100));
    }
    ```
  - Displays instant visual feedback:
    - 90%+: 🟢 极佳发音 (Excelente)
    - 75%-89%: 🟡 良好 (Bien)
    - <75%: 🟠 再试一次 (Intenta de nuevo)

---

## 2. Interactive Drill-Down Review UX ("我的" Profile Page)

Avoid static number dashboards. Every metric must be actionable and drillable:

1. **Vocabulary Drill-down Modal**:
   - Filter chips: `全部` / `学习中` / `已掌握`.
   - Instant search bar filtering by target spelling or native definition.
   - **"重新拎出来学"**: One-click reactivation to move forgotten words back into the learning queue.
   - **Inline Edit**: Users can tap `[✏️]` to update or customize definitions on the fly.
2. **Completed Lesson Drill-down Modal**:
   - Shows all completed lessons with level badge and quiz scores.
   - **"去复习这篇课文"**: One-click seamless jump directly to the Reader tab with this lesson loaded.
   - **"重新学习"**: Resets lesson status to uncompleted to add back into the active rotation pool.
