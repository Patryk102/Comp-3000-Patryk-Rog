import React from "react";
import { useEffect, useState } from "react";


let currentMonth = 0;
let currentYear = 2025;



function DatePicker(){

    const [days, setDays] = useState([]);
    
    
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
        let days = getDaysInMonth(currentMonth, currentYear);
        console.log(days.length);
        console.log("something");
        setDays(days);
        
    }

    function dayPressed(day){
        console.log(day);
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
    }

    useEffect(() => {
        allSetFunctions();
    }, []);


    return (
        <div>
            <p>Date picker component</p>
            <p id="monthTag">Month</p>
            <button onClick={nextMonthPressed}>next month</button>
            <button onClick={previousMonthPressed}>previous month</button>
            <br/>
            {days.map((data, index) => (
                <button onClick={() => dayPressed(index + 1)} key={index}>{index + 1}</button>
            ))}

            
            

        </div>
    )
}

export default DatePicker;