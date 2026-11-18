// Browser-safe Web Audio synthesizer + Web Speech API engine
// Enables instant playback of podcast atmosphere, chordal chimes, and voiceover previews without external mp3 network dependencies.

class PodcastAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private gainNode: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private isSpeaking: boolean = false;

  private initContext() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public startPodcastSoundbed(volume: number = 0.6) {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.isRunning) return;

      const now = this.ctx.currentTime;
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.001, now);
      this.gainNode.gain.exponentialRampToValueAtTime(Math.max(0.001, volume * 0.15), now + 1.2);
      this.gainNode.connect(this.ctx.destination);

      // Warm acoustic fundamental (D minor meditative chord for Psalm 3)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = "sine";
      this.osc1.frequency.setValueAtTime(146.83, now); // D3

      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = "triangle";
      this.osc2.frequency.setValueAtTime(220.0, now); // A3

      // Gentle LFO for organic breath-like acoustic movement
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.2, now); // 0.2 Hz slow breath
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(15, now);
      this.lfo.connect(lfoGain);
      lfoGain.connect(this.osc1.frequency);

      this.osc1.connect(this.gainNode);
      this.osc2.connect(this.gainNode);

      this.osc1.start();
      this.osc2.start();
      this.lfo.start();
      this.isRunning = true;
    } catch {
      // AudioContext could be blocked by autoplay policies until gesture
    }
  }

  public setVolume(vol: number) {
    if (this.gainNode && this.ctx) {
      const now = this.ctx.currentTime;
      this.gainNode.gain.setValueAtTime(Math.max(0.0001, vol * 0.15), now);
    }
  }

  public stopPodcastSoundbed() {
    try {
      if (this.gainNode && this.ctx && this.isRunning) {
        const now = this.ctx.currentTime;
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        setTimeout(() => {
          this.osc1?.stop();
          this.osc2?.stop();
          this.lfo?.stop();
          this.osc1?.disconnect();
          this.osc2?.disconnect();
          this.lfo?.disconnect();
          this.isRunning = false;
        }, 500);
      }
    } catch {
      this.isRunning = false;
    }
  }

  public playChime(freq: number = 440) {
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.15);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // ignore
    }
  }

  // VoiceHover Speech Synthesis Preview
  public speakText(text: string, speaker: "Jon Collins" | "Tim Mackie" | "Hebrew", onEnd?: () => void) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      if (onEnd) onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      // Pick distinctive tone for Jon vs Tim
      if (speaker === "Tim Mackie") {
        utterance.pitch = 0.95; // Slightly deeper scholarly pitch
        utterance.rate = 1.05;
      } else if (speaker === "Jon Collins") {
        utterance.pitch = 1.1; // Lively podcast host tone
        utterance.rate = 1.1;
      } else {
        utterance.pitch = 0.85; // Reverent Hebrew tone
        utterance.rate = 0.9;
      }

      utterance.onend = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      this.isSpeaking = true;
      window.speechSynthesis.speak(utterance);
    } catch {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    }
  }

  public stopSpeaking() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
    }
  }
}

export const audioEngine = new PodcastAudioEngine();
