export default function runMonthlyReport(data) {
  //Re-arrange JSON data
  const originalData = data;
  console.log(data);
  // Grab keys
  const topRow = originalData[0];
  const keys = [];
  for (const key in topRow) {
    keys.push(topRow[key]);
  }
  console.log(keys);

  // Slice off top row
  const coreOriginalData = originalData.slice(1, originalData.length);
  console.log(coreOriginalData);

  // New Data Structure
  const newData = [];

  // Populate each object

  coreOriginalData.forEach((row) => {
    let newDataRow = {};
    //Create new key/value pairs
    keys.forEach((key) => {
      newDataRow[key] = "";
    });
    let count = 0;
    // Create each new row - loop through top keys array, creating new key-value pair looping through other data rows
    for (const key in row) {
      newDataRow[keys[count]] = row[key];
      count += 1;
    }
    //reset count
    count = 0;
    newData.push(newDataRow);

    console.log(newDataRow);
  });
  console.log(newData);
}
