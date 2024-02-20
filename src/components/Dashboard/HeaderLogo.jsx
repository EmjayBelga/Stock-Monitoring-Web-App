import React from 'react';
import { useState } from 'react';

import Logout from '../Logout/Logout';

const HeaderLogo = ({userInfo, isUserAdmin}) => {

  const [click, SetClick] = useState(false);

  const handleClick = () => {
    SetClick(prevState => !prevState)
  };


  
  return (
    <header className="admin__circle">
      <div className="admin__header">
        <h3 className="admin__header-logo">VENDO</h3>

        <button onClick={handleClick}>
          {click ? 
            <svg 
              className="admin__mobile-close"
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg> :

            <svg 
              className="admin__mobile-bars" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="1.5" 
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg> 
          }
        </button>
      </div>

      <nav>
        {userInfo && (
          <ul className={click ? "admin__info active" : "admin__info"}>
            <li className="admin__info-li">
              <svg
                className="user-icon" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor">
                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
              </svg>
              
              <span className="admin__info-data"> {`${userInfo.firstName} ${userInfo.lastName}`} </span>
            </li>

            <li className="admin__info-li">
              <svg 
                className="phone-icon" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
              </svg>

              <span className="admin__info-data"> {userInfo.mobile} </span>
            </li>

            <li className="admin__info-li">
              <svg 
                className="email-icon"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor">
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>

              <span className="admin__info-data"> {userInfo.email} </span>
            </li>
      
            <li> <Logout /> </li>
          </ul>
        )}
      </nav>
      
      <h1 className="admin__title">{isUserAdmin ? "ADMIN" : "USER"}</h1>
    </header>           
  );
};

export default HeaderLogo;
