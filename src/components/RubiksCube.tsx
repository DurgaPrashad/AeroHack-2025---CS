import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import { Group, Mesh } from 'three';

// Cube face colors
const COLORS = {
  0: '#DC2626', // red
  1: '#F97316', // orange  
  2: '#FACC15', // yellow
  3: '#16A34A', // green
  4: '#2563EB', // blue
  5: '#F8FAFC',  // white
  6: '#1E293B' // slate-800 for inner/hidden
};

interface CubePieceProps {
  position: [number, number, number];
  faces: number[];
  size: number;
}

const CubePiece = ({ position, faces, size }: CubePieceProps) => {
  const meshRef = useRef<Mesh>(null);
  
  return (
    <Box
      ref={meshRef}
      position={position}
      args={[size * 0.95, size * 0.95, size * 0.95]}
    >
      {faces.map((faceColor, index) => (
        <meshStandardMaterial
          key={index}
          attach={`material-${index}`}
          color={COLORS[faceColor as keyof typeof COLORS]}
          metalness={0.1}
          roughness={0.3}
        />
      ))}
    </Box>
  );
};

interface RubiksCubeProps {
  size: number;
  autoRotate?: boolean;
}

const RubiksCube = ({ size, autoRotate = false }: RubiksCubeProps) => {
  const groupRef = useRef<Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  // Generate cube pieces based on size
  const pieces = useMemo(() => {
    const cubeSize = 1;
    const spacing = cubeSize;
    const offset = ((size - 1) * spacing) / 2;
    const pieces = [];

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        for (let z = 0; z < size; z++) {
          // Skip inner pieces for larger cubes (they're not visible)
          const isEdge = x === 0 || x === size - 1 || 
                        y === 0 || y === size - 1 || 
                        z === 0 || z === size - 1;
          
          if (!isEdge && size > 2) continue;

          const position: [number, number, number] = [
            x * spacing - offset,
            y * spacing - offset,
            z * spacing - offset
          ];

          // Determine face colors based on position
          const faces = [
            x === size - 1 ? 0 : -1, // right - red
            x === 0 ? 1 : -1,         // left - orange
            y === size - 1 ? 2 : -1, // top - yellow
            y === 0 ? 3 : -1,         // bottom - green
            z === size - 1 ? 4 : -1, // front - blue
            z === 0 ? 5 : -1          // back - white
          ].map(face => face === -1 ? 6 : face); // 6 for black/hidden faces

          pieces.push({
            key: `${x}-${y}-${z}`,
            position,
            faces
          });
        }
      }
    }
    return pieces;
  }, [size]);

  return (
    <group ref={groupRef}>
      {pieces.map((piece) => (
        <CubePiece
          key={piece.key}
          position={piece.position}
          faces={piece.faces}
          size={1}
        />
      ))}
    </group>
  );
};

interface RubiksCubeSceneProps {
  size: number;
  autoRotate?: boolean;
}

const RubiksCubeScene = ({ size, autoRotate = false }: RubiksCubeSceneProps) => {
  return (
    <div className="w-full h-full min-h-[400px] cube-glow rounded-xl overflow-hidden">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        shadows
        className="bg-transparent"
      >
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          shadow-mapSize={[1024, 1024]}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* The Rubik's Cube */}
        <RubiksCube size={size} autoRotate={autoRotate} />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          maxDistance={15}
          minDistance={3}
        />
      </Canvas>
    </div>
  );
};

export default RubiksCubeScene;