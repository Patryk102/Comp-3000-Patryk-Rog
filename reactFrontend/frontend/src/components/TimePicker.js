import React from "react";
import { useEffect, useState } from "react";
import "../componentStyles/TimePicker.css";

function TimePicker(){
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
            slots.push(formatTimeSlot(new Date(current)));
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
    }

    useEffect(() => {
        showTimeSlots();
    }, []);
    

    
    return (
        <div>
            <div className="timeSlotContainer">
            {times.map((time, index) => (
                <button key={time} onClick={() => timeSlotPressed(time)} className="timeSelectionButtons">{time}</button>
            ))}
            </div>
        </div>
    )
}


export default TimePicker;