import { createWorker, type Worker } from 'tesseract.js';

export interface OCRProgress {
  status: string;
  progress: number; // 0 to 1
}

class OCRService {
  private worker: Worker | null = null;

  /**
   * Resize large iPhone photos before OCR to optimize speed and avoid memory crashes
   */
  public async preprocessImage(imageFile: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 1800; // Optimal size for OCR without lagging
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });
  }

  /**
   * Recognize Spanish text from an image (Camera photo or album upload)
   */
  public async recognizeSpanishText(
    imageData: string | File,
    onProgress?: (progress: OCRProgress) => void
  ): Promise<string> {
    try {
      let imageSrc: string;
      if (imageData instanceof File) {
        onProgress?.({ status: '正在优化图片分辨率...', progress: 0.1 });
        imageSrc = await this.preprocessImage(imageData);
      } else {
        imageSrc = imageData;
      }

      onProgress?.({ status: '正在加载本地离线 OCR 引擎...', progress: 0.25 });

      if (!this.worker) {
        this.worker = await createWorker('spa', undefined, {
          logger: (m) => {
            if (m.status === 'recognizing text') {
              onProgress?.({
                status: '正在识别西语文字...',
                progress: 0.3 + (m.progress || 0) * 0.7
              });
            } else {
              onProgress?.({
                status: m.status || '初始化中...',
                progress: 0.2
              });
            }
          }
        });
      }

      const result = await this.worker.recognize(imageSrc);
      const text = result.data.text;

      // Clean up extracted OCR text
      return this.cleanOCRText(text);
    } catch (error) {
      console.error('OCR Recognition failed:', error);
      throw error;
    }
  }

  /**
   * Clean up formatting, line breaks, and stray OCR artifacts
   */
  private cleanOCRText(raw: string): string {
    return raw
      .replace(/\r\n/g, '\n')
      // Join broken words split across line breaks with a hyphen (e.g. "espa- \n ñol" -> "español")
      .replace(/(\w+)-\s*\n\s*(\w+)/g, '$1$2')
      // Normalize multiple spaces
      .replace(/[ \t]+/g, ' ')
      // Clean excessive newlines
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  /**
   * Terminate worker to free memory when needed
   */
  public async terminate(): Promise<void> {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
  }
}

export const ocrService = new OCRService();
