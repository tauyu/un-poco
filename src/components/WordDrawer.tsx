import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Bookmark, BookmarkCheck, X, Sparkles, ArrowRight, Gauge, Check, ExternalLink } from 'lucide-react';
import { lookupWord } from '../services/dictionary/lookupService';
import type { LookupResult } from '../services/dictionary/types';
import { speechService } from '../services/speech/speechService';
import { storageService, type SavedWord } from '../services/storage/storageService';

interface WordDrawerProps {
  word: string | null;
  contextSentence?: string;
  onClose: () => void;
  onSavedChange?: () => void;
}

export const WordDrawer: React.FC<WordDrawerProps> = ({
  word,
  contextSentence,
  onClose,
  onSavedChange
}) => {
  const [lookupResult, setLookupResult] = useState<LookupResult | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showIosHint, setShowIosHint] = useState(false);
  const [copied, setCopied] = useState(false);
  const wordTextRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (word) {
      const res = lookupWord(word);
      setLookupResult(res);
      const lemma = res.entry?.word || res.matchedWord || word;
      setIsSaved(storageService.isWordSaved(lemma));
      setShowIosHint(false);
      setCopied(false);
    } else {
      setLookupResult(null);
    }
  }, [word]);

  if (!word || !lookupResult) return null;

  const entry = lookupResult.entry;
  const lemma = entry?.word || lookupResult.matchedWord || word;

  const handleTriggerIosTranslate = () => {
    try {
      navigator.clipboard.writeText(lemma);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }

    if (wordTextRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(wordTextRef.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }

    setShowIosHint(true);
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
      storageService.saveWord({
        word: lemma,
        originalWord: word,
        meaningZh: entry?.meaningZh || '暂无释义',
        meaningEn: entry?.meaningEn || '',
        partOfSpeech: entry?.partOfSpeech || 'noun',
        conjugationNotes: lookupResult.conjugationInfo
          ? `${lookupResult.conjugationInfo.tense} (${lookupResult.conjugationInfo.person})`
          : undefined,
        contextSentence: contextSentence
      });
      setIsSaved(true);
    }
    onSavedChange?.();
  };

  const handleSwitchToInfinitive = (infinitive: string) => {
    const res = lookupWord(infinitive);
    setLookupResult(res);
    setIsSaved(storageService.isWordSaved(res.entry?.word || infinitive));
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
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-sand-300" />

        {/* Header with Word, Audio, Save & Close */}
        <div className="flex items-start justify-between border-b border-sand-100 pb-4">
          <div>
            <div className="flex items-center gap-3">
              <h2
                ref={wordTextRef}
                className="text-2xl font-bold tracking-tight text-sand-900 font-serif select-all"
              >
                {lemma}
              </h2>
              {word.toLowerCase() !== lemma.toLowerCase() && (
                <span className="rounded-md bg-sand-100 px-2 py-0.5 text-xs text-sand-600">
                  原词: {word}
                </span>
              )}
              {entry?.partOfSpeech && (
                <span className="rounded-full bg-batllo-100 px-2.5 py-0.5 text-xs font-medium text-batllo-700">
                  {entry.partOfSpeech}
                </span>
              )}
            </div>
            {entry?.pronunciation && (
              <p className="mt-1 text-xs text-sand-600 font-mono">
                {entry.pronunciation}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Speed Rate Toggle */}
            <button
              onClick={() => {
                const nextRate = speechRate === 1.0 ? 0.75 : speechRate === 0.75 ? 1.25 : 1.0;
                setSpeechRate(nextRate);
                handlePlayAudio(nextRate);
              }}
              className="flex items-center gap-1 rounded-full bg-sand-100 px-2.5 py-1 text-xs font-medium text-sand-700 hover:bg-sand-200"
              title="切换播放语速"
            >
              <Gauge className="h-3.5 w-3.5 text-sand-600" />
              <span>{speechRate}x</span>
            </button>

            {/* Pronounce Button */}
            <button
              onClick={() => handlePlayAudio(speechRate)}
              className={`rounded-full p-2.5 transition-colors ${
                isPlayingAudio
                  ? 'bg-batllo-500 text-white animate-pulse'
                  : 'bg-batllo-50 text-batllo-600 hover:bg-batllo-100'
              }`}
              title="西语发音"
            >
              <Volume2 className="h-5 w-5" />
            </button>

            {/* Save to Vocabulary */}
            <button
              onClick={handleToggleSave}
              className={`rounded-full p-2.5 transition-colors ${
                isSaved
                  ? 'bg-andalucia-100 text-andalucia-600 hover:bg-andalucia-200'
                  : 'bg-sand-100 text-sand-600 hover:bg-sand-200'
              }`}
              title={isSaved ? '已收藏在生词本' : '添加到生词本'}
            >
              {isSaved ? <BookmarkCheck className="h-5 w-5 fill-current" /> : <Bookmark className="h-5 w-5" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="rounded-full p-2 text-sand-600 hover:bg-sand-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Conjugation Info Banner */}
        {lookupResult.isConjugatedForm && lookupResult.conjugationInfo && (
          <div className="mt-4 rounded-xl bg-gradient-to-r from-andalucia-50 to-batllo-50 p-3.5 border border-andalucia-200/60">
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

        {/* Definitions or iOS Translate Fallback */}
        {entry?.meaningZh ? (
          <div className="mt-5 space-y-3">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-sand-600">
                中文释义
              </h4>
              <p className="mt-1 text-base font-medium text-sand-900 leading-snug">
                {entry.meaningZh}
              </p>
            </div>

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
        ) : (
          <div className="mt-5 rounded-2xl border border-batllo-200 bg-batllo-50/70 p-4 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-batllo-600 to-andalucia-500 text-white shadow-sm">
                <Sparkles className="h-4 w-4" />
              </span>
              <div>
                <h4 className="text-sm font-bold text-batllo-900">
                  调用 iOS 系统原生翻译
                </h4>
                <p className="text-[11px] text-batllo-700">
                  该词暂未收录在离线精读库，可一键调取苹果官方词典与翻译
                </p>
              </div>
            </div>

            <div className="mt-3.5 space-y-2">
              <button
                onClick={handleTriggerIosTranslate}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-batllo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-batllo-700 active:scale-[0.98] transition-all"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-300" />
                    <span>已高亮并复制！点击上方系统气泡【翻译】</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-andalucia-300" />
                    <span>呼出 iOS 翻译 / 查询浮层</span>
                  </>
                )}
              </button>

              {showIosHint && (
                <div className="rounded-xl border border-batllo-200 bg-white/95 p-3 text-[11px] text-batllo-800 shadow-xs">
                  💡 <strong>操作提示</strong>：上方单词已全选高亮！在弹出的系统黑色气泡菜单中轻触 <strong>【翻译】</strong> 或 <strong>【查询】</strong>，即可从屏幕底部直接滑出 Apple 原生卡片。
                </div>
              )}

              <div className="flex items-center gap-2 pt-1">
                <a
                  href={`eudic://dict/${encodeURIComponent(lemma)}`}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-sand-200 bg-white py-2 text-[11px] font-medium text-sand-700 hover:bg-sand-50 transition-colors shadow-2xs"
                >
                  <span>在《西语助手》查看</span>
                </a>
                <a
                  href={`https://es.wiktionary.org/wiki/${encodeURIComponent(lemma.toLowerCase())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-sand-200 bg-white py-2 text-[11px] font-medium text-sand-700 hover:bg-sand-50 transition-colors shadow-2xs"
                >
                  <ExternalLink className="h-3 w-3 text-sand-500" />
                  <span>维基词典详细版</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Examples */}
        {entry?.examples && entry.examples.length > 0 && (
          <div className="mt-5 border-t border-sand-100 pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-sand-600">
              典型例句 (Ejemplos)
            </h4>
            <div className="mt-2.5 space-y-2.5">
              {entry.examples.map((ex: { es: string; zh: string; en?: string }, idx: number) => (
                <div key={idx} className="rounded-lg bg-sand-50 p-2.5 text-sm">
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

        {/* Context Sentence where word was clicked */}
        {contextSentence && (
          <div className="mt-5 border-t border-sand-100 pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-sand-600">
              当前上下文
            </h4>
            <p className="mt-1.5 rounded-lg border-l-2 border-batllo-500 bg-sand-50 px-3 py-2 text-xs italic text-sand-700">
              "{contextSentence}"
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-6">
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

        {/* Secondary System / App Lookup Bridge */}
        {entry?.meaningZh && (
          <div className="mt-3.5 flex items-center justify-center gap-3 text-[11px] text-sand-500">
            <button
              onClick={handleTriggerIosTranslate}
              className="flex items-center gap-1 font-medium text-batllo-700 hover:text-batllo-900 transition-colors"
            >
              <Sparkles className="h-3 w-3 text-andalucia-500" />
              <span>在 iOS 系统中【翻译】/【查询】</span>
            </button>
            <span>·</span>
            <a
              href={`eudic://dict/${encodeURIComponent(lemma)}`}
              className="hover:text-sand-700 transition-colors"
            >
              西语助手
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
