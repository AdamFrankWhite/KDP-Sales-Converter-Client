import React from "react";

export default function Instructions() {
  return (
    <section id="instructions">
      <h2>How To Use</h2>
      <ol>
        <li>Go to your KDP Sales Dashboard Reports tab</li>
        <li>Select a date range</li>
        <li>At the bottom of the page, click "Generate Report"</li>
        <li>Upload .xlsx file to the converter</li>
        <li>Select the currency of your choice</li>
      </ol>
      <p>
        Please note: we currently only support reports that use a custom date
        range
      </p>
    </section>
  );
}
