import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PianoKey3D = ({ note, isBlack, positionX, isActive, isTarget, onPlayNote }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  // Dimensions
  const keyWidth = 0.9;
  const keyHeight = isBlack ? 0.6 : 0.5;
  const keyDepth = isBlack ? 4 : 6;
  const keySpacing = 1.0;

  // Base Colors
  const baseColor = isBlack ? '#111111' : '#f0f0f0';
  const activeColor = isBlack ? '#333333' : '#cccccc';
  
  // Target/Correct Glow Colors
  const targetColor = '#3b82f6'; // Blue
  const correctColor = '#10b981'; // Green

  useFrame((state, delta) => {
    if (!meshRef.current || !materialRef.current) return;

    // Animation: Press down (rotate on X axis slightly)
    const targetRotationX = isActive ? 0.05 : 0;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetRotationX,
      0.2 // Speed
    );

    // Color interpolation
    let targetMatColor = new THREE.Color(baseColor);
    let targetEmissive = new THREE.Color('#000000');

    if (isActive && isTarget) {
      targetMatColor.set(correctColor);
      targetEmissive.set(correctColor).multiplyScalar(0.5);
    } else if (isActive) {
      targetMatColor.set(activeColor);
    } else if (isTarget) {
      targetMatColor.set(targetColor);
      targetEmissive.set(targetColor).multiplyScalar(0.5);
    }

    materialRef.current.color.lerp(targetMatColor, 0.1);
    materialRef.current.emissive.lerp(targetEmissive, 0.1);
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    onPlayNote(note);
  };

  // Position logic
  // White keys pivot from the back. Black keys sit higher and further back.
  const zPosition = isBlack ? -1 : 0;
  const yPosition = isBlack ? 0.3 : 0;

  return (
    <group position={[positionX * keySpacing, yPosition, zPosition]}>
      {/* Shift pivot point to the back of the key */}
      <mesh
        ref={meshRef}
        position={[0, 0, keyDepth / 2]}
        onPointerDown={handlePointerDown}
      >
        <boxGeometry args={[keyWidth, keyHeight, keyDepth]} />
        <meshStandardMaterial
          ref={materialRef}
          color={baseColor}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
};

export default PianoKey3D;
