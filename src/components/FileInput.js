import React, { useEffect, useState } from "react";
import axios from "axios";
import ConversionTable from "./ConversionTable";

export default function FileInput() {
  const [ebooks, setEbooks] = useState([]);
  const [paperbacks, setPaperbacks] = useState([]);
  useEffect(() => {
    let data = window.localStorage.getItem("data");
    //Sanitise data by stringify then parse - for some reason won't work directly
    let pData = JSON.parse(data);

    //Filter books in paperbacks and ebooks
    let filteredEbooks = pData.filter(
      (item) => !item["Transaction Type"].includes("Paperback")
    );
    let filteredPaperbacks = pData.filter((item) =>
      item["Transaction Type"].includes("Paperback")
    );

    //Update state
    setEbooks(filteredEbooks);
    setPaperbacks(filteredPaperbacks);
  }, []);

  const handleUpload = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    // e.preventDefault();
    axios.post("http://localhost:5000/convert", formData).then((data) => {
      console.log(data.data);
      window.localStorage.setItem("data", JSON.stringify(data.data));
    });

    // e.preventDefault();
  };
  const [myCurrency, setMyCurrency] = useState("");
  const [exchangeRates, setExchangeRates] = useState([]);
  const selectCurrency = () => {
    axios
      .get(`https://api.exchangeratesapi.io/latest?base=${myCurrency}`)
      .then((res) => {
        setExchangeRates(res.data.rates);
        console.log(res.data.rates);
      });
  };
  // Update sales totals once myCurrency has been set
  useEffect(() => {
    selectCurrency();
  }, [myCurrency]);
  return (
    <div>
      <p>Upload your royalty XLSX file here:</p>
      <input onChange={handleUpload} type="file"></input>
      {/* <button
        onClick={() => {
          console.log("Paperbacks: ", paperbacks);
          console.log("Ebooks: ", ebooks);
        }}
      >
        Sort
      </button> */}
      <select
        onChange={(e) => {
          console.log(myCurrency);

          setMyCurrency(e.target.value);
          console.log(myCurrency);
          // EVERYTHING is working fine, except setMyCurrency is async, so when selectCurrency is called, it is before updated currency. need to use useEffect with a callback
          selectCurrency();
        }}
      >
        <option selected value="EUR">
          E
        </option>
        <option value="GBP">£</option>
        <option value="USD">$</option>
      </select>
      <button onClick={() => console.log(myCurrency)}>Check</button>
      <ConversionTable
        chosenCurrency={myCurrency}
        rates={exchangeRates}
        paperbacks={paperbacks}
        ebooks={ebooks}
      />
    </div>
  );
}
