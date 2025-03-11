import React from "react";
import TopNavBar from "../components/TopNavBar";
import { apiAuthGetConnection } from "../reusableFunctions/apiConnection";


function EditStaffProfilePage(){






    return (
        <div>
            <TopNavBar/>
            <p>Edit staff profile page</p>
            <div id="dataInputs">
                <label>Name:</label>
                <input id="nameInput"></input>
                <br/>
                <label>Surname:</label>
                <input id="nameInput"></input>
                <br/>
                <label>Email:</label>
                <input id="nameInput"></input>
                <br/>
                <label>Date of birth:</label>
                <input id="nameInput"></input>
                <br/>
                <label>Password:</label>
                <input id="nameInput"></input>


            </div>
            <button>Save</button>
            <button>Cancel</button>
            <br/>
            <button>Delete Account</button>


        </div>
    )

}

export default EditStaffProfilePage