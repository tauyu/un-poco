import React from 'react';
import { Waves, Volume2 } from 'lucide-react';

interface HeaderProps {
  speechRate: number;
  onRateToggle: () => void;
  isPersisted: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  speechRate,
  onRateToggle
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-sand-200/60 pt-safe px-4 pb-3">
      <div className="mx-auto flex max-w-2xl items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-batllo-600 via-batllo-500 to-andalucia-400 text-white shadow-md shadow-batllo-500/20">
            <Waves className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-black tracking-tight text-sand-900 font-serif">
                Un Poco
              </h1>
              <span className="rounded-full bg-batllo-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-batllo-800">
                西语助手
              </span>
            </div>
            <p className="text-[11px] text-sand-600 font-medium">
              西班牙语日常精读与词汇
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Voice rate switcher */}
          <button
            onClick={onRateToggle}
            className="flex items-center gap-1 rounded-full bg-sand-100 hover:bg-sand-200 px-3 py-1.5 text-xs font-semibold text-sand-700 transition-colors"
            title="点击切换发音语速 (0.75x慢速 / 1.0x标准 / 1.25x快速)"
          >
            <Volume2 className="h-3.5 w-3.5 text-sand-600" />
            <span>{speechRate}x</span>
          </button>
        </div>
      </div>
    </header>
  );
};
