import React from 'react';
import Swal from 'sweetalert2';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../../config/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';


const SignUp = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !mobile || !email || !password) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    };

    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          setDoc(doc(db, 'users', user.uid), {
            firstName: firstName,
            lastName: lastName,
            mobile: mobile,
            email: email,
            admin: false
          });
              
          navigate("/");
        
          Swal.fire({
            icon: 'success',
            title: 'Account Successfully Created!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    })
    .catch((error) => {
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
    });
  };

  return (
    <div className="container">
      <form className="form__field" onSubmit={handleSignup}>
        <h1 className="login__title">SIGN UP</h1>
        <div>
          <label htmlFor="first-name"></label>
          <input
            className="form__input"
            id="first-name"
            type="text"
            name="first-name"
            placeholder="First Name"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="last-name"></label>
          <input
            className="form__input"
            id="last-name"
            type="text"
            name="last-name"
            placeholder="Last Name"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="mobile"></label>
          <input
            className="form__input"
            id="mobile"
            type="tel"
            name="mobile"
            placeholder="Mobile No."
            value={mobile}
            onChange={e => setMobile(e.target.value)}
          />
        </div>
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
        <input className="login-btn btn" type="submit" value="SIGN UP" />
      </form>
      <div className="login-signup-link">
        <span>Already have an Account? <Link to="/login" className="login-signup-link-txt">LOGIN</Link></span>
      </div>
    </div>
  )
}

export default SignUp;