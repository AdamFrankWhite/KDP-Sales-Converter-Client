import React from "react";
import FileInput from "./components/FileInput";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>KDP Royalty Converter</h1>
        <p>Tired of having to convert all the different royalty currencies?</p>
        <FileInput />
      </header>
    </div>
  );
}

export default App;
