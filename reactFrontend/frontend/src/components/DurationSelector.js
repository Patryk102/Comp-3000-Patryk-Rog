import React from "react";
import { useEffect, useState } from "react";
import "../componentStyles/DurationSelector.css";
import { forwardRef, useImperativeHandle } from 'react';


let selected = null

const  DurationSelector = forwardRef((props, ref) => {
    const [durations, setDurations] = useState([]);
    const durationValues = [
        "1",
        "2",
        "3"
    ];



    function durationPressed(value){
        console.log(value);
        selected = value;
        showDurations();
    }

    function showDurations(){
        let temp = [];
        for (let i = 0; i < durationValues.length; i++){
            if (durationValues[i] == selected){
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
        }
    }));



    return (
        <div className="durationSelectorDiv">
           
            {durations.map((duration, index) => (
                <button onClick={() => durationPressed(duration[0])} key={index} className={duration[1]}>{duration[0]}</button>
            ))}



        </div>
    )
})

export default DurationSelector;