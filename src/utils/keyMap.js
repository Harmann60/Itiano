export const KEY_TO_NOTE_MAP = {
  // Octave 2
  '1': 'C2', '!': 'C#2', '2': 'D2', '@': 'D#2', '3': 'E2',
  '4': 'F2', '$': 'F#2', '5': 'G2', '%': 'G#2', '6': 'A2', '^': 'A#2', '7': 'B2',
  
  // Octave 3
  '8': 'C3', '*': 'C#3', '9': 'D3', '(': 'D#3', '0': 'E3',
  'q': 'F3', 'Q': 'F#3', 'w': 'G3', 'W': 'G#3', 'e': 'A3', 'E': 'A#3', 'r': 'B3',
  
  // Octave 4
  't': 'C4', 'T': 'C#4', 'y': 'D4', 'Y': 'D#4', 'u': 'E4',
  'i': 'F4', 'I': 'F#4', 'o': 'G4', 'O': 'G#4', 'p': 'A4', 'P': 'A#4', 'a': 'B4',
  
  // Octave 5
  's': 'C5', 'S': 'C#5', 'd': 'D5', 'D': 'D#5', 'f': 'E5',
  'g': 'F5', 'G': 'F#5', 'h': 'G5', 'H': 'G#5', 'j': 'A5', 'J': 'A#5', 'k': 'B5',
  
  // Octave 6 & 7
  'l': 'C6', 'L': 'C#6', 'z': 'D6', 'Z': 'D#6', 'x': 'E6',
  'c': 'F6', 'C': 'F#6', 'v': 'G6', 'V': 'G#6', 'b': 'A6', 'B': 'A#6', 'n': 'B6',
  'm': 'C7'
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
