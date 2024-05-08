import { useState } from "react";
import "./App.css";
import "./components/style.css";

import Translate from "./components/Translate";
function App() {
  
  
  return (
    <div className="gg">
      
      <div className="main-div">
        <h1 className="heading">Multi Language Translator</h1>
        <Translate/>
      </div>
    </div>
  );
}

export default App;
