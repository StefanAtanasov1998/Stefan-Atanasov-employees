import "./App.css";
import React, { useState } from "react";
import Papa from "papaparse";
import DataGridComponent from "./components/DataGrid";

function App() {
  const [error, setError] = useState('');
  const allowedExtensions = ['csv'];
  const result = [];

  const findPair = (data) => {
    let sumCommonDays = 0;

    for (let i = 0; i < data.length; i++) {
      for (let k = i + 1; k < data.length; k++) {
        const el1 = data[i];
        const el2 = data[k];
        const empID1 = el1[0];
        const empID2 = el2[0];
        const projectID1 = el1[1];
        const projectID2 = el2[1];
        
        if ((empID1 !== empID2) && (projectID1 === projectID2)) {
          const startDate1 = new Date(el1[2]);
          const endDate1 = el1[3] === 'NULL' ? new Date() : new Date(el1[3]);
          const startDate2 = new Date(el2[2]);
          const endDate2 = el2[3] === 'NULL' ? new Date() : new Date(el2[3]);

          if (startDate1 <= endDate2 && startDate2 <= endDate1) {
            const start = startDate1 <= startDate2 ? startDate2 : startDate1;
            const end = endDate1 <= endDate2 ? endDate1 : endDate2;

            if (end >= startDate2) {
              const commonTime = Math.abs(end - start);
              const commonDays = Math.ceil(commonTime / (1000 * 60 * 60 * 24));
              sumCommonDays += commonDays;
            }
          }

          result.push([empID1, empID2, projectID1, sumCommonDays]);
        }
      }
    }
  };
  
  const handleFileInput = (ev) => {
    if (ev.target.files.length > 0) {
      const file = ev.target.files[0];
      const fileExtension = file.type.split('/')[1];

      if (!allowedExtensions.includes(fileExtension)) {
        setError('Only csv files are supported.');
        return;
      }

      Papa.parse(file, {
        skipEmptyLines: true,
        complete: function (results) {
          findPair(results.data);
        }
      });
    }
    
  };

  return <div className="App">
    <input type="file" onChange={handleFileInput}/>
    {result.length === 0 ? <DataGridComponent data={result} error={error} /> : null}
  </div>;
}

export default App;
