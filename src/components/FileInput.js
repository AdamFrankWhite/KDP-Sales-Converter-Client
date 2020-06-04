import React, { useEffect, useState } from "react";
import axios from "axios";
import ConversionTable from "./ConversionTable";
import runMonthlyReport from "../functions/MonthlyReport";

export default function FileInput(props) {
  const [ebooks, setEbooks] = useState([]);
  const [paperbacks, setPaperbacks] = useState([]);

  const [data, setData] = useState(null);
  useEffect(() => {
    if (data) {
      let parsedData = JSON.parse(data);
      //Filter books in paperbacks and ebooks
      let filteredEbooks = parsedData.filter(
        (item) => !item["Transaction Type"].includes("Paperback")
      );
      let filteredPaperbacks = parsedData.filter((item) =>
        item["Transaction Type"].includes("Paperback")
      );
      console.log(filteredEbooks, filteredPaperbacks);
      //Update state
      setEbooks(filteredEbooks);
      setPaperbacks(filteredPaperbacks);
    }
  }, [data]);

  const handleUpload = (e) => {
    props.loading(true);
    e.nativeEvent.stopImmediatePropagation();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    axios.post("http://localhost:5000/convert", formData).then((data) => {
      console.log(data.data);
      //checks if monthly report, if so need to restructure json
      if (data.data[0].hasOwnProperty("Sales Period")) {
        console.log("Monthly report");
        console.log(data);
        runMonthlyReport(data.data);
      } else if (data.data[0].hasOwnProperty("Date")) {
        console.log("Historical report");
      } else {
        setData(JSON.stringify(data.data));
        props.loading(false);
      }
    });
  };
  const [myCurrency, setMyCurrency] = useState("EUR");
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

      <select
        onChange={(e) => {
          setMyCurrency(e.target.value);
        }}
      >
        <option selected value="EUR">
          E
        </option>
        <option value="GBP">£</option>
        <option value="USD">$</option>
      </select>
      <ConversionTable
        chosenCurrency={myCurrency}
        rates={exchangeRates}
        paperbacks={paperbacks}
        ebooks={ebooks}
      />
    </div>
  );
}
