import React from "react";




let userLogin = "https://localhost:7170/api/Login";
let staffLogin = "https://localhost:7170/api/Login/restaurant/Login";


function getUserLoginUrl(){
    return userLogin;
}

function getStaffLoginUrl(){
    return staffLogin;
}

export {getUserLoginUrl, getStaffLoginUrl};