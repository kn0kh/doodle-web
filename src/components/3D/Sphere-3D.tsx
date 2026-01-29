"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

function Vector3D({
  direction,
  position,
  color = "white",
}: {
  direction: [number, number, number];
  position: [number, number, number];
  color?: string;
}) {
  const memoizedArrowHelper = useMemo(() => {
    const dirVec = new THREE.Vector3(...direction);
    const dir =
      dirVec.lengthSq() === 0 ? dirVec.normalize() : new THREE.Vector3(0, 1, 0); // TODO zero edge case -> throw error?
    const origin = new THREE.Vector3(...position);
    const length = 2;

    return new THREE.ArrowHelper(
      dir,
      origin,
      length,
      color,
      length * 0.05,
      length * 0.05,
    );
  }, [direction, position, color]);

  return <primitive object={memoizedArrowHelper} />;
}

export default function Sphere3D({
  secretVectorDir,
  guessVecDirs,
}: {
  secretVectorDir: [number, number, number];
  guessVecDirs: [number, number, number][];
}) {
  return (
    <div className="vector-3d-container">
      <Canvas>
        <mesh rotation={[0, 0, 0]}>
          <sphereGeometry args={[1, 7, 7]} />
          <meshStandardMaterial color="orange" wireframe />
        </mesh>
        <Vector3D
          direction={secretVectorDir}
          position={[0, 0, 0]}
          color="orange"
        />
        {guessVecDirs.map((dir, index) => (
          <Vector3D key={index} direction={dir} position={[0, 0, 0]} />
        ))}
        <PerspectiveCamera makeDefault position={[3, 3, 3]} />
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
    </div>
  );
}
