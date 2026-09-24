import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, type TabType } from './components/BottomNav';
import { WordDrawer } from './components/WordDrawer';
import { TranslateView } from './views/TranslateView';
import { ReaderView } from './views/ReaderView';
import { VocabView } from './views/VocabView';
import { ProfileView } from './views/ProfileView';
import { storageService } from './services/storage/storageService';

export function App() {
  // Default tab is 'translate' as requested by user
  const [activeTab, setActiveTab] = useState<TabType>('translate');
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [contextSentence, setContextSentence] = useState<string | undefined>(undefined);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [isPersisted, setIsPersisted] = useState<boolean>(false);
  const [vocabCount, setVocabCount] = useState<number>(0);
  const [targetLessonId, setTargetLessonId] = useState<string | null>(null);

  const refreshVocabCount = () => {
    const list = storageService.getVocabulary();
    setVocabCount(list.length);
  };

  useEffect(() => {
    refreshVocabCount();
    storageService.isStoragePersisted().then(setIsPersisted);
  }, []);

  const handleWordClick = (word: string, context?: string) => {
    setSelectedWord(word);
    setContextSentence(context);
  };

  const handleRateToggle = () => {
    setSpeechRate((prev) => {
      if (prev === 1.0) return 0.75;
      if (prev === 0.75) return 1.25;
      return 1.0;
    });
  };

  return (
    <div className="min-h-screen bg-sand-50 font-sans text-sand-900 selection:bg-batllo-200">
      {/* Top Header */}
      <Header
        speechRate={speechRate}
        onRateToggle={handleRateToggle}
        isPersisted={isPersisted}
      />

      {/* Main Content Area */}
      <main className="w-full">
        {activeTab === 'translate' && (
          <TranslateView onWordClick={handleWordClick} speechRate={speechRate} />
        )}

        {activeTab === 'reader' && (
          <ReaderView
            onWordClick={handleWordClick}
            speechRate={speechRate}
            initialLessonId={targetLessonId}
            onClearInitialLesson={() => setTargetLessonId(null)}
          />
        )}

        {activeTab === 'vocab' && (
          <VocabView onWordClick={handleWordClick} speechRate={speechRate} />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            speechRate={speechRate}
            onNavigateToLesson={(lessonId) => {
              setTargetLessonId(lessonId);
              setActiveTab('reader');
            }}
          />
        )}
      </main>

      {/* Word Definition Drawer (Bottom sheet) */}
      <WordDrawer
        word={selectedWord}
        contextSentence={activeTab === 'profile' ? undefined : contextSentence}
        showContextSentence={activeTab !== 'profile'}
        onClose={() => setSelectedWord(null)}
        onSavedChange={refreshVocabCount}
      />

      {/* Fixed Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          refreshVocabCount();
        }}
        vocabCount={vocabCount}
      />
    </div>
  );
}

export default App;
