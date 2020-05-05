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
        <p>
          *Please note this is an approximation only, and is reliant on the data
          supplied, as well as the current exchange rate, wich may differ
          slightly from the historical rate used by Amazon
        </p>
      </header>
    </div>
  );
}

export default App;
