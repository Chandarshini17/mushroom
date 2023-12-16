import React from 'react';
import "../App.css";
import { MdClose } from 'react-icons/md';

export const FormTable2 = ({ handleSubmit, handleOnChange, handleClose, rest }) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleClose}><MdClose /></div>
        <label htmlFor="s_no">SI_NO:</label>
        <input type="number" id="s_no" name="s_no" onChange={handleOnChange} value={rest.s_no || ''} />

        <label htmlFor="p_id">PERSON_ID:</label>
        <input type="text" id="p_id" name="p_id" onChange={handleOnChange} value={rest.p_id || ''} />

        <label htmlFor="person_name">PERSON_NAME:</label>
        <input type="text" id="person_name" name="person_name" onChange={handleOnChange} value={rest.person_name || ''} />

        <label htmlFor="phn">PHONE:</label>
        <input type="text" id="phn" name="phn" onChange={handleOnChange} value={rest.phn || ''} />

        <button className="btn" type="submit">Submit</button>
      </form>
    </div>
  );
};
