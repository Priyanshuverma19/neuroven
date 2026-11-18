const fs = require('fs');
const path = require('path');

function createWavBuffer(durationSec, frequencies, sampleRate = 44100) {
  const numChannels = 2;
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const totalSamples = Math.floor(sampleRate * durationSec);
  const dataSize = totalSamples * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // 'fmt ' chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk1size (16 for PCM)
  buffer.writeUInt16LE(1, 20);  // audio format (1 = PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // bits per sample

  // 'data' chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;

    // Organic fade in (1.5s) and fade out (2s)
    let envelope = 1;
    if (t < 1.5) envelope = t / 1.5;
    else if (t > durationSec - 2) envelope = Math.max(0, (durationSec - t) / 2);

    // Subtle gentle breath LFO (0.25 Hz)
    const breath = 1 + 0.15 * Math.sin(2 * Math.PI * 0.25 * t);

    // Harmonic synthesis of warm chord frequencies
    let sampleVal = 0;
    for (let f = 0; f < frequencies.length; f++) {
      const freq = frequencies[f];
      const weight = 1 / (f + 1.2);
      sampleVal += weight * Math.sin(2 * Math.PI * freq * t);
      // Subtle octave shimmer
      sampleVal += (weight * 0.2) * Math.sin(2 * Math.PI * (freq * 2) * t);
    }

    // Normalize and scale to 16-bit signed integer (-32768 to 32767)
    const amplitude = 12000; // comfortable, warm volume
    const intSample = Math.max(-32768, Math.min(32767, Math.floor(sampleVal * envelope * breath * amplitude)));

    // Left channel
    buffer.writeInt16LE(intSample, offset);
    // Right channel (slight chorus phase offset)
    const rightSample = Math.max(-32768, Math.min(32767, Math.floor(sampleVal * envelope * (2 - breath) * amplitude * 0.95)));
    buffer.writeInt16LE(rightSample, offset + 2);

    offset += 4;
  }

  return buffer;
}

const outDir = path.resolve(__dirname, '..', 'public', 'audio');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Track 1: D minor contemplative soundbed for "Secrets of the Letters: How Hebrew Shapes the Human Brain" (D3, F3, A3, D4)
console.log('Generating Track 1: episode-42-hebrew-cognition.wav...');
const track1 = createWavBuffer(120, [146.83, 174.61, 220.0, 293.66]);
fs.writeFileSync(path.join(outDir, 'episode-42.wav'), track1);

// Track 2: Desert Solitude & Silence (A minor / E minor open fifths: 110, 164.81, 220, 329.63)
console.log('Generating Track 2: episode-43-desert-solitude.wav...');
const track2 = createWavBuffer(120, [110.0, 164.81, 220.0, 329.63]);
fs.writeFileSync(path.join(outDir, 'episode-43.wav'), track2);

// Track 3: Jerusalem Salon (Warm G major / C major acoustic: 130.81, 164.81, 196.0, 261.63)
console.log('Generating Track 3: episode-18-judean-strata.wav...');
const track3 = createWavBuffer(120, [130.81, 164.81, 196.0, 261.63]);
fs.writeFileSync(path.join(outDir, 'episode-18.wav'), track3);

// Track 4: Future Horizon & AI (Futuristic F# minor drone: 146.83, 185.0, 220.0, 277.18)
console.log('Generating Track 4: episode-29-ai-and-soul.wav...');
const track4 = createWavBuffer(120, [146.83, 185.0, 220.0, 277.18]);
fs.writeFileSync(path.join(outDir, 'episode-29.wav'), track4);

console.log('[generate-audio] Successfully created 4 high-fidelity audio tracks in public/audio/ !');
