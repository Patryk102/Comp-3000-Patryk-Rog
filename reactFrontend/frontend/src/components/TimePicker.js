import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../componentStyles/TimePicker.css";
import { forwardRef, useImperativeHandle } from 'react';
import { getOpeningTimesUrl } from "../apiLinks/ApiEndpoints";
import { apiGetConnection } from "../reusableFunctions/apiConnection";

let selectedTime = null;


let timeDateOpen = null;
let timeDateClose = null;

const TimePicker = forwardRef(({data}, ref) => {
    const [times, setTimes] = useState([]);
    const { id } = useParams();
    //let openTime = "10:00:00";
    //let closeTime = "18:00:00";
    //var timeDateOpen = timeToDate(openTime);
    //var timeDateClose = timeToDate(closeTime);
    
    


    function timeToDate(timeString) {
        let today = new Date();
        let [hours, minutes] = timeString.split(':').map(Number);
        today.setHours(hours);
        today.setMinutes(minutes);
        today.setSeconds(0);
        today.setMilliseconds(0);
        return today;
    }

    function createTimeSlots(openTime, closeTime) {
        //currently temporary, slots will get created by api
        let slots = [];
        let current = new Date(openTime);
    
        while (current < closeTime) {
            if (formatTimeSlot(new Date(current)) == selectedTime){
                slots.push([formatTimeSlot(new Date(current)),"timeSelectionButtons selected"]);
            }
            else{
                slots.push([formatTimeSlot(new Date(current)),"timeSelectionButtons"]);
            }


            current.setHours(current.getHours() + 1);
        }
    
        return slots;
    }

    function formatTimeSlot(date) {
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }


    const showTimeSlots = () => {
        let timeSLots = createTimeSlots(timeDateOpen, timeDateClose);
        setTimes(timeSLots);   
    }

    const timeSlotPressed = (timeSlot) => {
        console.log(timeSlot);
        selectedTime = timeSlot;
        showTimeSlots();
    }

    useEffect(() => {
        //showTimeSlots();
    }, []);


    useImperativeHandle(ref, () => ({
        returnPickedTime() {
            if (selectedTime == null){
                return null;
            }
            else{
                return selectedTime;
            }
        }
    }));

    useEffect(() => {
        createApiTimeSlots();
    }, [data]);

    function createApiTimeSlots(){
        const openTime = data[0];
        const closeTime = data[1];

        if (data[0] != null && data[1] != null){
            timeDateOpen = timeToDate(openTime);
            timeDateClose = timeToDate(closeTime);
        }
        showTimeSlots();

        



    }
    

    
    return (
        <div className="mainDiv">
            <label>Please select a time:</label>
            <div className="timeSlotContainer">
            {times.map((time, index) => (
                <button key={time[0]} onClick={() => timeSlotPressed(time[0])} className={time[1]}>{time[0]}</button>
            ))}
            </div>
        </div>
    )
})


export default TimePicker;