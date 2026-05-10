import React from 'react';
import '../App.css';

const UpcomingNoteQueue = ({ notes, currentIndex }) => {
  if (!notes || notes.length === 0) return null;

  const VISIBLE_NOTES = 5;
  const upcomingNotes = notes.slice(currentIndex, currentIndex + VISIBLE_NOTES);

  const paddedNotes = [...upcomingNotes];
  while (paddedNotes.length < VISIBLE_NOTES) {
    paddedNotes.push(null);
  }

  return (
    <div className="note-queue-container">
      <div className="note-queue-header">Up Next</div>
      <div className="note-queue-list">
        {paddedNotes.map((noteObj, idx) => {
          if (!noteObj) {
            return <div key={`empty-${idx}`} className="note-queue-item empty"></div>;
          }

          const isTarget = idx === 0;

          if (noteObj.type === 'pause') {
             return (
               <div key={`${currentIndex + idx}-pause`} className={`note-queue-item pause ${isTarget ? 'target' : 'upcoming'}`} style={{ animationDelay: `${idx * 0.1}s`, opacity: noteObj.char === ' ' ? 0.3 : 1 }}>
                 <div className="keyboard-key">{noteObj.char === '↵' ? '↵' : noteObj.char === '|' ? '|' : '-'}</div>
                 <div className="musical-note">Wait</div>
               </div>
             );
          }
          
          if (noteObj.type === 'chord') {
             return (
               <div key={`${currentIndex + idx}-chord`} className={`note-queue-item chord ${isTarget ? 'target' : 'upcoming'}`} style={{ animationDelay: `${idx * 0.1}s` }}>
                 <div className="keyboard-key">[{noteObj.keys.join('')}]</div>
                 <div className="musical-note">CHORD</div>
               </div>
             );
          }

          // Single note
          const keyboardKey = noteObj.key;
          
          return (
            <div 
              key={`${currentIndex + idx}-${noteObj.note}`} 
              className={`note-queue-item ${isTarget ? 'target' : 'upcoming'}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="keyboard-key">{keyboardKey}</div>
              <div className="musical-note">{noteObj.note}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingNoteQueue;
