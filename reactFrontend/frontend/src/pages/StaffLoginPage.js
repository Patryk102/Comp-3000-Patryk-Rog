import React from 'react';
import Login from '../components/Login';
import TopNavBar from '../components/TopNavBar';
import "../pageStyles/LoginRegisterStyle.css";

function StaffLoginPage(){
    return (
        <div>
            <TopNavBar></TopNavBar>
            <div className='restMainDiv'>
                <h1>Staff Login</h1>
                <div className='description'>
                    <div className='descriptionContents'>


                        <Login></Login>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default StaffLoginPage