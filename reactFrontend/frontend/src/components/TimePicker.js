import React from "react";
import { useEffect, useState } from "react";
import "../componentStyles/TimePicker.css";
import { forwardRef, useImperativeHandle } from 'react';

let selectedTime = null;




const TimePicker = forwardRef((props, ref) => {
    const [times, setTimes] = useState([]);

    let openTime = "10:00:00";
    let closeTime = "22:00:00";
    let timeDateOpen = timeToDate(openTime);
    let timeDateClose = timeToDate(closeTime);


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
        showTimeSlots();
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