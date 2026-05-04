import React, { useEffect, useRef } from 'react';
import './SongTrainer.css';

const SongTrainer = ({ song, currentNoteIndex, errorState }) => {
  const trackRef = useRef(null);

  // Auto-scroll the track to keep the current note centered
  useEffect(() => {
    if (trackRef.current && currentNoteIndex > 0) {
      const activeElement = trackRef.current.children[currentNoteIndex];
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }
  }, [currentNoteIndex]);

  if (!song) return <div className="song-trainer empty">Select a song to begin</div>;

  return (
    <div className="song-trainer">
      <div className="trainer-header">
        <h2>{song.title}</h2>
        <div className="progress">
          Progress: {currentNoteIndex} / {song.notes.length}
        </div>
      </div>
      
      <div className={`trainer-track-container ${errorState ? 'shake-error' : ''}`}>
        <div className="trainer-track" ref={trackRef}>
          {song.notes.map((noteObj, idx) => {
            let statusClass = 'upcoming';
            if (idx < currentNoteIndex) statusClass = 'passed';
            if (idx === currentNoteIndex) statusClass = 'current';

            return (
              <div key={`${idx}-${noteObj.note}`} className={`trainer-note ${statusClass}`}>
                <span className="note-key">{noteObj.key.toUpperCase()}</span>
                <span className="note-name">{noteObj.note}</span>
              </div>
            );
          })}
        </div>
        <div className="target-indicator"></div>
      </div>
    </div>
  );
};

export default SongTrainer;
