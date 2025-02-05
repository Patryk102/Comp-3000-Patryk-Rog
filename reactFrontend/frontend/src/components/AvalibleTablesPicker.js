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
                tempTables.push([data[i].table_id, "tableButton selected"]);
            }
            else{
                tempTables.push([data[i].table_id, "tableButton"]);
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
        }
    }));


    return (
        <div className="avalibleTablesPickerDiv">
            {showingTables.map((table, index) => (

                <button key={index} onClick={() => tablePressed(table[0])} className={table[1]}>{table[0]}</button>
            ))}
            

        </div>
    )
});

export default AvalibleTablesPicker;