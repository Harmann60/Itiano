import React, { useState, useEffect, useCallback } from 'react';
import Piano3D from './components/Piano3D';
import SongTrainer from './components/SongTrainer';
import { SONGS } from './utils/songs';
import { KEY_TO_NOTE_MAP, NOTE_TO_KEY_MAP } from './utils/keyMap';
import { playNote, initAudio } from './utils/audio';
import { Play, RotateCcw, Music } from 'lucide-react';
import './App.css';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [activeNotes, setActiveNotes] = useState([]);
  
  // Trainer State
  const [selectedSong, setSelectedSong] = useState(SONGS[0]);
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [errorState, setErrorState] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const handleStart = async () => {
    await initAudio();
    setHasStarted(true);
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song);
    setCurrentNoteIndex(0);
    setIsFinished(false);
    setErrorState(false);
  };

  const handleRestart = () => {
    setCurrentNoteIndex(0);
    setIsFinished(false);
    setErrorState(false);
  };

  const handleKeyDown = useCallback((e) => {
    if (!hasStarted || isFinished) return;
    
    // Ignore repeating keys (holding down)
    if (e.repeat) return;

    const key = e.key.toLowerCase();
    const playedNote = KEY_TO_NOTE_MAP[key];

    if (playedNote) {
      // It's a valid piano key
      playNote(playedNote);
      setActiveNotes(prev => [...new Set([...prev, playedNote])]);

      // Trainer Logic
      const isFreePlay = selectedSong.notes.length === 0;
      if (isFreePlay) return;

      const targetNoteObj = selectedSong.notes[currentNoteIndex];
      if (targetNoteObj && playedNote === targetNoteObj.note) {
        // Correct Note
        setErrorState(false);
        const nextIndex = currentNoteIndex + 1;
        setCurrentNoteIndex(nextIndex);
        if (nextIndex >= selectedSong.notes.length) {
          setIsFinished(true);
        }
      } else {
        // Wrong Note
        setErrorState(true);
        // Clear error state after animation
        setTimeout(() => setErrorState(false), 400);
      }
    }
  }, [hasStarted, isFinished, selectedSong, currentNoteIndex]);

  const handleKeyUp = useCallback((e) => {
    const key = e.key.toLowerCase();
    const playedNote = KEY_TO_NOTE_MAP[key];
    if (playedNote) {
      setActiveNotes(prev => prev.filter(n => n !== playedNote));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const handlePlayNote = useCallback((note) => {
    if (!hasStarted) return;
    playNote(note);
    // Note: Since this is mouse click, we briefly activate it then deactivate it,
    // or rely on the user having to press the correct computer key to advance the song.
    // For simplicity in the visualizer, we just play the audio.
  }, [hasStarted]);

  // Determine what note the keyboard should highlight as target
  const isFreePlay = selectedSong.notes.length === 0;
  const targetNote = (!isFinished && !isFreePlay && selectedSong.notes[currentNoteIndex]) 
    ? selectedSong.notes[currentNoteIndex].note 
    : null;

  return (
    <>
      <Piano3D activeNotes={activeNotes} targetNote={targetNote} onPlayNote={handlePlayNote} />

      {!hasStarted ? (
        <div className="minimal-overlay start-screen">
          <button className="minimal-start-btn" onClick={handleStart}>
            Click to Start
          </button>
        </div>
      ) : (
        <div className="minimal-overlay">
          <div className="top-instructions">
            <p>Use Keyboard keys A S D F G H J K L ; ' & W E T Y U O P to play</p>
            <p className="sub-instruction">Drag to rotate · Scroll to zoom</p>
          </div>

          <div className="song-title">
            {selectedSong.title === "Free Play (No Track)" ? "Free Play" : selectedSong.title}
          </div>

          {isFinished && (
            <div className="finished-message">
              <p>Song Completed!</p>
              <button onClick={handleRestart} className="minimal-restart-btn">Play Again</button>
            </div>
          )}

          <div className="bottom-credits">
            <p>A 3D virtual piano made by you</p>
          </div>

          <div className="minimal-controls">
            <select 
              value={selectedSong.title} 
              onChange={(e) => handleSongSelect(SONGS.find(s => s.title === e.target.value))}
              className="minimal-select"
            >
              {SONGS.map(song => (
                <option key={song.title} value={song.title}>{song.title}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
