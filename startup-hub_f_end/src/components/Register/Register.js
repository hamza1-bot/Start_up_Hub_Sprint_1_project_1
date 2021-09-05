import React, { useState, useEffect } from 'react';
import { userService } from '../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router";
import $ from 'jquery';

const Register = (props) => {

    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {    // Update the document title using the browser API
        $('#idHeaderRegister').addClass('active');
        $('#idHeaderLogin').removeClass('active');
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

    function register() {

        if(password != confirmPassword) {
            toast.error("Password and Confirm Password Mismatch.", {hideProgressBar: true})
            return false;
        }
    	var formData = {
            "firstName" : firstName,
            "lastName" : lastName,
    	    "email" : email,
    	    "password" : password
    	}
        userService.signUp(formData)
        .then(res => {
             var status = res.status;
             res.json().then(
                (result) => {
                if(status == 200) {
                    setFirstName("")
                    setLastName("")
                    setEmail("")
                    setPassword("")
                    setConfirmPassword("")
                    toast.success(result.message, { hideProgressBar: true });
                    localStorage.setItem('currentPage', 'login');
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
        <section class="background regiter">
            <div class="container">
                <div class="row h-100 d-fles justify-content-center align-items-center">
                    <div class="col-md-5">

                        <div class="register-box">
                            <h3><a href="" onClick={(event) => {event.preventDefault(); history.goBack();}} class="Back-btn"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</a> Register</h3>
                            <p>If Already have an account ? <a href="" onClick={(event) => {event.preventDefault(); history.push('/login');}}>Login</a></p>
                            <input type="text" placeholder="First Name" value={firstName} onChange={(event) => {setFirstName(event.target.value);}} required/>
                            <input type="text" placeholder="Last Name"  value={lastName} onChange={(event) => {setLastName(event.target.value);}} required/>
                            <input type="text" placeholder="Email address"  value={email} onChange={(event) => {setEmail(event.target.value);}} required/>
                            <input type="password" placeholder="Password"  value={password} onChange={(event) => {setPassword(event.target.value);}} required/>
                            <input type="password" placeholder="Confirm Password"  value={confirmPassword} onChange={(event) => {setConfirmPassword(event.target.value);}} required/>
                            <button onClick={register}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </>
    );
  };
  
export default Register;
