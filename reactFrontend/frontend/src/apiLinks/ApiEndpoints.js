import React from "react";




let userLogin = "https://localhost:7170/api/Login";
let staffLogin = "https://localhost:7170/api/Login/restaurant/Login";
let userRegister = "https://localhost:7170/api/accounts";
let allRestaurants = "https://localhost:7170/api/Restaurant";
let restaurant = "https://localhost:7170/api/Restaurant/";
let avalibleTables = "https://localhost:7170/avalibleTables";
let bookTable = "https://localhost:7170/api/Table";
let userTableBookings = "https://localhost:7170/api/Table";
let staffRegister = "https://localhost:7170/create/staff/user";
let restaurantRegister = "https://localhost:7170/api/Restaurant";
let staffRestaurants = "https://localhost:7170/staff/restaurants";
let restaurantTables = "https://localhost:7170/restaurant/tables/";

let addRestaurantTables = "https://localhost:7170/create/alltables";
let allRestaurantReservationsUrl = "https://localhost:7170/restaurant/reservations/";

let addOpenTimesUrl = "https://localhost:7170/create/openingTimes";


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

function getRestaurantUrl(id){
    return restaurant + id;
}

function getAvalibleTables(){
    return avalibleTables;
}

function getBookTableUrl(){
    return bookTable;
}

function getUserTableBookingsUrl(){
    return userTableBookings;
}

function getStaffRegisterUrl(){
    return staffRegister;
}

function getRestaurantRegisterUrl(){
    return restaurantRegister;
}

function getStaffRestaurantsUrl(){
    return staffRestaurants;
}

function getRestaurantTablesUrl(){
    return restaurantTables;
}

function getAddRestaurantTablesUrl(){
    return addRestaurantTables;
}

function getRestaurantReservationsUrl(id){
    return allRestaurantReservationsUrl + id;
}

function getAddOpenTimesUrl(){
    return addOpenTimesUrl;
}

export {getUserLoginUrl, getStaffLoginUrl, getUserRegisterUrl, getAllRestaurantsUrl, getRestaurantUrl, 
    getAvalibleTables, getBookTableUrl, getUserTableBookingsUrl, getStaffRegisterUrl, getRestaurantRegisterUrl, 
    getStaffRestaurantsUrl, getRestaurantTablesUrl, getAddRestaurantTablesUrl, getRestaurantReservationsUrl,
    getAddOpenTimesUrl};