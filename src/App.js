import React from "react";
import FileInput from "./components/FileInput";
import "./App.css";
import LoadingOverlay from "react-loading-overlay";
import { useState } from "react";
import Loader from "react-loader-spinner";
import Instructions from "./components/Instructions";
import NavBar from "./components/NavBar";
import About from "./components/About";
import Disclaimer from "./components/Disclaimer";
import Footer from "./components/Footer";
function App() {
    const [loading, setLoading] = useState(false);
    return (
        <div className="App">
            <header className="header">
                <NavBar />
                <div className="header-content">
                    <h1>KDP Royalty Converter</h1>
                    <p>
                        Tired of having to convert all the different royalty
                        currencies?
                    </p>
                    <p>
                        Upload your .xlsx report file to convert all your
                        royalties into a single currency
                    </p>
                    <p className="text-small">
                        *Please note this is an approximation only, and is
                        reliant on the data supplied, as well as the current
                        exchange rate, which may differ slightly from the rate
                        used by Amazon when calculating your royalties
                    </p>
                    <a href="#disclaimer">Disclaimer</a>
                </div>
            </header>

            <LoadingOverlay
                active={loading}
                spinner={
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                }
                text="Converting..."
            >
                <FileInput loading={setLoading} />
            </LoadingOverlay>

            <Instructions />
            <About />
            <Disclaimer />
            <Footer />
        </div>
    );
}

export default App;
