import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2, Bookmark, BookmarkCheck, X, Sparkles, ArrowRight,
  Check, ExternalLink, Edit3, Globe, Copy
} from 'lucide-react';
import { lookupWord } from '../services/dictionary/lookupService';
import type { LookupResult } from '../services/dictionary/types';
import { speechService } from '../services/speech/speechService';
import { storageService, type SavedWord } from '../services/storage/storageService';

interface WordDrawerProps {
  word: string | null;
  contextSentence?: string;
  showContextSentence?: boolean;
  onClose: () => void;
  onSavedChange?: () => void;
}

export const WordDrawer: React.FC<WordDrawerProps> = ({
  word,
  contextSentence,
  showContextSentence = true,
  onClose,
  onSavedChange
}) => {
  const [lookupResult, setLookupResult] = useState<LookupResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [customMeaning, setCustomMeaning] = useState<string>('');
  const [isEditingMeaning, setIsEditingMeaning] = useState(false);
  const [meaningInput, setMeaningInput] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const wordTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (word) {
      const res = lookupWord(word);
      setLookupResult(res);
      const lemmaWord = res.entry?.word || res.matchedWord || word;
      const savedWord = storageService.getSavedWord(lemmaWord);
      setIsSaved(!!savedWord);
      setCustomMeaning(savedWord?.customMeaningZh || '');
      setMeaningInput(savedWord?.customMeaningZh || res.entry?.meaningZh || '');
      setIsEditingMeaning(false);
      setCopied(false);
    } else {
      setLookupResult(null);
    }
  }, [word]);

  if (!word || !lookupResult) return null;

  const entry = lookupResult.entry;
  const lemma = entry?.word || lookupResult.matchedWord || word;

  const handleCopyWord = () => {
    try {
      navigator.clipboard.writeText(lemma);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handlePlayAudio = (rate: number = speechRate) => {
    setIsPlayingAudio(true);
    speechService.speak(lemma, {
      rate,
      lang: 'es-ES',
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    });
  };

  const handleSaveCustomMeaning = () => {
    const trimmed = meaningInput.trim();
    if (!trimmed) return;
    setCustomMeaning(trimmed);
    setIsEditingMeaning(false);

    if (isSaved) {
      storageService.updateWordMeaning(lemma, trimmed);
    } else {
      storageService.saveWord({
        word: lemma,
        originalWord: word,
        meaningZh: trimmed,
        meaningEn: entry?.meaningEn || '',
        partOfSpeech: entry?.partOfSpeech || 'noun',
        conjugationNotes: lookupResult.conjugationInfo
          ? `${lookupResult.conjugationInfo.tense} (${lookupResult.conjugationInfo.person})`
          : undefined,
        contextSentence: showContextSentence ? contextSentence : undefined,
        customMeaningZh: trimmed
      });
      setIsSaved(true);
    }
    onSavedChange?.();
  };

  const handleToggleSave = () => {
    if (!entry && !lookupResult) return;

    if (isSaved) {
      const savedItems = storageService.getVocabulary();
      const existing = savedItems.find((i: SavedWord) => i.word.toLowerCase() === lemma.toLowerCase());
      if (existing) {
        storageService.removeWord(existing.id);
        setIsSaved(false);
      }
    } else {
      const initialMeaning = customMeaning || entry?.meaningZh || '本地词库未收录';
      storageService.saveWord({
        word: lemma,
        originalWord: word,
        meaningZh: initialMeaning,
        meaningEn: entry?.meaningEn || '',
        partOfSpeech: entry?.partOfSpeech || 'noun',
        conjugationNotes: lookupResult.conjugationInfo
          ? `${lookupResult.conjugationInfo.tense} (${lookupResult.conjugationInfo.person})`
          : undefined,
        contextSentence: showContextSentence ? contextSentence : undefined,
        customMeaningZh: customMeaning || undefined
      });
      setIsSaved(true);
    }
    onSavedChange?.();
  };

  const handleSwitchToInfinitive = (infinitive: string) => {
    const res = lookupWord(infinitive);
    setLookupResult(res);
    const saved = storageService.getSavedWord(res.entry?.word || infinitive);
    setIsSaved(!!saved);
    setCustomMeaning(saved?.customMeaningZh || '');
    setMeaningInput(saved?.customMeaningZh || res.entry?.meaningZh || '');
    setIsEditingMeaning(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl transition-transform duration-300 ease-out pb-safe"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Pull Bar */}
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-sand-300" />

        {/* 1. Top Bar: Sub-info & Clean Close Button */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            {word.toLowerCase() !== lemma.toLowerCase() && (
              <span className="rounded-md bg-sand-100 px-2 py-0.5 text-xs text-sand-600">
                原文形态: {word}
              </span>
            )}
            {lookupResult.conjugationInfo && (
              <span className="rounded-md bg-andalucia-50 px-2 py-0.5 text-xs font-medium text-andalucia-800">
                {lookupResult.conjugationInfo.tense} ({lookupResult.conjugationInfo.person})
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-sand-400 hover:bg-sand-100 hover:text-sand-700 transition-colors"
            title="关闭"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 2. Main Word Heading & Part of Speech Badge */}
        <div className="mt-1 flex items-baseline gap-3">
          <h2
            ref={wordTextRef}
            className="text-3xl font-extrabold tracking-tight text-sand-900 font-serif select-all"
          >
            {lemma}
          </h2>
          {entry?.partOfSpeech && (
            <span className="self-center rounded-full bg-batllo-100 px-2.5 py-0.5 text-xs font-semibold text-batllo-700">
              {entry.partOfSpeech}
            </span>
          )}
        </div>

        {/* 3. Phonetics Guide & Integrated Audio Toolbar */}
        <div className="mt-2.5 flex items-center justify-between border-b border-sand-100 pb-3.5">
          {entry?.pronunciation ? (
            <span className="text-xs font-mono text-sand-500">
              {entry.pronunciation}
            </span>
          ) : (
            <span className="text-xs text-sand-400 italic">西语标准发音</span>
          )}

          {/* Unified Audio + Speed Capsule */}
          <div className="flex items-center rounded-full bg-sand-100 p-1 pl-2">
            <button
              onClick={() => handlePlayAudio(speechRate)}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
                isPlayingAudio
                  ? 'bg-batllo-500 text-white shadow-xs animate-pulse'
                  : 'text-batllo-700 hover:text-batllo-900 active:scale-95'
              }`}
              title="播放真人朗读发音"
            >
              <Volume2 className="h-3.5 w-3.5" />
              <span>朗读</span>
            </button>

            <span className="mx-1 h-3.5 w-[1px] bg-sand-300" />

            {/* Segmented Speed Controller */}
            <div className="flex items-center gap-0.5">
              {[0.75, 1.0, 1.25].map((rate) => (
                <button
                  key={rate}
                  onClick={() => {
                    setSpeechRate(rate);
                    handlePlayAudio(rate);
                  }}
                  className={`rounded-full px-2 py-0.5 text-[11px] transition-all ${
                    speechRate === rate
                      ? 'bg-white text-batllo-700 shadow-2xs font-bold'
                      : 'text-sand-500 hover:text-sand-800 font-medium'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Conjugation Info Banner */}
        {lookupResult.isConjugatedForm && lookupResult.conjugationInfo && (
          <div className="mt-3.5 rounded-xl bg-gradient-to-r from-andalucia-50 to-batllo-50 p-3.5 border border-andalucia-200/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-andalucia-600" />
                <span className="text-xs font-semibold uppercase tracking-wider text-andalucia-800">
                  动词变位解析
                </span>
              </div>
              {lookupResult.conjugationInfo.infinitive !== lemma && (
                <button
                  onClick={() => handleSwitchToInfinitive(lookupResult.conjugationInfo!.infinitive)}
                  className="flex items-center gap-1 text-xs font-medium text-batllo-700 hover:underline"
                >
                  查看原形 {lookupResult.conjugationInfo.infinitive}
                  <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </div>
            <div className="mt-2 text-sm text-sand-800">
              <span className="font-semibold text-batllo-800">
                {lookupResult.conjugationInfo.tense}
              </span>
              <span className="mx-2 text-sand-600">·</span>
              <span className="text-sand-700">
                {lookupResult.conjugationInfo.person}
              </span>
            </div>
            {lookupResult.conjugationInfo.notes && (
              <p className="mt-1 text-xs text-sand-600">
                {lookupResult.conjugationInfo.notes}
              </p>
            )}
          </div>
        )}

        {/* 4. Definitions Section & Custom Meaning Management */}
        <div className="mt-4 space-y-3">
          {/* Official Dictionary Definition */}
          {entry?.meaningZh && (
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-sand-600">
                  词典释义
                </h4>
                {!customMeaning && !isEditingMeaning && (
                  <button
                    onClick={() => {
                      setMeaningInput('');
                      setIsEditingMeaning(true);
                    }}
                    className="flex items-center gap-1 text-[11px] font-semibold text-batllo-700 hover:underline"
                  >
                    <Edit3 className="h-3 w-3" />
                    <span>添加补充笔记</span>
                  </button>
                )}
              </div>
              <p className="mt-1 text-base font-medium text-sand-900 leading-snug">
                {entry.meaningZh}
              </p>
            </div>
          )}

          {/* User's Custom Meaning (if saved) */}
          {customMeaning && !isEditingMeaning && (
            <div className="rounded-xl border border-andalucia-200 bg-andalucia-50/70 p-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-andalucia-800">
                  <Edit3 className="h-3.5 w-3.5 text-andalucia-600" />
                  我的自定义释义
                </span>
                <button
                  onClick={() => {
                    setMeaningInput(customMeaning);
                    setIsEditingMeaning(true);
                  }}
                  className="text-xs font-semibold text-batllo-700 hover:underline"
                >
                  修改
                </button>
              </div>
              <p className="mt-1 text-sm font-semibold text-sand-900">
                {customMeaning}
              </p>
            </div>
          )}

          {/* Inline Editor for Custom Meaning */}
          {isEditingMeaning ? (
            <div className="rounded-xl border border-batllo-300 bg-batllo-50/50 p-3.5 space-y-2.5">
              <label className="text-xs font-bold text-batllo-900 block">
                {customMeaning ? '修改自定义释义' : '为该词添加中文释义（存入生词本）'}
              </label>
              <input
                type="text"
                value={meaningInput}
                onChange={(e) => setMeaningInput(e.target.value)}
                placeholder="例如：早餐；早饭..."
                className="w-full rounded-lg border border-sand-300 bg-white px-3 py-2 text-sm text-sand-900 focus:border-batllo-500 focus:outline-none"
                autoFocus
              />
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => setIsEditingMeaning(false)}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-sand-600 hover:bg-sand-100"
                >
                  取消
                </button>
                <button
                  onClick={handleSaveCustomMeaning}
                  className="rounded-lg bg-batllo-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-batllo-700"
                >
                  保存释义
                </button>
              </div>
            </div>
          ) : !entry?.meaningZh && !customMeaning ? (
            /* Word not in local dictionary and no custom meaning yet */
            <div className="rounded-2xl border border-batllo-200 bg-batllo-50/70 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-batllo-900">
                    本地词库暂未收录该词
                  </h4>
                  <p className="text-xs text-batllo-700 mt-0.5">
                    你可以自行输入释义，方便随时在生词本中查看与背诵
                  </p>
                </div>
                <button
                  onClick={() => {
                    setMeaningInput('');
                    setIsEditingMeaning(true);
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-batllo-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-batllo-700 active:scale-95 transition-all shrink-0"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>添加释义</span>
                </button>
              </div>
            </div>
          ) : null}

          {entry?.meaningEn && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-sand-600">
                English Meaning
              </h4>
              <p className="mt-0.5 text-sm text-sand-700">
                {entry.meaningEn}
              </p>
            </div>
          )}
        </div>

        {/* 5. Context Sentence where word was clicked (当前课文语境) */}
        {showContextSentence && contextSentence && (
          <div className="mt-4 border-t border-sand-100 pt-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-sand-500">
              当前上下文
            </h4>
            <p className="mt-1.5 rounded-xl border-l-2 border-batllo-500 bg-sand-50 px-3 py-2 text-xs italic text-sand-700 leading-relaxed">
              "{contextSentence}"
            </p>
          </div>
        )}

        {/* 6. Typical Examples (典型例句) */}
        {entry?.examples && entry.examples.length > 0 && (
          <div className="mt-4 border-t border-sand-100 pt-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-sand-500">
              典型例句 (Ejemplos)
            </h4>
            <div className="mt-2.5 space-y-2">
              {entry.examples.map((ex: { es: string; zh: string; en?: string }, idx: number) => (
                <div key={idx} className="rounded-xl bg-sand-50 p-2.5 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sand-900">{ex.es}</p>
                    <button
                      onClick={() => speechService.speak(ex.es, { rate: speechRate })}
                      className="p-1 text-batllo-600 hover:text-batllo-800"
                      title="朗读例句"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-sand-600">{ex.zh}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. Action Button: Save to Vocabulary (生词本收藏) */}
        <div className="mt-5">
          <button
            onClick={handleToggleSave}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold shadow-sm transition-all active:scale-[0.98] ${
              isSaved
                ? 'bg-sand-100 text-sand-700 hover:bg-sand-200'
                : 'bg-gradient-to-r from-batllo-600 to-batllo-500 text-white hover:from-batllo-700 hover:to-batllo-600'
            }`}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="h-4 w-4 text-andalucia-600 fill-current" />
                已收藏于生词本 (点击移出)
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4" />
                收藏到我的生词本
              </>
            )}
          </button>
        </div>

        {/* 8. Secondary External Reference Links (底部辅助拓展) */}
        <div className="mt-4 flex items-center justify-between border-t border-sand-100 pt-3 text-xs text-sand-500">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Globe className="h-3.5 w-3.5 text-batllo-600 shrink-0" />
            <span className="text-sand-600">更多词典拓展:</span>
            <a
              href={`https://www.spanishdict.com/translate/${encodeURIComponent(lemma)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-batllo-700 hover:text-batllo-900 hover:underline inline-flex items-center gap-0.5"
            >
              <span>SpanishDict</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
            <span>·</span>
            <a
              href={`https://www.deepl.com/translator#es/zh/${encodeURIComponent(lemma)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-batllo-700 hover:text-batllo-900 hover:underline inline-flex items-center gap-0.5"
            >
              <span>DeepL</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          </div>

          <button
            onClick={handleCopyWord}
            className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-sand-500 hover:bg-sand-100 hover:text-batllo-700 transition-colors shrink-0"
            title="复制单词"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-600" />
                <span className="text-[11px] font-semibold text-emerald-600">已复制</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span className="text-[11px]">复制</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
