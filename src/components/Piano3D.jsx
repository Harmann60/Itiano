import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import PianoKey3D from './PianoKey3D';
import { PIANO_KEYS, TOTAL_WHITE_KEYS } from '../utils/keyMap';

const Piano3DScene = ({ activeNotes, targetNote, onPlayNote }) => {
  // Center the piano
  const offsetX = -(TOTAL_WHITE_KEYS / 2);

  return (
    <group position={[offsetX, 0, 0]}>
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
    <div style={{ width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden', background: '#0a0a0a', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
      <Canvas camera={{ position: [0, 15, 20], fov: 45 }}>
        <color attach="background" args={['#0f172a']} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 5]} intensity={1.5} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#3b82f6" />

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
