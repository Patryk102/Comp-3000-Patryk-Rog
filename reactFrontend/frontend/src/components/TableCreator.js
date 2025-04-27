import React from "react";
import { useState, useEffect } from "react";
import { getRestaurantTablesUrl } from "../apiLinks/ApiEndpoints";
import { apiGetConnection } from "../reusableFunctions/apiConnection";
import { apiAuthPostConnection } from "../reusableFunctions/apiConnection";
import { useParams } from 'react-router-dom';
import { getAddRestaurantTablesUrl } from "../apiLinks/ApiEndpoints";
import "../componentStyles/TableCreator.css";

function TableCreator(){
    const [showingTables, setShowingTables] = useState([]);
    const { id } = useParams();
    
    // table_id, restauranttableid, size
    const tempTables = [
        [0,1,5],
        [1,2,5],
        [2,3,4]
    ];

    async function getTables(){
        console.log("getting tables");
        const tables = await apiGetConnection(getRestaurantTablesUrl() + id);

        let temp = [];
        for (let i = 0; i < tables[1].length; i++){
            const tempTable = [tables[1][i].table_id,tables[1][i].table_no, tables[1][i].seating];
            console.log(tables[1][0]);
            temp.push(tempTable);
        }

        
        setShowingTables(temp);




    }

    function setTables(){
        setShowingTables(tempTables);
    }

    useEffect(() => {
        //setTables();
        getTables();
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

    async function confirmChange(){
        console.log(showingTables);
        const answer = window.confirm("Are you sure you want to submit changes? All customer reservations will be deleted");
        //The following will be sent to the api

        //table_id, rest_id, seating
        let tables = [];
        for (let i = 0; i < showingTables.length; i++){
            tables.push({
                table_no: showingTables[i][1],
                seating: showingTables[i][2]
            });
        }

        const token = localStorage.getItem("staffToken");



        let toSend = {
            restaurant_id: id,
            tables: tables
        };



        const apiReturn = await apiAuthPostConnection(getAddRestaurantTablesUrl(), toSend, token);
        if (apiReturn[0] == "200"){
            alert("Tables added succesfully");
        }
        else{
            alert("Couldnt add tables, please try again later.");
        }


        console.log(toSend);

//table_no, seating




    }

    function deleteTable(indexToRemove){
        //const newShowingTables = [...showingTables];
        const newShowingTables = showingTables.filter((_, index) => index !== indexToRemove)
        setShowingTables(newShowingTables);
    }

    

    return (
        <div>
            <h3><label>Your restaurant Tables:</label></h3>

            <div id="tablesDiv">
                
                <label id="tableNumLabel">table num</label>
            
                <label id="tableSizeLabel">table size</label>
                





                <div id="existingTables">
                    {showingTables.map((table, index) => (
                        <div key={index}>
                            <input className="tableInputs" onChange={(e) => handleInputChange(e, index, 1)} value={table[1]}></input>
                            <button className="plusMinusButton" onClick={() => minusPlusPress(table, index,  "-")}>-</button>
                            <input className="tableInputs" readOnly value={table[2]}></input>
                            <button className="plusMinusButton" onClick={() => minusPlusPress(table, index,  "+")}>+</button>
                            <button className="creatorDeleteButton" onClick={() => deleteTable(index)}>Delete</button>

                        </div>
                    ))}
                </div>

                <div id="newAddTableDiv">
                    <div id="newAddTableDivAdd">
                        <button className="creatorDeleteButton" onClick={addTablePressed}>Add table</button>
                        <div id="addingMechanism" hidden={true}>
                            <input type="number"></input>
                            <button>-</button>
                            <input type="number"></input>
                            <button>+</button>
                            <button>Add</button>
                        </div>
                    </div>
                    
                    <div id="newAddTableDivConfirmCancel">
                        <button className="creatorDeleteButton" onClick={confirmChange}>confirm</button>
                        <button className="creatorDeleteButton" onClick={getTables}>cancel</button>
                    </div>

                    

                </div>
            </div>
        </div>
    )
}

export default TableCreator;