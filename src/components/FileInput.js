import React, { useEffect, useState } from "react";
import axios from "axios";
import ConversionTable from "./ConversionTable";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";

export default function FileInput(props) {
    const [ebooks, setEbooks] = useState([]);
    const [paperbacks, setPaperbacks] = useState([]);
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState("");
    const [data, setData] = useState(null);
    useEffect(() => {
        // When book data changes, set ebook/paperback arrays
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
        // e.nativeEvent.stopImmediatePropagation();
        const file = e.target.files[0];
        if (
            file.type !==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) {
            setError("Incorrect File Type: " + file.type);
            props.loading(false);
            return;
        }
        //Set filename hook
        setFileName(file.name);
        //Create formData
        const formData = new FormData();
        formData.append("file", file);
        axios
            .post(
                "https://powerful-refuge-29455.herokuapp.com/convert",
                // "http://localhost:5000/convert",
                formData
            )
            .then((data) => {
                // Set data to state
                setData(JSON.stringify(data.data));
                props.loading(false);
            });
    };
    const [myCurrency, setMyCurrency] = useState("EUR");
    const [exchangeRates, setExchangeRates] = useState([]);
    const selectCurrency = () => {
        axios
            .get(
                `https://v6.exchangerate-api.com/v6/e5e3cc2708d1043e5747038d/latest/${myCurrency}`
            )
            .then((res) => {
                console.log(res);
                setExchangeRates(res.data.conversion_rates);
            });
    };
    // Update sales totals once myCurrency has been set
    useEffect(() => {
        selectCurrency();
    }, [myCurrency]);
    return (
        <div>
            <div className="file-input-cont">
                {/* <p>Upload your royalty XLSX file here:</p> */}
                {/* Hidden */}
                <input
                    onChange={handleUpload}
                    id="file-upload"
                    type="file"
                    accept=".xlsx"
                ></input>
                {/* File Input UI */}
                <label for="file-upload" className="upload-link">
                    <DescriptionOutlinedIcon
                        fontSize="inherit"
                        className="upload-icon"
                    />
                    Upload File
                </label>
                <a href="#instructions">Need Help?</a>
                <p>{fileName}</p>
                <p>{error}</p>
                <hr></hr>
                <div className="set-currency-cont">
                    <span>Convert to: </span>
                    <select
                        className="set-currency"
                        onChange={(e) => {
                            setMyCurrency(e.target.value);
                        }}
                    >
                        <option selected value="EUR">
                            EUR €
                        </option>
                        <option value="GBP">GDP £</option>
                        <option value="USD">USD $</option>
                    </select>
                </div>
            </div>
            <ConversionTable
                chosenCurrency={myCurrency}
                rates={exchangeRates}
                paperbacks={paperbacks}
                ebooks={ebooks}
            />
        </div>
    );
}
