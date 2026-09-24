// Speech synthesis service optimized for iOS Safari and desktop browsers

export interface SpeechOptions {
  rate?: number; // 0.75, 1.0, 1.25
  lang?: 'es-ES' | 'es-MX' | 'es-US';
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

class SpeechService {
  private synth: SpeechSynthesis | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isVoiceLoaded = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices(): void {
    if (!this.synth) return;
    const available = this.synth.getVoices();
    if (available.length > 0) {
      this.voices = available;
      this.isVoiceLoaded = true;
    }
  }

  /**
   * Find the best Spanish voice available, prioritizing iOS Apple high quality voices
   */
  public getBestSpanishVoice(preferredLang: string = 'es-ES'): SpeechSynthesisVoice | null {
    if (!this.synth) return null;
    if (!this.isVoiceLoaded || this.voices.length === 0) {
      this.loadVoices();
    }

    const spanishVoices = this.voices.filter(v => v.lang.startsWith('es'));
    if (spanishVoices.length === 0) return null;

    // Prefer specific dialect if matched (es-ES or es-MX)
    const exactMatch = spanishVoices.find(v => v.lang === preferredLang);
    if (exactMatch) return exactMatch;

    // Prioritize natural Apple iOS voices: Mónica, Jorge, Paulina, Diego, Siri
    const appleVoice = spanishVoices.find(v =>
      /mónica|jorge|paulina|diego|siri|penélope/i.test(v.name)
    );
    if (appleVoice) return appleVoice;

    // Default to first Spanish voice
    return spanishVoices[0];
  }

  /**
   * Speak Spanish text
   */
  public speak(text: string, options: SpeechOptions = {}): void {
    if (!this.synth) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    // Cancel any previous speaking
    this.stop();

    if (!text || text.trim() === '') return;

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    const lang = options.lang || 'es-ES';
    utterance.lang = lang;
    utterance.rate = options.rate ?? 1.0;
    utterance.pitch = 1.0;

    const voice = this.getBestSpanishVoice(lang);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      options.onStart?.();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      options.onEnd?.();
    };

    utterance.onerror = (e) => {
      this.currentUtterance = null;
      options.onError?.(e);
    };

    // iOS Safari workaround: resume if paused
    if (this.synth.paused) {
      this.synth.resume();
    }

    this.synth.speak(utterance);
  }

  /**
   * Stop any current speech
   */
  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  /**
   * Check if speech is currently active
   */
  public isSpeaking(): boolean {
    return Boolean(this.currentUtterance && this.synth && (this.synth.speaking || this.synth.pending));
  }
}

export const speechService = new SpeechService();
