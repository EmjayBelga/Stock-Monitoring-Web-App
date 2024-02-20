import React from 'react';
import Swal from 'sweetalert2';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from '../../config/firebase-config';
import { AuthContext } from '../../context/AuthContext';

const Logout = () => {

  const navigate = useNavigate()
  const {dispatch} = useContext(AuthContext)

  const handleLogout = async () => {
    await signOut(auth)
    .then(() => {
       Swal.fire({
        icon: 'question',
        title: 'Logging Out',
        text: 'Are you sure you want to log out?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
      }).then(result => {
        if (result.value) {
          Swal.fire({
            timer: 1500,
            showConfirmButton: false,
            willOpen: () => {
              Swal.showLoading();
            },
            willClose: () => {
              dispatch({type:"LOGOUT"});
              navigate("/login");
            },
          });
        }
      });
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error,
        showConfirmButton: true,
      });
    });
  };

  return (
    <div>
      <button
        className="logout-btn btn"
        onClick={handleLogout}
      >
        LOGOUT
      </button>
    </div>
  );
};

export default Logout;
