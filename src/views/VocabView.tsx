import React, { useState, useEffect, useMemo } from 'react';
import { Bookmark, Volume2, CheckCircle2, Circle, Trash2, Shuffle, RotateCw, Layers, List } from 'lucide-react';
import { storageService, type SavedWord } from '../services/storage/storageService';
import { speechService } from '../services/speech/speechService';
import { lookupWord } from '../services/dictionary/lookupService';

interface VocabViewProps {
  onWordClick: (word: string, contextSentence?: string) => void;
  speechRate: number;
}

// Fisher-Yates array shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const VocabView: React.FC<VocabViewProps> = ({ onWordClick, speechRate }) => {
  const [vocabList, setVocabList] = useState<SavedWord[]>([]);
  const [filter, setFilter] = useState<'all' | 'learning' | 'mastered'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'flashcard'>('list');
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [shuffledCards, setShuffledCards] = useState<SavedWord[]>([]);

  const refreshVocab = () => {
    const items = storageService.getVocabulary();
    setVocabList(items);
  };

  useEffect(() => {
    refreshVocab();
  }, []);

  const filteredItems = useMemo(() => {
    return vocabList.filter((item) => {
      if (filter === 'learning') return !item.mastered;
      if (filter === 'mastered') return item.mastered;
      return true;
    });
  }, [vocabList, filter]);

  // When switching to flashcard mode or filter changes, automatically shuffle cards!
  useEffect(() => {
    if (viewMode === 'flashcard') {
      setShuffledCards(shuffleArray(filteredItems));
      setFlashcardIndex(0);
      setIsFlipped(false);
    }
  }, [viewMode, filter, vocabList]);

  const handleShuffleCards = () => {
    setShuffledCards(shuffleArray(filteredItems));
    setFlashcardIndex(0);
    setIsFlipped(false);
  };

  const handleToggleMastery = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    storageService.toggleWordMastery(id);
    refreshVocab();
  };

  const handleDelete = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (confirm('确定要将该生词移出生词本吗？')) {
      storageService.removeWord(id);
      refreshVocab();
    }
  };

  const masteredCount = vocabList.filter((i) => i.mastered).length;
  const learningCount = vocabList.length - masteredCount;

  // Flashcard items
  const currentCard = shuffledCards[flashcardIndex];

  const handleNextCard = () => {
    setIsFlipped(false);
    if (flashcardIndex < shuffledCards.length - 1) {
      setFlashcardIndex(flashcardIndex + 1);
    } else {
      setFlashcardIndex(0);
    }
  };

  /**
   * Helper to resolve word meaning: if meaning is empty or placeholder, try dynamic lookup
   */
  const getDisplayMeaning = (wordItem: SavedWord) => {
    if (wordItem.meaningZh && !wordItem.meaningZh.includes('暂未收录') && !wordItem.meaningZh.includes('暂无')) {
      return wordItem.meaningZh;
    }
    const res = lookupWord(wordItem.word);
    if (res.entry?.meaningZh) {
      return res.entry.meaningZh;
    }
    return wordItem.meaningZh || '暂无释义';
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-28 pt-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-sand-900 font-serif">
            我的生词本
          </h2>
          <p className="text-xs text-sand-600">
            巩固生词记忆，支持打乱抽认卡与复习
          </p>
        </div>

        {viewMode === 'flashcard' && shuffledCards.length > 1 && (
          <button
            onClick={handleShuffleCards}
            className="flex items-center gap-1.5 rounded-xl bg-batllo-50 px-3 py-1.5 text-xs font-semibold text-batllo-700 hover:bg-batllo-100 transition-colors"
            title="重新打乱顺序"
          >
            <Shuffle className="h-3.5 w-3.5" />
            <span>打乱顺序</span>
          </button>
        )}
      </div>

      {/* Stats Counter Bar */}
      <div className="mt-2 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-white p-3 shadow-sm border border-sand-200">
          <span className="text-xl font-bold font-serif text-sand-900">{vocabList.length}</span>
          <span className="block text-[11px] text-sand-600">总收藏</span>
        </div>
        <div className="rounded-xl bg-white p-3 shadow-sm border border-sand-200">
          <span className="text-xl font-bold font-serif text-andalucia-800">{learningCount}</span>
          <span className="block text-[11px] text-sand-600">待复习</span>
        </div>
        <div className="rounded-xl bg-white p-3 shadow-sm border border-sand-200">
          <span className="text-xl font-bold font-serif text-emerald-600">{masteredCount}</span>
          <span className="block text-[11px] text-sand-600">已掌握</span>
        </div>
      </div>

      {/* Mode & Filter Bar */}
      <div className="mt-4 flex items-center justify-between">
        {/* Filter buttons */}
        <div className="flex gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setFilter('all')}
            className={`rounded-xl px-3 py-1.5 transition-all ${
              filter === 'all'
                ? 'bg-batllo-700 text-white shadow-sm'
                : 'bg-white text-sand-600 hover:bg-sand-50 border border-sand-200'
            }`}
          >
            全部 ({vocabList.length})
          </button>
          <button
            onClick={() => setFilter('learning')}
            className={`rounded-xl px-3 py-1.5 transition-all ${
              filter === 'learning'
                ? 'bg-andalucia-600 text-white shadow-sm'
                : 'bg-white text-sand-600 hover:bg-sand-50 border border-sand-200'
            }`}
          >
            待复习 ({learningCount})
          </button>
          <button
            onClick={() => setFilter('mastered')}
            className={`rounded-xl px-3 py-1.5 transition-all ${
              filter === 'mastered'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-sand-600 hover:bg-sand-50 border border-sand-200'
            }`}
          >
            已掌握 ({masteredCount})
          </button>
        </div>

        {/* View Mode Switch (List vs Flashcard) */}
        <div className="flex rounded-xl bg-sand-200/80 p-0.5 text-xs">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 transition-all ${
              viewMode === 'list' ? 'bg-white text-sand-900 shadow-sm font-semibold' : 'text-sand-600'
            }`}
            title="列表模式"
          >
            <List className="h-3.5 w-3.5" />
            <span>列表</span>
          </button>
          <button
            onClick={() => {
              setViewMode('flashcard');
            }}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 transition-all ${
              viewMode === 'flashcard' ? 'bg-white text-sand-900 shadow-sm font-semibold' : 'text-sand-600'
            }`}
            title="卡片抽认模式（自动乱序）"
          >
            <Layers className="h-3.5 w-3.5" />
            <span>乱序抽认</span>
          </button>
        </div>
      </div>

      {/* ================= FLASHCARD MODE ================= */}
      {viewMode === 'flashcard' && (
        <div className="mt-4">
          {!currentCard ? (
            <div className="rounded-2xl bg-white p-8 text-center border border-sand-200">
              <p className="text-sm text-sand-600">当前没有可供抽认复习的生词。</p>
            </div>
          ) : (
            <div>
              {/* Card Index & Shuffle status */}
              <div className="mb-2 flex items-center justify-between text-xs text-sand-600">
                <span className="flex items-center gap-1">
                  <Shuffle className="h-3 w-3 text-batllo-600" />
                  已随机乱序
                </span>
                <span>
                  {flashcardIndex + 1} / {shuffledCards.length}
                </span>
              </div>

              {/* The Flip Card */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="relative min-h-[260px] cursor-pointer rounded-3xl bg-white p-6 shadow-md border-2 border-batllo-200 hover:border-batllo-400 transition-all active:scale-[0.99] flex flex-col justify-between"
              >
                {!isFlipped ? (
                  /* Front of Card */
                  <div className="flex flex-col items-center justify-center flex-1 text-center py-6">
                    <span className="rounded-full bg-batllo-100 px-2.5 py-0.5 text-xs font-semibold text-batllo-700">
                      {currentCard.partOfSpeech}
                    </span>
                    <h3 className="mt-4 text-3xl font-bold font-serif text-sand-900">
                      {currentCard.word}
                    </h3>
                    {currentCard.originalWord && currentCard.originalWord !== currentCard.word && (
                      <p className="mt-1 text-xs text-sand-600">
                        文中词形: {currentCard.originalWord}
                      </p>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speechService.speak(currentCard.word, { rate: speechRate });
                      }}
                      className="mt-4 rounded-full bg-batllo-50 p-2 text-batllo-600 hover:bg-batllo-100"
                    >
                      <Volume2 className="h-5 w-5" />
                    </button>

                    <p className="mt-6 text-xs text-sand-600 flex items-center gap-1">
                      <RotateCw className="h-3.5 w-3.5" /> 点击翻转查看释义
                    </p>
                  </div>
                ) : (
                  /* Back of Card */
                  <div className="flex flex-col justify-between flex-1 py-2">
                    <div>
                      <div className="flex items-center justify-between border-b border-sand-100 pb-2">
                        <span className="text-base font-bold font-serif text-sand-900">
                          {currentCard.word}
                        </span>
                        <span className="text-xs text-batllo-700 font-semibold">
                          {currentCard.partOfSpeech}
                        </span>
                      </div>

                      <div className="mt-3">
                        <p className="text-lg font-bold text-sand-900">
                          {getDisplayMeaning(currentCard)}
                        </p>
                        {currentCard.meaningEn && (
                          <p className="mt-0.5 text-xs text-sand-600">
                            {currentCard.meaningEn}
                          </p>
                        )}
                      </div>

                      {currentCard.conjugationNotes && (
                        <div className="mt-3 rounded-lg bg-andalucia-50 p-2 text-xs text-andalucia-900">
                          <b>变位:</b> {currentCard.conjugationNotes}
                        </div>
                      )}

                      {currentCard.contextSentence && (
                        <div className="mt-3 rounded-lg bg-sand-50 p-2 text-xs italic text-sand-700">
                          "{currentCard.contextSentence}"
                        </div>
                      )}
                    </div>

                    <p className="mt-4 text-center text-xs text-sand-600">
                      点击翻回正面
                    </p>
                  </div>
                )}
              </div>

              {/* Action buttons below card */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    if (currentCard.mastered) {
                      storageService.toggleWordMastery(currentCard.id);
                      refreshVocab();
                    }
                    handleNextCard();
                  }}
                  className="rounded-xl bg-andalucia-100 py-3 text-xs font-bold text-andalucia-800 hover:bg-andalucia-200 transition-colors"
                >
                  还需复习 (下一张)
                </button>
                <button
                  onClick={() => {
                    if (!currentCard.mastered) {
                      storageService.toggleWordMastery(currentCard.id);
                      refreshVocab();
                    }
                    handleNextCard();
                  }}
                  className="rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm"
                >
                  已掌握 (标记并下一个)
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= LIST MODE ================= */}
      {viewMode === 'list' && (
        <div className="mt-4 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-center border border-sand-200/80">
              <Bookmark className="mx-auto h-8 w-8 text-sand-600" />
              <p className="mt-2 text-sm font-semibold text-sand-800">生词本目前为空</p>
              <p className="mt-1 text-xs text-sand-600">
                在精读课文或查词时，点击书签图标即可随时加入生词本。
              </p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onWordClick(item.word, item.contextSentence)}
                className="group cursor-pointer rounded-2xl bg-white p-4 shadow-sm border border-sand-200/80 hover:border-batllo-400 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold font-serif text-sand-900 group-hover:text-batllo-800">
                        {item.word}
                      </h4>
                      {item.partOfSpeech && (
                        <span className="rounded-full bg-sand-100 px-2 py-0.5 text-[10px] font-semibold text-sand-700">
                          {item.partOfSpeech}
                        </span>
                      )}
                      {item.originalWord && item.originalWord !== item.word && (
                        <span className="text-[11px] text-sand-600">
                          (文中词形: {item.originalWord})
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm font-medium text-sand-800">
                      {getDisplayMeaning(item)}
                    </p>

                    {item.conjugationNotes && (
                      <p className="mt-1 text-xs text-andalucia-800">
                        变位: {item.conjugationNotes}
                      </p>
                    )}

                    {item.contextSentence && (
                      <p className="mt-2 text-xs italic text-sand-600 line-clamp-1 border-l-2 border-sand-200 pl-2">
                        "{item.contextSentence}"
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0 pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speechService.speak(item.word, { rate: speechRate });
                      }}
                      className="rounded-full p-1.5 text-sand-600 hover:bg-sand-100 hover:text-batllo-600 transition-colors"
                      title="朗读"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => handleToggleMastery(item.id, e)}
                      className={`rounded-full p-1.5 transition-colors ${
                        item.mastered
                          ? 'text-emerald-600 hover:bg-emerald-50'
                          : 'text-sand-600 hover:bg-sand-100 hover:text-sand-800'
                      }`}
                      title={item.mastered ? '标记为待复习' : '标记为已掌握'}
                    >
                      {item.mastered ? (
                        <CheckCircle2 className="h-4 w-4 fill-emerald-100 text-emerald-600" />
                      ) : (
                        <Circle className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={(e) => handleDelete(item.id, e)}
                      className="rounded-full p-1.5 text-sand-600 hover:bg-red-50 hover:text-red-500 transition-colors"
                      title="移出生词本"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
