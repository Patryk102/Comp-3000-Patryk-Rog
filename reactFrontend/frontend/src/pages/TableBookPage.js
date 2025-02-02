import React from "react";
import { useParams } from 'react-router-dom';
import TopNavBar from "../components/TopNavBar";
import { apiGetConnection } from "../reusableFunctions/apiConnection";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import DatePicker from "../components/DatePicker";
import "../pageStyles/TableBook.css";
import TimePicker from "../components/TimePicker";

function TableBookPage(){
    const dateRef = useRef();
    const timeRef = useRef();

    const handleGetData = () => {
        if (dateRef.current) {
          const dateData = dateRef.current.returnPickedDate();
          const timeData = timeRef.current.returnPickedTime();

          console.log(dateData);
          console.log(timeData);

        }
    };


    const { id } = useParams();
    const navigate = useNavigate();

    const nextPressed = () => {
        document.getElementById("datePickerDiv").hidden = true;
        document.getElementById("timePickerDiv").hidden = false;
    }

    const backPressed = () => {
        document.getElementById("timePickerDiv").hidden = true;
        document.getElementById("datePickerDiv").hidden = false;
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
