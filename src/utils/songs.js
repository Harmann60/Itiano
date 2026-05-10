import { KEY_TO_NOTE_MAP } from './keyMap';

export const parseVirtualPianoSheet = (title, sheetString) => {
  const items = [];
  let inChord = false;
  let currentChordKeys = [];
  let currentChordNotes = [];

  for (let i = 0; i < sheetString.length; i++) {
    const char = sheetString[i];
    
    if (char === '[') {
      inChord = true;
      currentChordKeys = [];
      currentChordNotes = [];
      continue;
    }
    
    if (char === ']') {
      inChord = false;
      if (currentChordKeys.length > 0) {
        items.push({ type: 'chord', keys: currentChordKeys, notes: currentChordNotes });
      }
      continue;
    }
    
    if (char === ' ') {
      if (!inChord) items.push({ type: 'pause', length: 1, char: ' ' });
      continue;
    }
    
    if (char === '|') {
      if (!inChord) items.push({ type: 'pause', length: 2, char: '|' });
      continue;
    }
    
    if (char === '\n' || char === '\r') {
      const last = items[items.length - 1];
      if (last && last.type !== 'pause' && char === '\n') {
         items.push({ type: 'pause', length: 2, char: '↵' });
      }
      continue;
    }
    
    const note = KEY_TO_NOTE_MAP[char];
    if (note) {
      if (inChord) {
        currentChordKeys.push(char);
        currentChordNotes.push(note);
      } else {
        items.push({ type: 'note', key: char, note: note });
      }
    }
  }
  
  return { title, notes: items };
};

export const SONGS = [
  { title: "Free Play (No Track)", notes: [] },
  parseVirtualPianoSheet(
    "Tum Hi Ho (Aashiqui 2)",
    `
s s s d | s |
a a a s | a |
s s a p p s s a
p p s s s p | s | |
s s s d | s |
a a a s | d |
s s a p p s s a
p p s s s p | s | |
s d | s [of] | |
a [oh] | [of] | |
s d | s [of] | |
s [oh] | [of] | |
s s s s d | s |
d d d d f s d |
f f f s p p o o |
f s p p s s |
[us] o [so] u [sh] [sh] [sg] f d |
[ya] o [oa] y [ha] [ha] [og] f d |
[pf] s [sf] p [jf] s [jf] s [sj]
g p p i [pg] s [pg] f |
[us] o [so] u [sh] [sh] [sg] f d |
[ya] o [oa] y [ga] h h g f d
p [uf] p [pf] s p [jf] s [jf] s [sj]
g p p s j a h p g o
`
  ),
  parseVirtualPianoSheet(
    "Kal Ho Naa Ho",
    `
s d f g f d s a p
p a s d s a p o
s d f g f d s a p
p a s d s a p o i
i o p p o i u y
i o p p o i u y
s d f g f d s a p
`
  )
];
