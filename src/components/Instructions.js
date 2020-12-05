import React from "react";

export default function Instructions() {
    return (
        <section id="instructions">
            <div className="content-frame">
                <h2>How To Use</h2>
                <hr></hr>
                <ul>
                    <li>
                        <span>1</span>Go to your KDP Sales Dashboard Reports tab
                    </li>
                    <li>
                        <span>2</span>Select a date range
                    </li>
                    <li>
                        <span>3</span>At the bottom of the page, click "Generate
                        Report"
                    </li>
                    <li>
                        <span>4</span>Upload .xlsx file to the converter
                    </li>
                    <li>
                        <span>5</span>Select the currency of your choice
                    </li>
                </ul>
                <p>
                    Please note: we currently only support reports that use a
                    custom date range
                </p>
            </div>
        </section>
    );
}
