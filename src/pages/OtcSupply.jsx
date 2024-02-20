import React from 'react';
import Swal from 'sweetalert2';

import { useState, useEffect, lazy } from 'react';
import { db } from '../config/firebase-config';
import { collection, doc, deleteDoc, onSnapshot } from 'firebase/firestore';

const Header = lazy(() => import('../components/Dashboard/Header'));
const Table = lazy(() => import('../components/Dashboard/Table'));
const AddOtc = lazy(() => import('../components/Dashboard/Add/AddOtc'));
const EditOtc = lazy(() => import('../components/Dashboard/Edit/EditOtc'));


const OtcSupply = ({userInfo, isUserAdmin}) => {
  const [supplies, setSupplies] = useState();
  const [selectedSupply, setSelectedSupply] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getSupplies = () => {
    onSnapshot(collection(db, "otcSupplies"), (snapShot) => {
      const supplies = snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSupplies(supplies);
    });
  }; 

  useEffect(() => {
      getSupplies()
  }, []);

  const handleEdit = id => {
    const [supply] = supplies.filter(supply => supply.id === id);

    setSelectedSupply(supply);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [supply] = supplies.filter(supply => supply.id === id);

        deleteDoc(doc(db, "otcSupplies", id));

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${supply.name}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const suppliesCopy = supplies.filter(supply => supply.id !== id);
        setSupplies(suppliesCopy);
      }
    });
  };


  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header 
            userInfo={userInfo}
            isUserAdmin={isUserAdmin} 
          />
          <h2 className="admin__sub-title">OTC Supply Details</h2>
          
          {isUserAdmin ? ( 
            <button className="add-supply-btn btn" onClick={() => setIsAdding(true)}>ADD SUPPLY</button>
            ) : (
            <button disabled className="add-supply-btn btn">
              <img 
                className="prohibited-icon" 
                src="../assets/prohibitedIcon.png" 
                alt="Prohibited Icon" />
            </button>
            )  
          }
        
          <Table
            userInfo={userInfo}
            isUserAdmin={isUserAdmin} 
            supplies={supplies}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          /> 
        </>
      )}
      {isAdding && (
        <AddOtc
          userInfo={userInfo}
          isUserAdmin={isUserAdmin} 
          supplies={supplies}
          setSupplies={setSupplies}
          setIsAdding={setIsAdding}
          getSupplies={getSupplies}
        />
      )}
      {isEditing && (
        <EditOtc
          userInfo={userInfo}
          isUserAdmin={isUserAdmin} 
          supplies={supplies}

          selectedSupply={selectedSupply}
          setSupplies={setSupplies}
          setIsEditing={setIsEditing}
          getSupplies={getSupplies}
        />
      )}
    </div>
  );
};

export default OtcSupply;