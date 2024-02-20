import React from 'react';
import Swal from 'sweetalert2';

import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../config/firebase-config';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext);

  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          dispatch({type:"LOGIN", payload:user});
          navigate("/");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          
          Swal.fire({
            icon: 'success',
            title: 'Successfully logged in!',
            showConfirmButton: false,
            timer: 1500,
          });

          
        },
      });
    } 
    catch (error) {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: error,
            showConfirmButton: true,
          });
        },
      });
    };
  };
  

  return (
    <div className="container">
      <div className="login__images">
        <img className="login__medicine-icon" src="../assets/medicineIcon.png" alt="Medicine Icon" />
        <img className="login__phone-icon" src="../assets/phoneIcon.png" alt="Phone Icon" />
      </div>

      <form className="form__field" onSubmit={handleLogin}>
        <h1 className="login__title">Login</h1>
        <div>
          <label htmlFor="email"></label>
          <input
            className="form__input"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            className="form__input"
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <input className="login-btn btn" type="submit" value="LOGIN" />
      </form>
      <div className="login-signup-link">
        <span>Don't have an Account? <Link to="/sign-up" className="login-signup-link-txt">SIGN UP</Link></span>
      </div>
    </div>
  );
};

export default Login;
