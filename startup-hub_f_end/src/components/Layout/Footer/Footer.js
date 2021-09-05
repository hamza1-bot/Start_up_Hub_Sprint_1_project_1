

import React, { useState, useEffect } from 'react';
import { userService } from '../../../services/UserServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = (props) => {
    return (
      <>
        <ToastContainer />
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="copy-right">
                            <p>© All Copy Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
      </>
    );
  };
  
  export default Footer;
  