
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 

const Home = (props) => {

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

    return (
      <>
        <ToastContainer />
        <section class="main-banner">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="banner-content">
                            <h1>Think about new things. Your thoughts need wings.</h1>
                            <p>Startup Hub open the door to success. We have an amazing network and connected us with every investor in our seed round.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </>
    );
  };
  
export default Home;