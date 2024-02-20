import React from 'react';
import { useState, lazy } from 'react';
import { Navigate } from 'react-router-dom';

const HeaderLogo = lazy(() => import('../components/Dashboard/HeaderLogo'));


const AdminMain = ({userInfo, isUserAdmin}) => {
    const [goToOtcSupply, setGoToOtcSupply] = useState(false);
    const [goToFirstAidSupply, setGoToFirstAidSupply] = useState(false);

    if (goToOtcSupply) {
        return <Navigate to="/otc" />
    };

    if (goToFirstAidSupply) {
        return <Navigate to="/first-aid" />
    };


  return (
    <main className="container">
        <HeaderLogo 
            userInfo={userInfo}
            isUserAdmin={isUserAdmin}  
        />
        
        <h2 className="admin__sub-title">VENDO SUPPLY SLOTS</h2>
        <div className="admin__supply-btn-wrapper">
            <button 
                className="admin__supply-btn"
                onClick={() => {setGoToOtcSupply(true)}}
            > OTC Medicine Supply
            </button>
            <button 
                className="admin__supply-btn"
                onClick={() => {setGoToFirstAidSupply(true)}}
            > First Aid Supply
            </button>
        </div>
    </main>
  );
};

export default AdminMain;