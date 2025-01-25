import React from "react";




let userLogin = "https://localhost:7170/api/Login";
let staffLogin = "https://localhost:7170/api/Login/restaurant/Login";
let userRegister = "https://localhost:7170/api/accounts";
let allRestaurants = "https://localhost:7170/api/Restaurant";


function getUserLoginUrl(){
    return userLogin;
}

function getStaffLoginUrl(){
    return staffLogin;
}

function getUserRegisterUrl(){
    return userRegister;
}

function getAllRestaurantsUrl(){
    return allRestaurants;
}

export {getUserLoginUrl, getStaffLoginUrl, getUserRegisterUrl, getAllRestaurantsUrl};