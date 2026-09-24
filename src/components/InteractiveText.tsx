import React from 'react';
import { tokenizeSpanishText } from '../services/dictionary/lookupService';
import type { TokenItem } from '../services/dictionary/types';

interface InteractiveTextProps {
  text: string;
  contextSentence?: string;
  onWordClick: (word: string, contextSentence?: string) => void;
  className?: string;
  wordClassName?: string;
}

export const InteractiveText: React.FC<InteractiveTextProps> = ({
  text,
  contextSentence,
  onWordClick,
  className = '',
  wordClassName = ''
}) => {
  const tokens = React.useMemo(() => tokenizeSpanishText(text), [text]);

  return (
    <span className={`inline leading-relaxed ${className}`}>
      {tokens.map((token: TokenItem) => {
        if (!token.isWord) {
          // Render punctuation or whitespace as-is
          return <span key={token.id}>{token.text}</span>;
        }

        return (
          <span
            key={token.id}
            onClick={(e) => {
              e.stopPropagation();
              onWordClick(token.cleanWord, contextSentence || text);
            }}
            className={`inline-block cursor-pointer rounded px-0.5 py-0 transition-colors duration-150 hover:bg-batllo-100 hover:text-batllo-800 active:bg-batllo-200 active:scale-95 ${wordClassName}`}
            title={`点击查看 "${token.text}" 释义与发音`}
          >
            {token.text}
          </span>
        );
      })}
    </span>
  );
};
