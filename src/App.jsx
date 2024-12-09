import React from "react";
import ModelViewer from "./ModelViewer";
import model from './assets/model5.glb'; // Import the background image

function App() {
  return (
    <div className="rel">
      <ModelViewer modelPath={model} />
    </div>
  );
}

export default App;
