import React from "react";
import { useEffect, useState } from "react";
import "../componentStyles/DatePicker.css"
import { forwardRef, useImperativeHandle } from 'react';


const today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let pickedDate = null;
let pickedMonth = null;
let pickedYear = null;

let days = [];
let weekOffsetDays = [];


const DatePicker = forwardRef((props, ref) => {

    //const [days, setDays] = useState([]);
    

    //const [weekOffsetDays, setWeekOffsetDays] = useState([]);
    const [currentWeeks, setCurrentWeeks] = useState([]);
    
    
    const allMonths  = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
    ];


    function getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    function setDaysBasedOnSelection(){
        let tempDays = getDaysInMonth(currentMonth, currentYear);
        console.log(days.length);
        console.log("something");
        //setDays(days);
        days = tempDays;
        
    }

    function dayPressed(day){
        console.log(day);
        pickedDate = day;
        pickedMonth = currentMonth;
        pickedYear = currentYear;
        allSetFunctions();
    }

    function nextMonthPressed(){
        if(currentMonth >= 11){
            currentMonth = 0;
            currentYear += 1;
        }
        else{
            currentMonth += 1;
        }
        allSetFunctions()
    }

    function previousMonthPressed(){
        console.log("1st Month is " + currentMonth + " year is " + currentYear)
        if (currentMonth <= 0) {
            currentMonth = 11;
            currentYear -= 1;
            console.log("if running");
        }
        else{
            console.log("else running");
            currentMonth -= 1;
        }
        allSetFunctions();
        
    }

    function allSetFunctions(){
        console.log("Month is " + currentMonth + " year is " + currentYear)
        setDaysBasedOnSelection()
        document.getElementById("monthTag").innerHTML = allMonths[currentMonth]+ " " + currentYear;
        //setWeekOffsetDays(getWeekStartOffset(currentMonth, currentYear));
        weekOffsetDays = getWeekStartOffset(currentMonth, currentYear);
        setWeeks();
    }

    useEffect(() => {
        allSetFunctions();
    }, []);


    const setWeeks = (() => {
        let weeks = new Array(6).fill().map(() => new Array(7).fill(null));

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();


        var totalDayCount = 0;
        let lastWeekEmpty = false;
        for (let i = 0; i < 6; i++) {
            console.log("printing 5");
            for (let j = 0; j < 7; j++) {
                if (i === 0 && weekOffsetDays.length > 0) {
                    if (j < weekOffsetDays.length) {
                        weeks[i][j] = ["'", "notThisMonth"];
                        console.log("offsets");
                    } else {
                        if (totalDayCount < days.length) {
                            weeks[i][j] = makeChecks(totalDayCount);

                            console.log("total day counting " + totalDayCount);
                            totalDayCount += 1;
                        }
                    }
                } else {
                    if (totalDayCount < days.length) {
                        weeks[i][j] = makeChecks(totalDayCount);

                        console.log("total day counting " + totalDayCount);
                        totalDayCount += 1;
                    }
                    else if (i == 5 && j == 0 || lastWeekEmpty == true) {
                        weeks[i][j] = ["", "empty"];
                        lastWeekEmpty = true
                    }
                    else {
                        weeks[i][j] = ["'", "notThisMonth"]
                    }
                }
            }
        }

        console.log(weeks);
        setCurrentWeeks(weeks);
    });
    



    function makeChecks(totalDayCount){
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();

        let toReturn = [];
        toReturn = [totalDayCount + 1, "avalibleButton"];
        if (totalDayCount + 1 == pickedDate && currentMonth == pickedMonth && currentYear == pickedYear){
            toReturn = [totalDayCount + 1, "selectedButton"];
        }
        
        
        if (month >= currentMonth + 1 || currentYear < year){
            if (month == currentMonth + 1 && currentYear == year){
                if (totalDayCount + 1 <= day){
                    toReturn = [totalDayCount + 1, "unavalibleButton"];
                }
            }
            else{
                if (year >= currentYear){
                    toReturn = [totalDayCount + 1, "unavalibleButton"];
                }
            }
        }

        return toReturn;

    }





/*{days.map((data, index) => (
                <button className="freeButton" onClick={() => dayPressed(index + 1)} key={index}>{index + 1}</button>
            ))}*/



    function getWeekStartOffset(month, year) {
        const firstDayOfMonth = new Date(year, month, 1).getDay();

        const offset = (firstDayOfMonth + 6) % 7;
        var offsets = new Array(offset);
        for (let i = 0; i < offset; i++){
            offsets[i] = " ";
        }


        console.log("printing offset " + offset);
        console.log(offsets);
       
        return offsets;
    }

    /*
    {weekOffsetDays.map((data, index) => (
                
                <button className="offsetButton" key={index}>{"'"}</button>
            ))}

            {days.map((data, index) => (
                <button className="freeButton" onClick={() => dayPressed(index + 1)} key={index}>{index + 1}</button>
            ))}*/
    

    useImperativeHandle(ref, () => ({
        returnPickedDate() {
            if (pickedDate == null){
                return null;
            }
            else{
                return [pickedDate, currentMonth, currentYear];
            }
        }
    }));
    



    return (
        <div className="componentAll">
            <div className="componentBackground">
                <p id="monthTag">Month</p>
                <button className="button-date" onClick={previousMonthPressed}>previous month</button>
                <button className="button-date" onClick={nextMonthPressed}>next month</button>
                <br/>
                
                
                <button className="dayOfWeek">m</button>
                <button className="dayOfWeek">t</button>
                <button className="dayOfWeek">w</button>
                <button className="dayOfWeek">t</button>
                <button className="dayOfWeek">f</button>
                <button className="dayOfWeek">s</button>
                <button className="dayOfWeek">s</button>

                {currentWeeks.map((week, weekIndex) => (
                    <div className="week" key={weekIndex}>
                        {week.map((day, dayIndex) => (
                            day[0] !== "" && day[0] !== null ? (
                                <button
                                    //className={day[0] === "'" ? "notThisMonth" : "freeButton"}
                                    className={day[1]}
                                    onClick={() => dayPressed(day[0])}
                                    key={dayIndex}
                                >
                                    {day[0]}
                                </button>
                            ) : null
                        ))}
                    </div>
                ))}
            </div>

            
            

        </div>
    )
})

export default DatePicker;