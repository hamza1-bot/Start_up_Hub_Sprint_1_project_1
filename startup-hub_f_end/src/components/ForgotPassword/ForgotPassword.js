import React, { useState, useEffect } from 'react';
import { userService } from '../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import { useHistory } from "react-router";

const ForgotPassword = (props) => {

    const history = useHistory();

    useEffect(() => {    // Update the document title using the browser API
        $('#idHeaderHome').removeClass('active');
        $('#idHeaderLogin').addClass('active');
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

    const [email, setEmail] = useState('');

    function forgotPassword() {

        if(email == '') {
            toast.error("Please Enter Email", {hideProgressBar: true})
            return false;
        }
        var formData = {
            "email" : email
        }
        userService.forgotPassword(formData)
        .then(res => {
             var status = res.status;
             res.json().then(
                (result) => {
                if(status == 200) {
                    setEmail("")
                    toast.success(result.message, { hideProgressBar: true });
                    history.push('/login');
                } else if (status == 401) {
                   toast.error(result.error_description, {hideProgressBar: true, pauseOnHover: false});
                } else {
                   toast.error(result.message, {hideProgressBar: true, pauseOnHover: false});
                }
                }
             )
        },
        (error) => {
          toast.error(error.message, {hideProgressBar: true, pauseOnHover: false});
        }
        )
    }

    return (
      <>
        <ToastContainer />
        <section class="background forget">
            <div class="container">
                <div class="row h-100 d-fles justify-content-center align-items-center">
                    <div class="col-md-5">

                        <div class="register-box">
                            <h3><a href="" onClick={(event) => {event.preventDefault(); history.goBack();}} class="Back-btn"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</a> Forget Password</h3>

                            <div class="change-box">
                                <input type="text" placeholder="Enter your email" value={email} onChange={(event) => {setEmail(event.target.value);}} />
                                <button onClick={forgotPassword}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </>
    );
  };
  
export default ForgotPassword;