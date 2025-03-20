import React from "react";

async function apiPostConnection(apiUrl, inputData){
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputData),
    });
    const data = await response;
    let textResponse = await data.text();
    console.log('Recieved token:', textResponse);
    if (data.status == 400){
        console.log("invalid email or password");
        return ["400", textResponse];
    }
    else if (data.status == 200){
        console.log(textResponse);
        return ["200", textResponse];
    }
    else{
        console.log("Connection error");
        return ["500", textResponse];
    }
}



async function apiGetConnection(apiUrl){
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response;
    let textResponse = await data.text();
    console.log('Recieved token:', textResponse);
    if (data.status == 400){
        console.log("invalid email or password");
        return ["400", "error"];
    }
    else if (data.status == 200){
        console.log(textResponse);
        return ["200", JSON.parse(textResponse)];
    }
    else{
        console.log("Connection error");
        return ["500", textResponse];
    }
}

async function apiAuthPostConnection(apiUrl, inputData, token){
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(inputData),
    });
    const data = await response;
    let textResponse = await data.text();
    console.log('Recieved token:', textResponse);
    if (data.status == 400){
        console.log("invalid email or password");
        return ["400", "Invalid email or password"];
    }
    else if (data.status == 200){
        console.log(textResponse);
        return ["200", textResponse];
    }
    else{
        console.log("Connection error");
        return ["500", textResponse];
    }
}

async function apiAuthGetConnection(apiUrl, token){
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
    });
    const data = await response;
    let textResponse = await data.text();
    console.log('Recieved token:', textResponse);
    if (data.status == 400){
        console.log("invalid email or password");
        return ["400", "error"];
    }
    else if (data.status == 200){
        console.log(textResponse);
        return ["200", JSON.parse(textResponse)];
    }
    else{
        console.log("Connection error");
        return ["500", textResponse];
    }
}

async function apiAuthPutConnection(apiUrl, inputData, token){
    const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(inputData),
    });
    const data = await response;
    let textResponse = await data.text();
    console.log('Recieved token:', textResponse);
    if (data.status == 400){
        console.log("invalid email or password");
        return ["400", "Invalid email or password"];
    }
    else if (data.status == 200){
        console.log(textResponse);
        return ["200", textResponse];
    }
    else{
        console.log("Connection error");
        return ["500", textResponse];
    }
}

async function apiAuthDeleteConnection(apiUrl, token){
    const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
    });
    const data = await response;
    let textResponse = await data.text();
    console.log('Recieved token:', textResponse);
    if (data.status == 400){
        console.log("invalid email or password");
        return ["400", "error"];
    }
    else if (data.status == 200){
        console.log(textResponse);
        return ["200", JSON.parse(textResponse)];
    }
    else{
        console.log("Connection error");
        return ["500", textResponse];
    }
}





export {apiPostConnection, apiGetConnection, apiAuthPostConnection, apiAuthGetConnection, apiAuthPutConnection, apiAuthDeleteConnection};