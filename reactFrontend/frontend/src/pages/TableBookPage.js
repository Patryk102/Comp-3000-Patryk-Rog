import React from "react";
import { data, useParams } from 'react-router-dom';
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
import AvalibleTablesPicker from "../components/AvalibleTablesPicker";
import { getBookTableUrl } from "../apiLinks/ApiEndpoints";
import { getOpeningTimesUrl } from "../apiLinks/ApiEndpoints";



let shownDiv = 0;

function TableBookPage(){
    const dateRef = useRef();
    const timeRef = useRef();
    const durationRef = useRef();
    const tableRef = useRef();
    const [avalibleTablesData, setAvalibleTablesData] = useState([]);
    const [openingClosingTime, setOpeningClosingTime] = useState([]);
    



    const allDivs = [
        "datePickerDiv",
        "durationPickerDiv",
        "timePickerDiv",
        "avalibleTablePickerDiv"
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

                let monthData = (parseInt(dateData[1]) + 1);
                if ((parseInt(dateData[1]) + 1) < 10){
                    monthData = "0" + (parseInt(dateData[1]) + 1);
                }



                const inputData = {
                    restaurant_id: id,
                    date: dateData[2] + "-"+ monthData + "-" + dateData[0] ,
                    time: timeData + ":00",
                    reservationLengthHours: durationData
                }
                alert(inputData.date);




                //alert("got token " + token);
                const postData = await apiPostConnection(getAvalibleTables(), inputData);
                alert(postData[1]);

                






                setAvalibleTablesData(JSON.parse(postData[1]));

            }





        }
    };


    
    const navigate = useNavigate();

    const getTimeSlots = async () => {
        const dateData = dateRef.current.returnPickedDate();
        const date = new Date(dateData[2], dateData[1], dateData[0]);
        let dayOfWeek = date.getDay();
        if (dayOfWeek == 0){
            dayOfWeek = 7;
        }   

        //alert(dateData + " day " + dayOfWeek);

        const timeSlots = await apiGetConnection(getOpeningTimesUrl(id));
        
        if (timeSlots[1][dayOfWeek - 1].open == "False"){
            alert("Restaurant is closed on this day");
            setOpeningClosingTime(["00:00:00", "00:00:00"]);

        }
        if (timeSlots[1][dayOfWeek - 1].open == "True"){
            //alert("Restaurant is open");
            setOpeningClosingTime([timeSlots[1][dayOfWeek - 1].opening_time, timeSlots[1][dayOfWeek - 1].closing_time]);

        }





    }


    const nextPressed = () => {
        
        if (shownDiv < allDivs.length - 1){
            if (shownDiv == 2){
                handleGetData();
            }
            if (shownDiv == 1){
                getTimeSlots();
            }
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

    const bookTable = async () => {
        if (shownDiv == 3){
            console.log("booking table");
            const dateData = dateRef.current.returnPickedDate();
            const timeData = timeRef.current.returnPickedTime();
            const durationData = durationRef.current.returnPickedDuration();
            const tableData = tableRef.current.returnSelectedTable();
            console.log("table data : " + tableData);

            if (dateData == null || timeData == null || durationData == null){
                alert("Make sure to select a date and time");
                alert(getAvalibleTables());
            }else{

                let monthData = (parseInt(dateData[1]) + 1);
                if ((parseInt(dateData[1]) + 1) < 10){
                    monthData = "0" + (parseInt(dateData[1]) + 1);
                }

                const inputData = {
                    table_id:tableData,
                    booking_date: dateData[2] + "-"+ monthData + "-" + dateData[0],
                    booking_time: timeData + ":00",
                    booking_length_hours: durationData
                }
                const token = localStorage.getItem("userToken");
                const url = getBookTableUrl();
                const postData = await apiAuthPostConnection(url, inputData, token);
                //alert(postData[0]); 
                if (postData[0] == "200"){
                    alert(postData[1]);
                }else{
                    alert("reservation failed");
                }


            }

        }
        else{
            alert("Select all options before proceeding");
        }





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
                        <TimePicker ref={timeRef} data={openingClosingTime}/>
                    </div>
                    <div id="durationPickerDiv" hidden={true}>
                        <DurationSelector ref={durationRef}/>
                    </div>
                    <div id="avalibleTablePickerDiv" hidden={true}>
                        <AvalibleTablesPicker ref={tableRef} data={avalibleTablesData}/>
                    </div>
                </div>
                <div>
                    <button className="button-month" onClick={backPressed}>back</button>
                    <button className="button-month" onClick={nextPressed}>next</button>
                </div>
                <br/>
                <button onClick={handleGetData}>test get data</button>
                <br/>
                <button onClick={bookTable}>Book Table</button>
            </div>
        </div>
    )
}

export default TableBookPage;
