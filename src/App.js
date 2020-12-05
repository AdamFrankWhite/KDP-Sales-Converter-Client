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
import CookieConsent from "react-cookie-consent";
function App() {
    const domainGroupId = "e3c514f6-3c5f-4271-9dc4-9f062ee1505c";
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
                    <hr></hr>
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
            <Instructions />
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

            <CookieConsent
                location="bottom"
                buttonText="Got it!"
                cookieName="myAwesomeCookieName2"
                style={{ fontSize: "0.7em", background: "black" }}
                className="fade-in"
                buttonStyle={{
                    color: "#4e503b",
                    fontSize: "1em",
                    background: "#14a7d0",
                    color: "white",
                    borderRadius: "5px",
                    padding: "0.5em 1em",
                }}
                // expires={150}
            >
                We use cookies and other tracking technologies to improve your
                browsing experience on our website, to show you personalized
                content and targeted ads, to analyze our website traffic, and to
                understand where our visitors are coming from. By using this
                website you agree to these terms.
            </CookieConsent>
            <Footer />
        </div>
    );
}

export default App;
