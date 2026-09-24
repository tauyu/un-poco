import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Volume2, CheckCircle, ChevronRight, ArrowLeft, Eye, EyeOff,
  RefreshCw, Bookmark, BookmarkCheck, Check, Clock, ChevronDown, ChevronUp,
  Mic, MicOff, Play, Pause, Trash2, Sparkles, ChevronLeft
} from 'lucide-react';
import { ALL_COURSES_POOL, type Lesson, type CEFRLevel } from '../data/courses/courseData';
import { InteractiveText } from '../components/InteractiveText';
import { speechService } from '../services/speech/speechService';
import { storageService, type LessonStatus } from '../services/storage/storageService';
import { useAudioRecorder } from '../hooks/useAudioRecorder';

interface ReaderViewProps {
  onWordClick: (word: string, contextSentence?: string) => void;
  speechRate: number;
  initialLessonId?: string | null;
  onClearInitialLesson?: () => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  onWordClick,
  speechRate,
  initialLessonId,
  onClearInitialLesson
}) => {
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'ALL'>('ALL');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [lessonSubTab, setLessonSubTab] = useState<'text' | 'grammar' | 'quiz'>('text');
  const [showTranslations, setShowTranslations] = useState<boolean>(true);
  const [isPlayingArticle, setIsPlayingArticle] = useState<boolean>(false);
  const [activeSentenceId, setActiveSentenceId] = useState<string | null>(null);

  // Blind Reading Mode & per-sentence reveal state
  const [blindMode, setBlindMode] = useState<boolean>(false);
  const [revealedSentenceIds, setRevealedSentenceIds] = useState<Set<string>>(new Set());

  // Continuous Sentence Accompaniment state
  const [isPlayingContinuous, setIsPlayingContinuous] = useState<boolean>(false);
  const [continuousIndex, setContinuousIndex] = useState<number>(0);
  const continuousTimeoutRef = useRef<number | null>(null);
  const isContinuousPlayingRef = useRef<boolean>(false);

  // Native Shadowing / Audio Recorder
  const {
    recordingSentenceId,
    recordingSeconds,
    playingSentenceId,
    recordings,
    startRecording,
    stopRecording,
    deleteRecording,
    playRecording,
    stopPlaying
  } = useAudioRecorder();

  // Lesson statuses from storage
  const [courseProgress, setCourseProgress] = useState(storageService.getCourseProgress());
  const [showCompletedList, setShowCompletedList] = useState(false);
  const [savedSentencesSet, setSavedSentencesSet] = useState<Set<string>>(new Set());
  const [sentenceSaveToast, setSentenceSaveToast] = useState<string | null>(null);

  // Random pool seed for "换一批"
  const [poolSeed, setPoolSeed] = useState(0);

  // Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Load initial lesson if provided
  useEffect(() => {
    if (initialLessonId) {
      const found = ALL_COURSES_POOL.find((c) => c.id === initialLessonId);
      if (found) {
        handleOpenLesson(found);
      }
      onClearInitialLesson?.();
    }
  }, [initialLessonId]);

  // Load progress and saved sentences
  useEffect(() => {
    refreshProgress();
  }, []);

  const refreshProgress = () => {
    setCourseProgress(storageService.getCourseProgress());
    const sentences = storageService.getSavedSentences();
    setSavedSentencesSet(new Set(sentences.map(s => s.es.trim().toLowerCase())));
  };

  // Filter lessons by level
  const levelFilteredCourses = useMemo(() => {
    if (selectedLevel === 'ALL') return ALL_COURSES_POOL;
    return ALL_COURSES_POOL.filter(c => c.level === selectedLevel);
  }, [selectedLevel]);

  // Separate pending (need to learn) vs completed
  const { pendingCourses, completedCourses } = useMemo(() => {
    const pending: Lesson[] = [];
    const completed: Lesson[] = [];

    for (const c of levelFilteredCourses) {
      const status = courseProgress[c.id]?.status;
      if (status === 'completed') {
        completed.push(c);
      } else {
        pending.push(c);
      }
    }
    return { pendingCourses: pending, completedCourses: completed };
  }, [levelFilteredCourses, courseProgress]);

  // Display a rotating batch of 8 uncompleted lessons for focus
  const currentBatch = useMemo(() => {
    if (pendingCourses.length <= 8) return pendingCourses;
    const startIndex = (poolSeed * 8) % pendingCourses.length;
    const batch = [];
    for (let i = 0; i < 8; i++) {
      batch.push(pendingCourses[(startIndex + i) % pendingCourses.length]);
    }
    return batch;
  }, [pendingCourses, poolSeed]);

  const handleRefreshBatch = () => {
    setPoolSeed(prev => prev + 1);
  };

  // All sentences in the active lesson flattened in order
  const flattenedSentences = useMemo(() => {
    if (!activeLesson) return [];
    return activeLesson.paragraphs.flatMap((p) => p);
  }, [activeLesson]);

  const handleStopContinuousPlay = () => {
    if (continuousTimeoutRef.current) {
      window.clearTimeout(continuousTimeoutRef.current);
      continuousTimeoutRef.current = null;
    }
    isContinuousPlayingRef.current = false;
    setIsPlayingContinuous(false);
    speechService.stop();
    setActiveSentenceId(null);
  };

  const playContinuousStep = (idx: number) => {
    if (!isContinuousPlayingRef.current || !activeLesson) return;
    if (idx >= flattenedSentences.length) {
      handleStopContinuousPlay();
      return;
    }

    const targetSentence = flattenedSentences[idx];
    setContinuousIndex(idx);
    setActiveSentenceId(targetSentence.id);

    // Auto scroll into view
    const el = document.getElementById(`sentence-${targetSentence.id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    speechService.speak(targetSentence.es, {
      rate: speechRate,
      lang: 'es-ES',
      onEnd: () => {
        if (!isContinuousPlayingRef.current) return;
        continuousTimeoutRef.current = window.setTimeout(() => {
          playContinuousStep(idx + 1);
        }, 500);
      },
      onError: () => {
        if (!isContinuousPlayingRef.current) return;
        continuousTimeoutRef.current = window.setTimeout(() => {
          playContinuousStep(idx + 1);
        }, 500);
      }
    });
  };

  const handleStartContinuousPlay = (startIndex = 0) => {
    speechService.stop();
    stopPlaying();
    if (isPlayingContinuous) {
      handleStopContinuousPlay();
      return;
    }

    isContinuousPlayingRef.current = true;
    setIsPlayingContinuous(true);
    playContinuousStep(startIndex);
  };

  const handleToggleRevealSentence = (sentenceId: string) => {
    setRevealedSentenceIds((prev) => {
      const next = new Set(prev);
      if (next.has(sentenceId)) {
        next.delete(sentenceId);
      } else {
        next.add(sentenceId);
      }
      return next;
    });
  };

  const handleOpenLesson = (lesson: Lesson) => {
    handleStopContinuousPlay();
    stopPlaying();
    setActiveLesson(lesson);
    setLessonSubTab('text');
    setUserAnswers({});
    setQuizSubmitted(false);
    speechService.stop();
    setIsPlayingArticle(false);
    setActiveSentenceId(null);
    setRevealedSentenceIds(new Set());

    // If not started, mark as in_progress
    if (!courseProgress[lesson.id] || courseProgress[lesson.id].status === 'not_started') {
      storageService.setLessonStatus(lesson.id, 'in_progress');
      refreshProgress();
    }
  };

  const handleToggleLessonStatus = (lessonId: string, currentStatus?: LessonStatus) => {
    const nextStatus: LessonStatus = currentStatus === 'completed' ? 'in_progress' : 'completed';
    storageService.setLessonStatus(lessonId, nextStatus);
    refreshProgress();
  };

  const handleBackToList = () => {
    handleStopContinuousPlay();
    stopPlaying();
    speechService.stop();
    setIsPlayingArticle(false);
    setActiveLesson(null);
    refreshProgress();
  };

  const handlePlaySentence = (sentence: { id: string; es: string }) => {
    handleStopContinuousPlay();
    stopPlaying();
    setActiveSentenceId(sentence.id);
    speechService.speak(sentence.es, {
      rate: speechRate,
      lang: 'es-ES',
      onEnd: () => setActiveSentenceId(null),
      onError: () => setActiveSentenceId(null)
    });
  };

  const handleToggleSaveSentence = (sentence: { es: string; zh: string; en?: string }) => {
    const cleanEs = sentence.es.trim().toLowerCase();
    if (savedSentencesSet.has(cleanEs)) {
      const allSentences = storageService.getSavedSentences();
      const existing = allSentences.find(s => s.es.trim().toLowerCase() === cleanEs);
      if (existing) {
        storageService.removeSentence(existing.id);
        refreshProgress();
        setSentenceSaveToast('已取消摘抄该句');
        setTimeout(() => setSentenceSaveToast(null), 2000);
      }
    } else {
      storageService.saveSentence({
        es: sentence.es,
        zh: sentence.zh,
        en: sentence.en,
        sourceLessonTitle: activeLesson?.title || '精读课文'
      });
      refreshProgress();
      setSentenceSaveToast('句子已保存至“我的”摘抄收藏');
      setTimeout(() => setSentenceSaveToast(null), 2000);
    }
  };

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    if (!activeLesson) return;
    let score = 0;
    activeLesson.quiz.forEach((q) => {
      if (userAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    setQuizSubmitted(true);
    storageService.recordQuizScore(activeLesson.id, score, activeLesson.quiz.length);
    refreshProgress();
  };

  // =========================================================================
  // VIEW 1: LESSON DETAIL VIEW
  // =========================================================================
  if (activeLesson) {
    const lessonStatus = courseProgress[activeLesson.id]?.status || 'in_progress';

    return (
      <div className="mx-auto max-w-2xl px-4 pb-28 pt-4">
        {/* Navigation & Status Header */}
        <div className="flex items-center justify-between pb-3">
          <button
            onClick={handleBackToList}
            className="flex items-center gap-1.5 rounded-xl bg-white px-3 py-1.5 text-xs font-medium text-sand-700 shadow-sm border border-sand-200 hover:bg-sand-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>返回课文列表</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggleLessonStatus(activeLesson.id, lessonStatus)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors shadow-sm ${
                lessonStatus === 'completed'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-sand-700 border border-sand-200 hover:bg-emerald-50 hover:text-emerald-700'
              }`}
            >
              <Check className="h-4 w-4" />
              <span>{lessonStatus === 'completed' ? '已学完' : '标记学完'}</span>
            </button>
          </div>
        </div>

        {/* Lesson Header Card */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-sand-200/80">
          <div className="flex items-center gap-2 text-xs font-medium text-sand-600">
            <span className="rounded-md bg-batllo-100 px-2 py-0.5 font-bold text-batllo-800">
              {activeLesson.level}
            </span>
            <span>·</span>
            <span>{activeLesson.category}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {activeLesson.readingTime}
            </span>
          </div>

          <h1 className="mt-2 text-2xl font-bold font-serif tracking-tight text-sand-900">
            {activeLesson.title}
          </h1>
          <h2 className="mt-0.5 text-sm font-medium text-sand-600">
            {activeLesson.titleZh}
          </h2>
          <p className="mt-2 text-xs text-sand-600 leading-relaxed">
            {activeLesson.summary}
          </p>

          {/* Sub Navigation: Text / Grammar / Quiz */}
          <div className="mt-4 flex rounded-xl bg-sand-100 p-1">
            <button
              onClick={() => setLessonSubTab('text')}
              className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                lessonSubTab === 'text'
                  ? 'bg-white text-batllo-800 shadow-sm'
                  : 'text-sand-600 hover:text-sand-900'
              }`}
            >
              课文点读
            </button>
            <button
              onClick={() => setLessonSubTab('grammar')}
              className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                lessonSubTab === 'grammar'
                  ? 'bg-white text-batllo-800 shadow-sm'
                  : 'text-sand-600 hover:text-sand-900'
              }`}
            >
              重点语法 ({activeLesson.grammarPoints.length})
            </button>
            <button
              onClick={() => setLessonSubTab('quiz')}
              className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-all ${
                lessonSubTab === 'quiz'
                  ? 'bg-white text-batllo-800 shadow-sm'
                  : 'text-sand-600 hover:text-sand-900'
              }`}
            >
              课后测验 ({activeLesson.quiz.length})
            </button>
          </div>
        </div>

        {/* Sentence Saved Toast */}
        {sentenceSaveToast && (
          <div className="mt-3 flex items-center justify-between rounded-xl bg-emerald-50 px-3.5 py-2 text-xs font-medium text-emerald-800 border border-emerald-200">
            <span>{sentenceSaveToast}</span>
          </div>
        )}

        {/* 1. TEXT READING TAB */}
        {lessonSubTab === 'text' && (
          <div className="mt-4 space-y-4">
            {/* Control Bar: Continuous accompaniment & Blind Mode */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white p-2.5 shadow-sm border border-sand-200">
              <button
                onClick={() => (isPlayingContinuous ? handleStopContinuousPlay() : handleStartContinuousPlay(0))}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  isPlayingContinuous
                    ? 'bg-batllo-600 text-white shadow-sm ring-2 ring-batllo-300'
                    : 'bg-batllo-50 text-batllo-700 hover:bg-batllo-100'
                }`}
              >
                {isPlayingContinuous ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
                <span>
                  {isPlayingContinuous
                    ? `正在伴读 (${continuousIndex + 1}/${flattenedSentences.length})`
                    : '全文逐句伴读'}
                </span>
              </button>

              <div className="flex items-center gap-2">
                {/* Blind Mode Toggle */}
                <button
                  onClick={() => {
                    setBlindMode(!blindMode);
                    if (!blindMode) {
                      setRevealedSentenceIds(new Set());
                    }
                  }}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    blindMode
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-sand-100 text-sand-700 hover:bg-sand-200'
                  }`}
                  title="开启沉浸盲读，隐藏所有中文译文，支持单句轻触渐显"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{blindMode ? '沉浸盲读中' : '沉浸盲读'}</span>
                </button>

                {/* Show/Hide all translation toggle when not in blind mode */}
                {!blindMode && (
                  <button
                    onClick={() => setShowTranslations(!showTranslations)}
                    className="flex items-center gap-1 rounded-lg bg-sand-100 px-2.5 py-1.5 text-xs font-medium text-sand-700 hover:bg-sand-200"
                    title={showTranslations ? '隐藏双语翻译' : '显示双语翻译'}
                  >
                    {showTranslations ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    <span>{showTranslations ? '隐藏翻译' : '显示翻译'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Blind Mode Info Banner */}
            {blindMode && (
              <div className="flex items-center justify-between rounded-xl bg-amber-50/80 px-3.5 py-2 text-xs text-amber-900 border border-amber-200/70">
                <span>💡 盲读模式已开启：尝试直接用西语理解，遇到读不懂的句子点击下方的“查看释义”。</span>
              </div>
            )}

            {/* Paragraphs */}
            <div className="space-y-4">
              {activeLesson.paragraphs.map((paragraph, pIdx) => (
                <div
                  key={pIdx}
                  className="rounded-2xl bg-white p-5 shadow-sm border border-sand-200/70 space-y-4"
                >
                  {paragraph.map((sentence) => {
                    const isPlaying = activeSentenceId === sentence.id;
                    const isSentenceSaved = savedSentencesSet.has(sentence.es.trim().toLowerCase());
                    const isRevealed = revealedSentenceIds.has(sentence.id);
                    const hasRecording = Boolean(recordings[sentence.id]);
                    const isRecordingThis = recordingSentenceId === sentence.id;
                    const isPlayingThisRec = playingSentenceId === sentence.id;

                    return (
                      <div
                        key={sentence.id}
                        id={`sentence-${sentence.id}`}
                        className={`rounded-xl p-3 transition-all duration-200 ${
                          isPlaying
                            ? 'bg-batllo-50/90 ring-2 ring-batllo-500 shadow-sm'
                            : 'hover:bg-sand-50/60'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          {/* Spanish text with interactive clickable words */}
                          <div className="text-base font-serif leading-relaxed text-sand-900">
                            <InteractiveText
                              text={sentence.es}
                              contextSentence={sentence.es}
                              onWordClick={onWordClick}
                            />
                          </div>

                          {/* Action Buttons: Audio & Shadowing Mic & Bookmark Quote */}
                          <div className="flex items-center gap-1 shrink-0 pt-0.5">
                            {/* Pronunciation button */}
                            <button
                              onClick={() => handlePlaySentence(sentence)}
                              className={`rounded-full p-1.5 transition-colors ${
                                isPlaying && !isPlayingContinuous ? 'bg-batllo-600 text-white' : 'text-sand-600 hover:bg-sand-100'
                              }`}
                              title="单句原声发音"
                            >
                              <Volume2 className="h-4 w-4" />
                            </button>

                            {/* Native Recording / Shadowing Button */}
                            {isRecordingThis ? (
                              <button
                                onClick={stopRecording}
                                className="flex items-center gap-1 rounded-full bg-red-600 px-2 py-1 text-[11px] font-semibold text-white animate-pulse"
                                title="点击停止录音"
                              >
                                <MicOff className="h-3.5 w-3.5" />
                                <span>00:0{recordingSeconds}</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => startRecording(sentence.id)}
                                className={`rounded-full p-1.5 transition-colors ${
                                  hasRecording ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100' : 'text-sand-600 hover:bg-sand-100'
                                }`}
                                title={hasRecording ? '重新录制个人发音' : '录制跟读发音对比'}
                              >
                                <Mic className="h-4 w-4" />
                              </button>
                            )}

                            {/* Bookmark button */}
                            <button
                              onClick={() => handleToggleSaveSentence(sentence)}
                              className={`rounded-full p-1.5 transition-colors ${
                                isSentenceSaved
                                  ? 'bg-andalucia-100 text-andalucia-600'
                                  : 'text-sand-600 hover:bg-sand-100'
                              }`}
                              title={isSentenceSaved ? '已摘抄到我的收藏' : '摘抄此句到我的收藏'}
                            >
                              {isSentenceSaved ? <BookmarkCheck className="h-4 w-4 fill-current" /> : <Bookmark className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Shadowing Comparison Bar (if user recorded) */}
                        {hasRecording && (
                          <div className="mt-2.5 flex items-center justify-between rounded-xl bg-sand-100/90 px-3 py-1.5 text-xs border border-sand-200">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-sand-700 text-[11px]">跟读对比:</span>
                              <button
                                onClick={() => handlePlaySentence(sentence)}
                                className="flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-[11px] font-medium text-batllo-700 shadow-2xs hover:bg-batllo-50 border border-sand-200"
                              >
                                <Volume2 className="h-3 w-3" /> 原声
                              </button>
                              <button
                                onClick={() => (isPlayingThisRec ? stopPlaying() : playRecording(sentence.id))}
                                className={`flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors ${
                                  isPlayingThisRec
                                    ? 'bg-emerald-600 text-white animate-pulse'
                                    : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                }`}
                              >
                                {isPlayingThisRec ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 fill-current" />}
                                <span>{isPlayingThisRec ? '停止播放' : `我的录音 (${recordings[sentence.id].duration}s)`}</span>
                              </button>
                            </div>
                            <button
                              onClick={() => deleteRecording(sentence.id)}
                              className="text-sand-600 hover:text-red-600 p-1 rounded"
                              title="删除此录音"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        )}

                        {/* Translation: Blind Mode Peeking vs Normal Mode */}
                        {blindMode ? (
                          <div className="mt-2">
                            <button
                              onClick={() => handleToggleRevealSentence(sentence.id)}
                              className="flex items-center gap-1 text-[11px] font-medium text-batllo-700 hover:text-batllo-800 transition-colors"
                            >
                              {isRevealed ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                              <span>{isRevealed ? '收起中文释义' : '点击查看本句中文'}</span>
                            </button>
                            {isRevealed && (
                              <div className="mt-1.5 rounded-lg bg-sand-50 p-2.5 text-xs text-sand-700 leading-normal border border-sand-200">
                                <p>{sentence.zh}</p>
                                {sentence.en && <p className="mt-0.5 text-sand-600 font-sans">{sentence.en}</p>}
                              </div>
                            )}
                          </div>
                        ) : (
                          showTranslations && (
                            <div className="mt-2 border-t border-sand-100 pt-2 text-xs text-sand-600 leading-normal">
                              <p>{sentence.zh}</p>
                              {sentence.en && <p className="mt-0.5 text-sand-600 font-sans">{sentence.en}</p>}
                            </div>
                          )
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Floating Continuous Player Bar */}
            {isPlayingContinuous && (
              <div className="fixed bottom-20 left-0 right-0 z-40 mx-auto max-w-lg px-4">
                <div className="flex items-center justify-between rounded-2xl bg-batllo-900/95 px-4 py-3 text-white shadow-xl backdrop-blur-md border border-batllo-700/50">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-semibold">
                      逐句伴读中 · {continuousIndex + 1} / {flattenedSentences.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (continuousIndex > 0) {
                          speechService.stop();
                          playContinuousStep(continuousIndex - 1);
                        }
                      }}
                      disabled={continuousIndex === 0}
                      className="rounded-lg bg-batllo-800 p-1.5 text-batllo-200 hover:bg-batllo-700 disabled:opacity-40"
                      title="上一句"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleStopContinuousPlay}
                      className="rounded-lg bg-batllo-700 px-3 py-1 text-xs font-bold hover:bg-batllo-600"
                    >
                      停止
                    </button>
                    <button
                      onClick={() => {
                        if (continuousIndex < flattenedSentences.length - 1) {
                          speechService.stop();
                          playContinuousStep(continuousIndex + 1);
                        }
                      }}
                      disabled={continuousIndex >= flattenedSentences.length - 1}
                      className="rounded-lg bg-batllo-800 p-1.5 text-batllo-200 hover:bg-batllo-700 disabled:opacity-40"
                      title="下一句"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. GRAMMAR POINTS TAB */}
        {lessonSubTab === 'grammar' && (
          <div className="mt-4 space-y-3">
            {activeLesson.grammarPoints.map((gp, gIdx) => (
              <div
                key={gp.id}
                className="rounded-2xl bg-white p-5 shadow-sm border border-sand-200/80"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-batllo-100 text-xs font-bold text-batllo-800">
                    {gIdx + 1}
                  </span>
                  <h3 className="font-bold text-sand-900 text-base">{gp.title}</h3>
                </div>

                <p className="mt-2.5 text-xs leading-relaxed text-sand-700">
                  {gp.explanation}
                </p>

                {gp.examples && gp.examples.length > 0 && (
                  <div className="mt-3.5 space-y-2 rounded-xl bg-sand-50/80 p-3 text-xs">
                    <span className="font-semibold text-batllo-700">实用例句:</span>
                    {gp.examples.map((ex, eIdx) => (
                      <div key={eIdx} className="space-y-0.5">
                        <p className="font-serif font-medium text-sand-900">{ex.es}</p>
                        <p className="text-sand-600">{ex.zh}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 3. QUIZ TAB */}
        {lessonSubTab === 'quiz' && (
          <div className="mt-4 space-y-4">
            {activeLesson.quiz.map((q, qIdx) => {
              const selectedOpt = userAnswers[q.id];

              return (
                <div
                  key={q.id}
                  className="rounded-2xl bg-white p-5 shadow-sm border border-sand-200/70"
                >
                  <p className="font-semibold text-sand-900 text-sm">
                    {qIdx + 1}. {q.question}
                  </p>

                  <div className="mt-3 space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      const isCorrect = q.correctIndex === optIdx;

                      let style = 'border-sand-200 bg-sand-50/50 hover:bg-sand-100 text-sand-800';
                      if (quizSubmitted) {
                        if (isCorrect) {
                          style = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                        } else if (isSelected && !isCorrect) {
                          style = 'border-red-400 bg-red-50 text-red-900';
                        }
                      } else if (isSelected) {
                        style = 'border-batllo-600 bg-batllo-50 text-batllo-900 font-medium';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`flex w-full items-center justify-between rounded-xl border p-3 text-left text-xs transition-all ${style}`}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && isCorrect && (
                            <CheckCircle className="h-4 w-4 text-emerald-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="mt-3.5 rounded-xl bg-sand-50 p-3 text-xs text-sand-700 border border-sand-200/60 leading-relaxed">
                      <span className="font-semibold text-batllo-700">解析: </span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}

            {!quizSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(userAnswers).length < activeLesson.quiz.length}
                className="w-full rounded-xl bg-batllo-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-batllo-700 disabled:opacity-50 transition-colors"
              >
                提交测验并记录成绩
              </button>
            ) : (
              <div className="rounded-2xl bg-emerald-50 p-4 text-center border border-emerald-200">
                <p className="text-sm font-bold text-emerald-900">
                  测验已完成！成绩已同步至学习记录。
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: COURSE LIST VIEW (FOCUS ON PENDING TO-LEARN)
  // =========================================================================
  return (
    <div className="mx-auto max-w-2xl px-4 pb-28 pt-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-sand-900 font-serif">
            精读阅读
          </h2>
          <p className="text-xs text-sand-600">
            精选 {ALL_COURSES_POOL.length} 篇分级课文，聚焦待学与在学内容
          </p>
        </div>

        {/* Refresh / Discover Batch Button */}
        {pendingCourses.length > 8 && (
          <button
            onClick={handleRefreshBatch}
            className="flex items-center gap-1.5 rounded-xl bg-batllo-50 px-3 py-1.5 text-xs font-semibold text-batllo-700 hover:bg-batllo-100 transition-colors"
            title="换一批推荐文章"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>换一批</span>
          </button>
        )}
      </div>

      {/* Level Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 pt-1 scrollbar-none">
        {(['ALL', 'A1', 'A2', 'B1', 'B2'] as const).map((lvl) => (
          <button
            key={lvl}
            onClick={() => setSelectedLevel(lvl)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all shrink-0 ${
              selectedLevel === lvl
                ? 'bg-batllo-600 text-white shadow-sm'
                : 'bg-white text-sand-700 border border-sand-200/80 hover:bg-sand-50'
            }`}
          >
            {lvl === 'ALL' ? '全部级别' : lvl}
          </button>
        ))}
      </div>

      {/* Main Focus: Pending / In Progress Lessons */}
      <div className="mt-2 space-y-3">
        {currentBatch.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center border border-sand-200">
            <CheckCircle className="mx-auto h-10 w-10 text-emerald-500" />
            <p className="mt-2 text-sm font-bold text-sand-900">该级别所有推荐课文均已学完！</p>
            <p className="mt-1 text-xs text-sand-600">可切换其他级别，或在下方“已学完课文”中进行温习。</p>
          </div>
        ) : (
          currentBatch.map((lesson) => {
            const status = courseProgress[lesson.id]?.status || 'not_started';

            return (
              <div
                key={lesson.id}
                onClick={() => handleOpenLesson(lesson)}
                className="group relative cursor-pointer rounded-2xl bg-white p-4 shadow-sm border border-sand-200/80 hover:border-batllo-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-batllo-100 px-2 py-0.5 text-xs font-bold text-batllo-800">
                        {lesson.level}
                      </span>
                      <span className="text-xs text-sand-600">{lesson.category}</span>
                      {status === 'in_progress' && (
                        <span className="rounded-md bg-andalucia-100 px-2 py-0.5 text-xs font-medium text-andalucia-800">
                          正在学
                        </span>
                      )}
                    </div>

                    <h3 className="mt-1.5 text-base font-bold font-serif text-sand-900 group-hover:text-batllo-800 transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-sand-600">{lesson.titleZh}</p>
                    <p className="mt-1.5 text-xs text-sand-600 line-clamp-2 leading-relaxed">
                      {lesson.summary}
                    </p>
                  </div>

                  <ChevronRight className="h-5 w-5 text-sand-600 group-hover:text-batllo-600 shrink-0 mt-3" />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Collapsed Section for Completed Lessons */}
      {completedCourses.length > 0 && (
        <div className="mt-6 border-t border-sand-200 pt-4">
          <button
            onClick={() => setShowCompletedList(!showCompletedList)}
            className="flex w-full items-center justify-between rounded-xl bg-sand-100/80 px-4 py-2.5 text-xs font-medium text-sand-700 hover:bg-sand-200 transition-colors"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>已学完的课文 ({completedCourses.length} 篇)</span>
            </div>
            {showCompletedList ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showCompletedList && (
            <div className="mt-3 space-y-2">
              {completedCourses.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => handleOpenLesson(lesson)}
                  className="flex cursor-pointer items-center justify-between rounded-xl bg-white/80 p-3 text-xs border border-sand-200 hover:bg-sand-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-sand-100 px-1.5 py-0.5 font-bold text-sand-600">
                      {lesson.level}
                    </span>
                    <span className="font-semibold text-sand-800">{lesson.title}</span>
                    <span className="text-sand-600 hidden sm:inline">({lesson.titleZh})</span>
                  </div>
                  <span className="text-xs text-emerald-600 font-medium">温习</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
