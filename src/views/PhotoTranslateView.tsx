import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Volume2, Copy, Check, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { ocrService, type OCRProgress } from '../services/ocr/ocrService';
import { InteractiveText } from '../components/InteractiveText';
import { speechService } from '../services/speech/speechService';

interface PhotoTranslateViewProps {
  onWordClick: (word: string, contextSentence?: string) => void;
  speechRate: number;
}

export const PhotoTranslateView: React.FC<PhotoTranslateViewProps> = ({
  onWordClick,
  speechRate
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<OCRProgress>({ status: '', progress: 0 });
  const [copied, setCopied] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const cameraInputRef = useRef<HTMLInputElement>(null);
  const albumInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setExtractedText('');
    setIsProcessing(true);

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);

    try {
      const text = await ocrService.recognizeSpanishText(file, (p) => {
        setProgress(p);
      });

      if (!text || text.trim() === '') {
        setErrorMsg('未能从图片中清晰识别到西班牙语文字，请尝试拍摄更平整清晰的文本。');
      } else {
        setExtractedText(text);
      }
    } catch (err: any) {
      console.error('OCR Error:', err);
      setErrorMsg('离线文字识别遇到问题，请确保图片清晰且网络可初次加载本地模型。');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlayExtracted = () => {
    if (extractedText) {
      speechService.speak(extractedText, { rate: speechRate, lang: 'es-ES' });
    }
  };

  const handleSampleText = () => {
    // Demonstration text
    setImagePreview(null);
    setExtractedText(
      'En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor.'
    );
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pb-28 pt-4">
      {/* Hidden File Inputs */}
      {/* 1. Camera live snap */}
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
      {/* 2. Photo Library Album pick */}
      <input
        type="file"
        ref={albumInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-batllo-700 via-batllo-600 to-andalucia-600 p-5 text-white shadow-lg shadow-batllo-700/15">
        <span className="text-xs font-semibold uppercase tracking-wider text-andalucia-200">
          Client-side WebAssembly OCR
        </span>
        <h2 className="mt-1 text-2xl font-black font-serif tracking-tight">
          拍照与相册取词翻译
        </h2>
        <p className="mt-1 text-xs text-batllo-100 leading-relaxed">
          手机现场拍摄或上传图片，纯客户端离线提取西语。每个识别出来的单词均可轻触查词、看变位与听发音。
        </p>
      </div>

      {/* Dual Upload / Capture Buttons */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          onClick={() => cameraInputRef.current?.click()}
          disabled={isProcessing}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white p-5 shadow-sm border border-sand-200/80 hover:border-batllo-400 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-batllo-100 text-batllo-700">
            <Camera className="h-6 w-6" />
          </div>
          <div className="text-center">
            <span className="block text-sm font-bold text-sand-900">即时拍照拍摄</span>
            <span className="text-[11px] text-sand-600">调取手机后置镜头</span>
          </div>
        </button>

        <button
          onClick={() => albumInputRef.current?.click()}
          disabled={isProcessing}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white p-5 shadow-sm border border-sand-200/80 hover:border-andalucia-400 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-andalucia-100 text-andalucia-700">
            <ImageIcon className="h-6 w-6" />
          </div>
          <div className="text-center">
            <span className="block text-sm font-bold text-sand-900">从相册上传</span>
            <span className="text-[11px] text-sand-600">选择存量书籍/菜单图</span>
          </div>
        </button>
      </div>

      {/* Processing Status Bar */}
      {isProcessing && (
        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm border border-batllo-200">
          <div className="flex items-center justify-between text-xs font-semibold text-batllo-800">
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin text-batllo-600" />
              <span>{progress.status || '正在进行本地 OCR 分析...'}</span>
            </div>
            <span>{Math.round(progress.progress * 100)}%</span>
          </div>

          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-sand-100">
            <div
              className="h-full bg-gradient-to-r from-batllo-500 to-andalucia-500 transition-all duration-300"
              style={{ width: `${Math.max(5, progress.progress * 100)}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-sand-600 text-center">
            采用纯前端 WebAssembly 西班牙语模型，零 Token 消耗
          </p>
        </div>
      )}

      {/* Error alert */}
      {errorMsg && (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-red-50 p-3.5 text-xs text-red-800 border border-red-200">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Image Preview Thumbnail */}
      {imagePreview && (
        <div className="mt-4 overflow-hidden rounded-2xl bg-black/5 border border-sand-200">
          <img
            src={imagePreview}
            alt="Uploaded Spanish material"
            className="max-h-48 w-full object-contain bg-sand-900/10"
          />
        </div>
      )}

      {/* Extracted Interactive Text Result */}
      {extractedText && (
        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm border border-sand-200/80">
          <div className="flex items-center justify-between border-b border-sand-100 pb-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-batllo-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-sand-800">
                提取结果 (轻触任意单词查释义)
              </h3>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePlayExtracted}
                className="flex items-center gap-1 rounded-full bg-batllo-50 px-2.5 py-1 text-xs font-semibold text-batllo-700 hover:bg-batllo-100 transition-colors"
                title="整篇朗读"
              >
                <Volume2 className="h-3.5 w-3.5" />
                朗读
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 rounded-full bg-sand-100 px-2.5 py-1 text-xs font-semibold text-sand-700 hover:bg-sand-200 transition-colors"
                title="复制提取文本"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? '已复制' : '复制'}
              </button>
            </div>
          </div>

          <div className="mt-4 text-base font-serif leading-relaxed text-sand-900">
            <InteractiveText
              text={extractedText}
              contextSentence={extractedText}
              onWordClick={onWordClick}
            />
          </div>

          <div className="mt-4 rounded-xl bg-batllo-50/70 p-3 text-[11px] text-batllo-800 border border-batllo-200/50">
            ✨ 点选上方的任意单词，即可在底部弹窗查看<b>动词时态变位、中英双语对照与标准发音</b>，并随时收藏进生词本。
          </div>
        </div>
      )}

      {/* Sample demonstration button */}
      {!extractedText && !isProcessing && (
        <div className="mt-6 text-center">
          <button
            onClick={handleSampleText}
            className="text-xs font-medium text-batllo-700 hover:underline"
          >
            无现成西语图片？点击试看示例段落（塞万提斯·堂吉诃德）
          </button>
        </div>
      )}
    </div>
  );
};
