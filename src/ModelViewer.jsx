import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Model = ({ modelPath, videoSrc, videoSrc1 }) => {
  const { scene } = useGLTF(modelPath);

  // Create video elements
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = videoSrc;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });

  const [video1] = useState(() => {
    const vid = document.createElement("video");
    vid.src = videoSrc1;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });

  React.useEffect(() => {
    // Create video textures
    const videoTexture = new THREE.VideoTexture(video);
    const videoTexture1 = new THREE.VideoTexture(video1);
    videoTexture.flipY = false;
    videoTexture.minFilter = THREE.NearestFilter
    videoTexture.magFilter = THREE.NearestFilter
    videoTexture.generateMipmaps = false
    videoTexture.encoding = THREE.sRGBEncoding;

    videoTexture1.flipY = false;
    
    videoTexture1.minFilter = THREE.NearestFilter
    videoTexture1.magFilter = THREE.NearestFilter
    videoTexture1.generateMipmaps = false
    videoTexture1.encoding = THREE.sRGBEncoding;
    // Traverse the scene to find the meshes and apply the textures
    scene.traverse((node) => {
      if (node.isMesh && node.userData.name === "screen2") {
        node.material.map = videoTexture;
        node.material.needsUpdate = true;
      }
      if (node.isMesh && node.userData.name === "screen") {
        node.material.map = videoTexture1;
        node.material.needsUpdate = true;
      }
    });
  }, [scene, video, video1]);

  return <primitive object={scene} rotation={[0, -0.9, 0]} />;
};

const ModelViewer = ({ modelPath, videoSrc , videoSrc1}) => {
  return (
    <Canvas
      shadows
      camera={{ position: [-14, 10, 1], fov: 10 }}
      style={{ width: "100%", height: "100vh" }}
    >
      {/* <ambientLight intensity={1} /> */}
      <directionalLight position={[-50, 26, 0]} intensity={8} castShadow />
      <Suspense fallback={null}>
        <Model modelPath={modelPath} videoSrc={videoSrc} videoSrc1={videoSrc1} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default ModelViewer;
