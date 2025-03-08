import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function OpeningTimes(){

    const [showingOpenTimes, setShowingOpenTimes] = useState([]);
    let changeMade = false;

// mon[open, opentime, closetime]
    const openingValues = [
        {
            day: "monday",
            open: true,
            openingTime: "10:00:00",
            closingTime: "12:00:00"
        },
        {
            day: "tuesday",
            open: true,
            openingTime: "10:00:00",
            closingTime: "12:00:00"
        },
        {
            day: "wednesday",
            open: true,
            openingTime: "10:00:00",
            closingTime: "12:00:00"
        },
        {
            day: "thursday",
            open: true,
            openingTime: "10:00:00",
            closingTime: "12:00:00"
        },
        {
            day: "friday",
            open: false,
            openingTime: "10:00:00",
            closingTime: "12:00:00"
        },
        {
            day: "saturday",
            open: false,
            openingTime: "10:00:00",
            closingTime: "19:00:00"
        },
        {
            day: "sunday",
            open: false,
            openingTime: "10:00:00",
            closingTime: "12:00:00"
        },
    ];


    function initOpeningTimes(){
        setShowingOpenTimes(openingValues);
    }

    useEffect(() => {
        initOpeningTimes();    
    }, []);

    const handleInputChange = (e, index, valueName) => {
        const value = e.target.value;
        const table = [...showingOpenTimes];
        table[index][valueName] = value;

        onChange(index, table);
    };

    function onChange(index, table){
        const newShowingTimes = [...showingOpenTimes];
        showingOpenTimes[index] = table;
        console.log(newShowingTimes);
        checkChanges();

        setShowingOpenTimes(newShowingTimes);
    }

    function checkChanges(){
        if (changeMade == false){
            changeMade = true;
            document.getElementById("confirmButton").hidden = false;
            document.getElementById("cancelButton").hidden = false;
        }
    }

    function cancelPressed(){
        changeMade = false;
        document.getElementById("confirmButton").hidden = true;
        document.getElementById("cancelButton").hidden = true;

        //apicall()
    }

    function initOpeningTimesApi(){
        console.log("to be finished");
    }




    return (
        <div>
            <p>Opening times component</p>
            <div>

            {showingOpenTimes.map((day, index) => (
                <div>
                    <label>{day.day}</label>
                    <select onChange={(e) => handleInputChange(e, index, "open")} value={day.open} id={"open" + index}>
                        <option value={true}>open</option>
                        <option value={false}>closed</option>
                    </select>

                    <input onChange={(e) => handleInputChange(e, index, "openingTime")} value={day.openingTime} type="time" id={"opentime" + index}></input>
                    <input onChange={(e) => handleInputChange(e, index, "closingTime")} value={day.closingTime} type="time" id={"closetime" + index}></input>

                </div>
            ))}


            <button onClick={initOpeningTimesApi} id="confirmButton" hidden={true}>confirm</button>
            <button onClick={cancelPressed} id="cancelButton" hidden={true}>cancel</button>
            

            

            </div>

        </div>

    )
}

export default OpeningTimes;