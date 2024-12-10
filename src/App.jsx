import React from "react";
import ModelViewer from "./ModelViewer";
import model from './assets/gg.glb'; 
import gp from './assets/4.mp4'; 
import gp1 from './assets/10.mp4';

function App() {
  return (
    <div className="relative">
      <div className="abs text-white">
        This 3D model is created using 
        <br/>
        <a href="https://huggingface.co/spaces/JeffreyXiang/TRELLIS" target="_blank" rel="noopener noreferrer">
           TRELLIS on Hugging Face Spaces
        </a>.
        This repository (<a href="https://github.com/kiritoInd/3D-Model-Integration-with-Image-to-3D-Asset-Trellis" target="_blank" rel="noopener noreferrer">repolink</a>) provides a simple and efficient way to integrate these models into your websites.
      </div>

      <ModelViewer modelPath={model} videoSrc={gp} videoSrc1={gp1} />

    </div>
  );
}

export default App;
