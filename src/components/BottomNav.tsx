import React from 'react';
import { BookOpen, Search, Bookmark, User } from 'lucide-react';

export type TabType = 'translate' | 'reader' | 'vocab' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  vocabCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  vocabCount = 0
}) => {
  const tabs = [
    { id: 'translate' as TabType, label: '查词翻译', icon: Search },
    { id: 'reader' as TabType, label: '精读阅读', icon: BookOpen },
    { id: 'vocab' as TabType, label: '生词本', icon: Bookmark, badge: vocabCount },
    { id: 'profile' as TabType, label: '我的', icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-sand-200/80 pb-safe">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-1 flex-col items-center justify-center py-1 transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'text-batllo-700 font-semibold'
                  : 'text-sand-600 hover:text-sand-900 font-medium'
              }`}
            >
              <div
                className={`relative flex h-8 w-12 items-center justify-center rounded-full transition-colors ${
                  isActive ? 'bg-batllo-100/80 text-batllo-700' : ''
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {typeof tab.badge === 'number' && tab.badge > 0 && (
                  <span className="absolute -top-1 right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-andalucia-500 px-1 text-[10px] font-bold text-white shadow-sm">
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
              </div>
              <span className="mt-0.5 text-[11px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
