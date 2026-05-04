// Maps computer keyboard characters to their corresponding piano notes
// Layout roughly mimics a piano keyboard:
// Black keys: w, e,   t, y, u
// White keys: a, s, d, f, g, h, j, k

export const KEY_TO_NOTE_MAP = {
  'a': 'C4',
  'w': 'C#4',
  's': 'D4',
  'e': 'D#4',
  'd': 'E4',
  'f': 'F4',
  't': 'F#4',
  'g': 'G4',
  'y': 'G#4',
  'h': 'A4',
  'u': 'A#4',
  'j': 'B4',
  'k': 'C5'
};

// Reverse map for lookup (note -> keyboard key)
export const NOTE_TO_KEY_MAP = Object.entries(KEY_TO_NOTE_MAP).reduce((acc, [key, note]) => {
  acc[note] = key;
  return acc;
}, {});

// Ordered list of notes for rendering the keyboard visually
export const PIANO_KEYS = [
  { note: 'C4', isBlack: false, keyLabel: 'A' },
  { note: 'C#4', isBlack: true, keyLabel: 'W' },
  { note: 'D4', isBlack: false, keyLabel: 'S' },
  { note: 'D#4', isBlack: true, keyLabel: 'E' },
  { note: 'E4', isBlack: false, keyLabel: 'D' },
  { note: 'F4', isBlack: false, keyLabel: 'F' },
  { note: 'F#4', isBlack: true, keyLabel: 'T' },
  { note: 'G4', isBlack: false, keyLabel: 'G' },
  { note: 'G#4', isBlack: true, keyLabel: 'Y' },
  { note: 'A4', isBlack: false, keyLabel: 'H' },
  { note: 'A#4', isBlack: true, keyLabel: 'U' },
  { note: 'B4', isBlack: false, keyLabel: 'J' },
  { note: 'C5', isBlack: false, keyLabel: 'K' },
];
