import React, { useEffect } from "react";
import axios from "axios";

export default function FileInput() {
  useEffect(() => {
    let data = window.localStorage.getItem("data");
    //Stringify then parse avoiding error when only parsing
    let pData = JSON.parse(data);
    console.log(typeof pData);
    pData.forEach((item) => console.log(item));
  }, []);

  const handleUpload = (e) => {
    e.nativeEvent.stopImmediatePropagation();
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("file", file);
    console.log(file, formData);
    e.preventDefault();
    axios.post("http://localhost:5000/convert", formData).then((data) => {
      console.log(data.data);
      console.log(typeof data.data);
      window.localStorage.setItem("data", JSON.stringify(data.data));
    });

    e.preventDefault();
  };

  return (
    <div>
      <p>Upload your royalty XLSX file here:</p>
      <input onChange={handleUpload} type="file"></input>
    </div>
  );
}
