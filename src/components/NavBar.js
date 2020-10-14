import React from "react";
export default function NavBar() {
    return (
        <div className="nav-cont">
            <nav>
                <h3>KDP Royalty Converter</h3>

                <ul>
                    <li>
                        <a href="#about">About</a>
                    </li>
                    <li>
                        <a href="#instructions">Help</a>
                    </li>
                    <li>
                        <a href="#disclaimer">Disclaimer</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
