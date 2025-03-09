import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAddOpenTimesUrl } from "../apiLinks/ApiEndpoints";
import { apiAuthPostConnection } from "../reusableFunctions/apiConnection";

function OpeningTimes(){

    const [showingOpenTimes, setShowingOpenTimes] = useState([]);
    const { id } = useParams();
    let changeMade = false;

// mon[open, opentime, closetime]
    const openingValues = [
        {
            day_of_week: "monday",
            open: "True",
            opening_time: "10:00:00",
            closing_time: "12:00:00"
        },
        {
            day_of_week: "tuesday",
            open: "True",
            opening_time: "10:00:00",
            closing_time: "12:00:00"
        },
        {
            day_of_week: "wednesday",
            open: "True",
            opening_time: "10:00:00",
            closing_time: "12:00:00"
        },
        {
            day_of_week: "thursday",
            open: "True",
            opening_time: "10:00:00",
            closing_time: "12:00:00"
        },
        {
            day_of_week: "friday",
            open: "True",
            opening_time: "10:00:00",
            closing_time: "12:00:00"
        },
        {
            day_of_week: "saturday",
            open: "False",
            opening_time: "10:00:00",
            closing_time: "19:00:00"
        },
        {
            day_of_week: "sunday",
            open: "False",
            opening_time: "10:00:00",
            closing_time: "12:00:00"
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

    async function sendChangesToApi(){
        //[restaurant_id[opening_time, closing_time, day_of_week, open]]

        let newShowingTimes = showingOpenTimes.map(time => ({ ...time }));
        for (let i = 0; i < newShowingTimes.length; i++){
            newShowingTimes[i].day_of_week = i + 1;
        }


        const toSend = {
            restaurant_id: id,
            days: newShowingTimes
        }

        const token = localStorage.getItem("staffToken");

        console.log(toSend);

        const apiReturn = await apiAuthPostConnection(getAddOpenTimesUrl(), toSend, token);
        if (apiReturn[0] == "200"){
            alert("Times added succesfully");
        }
        else{
            alert("Couldnt add tables, please try again later.");
        }

    }



    return (
        <div>
            <p>Opening times component</p>
            <div>

            {showingOpenTimes.map((day, index) => (
                <div>
                    <label>{day.day_of_week}</label>
                    <select onChange={(e) => handleInputChange(e, index, "open")} value={day.open} id={"open" + index}>
                        <option value={"True"}>open</option>
                        <option value={"False"}>closed</option>
                    </select>

                    <input onChange={(e) => handleInputChange(e, index, "opening_time")} value={day.opening_time} type="time" id={"opentime" + index}></input>
                    <input onChange={(e) => handleInputChange(e, index, "closing_time")} value={day.closing_time} type="time" id={"closetime" + index}></input>

                </div>
            ))}


            <button onClick={sendChangesToApi} id="confirmButton" hidden={true}>confirm</button>
            <button onClick={cancelPressed} id="cancelButton" hidden={true}>cancel</button>
            

            

            </div>

        </div>

    )
}

export default OpeningTimes;