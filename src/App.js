import React from "react";
import FileInput from "./components/FileInput";
import "./App.css";
import LoadingOverlay from "react-loading-overlay";
import { useState } from "react";
import Loader from "react-loader-spinner";
import Instructions from "./components/Instructions";

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
            Upload your .xlsx report file to convert all your royalties into a
            single currency
          </p>
          <p className="text-small">
            *Please note this is an approximation only, and is reliant on the
            data supplied, as well as the current exchange rate, which may
            differ slightly from the rate used by Amazon when calculating your
            royalties
          </p>
          <a href="#disclaimer">Disclaimer</a>
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

      <hr className="hr-main"></hr>
      <Instructions />
      <section id="disclaimer">
        <h3>Disclaimer</h3>
        <p>
          We do not take liability for any loss or damage including without
          limitation, indirect or consequential loss or damage, or any loss or
          damage whatsoever arising out of, or in connection with the use of the
          website. We put every effort in keeping the website up and running at
          all times. However, we cannot take responsibility for and will not be
          liable for, the website being temporarily unavailable due to technical
          issues that would be beyond our control.
        </p>
        <p>
          Please note that the calculations displayed by this tool may not be
          100% accurate, correct and/or complete and that they are intended
          solely for general information and education purposes. You should not
          take any action on the basis of the information provided by this
          application as it should NOT be considered as a substitute for any
          professional financial service or advice. The creator of this
          calculator is in no way liable of any actions that might be taken by
          users.
        </p>
      </section>
    </div>
  );
}

export default App;
