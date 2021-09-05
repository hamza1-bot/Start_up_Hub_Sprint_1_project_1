import logo from "../../../assets/images/logo.png"
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";
import $ from 'jquery'; 

const Header = (props) => {

    useEffect(() => {    // Update the document title using the browser API
        $('#idHeaderHome').addClass('active');
        $('#idHeaderLogin').removeClass('active');
        $('#idHeaderRegister').removeClass('active');
        $('#idHeaderProfile').removeClass('active');
        if(localStorage.getItem("isLoggedIn") != null && localStorage.getItem("isLoggedIn") == "true") {
            $('.classAfterLogin').show();
            $('.classBeforeLogin').hide();
            $('#idLoggedInUserName').html(JSON.parse(localStorage.getItem('user')).firstName + ' ' + JSON.parse(localStorage.getItem('user')).lastName);
            if(JSON.parse(localStorage.getItem('user')).userImage != null) {
                $("#idLoggedInUserImage").attr("src", window.$mediaURL + JSON.parse(localStorage.getItem('user')).userImage);
            }
        } else {
            $('.classBeforeLogin').show();
            $('.classAfterLogin').hide();
        }
    }, []);
    
    const history = useHistory();
    
    function openHomePage(event) {
        event.preventDefault();
        history.push('/home');
    }

    function openRegisterPage(event) {
        event.preventDefault();
        history.push('/register');
    }

    function openLoginPage(event) {
        event.preventDefault();
        history.push('/login');
    }

    function openProfilePage(event) {
        event.preventDefault();
        history.push('/edit_profile');
    }

    function logout(event) {
        event.preventDefault();
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        localStorage.removeItem('isLoggedIn');
        history.push('/home');
        window.location.reload(false);
    }

    return (
      <>
        <ToastContainer />
        <header>
            <nav class="navbar navbar-expand-md">
                <div class="container">
                    <a class="navbar-brand" href="index.html">
                        <img src={logo} alt="" />
                    </a>

                    <div class="collapse navbar-collapse collapse navbar-collapse justify-content-end"
                        id="collapsibleNavbar">
                        <ul class="navbar-nav align-items-center" style={{display: "inline-flex"}}>
                            <li class="nav-item" style={{paddingBottom: "10px"}}>
                                <a style={{fontSize: "17px", color: "#fff"}} href="" onClick={(event) => {openHomePage(event)}}>Home</a>
                            </li>
                            <li class="nav-item classAfterLogin" style={{paddingBottom: "10px"}}>
                                <a style={{fontSize: "17px", color: "#fff"}} href="" onClick={(event) => {openProfilePage(event);}}>Profile</a>
                            </li>
                            <li class="nav-item classAfterLogin" style={{paddingBottom: "10px"}}>
                                <a style={{fontSize: "17px", color: "#fff"}} href="" onClick={(event) => {logout(event)}}>Logout</a>
                            </li>
                            <li class="nav-item classBeforeLogin" style={{paddingBottom: "10px"}}>
                                <a style={{fontSize: "17px", color: "#fff"}} href="" onClick={(event) => {openRegisterPage(event)}}>Register</a>
                            </li>
                            <li class="nav-item classBeforeLogin" style={{paddingBottom: "10px"}}>
                                <a style={{fontSize: "17px", color: "#fff"}} href="" onClick={(event) => {openLoginPage(event)}}>Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    </>
    );
  };
  
  export default Header;