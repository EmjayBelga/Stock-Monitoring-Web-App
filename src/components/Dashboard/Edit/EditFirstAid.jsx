import React from 'react';
import Swal from 'sweetalert2';

import { useState } from 'react';
import { db } from '../../../config/firebase-config';
import { doc, setDoc } from "firebase/firestore"; 

const EditFirstAid = ({ supplies, selectedSupply, setSupplies, setIsEditing, getSupplies }) => {
  const id = selectedSupply.id;

  const [name, setName] = useState(selectedSupply.name);
  const [description, setDescription] = useState(selectedSupply.description);
  const [stocks, setStocks] = useState(selectedSupply.stocks);
  const [expDate, setExpDate] = useState(selectedSupply.expDate);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !description || !stocks || !expDate) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const supply = {
      id,
      name,
      description,
      stocks,
      expDate,
    };

    // Add a new document in collection "firstAidSupplies"
    await setDoc(doc(db, "firstAidSupplies", id), {
      ...supply
    });

    for (let i = 0; i < supplies.length; i++) {
      if (supplies[i].id === id) {
        supplies.splice(i, 1, supply);
        break;
      }
    }

    setSupplies(supplies);
    setIsEditing(false);
    getSupplies();
    

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${supply.name}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <h1 className="admin__sub-title">EDIT SUPPLY</h1>
        <label htmlFor="name">Name</label>
        <input
          className="form__input-label"
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="description">Description</label>
        <input
          className="form__input-label"
          id="description"
          type="text"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <label htmlFor="stocks">Stocks</label>
        <input
          className="form__input-label"
          id="stocks"
          type="number"
          name="stocks"
          value={stocks}
          onChange={e => setStocks(e.target.value)}
        />
        <label htmlFor="expDate">Expiration Date</label>
        <input
          className="form__input-label"
          id="expDate"
          type="date"
          name="expDate"
          value={expDate}
          onChange={e => setExpDate(e.target.value)}
        />
        <div>
          <input 
            className="update-btn btn"
            type="submit" 
            value="Update" />
          <input
            className="cancel-btn btn"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default EditFirstAid;
