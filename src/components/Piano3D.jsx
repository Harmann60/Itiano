import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox } from '@react-three/drei';
import PianoKey3D from './PianoKey3D';
import { PIANO_KEYS, TOTAL_WHITE_KEYS } from '../utils/keyMap';

const Piano3DScene = ({ activeNotes, targetNote, onPlayNote }) => {
  // Center the piano
  const offsetX = -(TOTAL_WHITE_KEYS / 2);
  const pianoWidth = TOTAL_WHITE_KEYS * 1.0;

  return (
    <group position={[offsetX, 0, 0]}>
      {/* Piano Base */}
      <RoundedBox
        args={[pianoWidth + 1, 1.2, 8]}
        radius={0.1}
        smoothness={4}
        position={[pianoWidth / 2 - 0.5, -0.6, 2.5]}
      >
        <meshStandardMaterial color="#1a1a1a" roughness={0.7} metalness={0.2} />
      </RoundedBox>

      {PIANO_KEYS.map((keyData) => (
        <PianoKey3D
          key={keyData.note}
          note={keyData.note}
          isBlack={keyData.isBlack}
          positionX={keyData.positionX}
          isActive={activeNotes.includes(keyData.note)}
          isTarget={targetNote === keyData.note}
          onPlayNote={onPlayNote}
        />
      ))}
    </group>
  );
};

const Piano3D = ({ activeNotes = [], targetNote = null, onPlayNote }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#000000' }}>
      <Canvas camera={{ position: [0, 18, 14], fov: 40 }}>
        <color attach="background" args={['#000000']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 15, 5]} intensity={1.2} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={0.3} color="#ffffff" />

        <Suspense fallback={null}>
          <Piano3DScene 
            activeNotes={activeNotes} 
            targetNote={targetNote} 
            onPlayNote={onPlayNote} 
          />
          {/* Subtle reflections */}
          <Environment preset="city" />
          {/* Fake shadow underneath the piano */}
          <ContactShadows position={[0, -0.5, 3]} opacity={0.4} scale={50} blur={2} far={4} />
        </Suspense>

        {/* Allow users to rotate and zoom the piano */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2} // Don't go below ground
        />
      </Canvas>
    </div>
  );
};

export default Piano3D;
