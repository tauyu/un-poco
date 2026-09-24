import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  BookOpen, Bookmark, Volume2, Trash2, Download, Upload, ShieldCheck,
  ShieldAlert, Copy, Check, Quote, Share2, X, Search, RotateCcw,
  ArrowRight, ChevronRight, Clock, Award
} from 'lucide-react';
import { storageService, type SavedSentence, type SavedWord } from '../services/storage/storageService';
import { speechService } from '../services/speech/speechService';
import { ALL_COURSES_POOL, type Lesson } from '../data/courses/courseData';

interface ProfileViewProps {
  speechRate: number;
  onNavigateToLesson?: (lessonId: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ speechRate, onNavigateToLesson }) => {
  const [vocabList, setVocabList] = useState<SavedWord[]>([]);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [savedSentences, setSavedSentences] = useState<SavedSentence[]>([]);
  const [isPersisted, setIsPersisted] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Drill-down drawers state
  const [showVocabDrawer, setShowVocabDrawer] = useState<boolean>(false);
  const [vocabFilter, setVocabFilter] = useState<'all' | 'mastered' | 'learning'>('all');
  const [vocabSearch, setVocabSearch] = useState<string>('');

  const [showLessonsDrawer, setShowLessonsDrawer] = useState<boolean>(false);
  const [courseProgress, setCourseProgress] = useState(storageService.getCourseProgress());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const importInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const loadData = () => {
    setVocabList(storageService.getVocabulary());
    setCompletedCount(storageService.getCompletedLessonsCount());
    setSavedSentences(storageService.getSavedSentences());
    setCourseProgress(storageService.getCourseProgress());
    storageService.isStoragePersisted().then((p) => setIsPersisted(p));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRequestPersist = async () => {
    const res = await storageService.requestPersistentStorage();
    setIsPersisted(res.persisted);
    if (res.persisted) {
      alert('已成功获取数据永久保存权限！生词、课文进度与好句摘抄防自动清理。');
    } else {
      alert('建议点击 Safari 底部的“分享”按钮并选择“添加到主屏幕”，即可享受最持久的数据保存！');
    }
  };

  const handleDeleteSentence = (id: string) => {
    if (confirm('确定要删除这条好句摘抄吗？')) {
      storageService.removeSentence(id);
      loadData();
    }
  };

  const handleCopySentence = (sent: SavedSentence) => {
    navigator.clipboard.writeText(`${sent.es}\n${sent.zh}`);
    setCopiedId(sent.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportJSON = () => {
    storageService.exportBackupJSON();
  };

  const handleExportAnki = () => {
    if (vocabList.length === 0) {
      alert('生词本中暂无词汇，请先在阅读或查词中添加生词。');
      return;
    }
    storageService.exportAnkiCards();
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const res = await storageService.importBackupJSON(file);
      alert(`导入恢复成功！共同步了 ${res.importedCount} 条记录。`);
      loadData();
    } catch {
      alert('备份文件格式不符合要求，导入失败。');
    }
  };

  const masteredWords = vocabList.filter(w => w.mastered).length;

  const completedLessons = useMemo(() => {
    return ALL_COURSES_POOL.filter(lesson => courseProgress[lesson.id]?.status === 'completed');
  }, [courseProgress]);

  const filteredVocab = useMemo(() => {
    return vocabList.filter(w => {
      if (vocabFilter === 'mastered' && !w.mastered) return false;
      if (vocabFilter === 'learning' && w.mastered) return false;
      if (vocabSearch.trim()) {
        const q = vocabSearch.trim().toLowerCase();
        return (
          w.word.toLowerCase().includes(q) ||
          w.meaningZh.toLowerCase().includes(q) ||
          w.originalWord.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [vocabList, vocabFilter, vocabSearch]);

  const handleToggleWordMastered = (id: string, currentlyMastered: boolean) => {
    storageService.toggleWordMastered(id);
    loadData();
    showToast(currentlyMastered ? '已将该生词重新拎入“学习中”队列' : '已将该词标记为“已掌握”！');
  };

  const handleDeleteWord = (id: string) => {
    if (confirm('确定要从生词本中删除这个单词吗？')) {
      storageService.deleteWord(id);
      loadData();
      showToast('已从生词库中移除');
    }
  };

  const handleResetLessonStatus = (lessonId: string) => {
    storageService.setLessonStatus(lessonId, 'in_progress');
    loadData();
    showToast('已将该课重新拎出来，状态已重置为待学习！');
  };

  const handleReviewLesson = (lessonId: string) => {
    setShowLessonsDrawer(false);
    onNavigateToLesson?.(lessonId);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-28 pt-4">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-xl bg-sand-900/90 px-4 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-sm animate-fadeIn">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hidden file input for import */}
      <input
        type="file"
        ref={importInputRef}
        accept=".json"
        onChange={handleImportFile}
        className="hidden"
      />

      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-sand-900 font-serif">
            我的学习
          </h2>
          <p className="text-xs text-sand-600">
            学习进度概览、课文与单词回顾复习、句子摘抄收藏与数据管理
          </p>
        </div>
      </div>

      {/* Stats Cards - Interactive with Click Down Drill */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Vocab Words - Clickable */}
        <button
          onClick={() => setShowVocabDrawer(true)}
          className="group rounded-2xl bg-white p-3.5 shadow-sm border border-sand-200 text-center transition-all hover:border-batllo-400 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
          title="点击查看已学单词与掌握情况"
        >
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-xl bg-batllo-50 text-batllo-700 group-hover:bg-batllo-100 transition-colors">
            <Bookmark className="h-4 w-4" />
          </div>
          <p className="mt-2 text-2xl font-black font-serif text-sand-900">{vocabList.length}</p>
          <p className="text-[11px] font-semibold text-sand-700">已学单词</p>
          <p className="text-[10px] text-emerald-600 mt-0.5">{masteredWords} 个已掌握</p>
          <span className="mt-1.5 inline-block text-[9px] text-batllo-700 font-medium bg-batllo-50 px-2 py-0.5 rounded-full border border-batllo-200/60">
            点击看清单 ↗
          </span>
        </button>

        {/* Completed Lessons - Clickable */}
        <button
          onClick={() => setShowLessonsDrawer(true)}
          className="group rounded-2xl bg-white p-3.5 shadow-sm border border-sand-200 text-center transition-all hover:border-andalucia-400 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
          title="点击查看所有已读完课文"
        >
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-xl bg-andalucia-50 text-andalucia-800 group-hover:bg-andalucia-100 transition-colors">
            <BookOpen className="h-4 w-4" />
          </div>
          <p className="mt-2 text-2xl font-black font-serif text-sand-900">{completedCount}</p>
          <p className="text-[11px] font-semibold text-sand-700">已学完课文</p>
          <p className="text-[10px] text-sand-600 mt-0.5">精读沉淀</p>
          <span className="mt-1.5 inline-block text-[9px] text-andalucia-800 font-medium bg-andalucia-50 px-2 py-0.5 rounded-full border border-andalucia-200/60">
            点击看课文 ↗
          </span>
        </button>

        {/* Saved Sentences - Clickable Anchor */}
        <a
          href="#saved-sentences-section"
          className="group rounded-2xl bg-white p-3.5 shadow-sm border border-sand-200 text-center transition-all hover:border-amber-400 hover:shadow-md hover:-translate-y-0.5 active:scale-95 flex flex-col justify-between"
          title="点击跳转至句子摘抄本"
        >
          <div>
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-700 group-hover:bg-amber-100 transition-colors">
              <Quote className="h-4 w-4" />
            </div>
            <p className="mt-2 text-2xl font-black font-serif text-sand-900">{savedSentences.length}</p>
            <p className="text-[11px] font-semibold text-sand-700">句子摘抄</p>
            <p className="text-[10px] text-sand-600 mt-0.5">精彩语句</p>
          </div>
          <span className="mt-1.5 inline-block text-[9px] text-amber-800 font-medium bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
            看摘抄本 ↓
          </span>
        </a>
      </div>

      {/* ================= FAVORITE SENTENCES SECTION ================= */}
      <div id="saved-sentences-section" className="mt-6">
        <div className="flex items-center justify-between pb-2 border-b border-sand-200">
          <div className="flex items-center gap-2">
            <Quote className="h-4 w-4 text-andalucia-800" />
            <h3 className="text-sm font-bold text-sand-900">
              句子摘抄本 ({savedSentences.length})
            </h3>
          </div>
          <span className="text-[11px] text-sand-600">在阅读与查词中轻触书签图标即可摘抄</span>
        </div>

        <div className="mt-3 space-y-3">
          {savedSentences.length === 0 ? (
            <div className="rounded-2xl bg-white p-7 text-center border border-sand-200/80">
              <Quote className="mx-auto h-7 w-7 text-sand-600" />
              <p className="mt-2 text-xs font-semibold text-sand-700">暂无摘抄句子</p>
              <p className="mt-1 text-[11px] text-sand-600">
                在精读文章或查词例句中，点击每句话右侧的书签按钮，即可将优美地道的西语句子永久收藏在此处。
              </p>
            </div>
          ) : (
            savedSentences.map((sent) => (
              <div
                key={sent.id}
                className="group rounded-2xl bg-white p-4 shadow-sm border border-sand-200/80 hover:border-batllo-300 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-1">
                    <p className="font-serif text-base text-sand-900 leading-relaxed">
                      {sent.es}
                    </p>
                    <p className="text-xs text-sand-600">
                      {sent.zh}
                    </p>
                    {sent.en && (
                      <p className="text-[11px] text-sand-600 font-sans">
                        {sent.en}
                      </p>
                    )}
                    {sent.sourceLessonTitle && (
                      <p className="pt-1 text-[10px] text-sand-600">
                        来源: {sent.sourceLessonTitle}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0 pt-0.5">
                    <button
                      onClick={() => speechService.speak(sent.es, { rate: speechRate, lang: 'es-ES' })}
                      className="rounded-full p-1.5 text-sand-600 hover:bg-batllo-50 hover:text-batllo-700 transition-colors"
                      title="朗读西语"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleCopySentence(sent)}
                      className="rounded-full p-1.5 text-sand-600 hover:bg-sand-100 hover:text-sand-900 transition-colors"
                      title="复制句子"
                    >
                      {copiedId === sent.id ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => handleDeleteSentence(sent.id)}
                      className="rounded-full p-1.5 text-sand-600 hover:bg-red-50 hover:text-red-500 transition-colors"
                      title="删除摘抄"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ================= DATA PERSISTENCE & BACKUP MANAGEMENT ================= */}
      <div className="mt-8">
        <div className="flex items-center gap-2 pb-2 border-b border-sand-200">
          <ShieldCheck className="h-4 w-4 text-batllo-700" />
          <h3 className="text-sm font-bold text-sand-900">
            数据保存与防丢备份
          </h3>
        </div>

        {/* iOS Persistence Status Box */}
        <div className="mt-3 rounded-2xl bg-white p-4 shadow-sm border border-sand-200/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {isPersisted ? (
                <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
              ) : (
                <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0" />
              )}
              <div>
                <p className="text-xs font-bold text-sand-900">
                  {isPersisted ? '本地持久存储状态：已保障' : '本地持久存储状态：未授权'}
                </p>
                <p className="text-[11px] text-sand-600 mt-0.5">
                  {isPersisted
                    ? '浏览器已授予持久化配额，生词、摘抄与课文进度防自动清理。'
                    : '建议申请持久化权限，或将应用添加到主屏幕防止数据被清理。'}
                </p>
              </div>
            </div>

            {!isPersisted && (
              <button
                onClick={handleRequestPersist}
                className="shrink-0 rounded-xl bg-batllo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-batllo-700 transition-colors"
              >
                申请保障
              </button>
            )}
          </div>

          <div className="mt-3 rounded-xl bg-sand-50 p-2.5 text-[11px] text-sand-600 leading-normal flex items-start gap-1.5">
            <Share2 className="h-4 w-4 text-batllo-600 shrink-0 mt-0.5" />
            <span>
              <b>iOS 用户推荐技巧：</b>在 Safari 浏览器中点击底部的【分享】按钮，选择【添加到主屏幕】。这样不仅可以全屏沉浸使用，还能享有最稳固的数据保留机制。
            </span>
          </div>
        </div>

        {/* Backup and Restore Actions */}
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Export JSON */}
          <button
            onClick={handleExportJSON}
            className="flex items-center justify-center gap-2 rounded-xl bg-white p-3 text-xs font-semibold text-sand-800 shadow-sm border border-sand-200 hover:bg-sand-50 transition-colors"
          >
            <Download className="h-4 w-4 text-batllo-600" />
            <span>导出备份文件 (.json)</span>
          </button>

          {/* Export Anki */}
          <button
            onClick={handleExportAnki}
            className="flex items-center justify-center gap-2 rounded-xl bg-white p-3 text-xs font-semibold text-sand-800 shadow-sm border border-sand-200 hover:bg-sand-50 transition-colors"
          >
            <Download className="h-4 w-4 text-andalucia-800" />
            <span>导出至 Anki 卡片 (.txt)</span>
          </button>

          {/* Import JSON */}
          <button
            onClick={() => importInputRef.current?.click()}
            className="flex items-center justify-center gap-2 rounded-xl bg-white p-3 text-xs font-semibold text-sand-800 shadow-sm border border-sand-200 hover:bg-sand-50 transition-colors"
          >
            <Upload className="h-4 w-4 text-emerald-600" />
            <span>从文件恢复数据</span>
          </button>
        </div>
      </div>

      {/* 1. Vocab Words Detailed Drill-down Drawer / Modal */}
      {showVocabDrawer && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4">
          <div
            className="w-full max-w-xl max-h-[88vh] flex flex-col rounded-t-3xl sm:rounded-2xl bg-white shadow-2xl animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-sand-200 px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-batllo-50 text-batllo-700">
                  <Bookmark className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-sand-900 font-serif">
                    已学单词总库 ({filteredVocab.length})
                  </h3>
                  <p className="text-[11px] text-sand-600">
                    共收录 {vocabList.length} 词 · {masteredWords} 个已掌握
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowVocabDrawer(false)}
                className="rounded-full p-1.5 text-sand-600 hover:bg-sand-100 hover:text-sand-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Filter Tabs & Search */}
            <div className="border-b border-sand-200 px-5 py-3 space-y-2.5 bg-sand-50/50">
              <div className="flex rounded-xl bg-sand-200/60 p-1 text-xs">
                <button
                  onClick={() => setVocabFilter('all')}
                  className={`flex-1 rounded-lg py-1.5 font-semibold transition-all ${
                    vocabFilter === 'all' ? 'bg-white text-batllo-800 shadow-xs' : 'text-sand-600 hover:text-sand-900'
                  }`}
                >
                  全部 ({vocabList.length})
                </button>
                <button
                  onClick={() => setVocabFilter('mastered')}
                  className={`flex-1 rounded-lg py-1.5 font-semibold transition-all ${
                    vocabFilter === 'mastered' ? 'bg-white text-emerald-800 shadow-xs' : 'text-sand-600 hover:text-sand-900'
                  }`}
                >
                  已掌握 ({masteredWords})
                </button>
                <button
                  onClick={() => setVocabFilter('learning')}
                  className={`flex-1 rounded-lg py-1.5 font-semibold transition-all ${
                    vocabFilter === 'learning' ? 'bg-white text-amber-800 shadow-xs' : 'text-sand-600 hover:text-sand-900'
                  }`}
                >
                  学习中 ({vocabList.length - masteredWords})
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-sand-600" />
                <input
                  type="text"
                  placeholder="搜索西语单词或中文词意..."
                  value={vocabSearch}
                  onChange={(e) => setVocabSearch(e.target.value)}
                  className="w-full rounded-xl border border-sand-200 bg-white py-1.5 pl-9 pr-3 text-xs text-sand-900 placeholder-sand-600 focus:border-batllo-500 focus:outline-none focus:ring-1 focus:ring-batllo-500"
                />
              </div>
            </div>

            {/* Word List Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 divide-y divide-sand-100">
              {filteredVocab.length === 0 ? (
                <div className="py-12 text-center text-xs text-sand-600">
                  <Bookmark className="mx-auto h-8 w-8 text-sand-600 mb-2" />
                  <p>没有符合条件的单词</p>
                </div>
              ) : (
                filteredVocab.map((w) => (
                  <div key={w.id} className="pt-2.5 first:pt-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold font-serif text-sand-900">
                            {w.word}
                          </span>
                          {w.originalWord && w.originalWord.toLowerCase() !== w.word.toLowerCase() && (
                            <span className="text-[11px] text-sand-600">
                              (原文: {w.originalWord})
                            </span>
                          )}
                          <span className="rounded bg-sand-100 px-1.5 py-0.5 text-[10px] font-semibold text-sand-600">
                            {w.partOfSpeech}
                          </span>
                          {w.mastered ? (
                            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800">
                              已掌握
                            </span>
                          ) : (
                            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800">
                              学习中
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-sand-800 font-medium">
                          {w.meaningZh}
                        </p>
                        {w.meaningEn && (
                          <p className="text-[11px] text-sand-600 font-sans">
                            {w.meaningEn}
                          </p>
                        )}
                        {w.contextSentence && (
                          <p className="text-[11px] text-sand-600 italic bg-sand-50 rounded-lg p-1.5 border border-sand-100">
                            "{w.contextSentence}"
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 shrink-0 pt-0.5">
                        <button
                          onClick={() => speechService.speak(w.word, { rate: speechRate, lang: 'es-ES' })}
                          className="rounded-lg p-1.5 text-sand-600 hover:bg-sand-100 hover:text-batllo-700"
                          title="听发音"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>

                        {/* Reset / Master Toggle Button - Icon only */}
                        <button
                          onClick={() => handleToggleWordMastered(w.id, w.mastered)}
                          className={`rounded-lg p-1.5 transition-colors ${
                            w.mastered
                              ? 'text-amber-700 hover:bg-amber-50'
                              : 'text-emerald-700 hover:bg-emerald-50'
                          }`}
                          title={w.mastered ? '重新拎出来学（移回学习中）' : '标记为已掌握'}
                        >
                          {w.mastered ? (
                            <RotateCcw className="h-4 w-4" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </button>

                        <button
                          onClick={() => handleDeleteWord(w.id)}
                          className="rounded-lg p-1.5 text-sand-600 hover:bg-sand-100 hover:text-red-600"
                          title="删除此词"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Completed Lessons Detailed Drill-down Drawer / Modal */}
      {showLessonsDrawer && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4">
          <div
            className="w-full max-w-xl max-h-[88vh] flex flex-col rounded-t-3xl sm:rounded-2xl bg-white shadow-2xl animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-sand-200 px-5 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-andalucia-50 text-andalucia-800">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-sand-900 font-serif">
                    已学完课文回顾 ({completedLessons.length})
                  </h3>
                  <p className="text-[11px] text-sand-600">
                    点击可一键直达课文精读复习，或将课文重新拎出来学习
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLessonsDrawer(false)}
                className="rounded-full p-1.5 text-sand-600 hover:bg-sand-100 hover:text-sand-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Completed Lessons List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {completedLessons.length === 0 ? (
                <div className="py-14 text-center text-xs text-sand-600">
                  <BookOpen className="mx-auto h-8 w-8 text-sand-600 mb-2" />
                  <p>暂无已学完的课文</p>
                  <p className="text-[11px] text-sand-600 mt-1">
                    在“精读”页面学完课文或点击“标记学完”后，课文将在此展示。
                  </p>
                </div>
              ) : (
                completedLessons.map((lesson) => {
                  const p = courseProgress[lesson.id];
                  const hasQuizScore = p?.bestQuizScore !== undefined;

                  return (
                    <div
                      key={lesson.id}
                      className="rounded-2xl border border-sand-200/80 bg-white p-4 shadow-sm hover:border-andalucia-300 transition-colors"
                    >
                      <div className="flex items-center gap-2 text-xs">
                        <span className="rounded-md bg-batllo-100 px-2 py-0.5 font-bold text-batllo-800 text-[10px]">
                          {lesson.level}
                        </span>
                        <span className="text-sand-600">·</span>
                        <span className="text-sand-600 text-[11px] font-medium">{lesson.category}</span>
                        <span className="text-sand-600">·</span>
                        <span className="flex items-center gap-1 text-[11px] text-sand-600">
                          <Clock className="h-3 w-3" />
                          {lesson.readingTime}
                        </span>
                        {hasQuizScore && (
                          <>
                            <span className="text-sand-600">·</span>
                            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                              <Award className="h-3 w-3" />
                              测验 {p.bestQuizScore}/{p.totalQuestions || lesson.quiz.length} 分
                            </span>
                          </>
                        )}
                      </div>

                      <h4 className="mt-2 text-base font-bold font-serif text-sand-900">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-sand-600 font-medium">
                        {lesson.titleZh}
                      </p>
                      <p className="mt-1 text-xs text-sand-600 line-clamp-2 leading-relaxed">
                        {lesson.summary}
                      </p>

                      {/* Action buttons */}
                      <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-sand-100 pt-3">
                        <button
                          onClick={() => handleResetLessonStatus(lesson.id)}
                          className="flex items-center gap-1 rounded-xl bg-sand-100 px-3 py-1.5 text-xs font-semibold text-sand-700 hover:bg-amber-50 hover:text-amber-800 transition-colors"
                          title="将课文重置为待学习状态，重新加入主学习池"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                          <span>重新拎出来学</span>
                        </button>

                        <button
                          onClick={() => handleReviewLesson(lesson.id)}
                          className="flex items-center gap-1.5 rounded-xl bg-batllo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-batllo-700 transition-colors"
                        >
                          <span>去复习这篇课文</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
