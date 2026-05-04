import { NOTE_TO_KEY_MAP } from './keyMap';

// Helper to convert note names into a playable sequence with the required keys
const buildSong = (title, notesString) => {
  const notes = notesString.split(' ').map(note => ({
    note,
    key: NOTE_TO_KEY_MAP[note]
  }));
  return { title, notes };
};

export const FREE_PLAY = { title: "Free Play (No Track)", notes: [] };

export const SONGS = [
  FREE_PLAY,
  buildSong(
    "Twinkle Twinkle Little Star",
    "C4 C4 G4 G4 A4 A4 G4 F4 F4 E4 E4 D4 D4 C4 G4 G4 F4 F4 E4 E4 D4 G4 G4 F4 F4 E4 E4 D4 C4 C4 G4 G4 A4 A4 G4 F4 F4 E4 E4 D4 D4 C4"
  ),
  buildSong(
    "Ode to Joy",
    "E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4 E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 D4 C4 C4"
  ),
  buildSong(
    "Mary Had a Little Lamb",
    "E4 D4 C4 D4 E4 E4 E4 D4 D4 D4 E4 G4 G4 E4 D4 C4 D4 E4 E4 E4 E4 D4 D4 E4 D4 C4"
  ),
  buildSong(
    "Stay (Chorus)",
    "C5 B4 A4 G4 F4 E4 F4 G4 E4 C5 B4 A4 G4 F4 E4 F4 G4 E4"
  ),
  buildSong(
    "Treat You Better (Chorus)",
    "E4 G4 A4 G4 E4 D4 C4 D4 E4 C4"
  )
];
