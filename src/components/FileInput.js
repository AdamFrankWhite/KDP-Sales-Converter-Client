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

  return (
    <div>
      <p>Upload your royalty XLSX file here:</p>
      <input onChange={handleUpload} type="file"></input>
      <button
        onClick={() => {
          console.log("Paperbacks: ", paperbacks);
          console.log("Ebooks: ", ebooks);
        }}
      >
        Sort
      </button>

      <ConversionTable paperbacks={paperbacks} ebooks={ebooks} />
    </div>
  );
}
