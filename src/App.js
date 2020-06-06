import React from "react";
import FileInput from "./components/FileInput";
import "./App.css";
import LoadingOverlay from "react-loading-overlay";
import { useState } from "react";
import Loader from "react-loader-spinner";

function App() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="App">
      <header className="header">
        <div class="header-content">
          <h1>KDP Royalty Converter</h1>
          <p>
            Tired of having to convert all the different royalty currencies?
          </p>
          <p>
            Instructions: Upload an XLSX file{" "}
            <b>using the custom date range on KDP Dashboard</b> - we do not
            currently support monthly royalties or historical data.
          </p>
        </div>
      </header>
      <LoadingOverlay
        active={loading}
        spinner={
          <Loader type="Puff" color="#00BFFF" height={100} width={100} />
        }
        text="Converting..."
      >
        <FileInput loading={setLoading} />
      </LoadingOverlay>

      <p>
        *Please note this is an approximation only, and is reliant on the data
        supplied, as well as the current exchange rate, wich may differ slightly
        from the historical rate used by Amazon
      </p>
    </div>
  );
}

export default App;
