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
  const targetNote = (!isFinished && selectedSong.notes[currentNoteIndex]) 
    ? selectedSong.notes[currentNoteIndex].note 
    : null;

  return (
    <div className="app-container">
      <header className="app-header">
        <h1><Music className="icon" /> Virtual Piano Tutor</h1>
        <p>Learn to play songs by typing on your keyboard</p>
      </header>

      {!hasStarted ? (
        <div className="start-screen">
          <button className="btn-primary" onClick={handleStart}>
            <Play className="icon" /> Start Playing
          </button>
          <p className="hint">Click to enable audio</p>
        </div>
      ) : (
        <main className="main-content">
          <div className="controls">
            <div className="song-selector">
              <label>Select Song:</label>
              <select 
                value={selectedSong.title} 
                onChange={(e) => handleSongSelect(SONGS.find(s => s.title === e.target.value))}
              >
                {SONGS.map(song => (
                  <option key={song.title} value={song.title}>{song.title}</option>
                ))}
              </select>
            </div>
            <button className="btn-secondary" onClick={handleRestart}>
              <RotateCcw className="icon" /> Restart Song
            </button>
          </div>

          <SongTrainer 
            song={selectedSong} 
            currentNoteIndex={currentNoteIndex} 
            errorState={errorState} 
          />

          {isFinished && (
            <div className="celebration">
              <h2>Song Completed! 🎉</h2>
              <button className="btn-primary" onClick={handleRestart}>Play Again</button>
            </div>
          )}

          <div className="keyboard-section">
            <Piano3D activeNotes={activeNotes} targetNote={targetNote} onPlayNote={handlePlayNote} />
          </div>
          
          <div className="instructions">
            <h3>Controls</h3>
            <p>Use the home row (A, S, D, F, G, H, J) for white keys, and top row (W, E, T, Y, U) for black keys.</p>
            <p>You can also use your mouse to click any key on the 3D piano!</p>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
