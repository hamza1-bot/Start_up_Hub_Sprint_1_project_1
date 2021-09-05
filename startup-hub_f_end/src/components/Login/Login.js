import React, { useState, useEffect } from 'react';
import { userService } from '../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import { useHistory } from "react-router";

const Login = (props) => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {    // Update the document title using the browser API
        $('#idHeaderLogin').addClass('active');
        $('#idHeaderRegister').removeClass('active');
        $('#idHeaderHome').removeClass('active');
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

    function login() {
    	var formData = {
    	    "email" : email,
    	    "password" : password
    	}
        userService.login(formData)
        .then(res => {
             var status = res.status;
             res.json().then(
                (result) => {
                if(status == 200) {
                    setEmail("");
                    setPassword("");
                    localStorage.setItem("access_token", result.data.user.secretId);
                    localStorage.setItem("user", JSON.stringify(result.data.user));
                    localStorage.setItem('isLoggedIn', true);
                    toast.success(result.message, { hideProgressBar: true });
                    history.push('/home');
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

    function openForgotPasswordPage(event) {
        event.preventDefault();
        history.push('/forgot_password');
    }

    return (
      <>
        <ToastContainer />
        <section class="background login">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-5">

                        <div class="register-box">
                            <h3><a href="" onClick={(event) => {event.preventDefault(); history.goBack();}} class="Back-btn"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</a> Log in</h3>
                            <p>If new register <a href="" onClick={(event) => {event.preventDefault(); history.push('/register');}}>here</a></p>
                            <input type="text" placeholder="Email address" value={email} onChange={(event) => {setEmail(event.target.value);}} required />
                            <input type="password" placeholder="Password" value={password} onChange={(event) => {setPassword(event.target.value);}} required />
                            <a href="" onClick={(event) => {openForgotPasswordPage(event);}}>Forgot Password</a>
                            <button onClick={(event) => {event.preventDefault(); login();}}>LOG IN</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </>
    );
  };
  
export default Login;
