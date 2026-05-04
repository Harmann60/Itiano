export const KEY_TO_NOTE_MAP = {
  // We map the main computer keys to the middle octave (C4-C5) for the typing tutor
  'a': 'C4', 'w': 'C#4', 's': 'D4', 'e': 'D#4', 'd': 'E4',
  'f': 'F4', 't': 'F#4', 'g': 'G4', 'y': 'G#4', 'h': 'A4',
  'u': 'A#4', 'j': 'B4', 'k': 'C5'
};

export const NOTE_TO_KEY_MAP = Object.entries(KEY_TO_NOTE_MAP).reduce((acc, [key, note]) => {
  acc[note] = key;
  return acc;
}, {});

// Notes in a single octave
const NOTES_IN_OCTAVE = [
  { note: 'C', isBlack: false },
  { note: 'C#', isBlack: true },
  { note: 'D', isBlack: false },
  { note: 'D#', isBlack: true },
  { note: 'E', isBlack: false },
  { note: 'F', isBlack: false },
  { note: 'F#', isBlack: true },
  { note: 'G', isBlack: false },
  { note: 'G#', isBlack: true },
  { note: 'A', isBlack: false },
  { note: 'A#', isBlack: true },
  { note: 'B', isBlack: false },
];

const START_OCTAVE = 2;
const END_OCTAVE = 6; // 5 full octaves (2,3,4,5,6) + C7

export const PIANO_KEYS = [];
let whiteKeyIndex = 0;

for (let octave = START_OCTAVE; octave <= END_OCTAVE; octave++) {
  NOTES_IN_OCTAVE.forEach(({ note, isBlack }) => {
    const fullNote = `${note}${octave}`;
    
    // Calculate relative X position. 
    // White keys are evenly spaced. Black keys are offset between specific white keys.
    let positionX = 0;
    if (!isBlack) {
      positionX = whiteKeyIndex;
      PIANO_KEYS.push({ note: fullNote, isBlack, positionX });
      whiteKeyIndex++;
    } else {
      // Black key sits exactly halfway between the previous and next white key
      positionX = whiteKeyIndex - 0.5;
      PIANO_KEYS.push({ note: fullNote, isBlack, positionX });
    }
  });
}

// Add the final C7 key
PIANO_KEYS.push({ note: 'C7', isBlack: false, positionX: whiteKeyIndex });

// Export the total width for centering the 3D model
export const TOTAL_WHITE_KEYS = whiteKeyIndex + 1;
