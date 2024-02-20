import React from 'react';
import Swal from 'sweetalert2';

import { useState } from 'react';
import { db } from '../../../config/firebase-config';
import { collection, addDoc} from "firebase/firestore"; 

const AddFirstAid = ({ supplies, setSupplies, setIsAdding, getSupplies }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [stocks, setStocks] = useState('');
  const [expDate, setExpDate] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name || !description || !stocks || !expDate) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    const newSupply = {
      name,
      description,
      stocks,
      expDate,
    };

    supplies.push(newSupply);

    // Add a new document with a generated id.
    try {
      await addDoc(collection(db, "firstAidSupplies"), {
        ...newSupply
      });
    } catch (error) {
      console.log(error);
    };  

    setSupplies(supplies);
    setIsAdding(false);
    getSupplies();

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${name}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <h1 className="admin__sub-title">ADD SUPPLY</h1>
        <label htmlFor="name"></label>
        <input
          className="form__input"
          id="name"
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="description"></label>
        <input
          className="form__input"
          id="description"
          type="text"
          name="description"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <label htmlFor="stocks"></label>
        <input
          className="form__input"
          id="stocks"
          type="number"
          name="stocks"
          placeholder="Stocks"
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
            className="add-btn btn" 
            type="submit" 
            value="Add" 
          />
          <input
            className="cancel-btn btn"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default AddFirstAid;
