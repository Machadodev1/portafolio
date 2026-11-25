"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export const Scene3D: React.FC = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const particlesGroupRef = useRef<THREE.Group>(null);
  const mainGroupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    // Parallax mouse interaction
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (-state.pointer.y * Math.PI) / 8;

    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        mainGroupRef.current.rotation.y,
        targetX,
        0.05
      );
      mainGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        mainGroupRef.current.rotation.x,
        targetY,
        0.05
      );
    }

    // Continuous orbital movement
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.25;
      coreRef.current.rotation.y += delta * 0.35;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x -= delta * 0.3;
      ring1Ref.current.rotation.z += delta * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.25;
      ring2Ref.current.rotation.z -= delta * 0.15;
    }

    if (particlesGroupRef.current) {
      particlesGroupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <>
      {/* Studio Lighting - Apple Light Aesthetics */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[10, 10, 8]} intensity={2.5} color="#FFFFFF" />
      <directionalLight position={[-10, -5, -5]} intensity={1.0} color="#E8F1FF" />
      <pointLight position={[0, 4, 3]} intensity={3} color="#0071E3" distance={10} />
      <pointLight position={[-3, -2, -2]} intensity={2} color="#47A3FF" distance={8} />

      <group ref={mainGroupRef}>
        <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.8}>
          {/* Central Frosted Glass & Metallic Core */}
          <mesh ref={coreRef} castShadow receiveShadow>
            <icosahedronGeometry args={[1.5, 0]} />
            <meshPhysicalMaterial
              roughness={0.15}
              metalness={0.1}
              transmission={0.88}
              ior={1.52}
              thickness={1.4}
              color="#F0F6FF"
              transparent={true}
              opacity={0.92}
              specularIntensity={1}
              clearcoat={1}
              clearcoatRoughness={0.1}
            />
          </mesh>

          {/* Inner Polyhedron Node */}
          <mesh scale={0.75}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#0071E3"
              roughness={0.2}
              metalness={0.85}
              emissive="#004C99"
              emissiveIntensity={0.3}
            />
          </mesh>

          {/* Concentric Architectural Rings */}
          <mesh ref={ring1Ref}>
            <torusGeometry args={[2.2, 0.03, 16, 100]} />
            <meshStandardMaterial
              color="#0071E3"
              metalness={0.95}
              roughness={0.1}
              emissive="#0071E3"
              emissiveIntensity={0.2}
            />
          </mesh>

          <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[2.6, 0.02, 16, 100]} />
            <meshStandardMaterial
              color="#86868B"
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>

          {/* Floating Data Nodes / Satellites */}
          <group ref={particlesGroupRef}>
            {[
              { pos: [2.1, 1.2, 0.5], size: 0.08, color: "#0071E3" },
              { pos: [-1.8, 1.8, -0.8], size: 0.06, color: "#34C759" },
              { pos: [0.8, -2.2, 1.1], size: 0.07, color: "#86868B" },
              { pos: [-2.0, -1.0, 1.3], size: 0.05, color: "#0071E3" },
              { pos: [1.6, -1.5, -1.2], size: 0.07, color: "#0071E3" },
            ].map((node, i) => (
              <mesh key={i} position={node.pos as [number, number, number]}>
                <sphereGeometry args={[node.size, 16, 16]} />
                <meshStandardMaterial
                  color={node.color}
                  roughness={0.1}
                  metalness={0.9}
                  emissive={node.color}
                  emissiveIntensity={0.5}
                />
              </mesh>
            ))}
          </group>
        </Float>
      </group>
    </>
  );
};
