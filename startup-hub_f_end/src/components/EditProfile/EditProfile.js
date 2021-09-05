import profile from "../../assets/images/profile.jpg"
import React, { useState, useEffect } from 'react';
import { userService } from '../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery'; 
import { useHistory } from "react-router";

const EditProfile = (props) => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [location, setLocation] = useState('');
    const [mobile, setMobile] = useState('');
    const [bio, setBio] = useState('');
    const [imgData, setImgData] = useState(null);
    const [picture, setPicture] = useState(null);

    const history = useHistory();
    const [user, setUser] = useState({});

    useEffect(() => {    // Update the document title using the browser API
        $('#idHeaderProfile').addClass('active');
        $('#idHeaderHome').removeClass('active');
        $('#idHeaderLogin').removeClass('active');
        $('#idHeaderRegister').removeClass('active');
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
        getProfileData();
    }, []);

    function getProfileData() {
        userService.getProfileData()
        .then(res => {
             var status = res.status;
             res.json().then(
                (result) => {
                if(status == 200) {
                    setUser(result.user);
                    setFirstName(result.user.firstName != null ? result.user.firstName : '');
                    setLastName(result.user.lastName != null ? result.user.lastName : '');
                    setEmail(result.user.email != null ? result.user.email : '');
                    setCity(result.user.city != null ? result.user.city : '');
                    setState(result.user.state != null ? result.user.state : '');
                    setCountry(result.user.country != null ? result.user.country : '');
                    setLocation(result.user.location != null ? result.user.location : '');
                    setMobile(result.user.mobile != null ? result.user.mobile : '');
                    setBio(result.user.bio != null ? result.user.bio : '');
                    if(result.user.userImage != null) {
                        setImgData(window.$mediaURL + result.user.userImage);
                    }
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


    function updateProfile(event) {
        event.preventDefault();
      
        
        var formData = new FormData();
        formData.append("image", picture);
        var formData2 = {
    	    "firstName" : firstName,
            "lastName" : lastName,
            "email" : email,
    	    "city" : city,
            "state" : state,
            "country" : country,
            "location" : location,
            "mobile" : mobile,
            "bio" : bio,
            "secretId" : localStorage.getItem('access_token')
    	}
        if(picture != null) {
            formData.append("file", picture);
        }
        formData.append("data", JSON.stringify(formData2));
    	
        userService.editProfile(formData)
        .then(res => {
             var status = res.status;
             res.json().then(
                (result) => {
                if(status == 200) {
                    setFirstName("")
                    setLastName("")
                    setEmail("")
                    setCity("")
                    setState("")
                    setCountry("")
                    setLocation("")
                    setMobile("")
                    setBio("")
                    toast.success(result.message, { hideProgressBar: true });
                    var userTemp = JSON.parse(localStorage.getItem('user'));
                    userTemp.firstName = result.user.firstName;
                    userTemp.lastName = result.user.lastName;
                    userTemp.email = result.user.email;
                    userTemp.city = result.user.city;
                    userTemp.state = result.user.state;
                    userTemp.country = result.user.country;
                    userTemp.location = result.user.location;
                    userTemp.mobile = result.user.mobile;
                    userTemp.userImage = result.user.userImage;
                    userTemp.cv = result.user.cv;
                    localStorage.setItem('user', JSON.stringify(userTemp));
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

    return (
      <>
        <ToastContainer />
        <section class="profile_sec">
            <div class="Profile-img-head">
                <img src={profile} alt="" />
            </div>
            <div class="container margin-top">
                <div class="row">
                    <div class="col-md-12">
                        <div class="white-box Edit-profile">
                            <h6 class="box-title" style = {{fontSize: "24px",paddingBottom: "21px"}}>Edit Profile</h6>
                            <form action="">
                                <div class="form-group">
                                    <label for="">First Name</label>
                                    <input type="text" placeholder="" value={firstName} onChange={(event) => {setFirstName(event.target.value);}} required />
                                </div>
                                <div class="form-group">
                                    <label for="">Last Name</label>
                                    <input type="text" placeholder="" value={lastName} onChange={(event) => {setLastName(event.target.value);}} required />
                                </div>
                                <div class="form-group">
                                    <label for="">Email</label>
                                    <input type="text" disabled={true} placeholder="" value={email} onChange={(event) => {setEmail(event.target.value);}} required />
                                </div>
                                <div class="form-group">
                                    <label for="">City</label>
                                    <input type="text" placeholder="" value={city} onChange={(event) => {setCity(event.target.value);}} required />
                                </div>
                                <div class="form-group">
                                    <label for="">State</label>
                                    <input type="text" placeholder="" value={state} onChange={(event) => {setState(event.target.value);}} required />
                                </div>
                                <div class="form-group">
                                    <label for="">Country</label>
                                    <input type="text" placeholder="" value={country} onChange={(event) => {setCountry(event.target.value);}} required />
                                </div>
                                <div class="form-group">
                                    <label for="">Address</label>
                                    <textarea name="" id="" value={location} onChange={(event) => {setLocation(event.target.value);}} required ></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="">Mobile</label>
                                    <input type="text" placeholder="" value={mobile} onChange={(event) => {setMobile(event.target.value);}} required />
                                </div>
                                <div class="form-group">
                                    <label for="">Bio</label>
                                    <textarea name="" id="" value={bio} onChange={(event) => {setBio(event.target.value);}} required ></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="">Upload Resume</label>
                                    <input type="file" />
                                </div>
                            </form>
                            <a href="" onClick={(event) => {updateProfile(event)}} class="update-btn">Update</a>
                        </div>
                    </div>
                </div>
            </div>

        </section>
      </>
    );
  };
  
export default EditProfile;