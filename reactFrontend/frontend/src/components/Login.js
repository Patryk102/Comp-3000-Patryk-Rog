import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login(){

    const handleLogin = () => {
        navigate = useNavigate();
        processLogin(navigate);
    }


    return (
        <div>
            <label>Login</label>
            <br/>
            <br/>
            <form>
                

                <label>Email</label>
                <input id="emailInput"></input>
                <br/>
                <br/>
                <label>Password</label>
                <input id="passwordInput"></input>
                <br/>
                <br/>
                


            </form>
            <button onClick={processLogin}>Login</button>




        </div>
    );


}

function processLogin(navigate){
    console.log("processing login");
    var url = "https://localhost:7170/api/Login/restaurant/Login";

    let email = document.getElementById("emailInput").value;
    let password = document.getElementById("passwordInput").value;

    let postJson = {"email":email, "password":password};
    
    apiPostConnection(url, postJson, navigate);
  
  };

  async function apiPostConnection(endpointUrl, loginData, navigate) {
    const response = await fetch(endpointUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    });
    const data = await response;
    let textResponse = await data.text();
    console.log('Recieved token:', textResponse);
    if (data.status == 400){
      console.log("invalid email or password");
      //finish this and make look nice
    }
    else if (data.status == 200){
      console.log(textResponse);
      //process for correct login TO FINISH
      //Should then go on next page
      //navigate("");
    }
    else{
      console.log("Connection error");
      //finish and make look nice
    }

  }



export default Login;