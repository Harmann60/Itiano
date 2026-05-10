import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { TOTAL_WHITE_KEYS, PIANO_KEYS } from '../utils/keyMap';

// Pixels per beat in the Z axis
const BEAT_SPEED = 8;

// ─── Hit-zone timing bar ────────────────────────────────────────────────────
// A glowing horizontal bar at the piano key front edge that tells the user
// exactly where to aim. Rendered once, at world Z=0.
const HitZoneBar = () => {
  const meshRef = useRef();
  const matRef  = useRef();
  const offsetX = -(TOTAL_WHITE_KEYS / 2);
  const width   = TOTAL_WHITE_KEYS;

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    // Subtle sine-wave opacity pulse so the bar feels alive
    matRef.current.opacity = 0.18 + 0.08 * Math.sin(clock.elapsedTime * 3);
  });

  return (
    <mesh ref={meshRef} position={[offsetX + width / 2, 0.35, 0.1]}>
      <boxGeometry args={[width, 0.06, 0.1]} />
      <meshStandardMaterial
        ref={matRef}
        color="#3b82f6"
        emissive="#3b82f6"
        emissiveIntensity={2}
        transparent
        opacity={0.2}
      />
    </mesh>
  );
};

// ─── Individual falling note ─────────────────────────────────────────────────
const FallingNote = ({ note, currentPlayheadTime, isTarget, isMissed }) => {
  const meshRef     = useRef();
  const materialRef = useRef();
  const missFlashRef = useRef(0); // 0–1, decays after miss

  const keyData = useMemo(() => PIANO_KEYS.find((k) => k.note === note.note), [note.note]);
  if (!keyData) return null;

  const isBlack   = keyData.isBlack;
  // Match exact Z offset used by PianoKey3D group
  const targetZ   = isBlack ? -1 : 0;
  const targetY   = isBlack ? 0.8 : 0.55; // just above key surface
  const offsetX   = -(TOTAL_WHITE_KEYS / 2);
  // positionX in world space = group offset + key positionX * keySpacing
  const positionX = offsetX + keyData.positionX * 1.0;

  const width  = isBlack ? 0.62 : 0.88;
  const length = note.duration * BEAT_SPEED;
  const height = 0.18;

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    const timeDiff = note.time - currentPlayheadTime;

    // The front edge (lowest Z of the note) should arrive at targetZ when timeDiff==0
    // Box centre is length/2 behind the front edge
    const frontZ = targetZ - timeDiff * BEAT_SPEED;
    meshRef.current.position.z = frontZ - length / 2;

    const isPlaying = currentPlayheadTime >= note.time && currentPlayheadTime <= note.time + note.duration;
    const isPast    = currentPlayheadTime > note.time + note.duration;

    // Drive miss flash
    if (isMissed && missFlashRef.current < 1) missFlashRef.current = 1;
    if (!isMissed && missFlashRef.current > 0)
      missFlashRef.current = Math.max(0, missFlashRef.current - delta * 3);

    if (materialRef.current) {
      if (isPast) {
        materialRef.current.opacity = 0;
      } else if (isMissed || missFlashRef.current > 0.05) {
        // Red miss flash
        materialRef.current.color.set('#ef4444');
        materialRef.current.emissive.set('#ef4444');
        materialRef.current.emissiveIntensity = missFlashRef.current * 1.5;
        materialRef.current.opacity = Math.max(0.3, missFlashRef.current);
      } else if (isPlaying) {
        // Active — bright blue, full opacity
        materialRef.current.color.set(isTarget ? '#10b981' : '#3b82f6');
        materialRef.current.emissive.set(isTarget ? '#10b981' : '#3b82f6');
        materialRef.current.emissiveIntensity = 1.2;
        materialRef.current.opacity = 1;
      } else {
        // Incoming — softer, semi-transparent, brightens as it nears
        const closenessFactor = Math.max(0, 1 - timeDiff / 6);
        materialRef.current.color.set('#60a5fa');
        materialRef.current.emissive.set('#000000');
        materialRef.current.emissiveIntensity = 0;
        materialRef.current.opacity = 0.4 + closenessFactor * 0.45;
      }
    }
  });

  return (
    <RoundedBox
      ref={meshRef}
      args={[width, height, length]}
      radius={0.04}
      smoothness={4}
      position={[positionX, targetY, -80]} // starts off-screen
    >
      <meshStandardMaterial
        ref={materialRef}
        color="#60a5fa"
        emissive="#000000"
        emissiveIntensity={0}
        transparent
        opacity={0.5}
        roughness={0.2}
      />
    </RoundedBox>
  );
};

// ─── Container — no group offset; each FallingNote positions itself in world space ──
const FallingNotes = ({ notes = [], currentPlayheadTime, targetNote, missedNotes = new Set() }) => {
  const visibleNotes = useMemo(
    () =>
      notes.filter(
        (n) =>
          n.time - currentPlayheadTime < 10 &&
          n.time + n.duration + 0.5 > currentPlayheadTime,
      ),
    [notes, currentPlayheadTime],
  );

  return (
    <>
      <HitZoneBar />
      {visibleNotes.map((note, idx) => (
        <FallingNote
          key={`${note.note}-${note.time}-${idx}`}
          note={note}
          currentPlayheadTime={currentPlayheadTime}
          isTarget={note.note === targetNote}
          isMissed={missedNotes.has(`${note.note}-${note.time}`)}
        />
      ))}
    </>
  );
};

export default FallingNotes;
