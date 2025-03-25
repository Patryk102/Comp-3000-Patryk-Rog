import React from "react";
import { useEffect, useState } from "react";
import "../componentStyles/AvalibleTablesPicker.css";
import { forwardRef, useImperativeHandle } from 'react';

let selectedTable = null;


const AvalibleTablesPicker = forwardRef(({data}, ref) => {
//function AvalibleTablesPicker({data}){

    const [showingTables, setShowingTables] = useState([]);

    useEffect(() => {
        initAll();
    }, [data]);
    
    function initAll(){
        
        let tempTables = [];
        for (let i = 0; i < data.length; i++){
            if (data[i].table_id == selectedTable){
                tempTables.push(["Table: " + data[i].table_no + ", " + data[i].seating + " seats", "tableButton selected", data[i].table_id]);
            }
            else{
                tempTables.push(["Table: " + data[i].table_no + ", " + data[i].seating + " seats", "tableButton", data[i].table_id]);
            }
        }
        setShowingTables(tempTables);


    }



    const tablePressed = (table) => {
        console.log(table);
        selectedTable = table;
        initAll();
    }

     useImperativeHandle(ref, () => ({
        returnSelectedTable() {
            if (selectedTable == null){
                return null;
            }
            else{
                return selectedTable;
            }
        },
        resetTables(){
            selectedTable = null;
        }
    }));


    return (
        <div className="mainDiv">
            <label>Please select a table:</label>
            <div className="avalibleTablesPickerDiv">
                {showingTables.map((table, index) => (

                    <button key={index} onClick={() => tablePressed(table[2])} className={table[1]}>{table[0]}</button>
                ))}
                

            </div>
        </div>
    )
});

export default AvalibleTablesPicker;