import React from "react";

function checkInputs(email, password, confirmPassword, name, surname, dateOfBirth){
    let issues = [];

    if (!email.includes("@")) {
        issues.push([0, "Invalid email address"]);
    }
    if (password.length < 8){
        issues.push([1, "Password must have at least 8 characters"]);
    }
    if (password !== confirmPassword || password == ""){
        issues.push([2, "Passwords dont match"]);
    }
    if (name.length == null || name == ""){
        issues.push([3, "You must input your name"]);
    }
    if (surname.length == null || surname == ""){
        issues.push([4, "You must input your surname"]);
    }
    if (dateOfBirth == null || dateOfBirth == "") {
        issues.push([5, "Please input date of birth"]);
    }

    return issues;
}

function getRegisterHeadings(){
    const headings = [
        "email", 
        "password",
        "confirm password", 
        "name",
        "surname",
        "Date of birth"
    ];
    return headings;
}

function getHTMLHeadings(){
    const headings = [
        "emailLabel", 
        "passwordLabel",
        "confirmPasswordLabel", 
        "nameLabel",
        "surnameLabel",
        "dateOfBirthLabel"
    ];
    return headings;
}



export {checkInputs, getRegisterHeadings, getHTMLHeadings}



