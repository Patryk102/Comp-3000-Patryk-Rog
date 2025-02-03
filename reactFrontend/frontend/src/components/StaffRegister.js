import React from "react";


function StaffRegister(){

    return (
        <div>
            <p>staff register component</p>
            <div>
                <label>email: </label>
                <input type="text" id="emailInput"></input>
                <br/>
                <label>name: </label>
                <input type="text" id="nameInput"></input>
                <br/>
                <label>surname: </label>
                <input type="text" id="surnameInput"></input>
                <br/>
                <label>Date of Birth: </label>
                <input type="Date" id="dobInput"></input>
            </div>
            <button>Register</button>

        </div>
    )
}

export default StaffRegister;