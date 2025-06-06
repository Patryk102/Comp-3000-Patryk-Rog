import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAddOpenTimesUrl } from "../apiLinks/ApiEndpoints";
import { apiAuthPostConnection } from "../reusableFunctions/apiConnection";
import { getOpeningTimesUrl } from "../apiLinks/ApiEndpoints";
import { apiGetConnection } from "../reusableFunctions/apiConnection";

function OpeningTimes(){

    const [showingOpenTimes, setShowingOpenTimes] = useState([]);
    const { id } = useParams();
    let changeMade = false;


    useEffect(() => {
        //initOpeningTimes(); 
        initOpeningTimesApi();   
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
        initOpeningTimesApi();

        //apicall()
    }

    async function initOpeningTimesApi(){
        console.log("to be finished");
        
        const apiReturn = await apiGetConnection(getOpeningTimesUrl(id));
        console.log(apiReturn);
        //alert(apiReturn[1]);
        setShowingOpenTimes(apiReturn[1]);



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
            alert("Opening Times added succesfully");
        }
        else{
            alert("Couldn't add tables, please try again later.");
        }

    }



    return (
        <div>
            <p>Opening times:</p>
            <div>

            {showingOpenTimes.map((day, index) => (
                <div>
                    <label>{day.day_of_week}</label>
                    <br/>
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