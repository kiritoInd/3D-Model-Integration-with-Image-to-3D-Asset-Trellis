import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath); // Load the GLB model
  // Ensure the model reacts to lights
  scene.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true; // Allow the model to cast shadows
      node.receiveShadow = true; // Allow the model to receive shadows
      if (node.material) {
        node.material.needsUpdate = true; // Ensure the material updates
      }
    }
  });
  return <primitive object={scene} />;
};

const ModelViewer = ({ modelPath }) => {
  return (
    <Canvas
      shadows
      camera={{ position: [-14, 10, 1], fov: 10 }} // Wider FOV for better visibility
      style={{ width: "100%", height: "100vh" }}
    >
      {/* Ambient light for base illumination */}
      <ambientLight intensity={100} />

      {/* Directional light to simulate sunlight */}
      <directionalLight
        position={[-50, 26, 0]}
        intensity={26}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        
      />

      {/* Spotlight for focused lighting */}
      {/* <spotLight
        position={[0.240215, 0.162698, 0.879386]}
        angle={90}
        intensity={100}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      /> */}

      {/* Add a ground plane to receive shadows */}
      {/* <mesh
        receiveShadow
        position={[0, -1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh> */}

      <Model modelPath={modelPath}  position={[0, 10, 0]}/>
      <OrbitControls />
    </Canvas>
  );
};

export default ModelViewer;
