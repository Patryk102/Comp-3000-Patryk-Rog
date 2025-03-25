import React from "react";
import { useEffect, useState } from "react";
import "../componentStyles/DurationSelector.css";
import { forwardRef, useImperativeHandle } from 'react';


let selected = null

const  DurationSelector = forwardRef((props, ref) => {
    const [durations, setDurations] = useState([]);
    const durationValues = [
        "1 hour",
        "2 hours",
        "3 hours"
    ];



    function durationPressed(value){
        console.log(value);
        selected = value;
        showDurations();
    }

    function showDurations(){
        let temp = [];
        for (let i = 0; i < durationValues.length; i++){
            if (i + 1 == selected){
                temp.push([durationValues[i], "durationButton selected"]);
            }
            else{
                temp.push([durationValues[i], "durationButton"]);
            }
        }




        setDurations(temp);

    }


    useEffect(() => {
        showDurations();
    }, []);

    useImperativeHandle(ref, () => ({
        returnPickedDuration() {
            if (selected == null){
                return null;
            }
            else{
                return selected;
            }
        },
        resetDuration() {
            selected = null;
            showDurations();
        }
    }));


//<label>Please select booking duration</label>
    return (
        <div className="durationSelectorMainDiv">
            <label>Please select booking duration:</label>
            <div className="durationSelectorDiv">
                {durations.map((duration, index) => (
                    <button onClick={() => durationPressed(index + 1)} key={index} className={duration[1]}>{duration[0]}</button>
                ))}


            </div>
        </div>
    )
})

export default DurationSelector;