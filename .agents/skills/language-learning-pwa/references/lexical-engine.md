# Lexical Engine & Word Drawer Pattern

The Word Drawer (`WordDrawer.tsx`) is the central touchpoint of interactive graded reading. Every word in the lesson text is wrapped in a clickable span that triggers the drawer.

---

## 1. Word Tokenization & Morphological Analysis

### Clickable Word Rendering
Split paragraph sentences into words and punctuation while preserving whitespace:
```tsx
const words = sentenceText.split(/(\s+|[.,!?;:¿¡()«»""]+)/);
// Render each token: if alphanumeric, wrap in clickable button; otherwise render as punctuation text
```

### Morphological Matching
In inflected languages (Spanish, French, Italian, German, Russian):
1. **Direct Match**: Check if token exists in `dictionaryData`.
2. **Normalized Stem Match**: Strip diacritics / accents or test lowercase.
3. **Conjugation & Declension Tables**:
   - Match verb endings (e.g. `-é`, `-aste`, `-ó` -> `-ar` infinitive).
   - Match plural and gender inflections (e.g. `-as`, `-es` -> singular noun/adjective).
4. Return `LookupResult` containing:
   - `entry`: Base dictionary definition (if found).
   - `lemma`: The base dictionary lemma (e.g. `hablar` when `hablaba` is clicked).
   - `conjugationInfo`: `{ tense: '过去未完成时', person: '第一人称单数', infinitive: 'hablar' }`.

---

## 2. Word Drawer Visual Hierarchy (3-Tier Structure)

Avoid cluttered horizontal toolbars. Organize the header strictly by hierarchy:

```
┌────────────────────────────────────────────────────────┐
│ [动词变位 · 过去未完成时]                           (✕) │ ── Row 1: Status & Close
│ hablar                                          [verb] │ ── Row 2: Title & POS
│ [aˈβlaɾ]                     [🔊 朗读 | 0.75x | 1.0x]   │ ── Row 3: Phonetics & Audio Capsule
├────────────────────────────────────────────────────────┤
│ 动词变位解析 (如适用)                                    │
│ 词典释义 / 自定义中文释义                                │
├────────────────────────────────────────────────────────┤
│ 当前上下文 (当前课文语境句子)                             │ ── PRIORITY 1: Immediate Context
├────────────────────────────────────────────────────────┤
│ 典型例句 (Ejemplos)                                    │ ── PRIORITY 2: Authentic Usage
├────────────────────────────────────────────────────────┤
│ [ ★ 收藏到我的生词本 / 已收藏 ]                         │ ── Primary Action
├────────────────────────────────────────────────────────┤
│ 更多词典拓展: SpanishDict · DeepL · [复制]              │ ── Secondary Footnote
└────────────────────────────────────────────────────────┘
```

---

## 3. Custom Definition & User Notes

When a word is not present in the local offline dictionary:
1. Do **not** block the user with a dead-end message.
2. Present a friendly prompt: **"本地词库暂未收录该词"** with an **"添加释义"** button.
3. Allow inline editing: entering Chinese definition and saving updates `storageService.updateWordMeaning`.
4. The word is automatically saved into the user's vocabulary list tagged with a **"自填"** badge.
5. In the vocabulary list, users can tap `[✏️]` at any time to revise definitions.

---

## 4. Context & Example Prioritization

**Golden Rule of Graded Reading UX**:
- Immediate in-app learning context (`当前上下文` and `典型例句`) MUST come before external links.
- External dictionary links (`DeepL`, `SpanishDict`, `WordReference`, `Wiktionary`) should sit at the very bottom as a discrete footnote.
- Never place instructional help text (such as platform OS gestures) into the middle of the card.
