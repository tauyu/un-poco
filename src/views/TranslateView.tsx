import React, { useState, useRef } from 'react';
import { Search, Volume2, X, Sparkles, FileText, Bookmark, Camera, Image as ImageIcon, Copy, Check, BookmarkCheck, ArrowRight } from 'lucide-react';
import { lookupWord, getSearchSuggestions } from '../services/dictionary/lookupService';
import type { LookupResult, DictEntry } from '../services/dictionary/types';
import { speechService } from '../services/speech/speechService';
import { storageService, type SavedWord } from '../services/storage/storageService';
import { ocrService, type OCRProgress } from '../services/ocr/ocrService';
import { InteractiveText } from '../components/InteractiveText';

interface TranslateViewProps {
  onWordClick: (word: string, contextSentence?: string) => void;
  speechRate: number;
}

export const TranslateView: React.FC<TranslateViewProps> = ({ onWordClick, speechRate }) => {
  const [query, setQuery] = useState('');
  const [activeResult, setActiveResult] = useState<LookupResult | null>(null);
  const [suggestions, setSuggestions] = useState<DictEntry[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSavedInVocab, setIsSavedInVocab] = useState(false);

  // Photo / OCR State
  const [isProcessingOCR, setIsProcessingOCR] = useState(false);
  const [ocrProgress, setOcrProgress] = useState<OCRProgress>({ status: '', progress: 0 });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ocrError, setOcrError] = useState<string | null>(null);

  // Paragraph / Reading Mode
  const [readingText, setReadingText] = useState<string>('');
  const [isParagraphMode, setIsParagraphMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedSentenceNotice, setSavedSentenceNotice] = useState<string | null>(null);

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const albumInputRef = useRef<HTMLInputElement>(null);

  const QUICK_EXAMPLES = ['mañana', 'hablábamos', 'fui', 'estoy', 'días', 'corazón'];

  const handleSearch = (textToSearch: string) => {
    const q = textToSearch.trim();
    if (!q) {
      setActiveResult(null);
      setSuggestions([]);
      return;
    }
    const res = lookupWord(q);
    setActiveResult(res);

    // Check if saved
    const lemma = res.entry?.word || res.matchedWord || q;
    setIsSavedInVocab(storageService.isWordSaved(lemma));
  };

  const handleInputChange = (val: string) => {
    setQuery(val);
    if (val.trim().length >= 2) {
      const sugg = getSearchSuggestions(val, 5);
      setSuggestions(sugg);
      setShowSuggestions(sugg.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }

    if (val.trim()) {
      handleSearch(val);
    } else {
      setActiveResult(null);
    }
  };

  const handleSelectSuggestion = (word: string) => {
    setQuery(word);
    setShowSuggestions(false);
    handleSearch(word);
  };

  const handleClear = () => {
    setQuery('');
    setActiveResult(null);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOcrError(null);
    setIsProcessingOCR(true);
    setReadingText('');
    setIsParagraphMode(true);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    try {
      const text = await ocrService.recognizeSpanishText(file, (p) => {
        setOcrProgress(p);
      });

      if (!text || text.trim() === '') {
        setOcrError('未能从照片中识别出西班牙语文字，请尝试拍摄更清晰平整的画面。');
      } else {
        setReadingText(text);
      }
    } catch (err: any) {
      console.error('OCR Error:', err);
      setOcrError('离线识别未完成，请确保照片清晰。');
    } finally {
      setIsProcessingOCR(false);
    }
  };

  const handleToggleSaveWord = () => {
    if (!activeResult) return;
    const lemma = activeResult.entry?.word || activeResult.matchedWord || query;

    if (isSavedInVocab) {
      const items = storageService.getVocabulary();
      const existing = items.find((i: SavedWord) => i.word.toLowerCase() === lemma.toLowerCase());
      if (existing) {
        storageService.removeWord(existing.id);
        setIsSavedInVocab(false);
      }
    } else {
      storageService.saveWord({
        word: lemma,
        originalWord: query || lemma,
        meaningZh: activeResult.entry?.meaningZh || '暂无释义',
        meaningEn: activeResult.entry?.meaningEn || '',
        partOfSpeech: activeResult.entry?.partOfSpeech || 'noun',
        conjugationNotes: activeResult.conjugationInfo
          ? `${activeResult.conjugationInfo.tense} (${activeResult.conjugationInfo.person})`
          : undefined
      });
      setIsSavedInVocab(true);
    }
  };

  const handleSaveSentence = (esText: string, zhText: string) => {
    storageService.saveSentence({
      es: esText,
      zh: zhText,
      sourceLessonTitle: '查词例句'
    });
    setSavedSentenceNotice('句子已成功摘抄至“我的”收藏夹');
    setTimeout(() => setSavedSentenceNotice(null), 2500);
  };

  const handleCopyText = (txt: string) => {
    navigator.clipboard.writeText(txt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-28 pt-4">
      {/* Hidden file inputs for Camera & Photo Album */}
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        type="file"
        ref={albumInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-sand-900 font-serif">
            查词与翻译
          </h2>
          <p className="text-xs text-sand-600">
            支持单词释义、变位反查、即时拍照与相册取词
          </p>
        </div>
      </div>

      {/* Main Search Input */}
      <div className="relative rounded-2xl bg-white p-2.5 shadow-sm border border-sand-200">
        <div className="relative flex items-center">
          <Search className="absolute left-3 h-5 w-5 text-sand-600" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
            placeholder="输入西语、英语或中文（如 manana, hablar, 你好）..."
            className="w-full rounded-xl bg-sand-50/70 py-3 pl-10 pr-10 text-base text-sand-900 placeholder-sand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-batllo-500"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-3 rounded-full p-1 text-sand-600 hover:bg-sand-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Real-time Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-20 mt-1 rounded-xl bg-white p-1.5 shadow-lg border border-sand-200">
            <div className="px-2 py-1 text-xs font-semibold text-sand-600">联想推荐</div>
            {suggestions.map((item) => (
              <button
                key={item.word}
                onClick={() => handleSelectSuggestion(item.word)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left hover:bg-sand-50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-batllo-800">{item.word}</span>
                  <span className="text-xs text-sand-600">[{item.partOfSpeech}]</span>
                </div>
                <span className="text-xs text-sand-600 truncate max-w-[180px]">{item.meaningZh}</span>
              </button>
            ))}
          </div>
        )}

        {/* Action Buttons: Camera, Album, Paste */}
        <div className="mt-2.5 flex items-center justify-between border-t border-sand-100 pt-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="flex items-center gap-1.5 rounded-xl bg-batllo-50 px-3 py-1.5 text-xs font-medium text-batllo-700 hover:bg-batllo-100 transition-colors"
            >
              <Camera className="h-4 w-4" />
              <span>拍照识图</span>
            </button>
            <button
              onClick={() => albumInputRef.current?.click()}
              className="flex items-center gap-1.5 rounded-xl bg-andalucia-50 px-3 py-1.5 text-xs font-medium text-andalucia-800 hover:bg-andalucia-100 transition-colors"
            >
              <ImageIcon className="h-4 w-4" />
              <span>相册选图</span>
            </button>
          </div>

          <button
            onClick={() => setIsParagraphMode(!isParagraphMode)}
            className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
              isParagraphMode
                ? 'bg-batllo-600 text-white'
                : 'bg-sand-100 text-sand-700 hover:bg-sand-200'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>短文点读台</span>
          </button>
        </div>
      </div>

      {/* Quick search tags */}
      {!activeResult && !isParagraphMode && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-sand-600">快速尝试:</span>
          {QUICK_EXAMPLES.map((w) => (
            <button
              key={w}
              onClick={() => {
                setQuery(w);
                handleSearch(w);
              }}
              className="rounded-lg bg-white px-2.5 py-1 text-xs text-sand-700 border border-sand-200/80 hover:border-batllo-400 hover:text-batllo-700 transition-colors"
            >
              {w}
            </button>
          ))}
        </div>
      )}

      {/* OCR Progress Display */}
      {isProcessingOCR && (
        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm border border-sand-200">
          <div className="flex items-center justify-between text-xs text-sand-600">
            <span>正在离线识别图片文字...</span>
            <span className="font-semibold text-batllo-600">{Math.round(ocrProgress.progress * 100)}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-sand-100">
            <div
              className="h-full bg-batllo-600 transition-all duration-300"
              style={{ width: `${Math.max(5, Math.round(ocrProgress.progress * 100))}%` }}
            />
          </div>
        </div>
      )}

      {/* OCR Error */}
      {ocrError && (
        <div className="mt-4 rounded-2xl bg-red-50 p-4 text-xs text-red-700 border border-red-200">
          {ocrError}
        </div>
      )}

      {/* Saved Sentence Toast Notice */}
      {savedSentenceNotice && (
        <div className="mt-3 flex items-center justify-between rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-medium text-emerald-800 border border-emerald-200 animate-fade-in">
          <span>{savedSentenceNotice}</span>
        </div>
      )}

      {/* Word Lookup Result Card */}
      {activeResult && activeResult.entry && !isParagraphMode && (
        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm border border-sand-200/80">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold font-serif text-sand-900">
                  {activeResult.entry.word}
                </h3>
                {activeResult.isConjugatedForm && (
                  <span className="rounded-md bg-andalucia-100 px-2 py-0.5 text-xs font-medium text-andalucia-800">
                    动词变位
                  </span>
                )}
                {activeResult.entry.partOfSpeech && (
                  <span className="rounded-md bg-batllo-100 px-2 py-0.5 text-xs font-medium text-batllo-700">
                    {activeResult.entry.partOfSpeech}
                  </span>
                )}
              </div>

              {activeResult.entry.pronunciation && (
                <p className="mt-1 text-xs font-mono text-sand-600">
                  {activeResult.entry.pronunciation}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => speechService.speak(activeResult.entry!.word, { rate: speechRate, lang: 'es-ES' })}
                className="rounded-full bg-batllo-50 p-2.5 text-batllo-700 hover:bg-batllo-100 transition-colors"
                title="发音"
              >
                <Volume2 className="h-5 w-5" />
              </button>
              <button
                onClick={handleToggleSaveWord}
                className={`rounded-full p-2.5 transition-colors ${
                  isSavedInVocab
                    ? 'bg-andalucia-100 text-andalucia-600 hover:bg-andalucia-200'
                    : 'bg-sand-100 text-sand-600 hover:bg-sand-200'
                }`}
                title={isSavedInVocab ? '已收藏' : '加入生词本'}
              >
                {isSavedInVocab ? <BookmarkCheck className="h-5 w-5 fill-current" /> : <Bookmark className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Conjugation Details banner if conjugated */}
          {activeResult.isConjugatedForm && activeResult.conjugationInfo && (
            <div className="mt-3.5 rounded-xl bg-gradient-to-r from-andalucia-50 to-batllo-50 p-3 text-xs border border-andalucia-200/50">
              <div className="flex items-center gap-1.5 font-semibold text-andalucia-800">
                <Sparkles className="h-3.5 w-3.5" />
                <span>变位信息</span>
              </div>
              <p className="mt-1 text-sand-800 font-medium">
                {activeResult.conjugationInfo.tense} · {activeResult.conjugationInfo.person}
              </p>
              {activeResult.conjugationInfo.infinitive !== activeResult.entry.word && (
                <p className="mt-0.5 text-sand-600">原形动词: {activeResult.conjugationInfo.infinitive}</p>
              )}
            </div>
          )}

          {/* Definition */}
          <div className="mt-4 border-t border-sand-100 pt-3">
            <h4 className="text-xs font-semibold text-sand-600 uppercase tracking-wider">中文释义</h4>
            <p className="mt-1 text-base font-semibold text-sand-900 leading-snug">
              {activeResult.entry.meaningZh}
            </p>
            {activeResult.entry.meaningEn && (
              <p className="mt-1 text-xs text-sand-600">
                {activeResult.entry.meaningEn}
              </p>
            )}
          </div>

          {/* Examples */}
          {activeResult.entry.examples && activeResult.entry.examples.length > 0 && (
            <div className="mt-4 border-t border-sand-100 pt-3">
              <h4 className="text-xs font-semibold text-sand-600 uppercase tracking-wider mb-2">例句</h4>
              <div className="space-y-2">
                {activeResult.entry.examples.map((ex, idx) => (
                  <div key={idx} className="flex items-start justify-between rounded-xl bg-sand-50/70 p-2.5 text-xs">
                    <div>
                      <p className="font-medium text-sand-900 font-serif">{ex.es}</p>
                      <p className="text-sand-600 mt-0.5">{ex.zh}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-2 shrink-0">
                      <button
                        onClick={() => speechService.speak(ex.es, { rate: speechRate, lang: 'es-ES' })}
                        className="p-1 text-sand-600 hover:text-batllo-600"
                        title="朗读"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleSaveSentence(ex.es, ex.zh)}
                        className="p-1 text-sand-600 hover:text-andalucia-600"
                        title="摘抄到我的收藏"
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Alternatives */}
          {activeResult.alternatives && activeResult.alternatives.length > 0 && (
            <div className="mt-4 border-t border-sand-100 pt-2.5">
              <span className="text-xs text-sand-600">相关联想词: </span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {activeResult.alternatives.map((alt) => (
                  <button
                    key={alt.word}
                    onClick={() => {
                      setQuery(alt.word);
                      handleSearch(alt.word);
                    }}
                    className="flex items-center gap-1 rounded-md bg-sand-100 px-2 py-1 text-xs text-sand-700 hover:bg-sand-200"
                  >
                    <span>{alt.word}</span>
                    <ArrowRight className="h-3 w-3 text-sand-600" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Paragraph / OCR Reading Workbench */}
      {isParagraphMode && (
        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm border border-sand-200">
          <div className="flex items-center justify-between pb-2 border-b border-sand-100">
            <h3 className="text-sm font-semibold text-sand-900">
              短文交互点读台（轻触任一单词即可查释义）
            </h3>
            {imagePreview && (
              <button
                onClick={() => setImagePreview(null)}
                className="text-xs text-sand-600 hover:underline"
              >
                隐藏照片
              </button>
            )}
          </div>

          {/* Photo Thumbnail if any */}
          {imagePreview && (
            <div className="mt-3 max-h-48 overflow-hidden rounded-xl border border-sand-200 bg-black/5 flex items-center justify-center">
              <img src={imagePreview} alt="OCR Preview" className="max-h-48 object-contain" />
            </div>
          )}

          {/* Editable Text Area if not in tokenized mode */}
          <textarea
            value={readingText}
            onChange={(e) => setReadingText(e.target.value)}
            placeholder="在此粘贴西语新闻、歌词或对话，或者通过上方“拍照识图/相册选图”提取文字..."
            rows={5}
            className="mt-3 w-full rounded-xl bg-sand-50 p-3 text-sm text-sand-900 placeholder-sand-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-batllo-500 border border-sand-200/60"
          />

          {readingText.trim() && (
            <div className="mt-4 rounded-xl bg-sand-50/70 p-4 border border-sand-200/80">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-sand-200/60">
                <span className="text-xs font-semibold text-batllo-700">可点读文本:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speechService.speak(readingText, { rate: speechRate, lang: 'es-ES' })}
                    className="flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-xs text-sand-700 border border-sand-200 hover:bg-sand-100"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>朗读全文</span>
                  </button>
                  <button
                    onClick={() => handleCopyText(readingText)}
                    className="flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-xs text-sand-700 border border-sand-200 hover:bg-sand-100"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? '已复制' : '复制'}</span>
                  </button>
                </div>
              </div>

              <div className="text-base text-sand-900 leading-relaxed font-serif">
                <InteractiveText text={readingText} onWordClick={onWordClick} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
