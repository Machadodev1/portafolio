"use client";

import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export const Avatar3DScene: React.FC = () => {
  const avatarGroupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const eyesGroupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftPupilRef = useRef<THREE.Mesh>(null);
  const rightPupilRef = useRef<THREE.Mesh>(null);

  // Blinking animation state
  const lastBlinkRef = useRef(0);
  const [isBlinking, setIsBlinking] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Mouse Tracking / Head Look
    const targetRotY = (state.pointer.x * Math.PI) / 6; // +/- 30 degrees horizontal
    const targetRotX = (-state.pointer.y * Math.PI) / 8; // +/- 22 degrees vertical
    const targetRotZ = (-state.pointer.x * Math.PI) / 24;

    if (headGroupRef.current) {
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.y,
        targetRotY,
        0.08
      );
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.x,
        targetRotX,
        0.08
      );
      headGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.z,
        targetRotZ,
        0.08
      );
      // Subtle organic breathing
      headGroupRef.current.position.y = Math.sin(time * 2.2) * 0.035;
    }

    // 2. Eyes and Pupils Looking Direction
    const targetPupilX = THREE.MathUtils.clamp(state.pointer.x * 0.035, -0.025, 0.025);
    const targetPupilY = THREE.MathUtils.clamp(state.pointer.y * 0.035, -0.025, 0.025);

    if (leftPupilRef.current && rightPupilRef.current) {
      leftPupilRef.current.position.x = THREE.MathUtils.lerp(
        leftPupilRef.current.position.x,
        -0.22 + targetPupilX,
        0.15
      );
      leftPupilRef.current.position.y = THREE.MathUtils.lerp(
        leftPupilRef.current.position.y,
        0.05 + targetPupilY,
        0.15
      );

      rightPupilRef.current.position.x = THREE.MathUtils.lerp(
        rightPupilRef.current.position.x,
        0.22 + targetPupilX,
        0.15
      );
      rightPupilRef.current.position.y = THREE.MathUtils.lerp(
        rightPupilRef.current.position.y,
        0.05 + targetPupilY,
        0.15
      );
    }

    // 3. Periodic Blink Animation (every 3.5s)
    if (time - lastBlinkRef.current > 3.6) {
      setIsBlinking(true);
      lastBlinkRef.current = time;
      setTimeout(() => setIsBlinking(false), 140);
    }

    if (eyesGroupRef.current) {
      const currentScaleY = eyesGroupRef.current.scale.y;
      const targetScaleY = isBlinking ? 0.1 : 1.0;
      eyesGroupRef.current.scale.y = THREE.MathUtils.lerp(currentScaleY, targetScaleY, 0.4);
    }
  });

  return (
    <>
      {/* Apple Studio Lighting */}
      <ambientLight intensity={1.5} color="#FFFFFF" />
      <directionalLight position={[5, 8, 6]} intensity={2.2} color="#FFFFFF" castShadow />
      <directionalLight position={[-5, 4, -4]} intensity={1.0} color="#E8F1FF" />
      <directionalLight position={[0, -4, 5]} intensity={0.6} color="#FFF8F0" />
      <pointLight position={[0, 2, 4]} intensity={1.8} color="#FFFFFF" distance={8} />

      <Float speed={1.8} rotationIntensity={0.15} floatIntensity={0.3}>
        <group ref={avatarGroupRef} position={[0, -0.2, 0]}>

          {/* ================= TORSO / HOODIE (Matching User's Green Hoodie) ================= */}
          <group position={[0, -1.2, 0]}>
            {/* Main Green Hoodie Torso */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.9, 1.15, 1.1, 32]} />
              <meshStandardMaterial
                color="#28C76F"
                roughness={0.6}
                metalness={0.05}
              />
            </mesh>

            {/* Shoulders rounding */}
            <mesh position={[-0.85, 0.2, 0]} rotation={[0, 0, Math.PI / 6]}>
              <capsuleGeometry args={[0.3, 0.5, 16, 16]} />
              <meshStandardMaterial color="#28C76F" roughness={0.6} />
            </mesh>
            <mesh position={[0.85, 0.2, 0]} rotation={[0, 0, -Math.PI / 6]}>
              <capsuleGeometry args={[0.3, 0.5, 16, 16]} />
              <meshStandardMaterial color="#28C76F" roughness={0.6} />
            </mesh>

            {/* Lavender / White inner collar (as in Figma) */}
            <mesh position={[0, 0.46, 0.05]}>
              <torusGeometry args={[0.42, 0.12, 16, 32]} />
              <meshStandardMaterial color="#E9D5FF" roughness={0.4} />
            </mesh>

            {/* Hoodie Strings */}
            <mesh position={[-0.14, 0.05, 0.44]} rotation={[0, 0, 0.05]}>
              <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
            </mesh>
            <mesh position={[0.14, 0.05, 0.44]} rotation={[0, 0, -0.05]}>
              <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
            </mesh>
          </group>

          {/* ================= HEAD GROUP (TRACKS CURSOR) ================= */}
          <group ref={headGroupRef} position={[0, 0.25, 0]}>

            {/* Neck */}
            <mesh position={[0, -0.55, 0]}>
              <cylinderGeometry args={[0.26, 0.32, 0.4, 16]} />
              <meshStandardMaterial color="#F4B896" roughness={0.5} />
            </mesh>

            {/* Main Face / Head Shape */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <sphereGeometry args={[0.78, 32, 32]} />
              <meshStandardMaterial
                color="#F8C4A5"
                roughness={0.45}
                metalness={0.02}
              />
            </mesh>

            {/* Ears */}
            <mesh position={[-0.78, 0, -0.05]} rotation={[0, -0.2, 0]}>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial color="#F8C4A5" roughness={0.5} />
            </mesh>
            <mesh position={[0.78, 0, -0.05]} rotation={[0, 0.2, 0]}>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial color="#F8C4A5" roughness={0.5} />
            </mesh>

            {/* Cheeks Blush */}
            <mesh position={[-0.42, -0.15, 0.62]} scale={[1, 0.6, 0.2]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshBasicMaterial color="#FF9999" transparent opacity={0.35} />
            </mesh>
            <mesh position={[0.42, -0.15, 0.62]} scale={[1, 0.6, 0.2]}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshBasicMaterial color="#FF9999" transparent opacity={0.35} />
            </mesh>

            {/* Nose */}
            <mesh position={[0, -0.08, 0.76]} rotation={[0.2, 0, 0]}>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial color="#EEA580" roughness={0.5} />
            </mesh>

            {/* Friendly Smile */}
            <mesh position={[0, -0.28, 0.72]} rotation={[0.1, 0, 0]}>
              <torusGeometry args={[0.15, 0.025, 16, 32, Math.PI]} />
              <meshStandardMaterial color="#8B4513" roughness={0.3} />
            </mesh>

            {/* ================= EYES GROUP (WITH BLINK) ================= */}
            <group ref={eyesGroupRef} position={[0, 0.06, 0.68]}>
              {/* Left Eye Sclera */}
              <mesh ref={leftEyeRef} position={[-0.22, 0.05, 0]}>
                <sphereGeometry args={[0.11, 16, 16]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
              </mesh>
              {/* Left Eye Pupil */}
              <mesh ref={leftPupilRef} position={[-0.22, 0.05, 0.08]}>
                <sphereGeometry args={[0.065, 16, 16]} />
                <meshStandardMaterial color="#1D1D1F" roughness={0.1} />
              </mesh>
              {/* Left Pupil Highlight */}
              <mesh position={[-0.20, 0.07, 0.13]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>

              {/* Right Eye Sclera */}
              <mesh ref={rightEyeRef} position={[0.22, 0.05, 0]}>
                <sphereGeometry args={[0.11, 16, 16]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
              </mesh>
              {/* Right Eye Pupil */}
              <mesh ref={rightPupilRef} position={[0.22, 0.05, 0.08]}>
                <sphereGeometry args={[0.065, 16, 16]} />
                <meshStandardMaterial color="#1D1D1F" roughness={0.1} />
              </mesh>
              {/* Right Pupil Highlight */}
              <mesh position={[0.24, 0.07, 0.13]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>

              {/* Eyebrows */}
              <mesh position={[-0.23, 0.22, 0.02]} rotation={[0, 0, 0.08]}>
                <capsuleGeometry args={[0.028, 0.18, 8, 8]} />
                <meshStandardMaterial color="#2B1D16" roughness={0.6} />
              </mesh>
              <mesh position={[0.23, 0.22, 0.02]} rotation={[0, 0, -0.08]}>
                <capsuleGeometry args={[0.028, 0.18, 8, 8]} />
                <meshStandardMaterial color="#2B1D16" roughness={0.6} />
              </mesh>
            </group>

            {/* ================= DARK STYLIZED HAIR (As in Figma) ================= */}
            <group position={[0, 0.25, 0]}>
              {/* Hair Back Cap */}
              <mesh position={[0, 0.08, -0.1]}>
                <sphereGeometry args={[0.82, 32, 32]} />
                <meshStandardMaterial color="#221815" roughness={0.5} />
              </mesh>

              {/* Top Hair Volume */}
              <mesh position={[0, 0.6, 0.1]} rotation={[-0.15, 0, 0]}>
                <sphereGeometry args={[0.62, 24, 24]} />
                <meshStandardMaterial color="#221815" roughness={0.5} />
              </mesh>

              {/* Front Wavy Tuft / Quiff (Distinctive style from Figma) */}
              <mesh position={[0.12, 0.68, 0.42]} rotation={[0.4, 0.2, -0.3]}>
                <coneGeometry args={[0.28, 0.6, 16]} />
                <meshStandardMaterial color="#2E201B" roughness={0.4} />
              </mesh>
              <mesh position={[-0.15, 0.65, 0.45]} rotation={[0.3, -0.2, 0.3]}>
                <coneGeometry args={[0.25, 0.5, 16]} />
                <meshStandardMaterial color="#2A1E19" roughness={0.4} />
              </mesh>

              {/* Sideburns */}
              <mesh position={[-0.72, 0.08, 0.2]}>
                <capsuleGeometry args={[0.1, 0.3, 8, 8]} />
                <meshStandardMaterial color="#221815" roughness={0.5} />
              </mesh>
              <mesh position={[0.72, 0.08, 0.2]}>
                <capsuleGeometry args={[0.1, 0.3, 8, 8]} />
                <meshStandardMaterial color="#221815" roughness={0.5} />
              </mesh>
            </group>

          </group>
        </group>
      </Float>
    </>
  );
};
