import React from "react";
import { useState, useEffect } from "react";

function TableCreator(){
    const [showingTables, setShowingTables] = useState([]);
    
    // table_id, restauranttableid, size
    const tempTables = [
        [0,1,5],
        [1,2,5],
        [2,3,4]
    ];

    function setTables(){
        setShowingTables(tempTables);
    }

    useEffect(() => {
        setTables(tempTables);
    }, []);

    function minusPlusPress(table, index, sign){
        const newShowingTables = [...showingTables];

        if (sign === "-"){
            newShowingTables[index][2] = table[2] > 0 ? table[2] - 1 : 0; 
        }
        else{
            newShowingTables[index][2] = table[2] + 1;
        }
        setShowingTables(newShowingTables);

        //showingTables[index] = [table[0], table[1], table[2] - 1];
        console.log(showingTables);
    }

    function addTablePressed(){
        const newShowingTables = [...showingTables];
        newShowingTables.push([0,0,0]);
        setShowingTables(newShowingTables);
    }

    function onChange(targetNum, index, table){
        const newShowingTables = [...showingTables];
        newShowingTables[index] = table;
        console.log(newShowingTables);

        setShowingTables(newShowingTables)
    }

    const handleInputChange = (e, index, field) => {
        const value = Number(e.target.value);
        const table = [...showingTables[index]];
        table[field] = value;

        onChange(value, index, table);
    };

    function confirmChange(){
        console.log(showingTables);
        confirm("Are you sure you want to submit changes?");
        //The following will be sent to the api
    }

    function deleteTable(indexToRemove){
        //const newShowingTables = [...showingTables];
        const newShowingTables = showingTables.filter((_, index) => index !== indexToRemove)
        setShowingTables(newShowingTables);
    }
    

    return (
        <div>
            <p>Table creator component</p>

            <div id="tablesDiv">
                <div id="existingTables">
                    {showingTables.map((table, index) => (
                        <div key={index}>
                            <input onChange={(e) => handleInputChange(e, index, 1)} value={table[1]}></input>
                            <button onClick={() => minusPlusPress(table, index,  "-")}>-</button>
                            <input value={table[2]}></input>
                            <button onClick={() => minusPlusPress(table, index,  "+")}>+</button>
                            <button onClick={() => deleteTable(index)}>Delete</button>

                        </div>
                    ))}
                </div>

                <div id="newAddTableDiv">
                    <div id="newAddTableDivAdd">
                        <button onClick={addTablePressed}>Add table</button>
                        <div id="addingMechanism" hidden={true}>
                            <input type="number"></input>
                            <button>-</button>
                            <input type="number"></input>
                            <button>+</button>
                            <button>Add</button>
                        </div>
                    </div>
                    
                    <div id="newAddTableDivConfirmCancel">
                        <button onClick={confirmChange}>confirm</button>
                        <button>cancel</button>
                    </div>

                    

                </div>
            </div>
        </div>
    )
}

export default TableCreator;