import React from 'react';
import { useState, useEffect, useContext, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { db } from '../../config/firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';

import '../../styles/index.css';

const Login = lazy(() => import('../Login/Login'));
const OtcSupply = lazy(() => import('../../pages/OtcSupply'));
const FirstAidSupply = lazy(() => import('../../pages/FirstAidSupply'));
const AdminMain = lazy(() => import('../../pages/AdminMain'));
const SignUp = lazy(() => import('../SignUp/SignUp'));
const NoPage = lazy(() => import('../../pages/NoPage'));

const App = () => {
  const [userInfo, setUserInfo] = useState();
  const [isUserAdmin, setIsUserAdmin] = useState();
  const {currentUser} = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const getUserInfo = async () => {
    const currentUserId = currentUser.user.uid;
    const docSnap = await getDoc(doc(db, "users", currentUserId));

    if (docSnap.exists()) {
      const userInfo = docSnap.data();
      const isUserAdmin = userInfo.admin;
      setUserInfo(userInfo)
      setIsUserAdmin(isUserAdmin)
    } else {
      alert("User Not Found")
    };
  };

  useEffect(() => {
      getUserInfo()
  }, []);

  return (
      <>
        <Router>
          <Suspense 
            fallback={
            <Oval
              visible={true}
              height="50"
              width="50"
              color="#1A3947"
              ariaLabel="oval-loading"
              wrapperStyle={{display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50vh"}}
              wrapperClass="container"
            />}
          >
            <Routes>
              <Route path="/">
                <Route path="login" element={<Login />} />
                <Route 
                  index 
                  element={
                    <RequireAuth>
                      <AdminMain 
                        userInfo={userInfo}
                        isUserAdmin={isUserAdmin}
                      />
                    </RequireAuth>
                  } 
                />
                <Route 
                  path="/otc" 
                  element={
                    <RequireAuth>
                      <OtcSupply 
                        userInfo={userInfo}  
                        isUserAdmin={isUserAdmin}
                      />
                    </RequireAuth>
                  }
                />
                <Route 
                  path="/first-aid" 
                  element={
                    <RequireAuth>
                      <FirstAidSupply 
                        userInfo={userInfo}  
                        isUserAdmin={isUserAdmin}
                      />
                    </RequireAuth>
                  }
                />
                <Route 
                  path="*" 
                  element={
                    <RequireAuth>
                      <NoPage />
                    </RequireAuth>
                  }
                />
                <Route path="/sign-up" element={<SignUp />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </>
  )
};

export default App;

