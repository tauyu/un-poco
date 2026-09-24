import { useState, useRef, useEffect, useCallback } from 'react';

export interface SentenceRecording {
  sentenceId: string;
  audioUrl: string;
  duration: number;
}

export function useAudioRecorder() {
  const [recordingSentenceId, setRecordingSentenceId] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [playingSentenceId, setPlayingSentenceId] = useState<string | null>(null);
  const [recordings, setRecordings] = useState<Record<string, SentenceRecording>>({});

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const currentAudioElementRef = useRef<HTMLAudioElement | null>(null);

  // Clean up Object URLs on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (currentAudioElementRef.current) {
        currentAudioElementRef.current.pause();
      }
      Object.values(recordings).forEach((rec) => {
        URL.revokeObjectURL(rec.audioUrl);
      });
    };
  }, []);

  const startRecording = useCallback(async (sentenceId: string) => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('您的浏览器不支持录音功能，或未授予麦克风权限。');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      let mimeType = '';
      if (typeof MediaRecorder !== 'undefined') {
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          mimeType = 'audio/webm;codecs=opus';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
          mimeType = 'audio/mp4';
        } else if (MediaRecorder.isTypeSupported('audio/webm')) {
          mimeType = 'audio/webm';
        }
      }

      const mediaRecorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: mimeType || 'audio/webm'
        });
        const audioUrl = URL.createObjectURL(audioBlob);

        setRecordings((prev) => {
          // Clean up old URL if existed
          if (prev[sentenceId]) {
            URL.revokeObjectURL(prev[sentenceId].audioUrl);
          }
          return {
            ...prev,
            [sentenceId]: {
              sentenceId,
              audioUrl,
              duration: recordingSeconds
            }
          };
        });

        // Release microphone tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.start();
      setRecordingSentenceId(sentenceId);
      setRecordingSeconds(0);

      timerRef.current = window.setInterval(() => {
        setRecordingSeconds((sec) => sec + 1);
      }, 1000);
    } catch (err) {
      console.error('Failed to start recording:', err);
      alert('无法访问麦克风，请在浏览器地址栏检查麦克风权限设置。');
    }
  }, [recordingSeconds]);

  const stopRecording = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setRecordingSentenceId(null);
  }, []);

  const deleteRecording = useCallback((sentenceId: string) => {
    setRecordings((prev) => {
      if (prev[sentenceId]) {
        URL.revokeObjectURL(prev[sentenceId].audioUrl);
        const copy = { ...prev };
        delete copy[sentenceId];
        return copy;
      }
      return prev;
    });

    if (playingSentenceId === sentenceId && currentAudioElementRef.current) {
      currentAudioElementRef.current.pause();
      setPlayingSentenceId(null);
    }
  }, [playingSentenceId]);

  const playRecording = useCallback((sentenceId: string) => {
    const rec = recordings[sentenceId];
    if (!rec) return;

    if (currentAudioElementRef.current) {
      currentAudioElementRef.current.pause();
    }

    const audio = new Audio(rec.audioUrl);
    currentAudioElementRef.current = audio;
    setPlayingSentenceId(sentenceId);

    audio.onended = () => {
      setPlayingSentenceId(null);
    };
    audio.onerror = () => {
      setPlayingSentenceId(null);
    };

    audio.play().catch((err) => {
      console.warn('Playback error:', err);
      setPlayingSentenceId(null);
    });
  }, [recordings]);

  const stopPlaying = useCallback(() => {
    if (currentAudioElementRef.current) {
      currentAudioElementRef.current.pause();
    }
    setPlayingSentenceId(null);
  }, []);

  return {
    recordingSentenceId,
    recordingSeconds,
    playingSentenceId,
    recordings,
    startRecording,
    stopRecording,
    deleteRecording,
    playRecording,
    stopPlaying
  };
}
