import React from "react";
import { useEffect, useState } from "react";

function DatePicker(){

    const [days, setDays] = useState([]);
    var currentMonth = 1;
    var currentYear = 2025;
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
    ]





    return (
        <div>
            <p>Date picker component</p>



        </div>
    )
}

export default DatePicker;