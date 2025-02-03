import React from "react";
import { useParams } from 'react-router-dom';
import TopNavBar from "../components/TopNavBar";
import { apiGetConnection } from "../reusableFunctions/apiConnection";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import DatePicker from "../components/DatePicker";
import "../pageStyles/TableBook.css";
import TimePicker from "../components/TimePicker";
import DurationSelector from "../components/DurationSelector";
import { apiAuthPostConnection, apiPostConnection } from "../reusableFunctions/apiConnection";
import { getAvalibleTables } from "../apiLinks/ApiEndpoints";


let shownDiv = 0;

function TableBookPage(){
    const dateRef = useRef();
    const timeRef = useRef();
    const durationRef = useRef();
    const allDivs = [
        "datePickerDiv",
        "durationPickerDiv",
        "timePickerDiv"
    ]
    const { id } = useParams();

    const handleGetData = async () => {
        if (dateRef.current) {
            const dateData = dateRef.current.returnPickedDate();
            const timeData = timeRef.current.returnPickedTime();
            const durationData = durationRef.current.returnPickedDuration();
            
            console.log(dateData);
            console.log(timeData);
            console.log(durationData)
            if (dateData == null || timeData == null || durationData == null){
                alert("Make sure to select a date and time");
                alert(getAvalibleTables());
            }else{
                const token =  localStorage.getItem("userToken");
                const inputData = {
                    restaurant_id: id,
                    date: dateData[2] + "-"+ dateData[1] + 1 + "-" + dateData[0],
                    time: timeData + ":00",
                    reservationLengthHours: durationData
                }



                //alert("got token " + token);
                const postData = await apiPostConnection(getAvalibleTables(), inputData);
                alert(postData[1]);

            }





        }
    };


    
    const navigate = useNavigate();

    const nextPressed = () => {
        if (shownDiv < allDivs.length - 1){
            shownDiv += 1;
            document.getElementById(allDivs[shownDiv - 1]).hidden = true;
            document.getElementById(allDivs[shownDiv]).hidden = false;
        }


        //document.getElementById("datePickerDiv").hidden = true;
        //document.getElementById("timePickerDiv").hidden = false;
    }

    const backPressed = () => {
        if (shownDiv > 0){
            shownDiv -= 1;
            document.getElementById(allDivs[shownDiv + 1]).hidden = true;
            document.getElementById(allDivs[shownDiv]).hidden = false;
        }


        //document.getElementById("timePickerDiv").hidden = true;
        //document.getElementById("datePickerDiv").hidden = false;
    }

    return (
        <div>
            <TopNavBar/>
            <div className="allContent">
                <p>TABLE BOOK PAGE</p>
                <div className="datePicker">
                    <div id="datePickerDiv">
                        <DatePicker ref={dateRef}/>
                    </div>
                    <div id="timePickerDiv" hidden={true}>
                        <TimePicker ref={timeRef}/>
                    </div>
                    <div id="durationPickerDiv" hidden={true}>
                        <DurationSelector ref={durationRef}/>
                    </div>
                </div>
                <button onClick={backPressed}>back</button>
                <button onClick={nextPressed}>next</button>
                <br/>
                <button onClick={handleGetData}>test get data</button>
            </div>
        </div>
    )
}

export default TableBookPage;
