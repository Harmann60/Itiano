import * as Tone from 'tone';

let synth = null;
let isReady = false;

export const initAudio = async () => {
  if (isReady) return;
  await Tone.start();
  // Using PolySynth to allow playing multiple notes at once if needed, though this is primarily a typing tutor.
  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: "sine" // "triangle" or "sine" sounds a bit more natural than square/sawtooth for simple synth piano
    },
    envelope: {
      attack: 0.02,
      decay: 0.1,
      sustian: 0.3,
      release: 1
    }
  }).toDestination();
  isReady = true;
};

export const playNote = (note, duration = '8n') => {
  if (!isReady || !synth) {
    // Attempt to initialize if not ready, but it needs user interaction context typically.
    initAudio().then(() => {
      synth?.triggerAttackRelease(note, duration);
    });
    return;
  }
  synth.triggerAttackRelease(note, duration);
};
