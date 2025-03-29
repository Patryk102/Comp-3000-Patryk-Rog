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
let openingTimesUrl = "https://localhost:7170/openingtimes/";

let staffAccount = "https://localhost:7170/api/Accounts/account/staff";
let userAccount = "https://localhost:7170/api/Accounts/account/user";
let editUserAccount = "https://localhost:7170/api/Accounts/account/edit/user";
let editStaffAccount = "https://localhost:7170/api/Accounts/account/edit/staff";

let reservationDelete = "https://localhost:7170/restaurant/reservations/delete/";
let editDescription = "https://localhost:7170/staff/restaurant/description";
let editImage = "https://localhost:7170/staff/restaurant/image";

let deleteStaffUser = "https://localhost:7170/restaurant/staff/delete";
let deleteUser = "https://localhost:7170/user/delete";


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

function getOpeningTimesUrl(id){
    return openingTimesUrl + id;
}

function getUserAccountUrl(){
    return userAccount;
}

function getStaffAccountUrl(){
    return staffAccount;
}

function getEditUserAccountUrl(){
    return editUserAccount;
}

function getEditStaffAccountUrl(){
    return editStaffAccount;
}

function getReservationDeleteUrl(id) {
    return reservationDelete + id;
}

function getEditDescriptionUrl(){
    return editDescription;
}

function getEditImageUrl(){
    return editImage;
}

function getDeleteStaffUserUrl(){
    return deleteStaffUser;
}

function getDeleteUserUrl(){
    return deleteUser;
}


export {getUserLoginUrl, getStaffLoginUrl, getUserRegisterUrl, getAllRestaurantsUrl, getRestaurantUrl, 
    getAvalibleTables, getBookTableUrl, getUserTableBookingsUrl, getStaffRegisterUrl, getRestaurantRegisterUrl, 
    getStaffRestaurantsUrl, getRestaurantTablesUrl, getAddRestaurantTablesUrl, getRestaurantReservationsUrl,
    getAddOpenTimesUrl, getOpeningTimesUrl, getStaffAccountUrl, getUserAccountUrl, getEditUserAccountUrl,
    getEditStaffAccountUrl, getReservationDeleteUrl, getEditDescriptionUrl, getEditImageUrl, 
    getDeleteStaffUserUrl, getDeleteUserUrl};