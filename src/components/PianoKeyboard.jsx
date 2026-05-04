import React from 'react';
import { PIANO_KEYS } from '../utils/keyMap';
import './PianoKeyboard.css';

const PianoKeyboard = ({ activeNotes = [], targetNote = null }) => {
  return (
    <div className="piano-container">
      <div className="piano-keyboard">
        {PIANO_KEYS.map(({ note, isBlack, keyLabel }) => {
          const isActive = activeNotes.includes(note);
          const isTarget = targetNote === note;

          let className = `piano-key ${isBlack ? 'black-key' : 'white-key'}`;
          if (isActive) {
            className += isTarget ? ' key-correct' : ' key-active';
          } else if (isTarget) {
            className += ' key-target';
          }

          return (
            <div key={note} className={className} data-note={note}>
              <span className="key-label">{keyLabel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PianoKeyboard;
