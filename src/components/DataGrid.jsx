import React from "react";
import DataGrid from "react-data-grid";

const DataGridComponent = (props) => {
    const { data } = props;

    const columns = [
        { key: 'empID', name: 'EmpID' },
        { key: 'projectID', name: 'ProjectID' },
        { key: 'startDate', name: 'DateFrom' },
        { key: 'endDate', name: 'DateTo' }
    ];
    
    const rows = data.map(el => {
        return {
            empID: data[0],
            projectID: data[1],
            startDate: data[2],
            endDate: data[3]
        };
    });

    return <DataGrid columns={columns} rows={rows} />
   
};

export default DataGridComponent;
