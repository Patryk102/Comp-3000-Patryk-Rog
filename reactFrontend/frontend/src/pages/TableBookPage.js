import React from "react";
import { useParams } from 'react-router-dom';
import TopNavBar from "../components/TopNavBar";
import { apiGetConnection } from "../reusableFunctions/apiConnection";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import DatePicker from "../components/DatePicker";
import "../pageStyles/TableBook.css";
import TimePicker from "../components/TimePicker";

function TableBookPage(){
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
                        <DatePicker/>
                    </div>
                    <div id="timePickerDiv" hidden={true}>
                        <TimePicker/>
                    </div>
                </div>
                <button onClick={backPressed}>back</button>
                <button onClick={nextPressed}>next</button>
            </div>
        </div>
    )
}

export default TableBookPage;
