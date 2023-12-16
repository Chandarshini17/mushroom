import React from 'react'
import "../App.css"
import { MdClose } from 'react-icons/md'

export const FormTable = ({handleSubmit,handleOnChange,handleClose,rest,handleUpload}) => {
  return (
    
    <div className="addContainer">
    
      <form onSubmit={handleSubmit}>
      <div className="close-btn" onClick={handleClose}><MdClose/></div>
        <label htmlFor="mushroomName">Mushrrom Name : </label>
        <input type="string" id="mushroomName" name="mushroomName" onChange={handleOnChange} value={rest.mushroomName}/>
  
        <label htmlFor="image">Image : </label>
        <input type="file" id="image" name="image" onChange={handleOnChange} value={rest.image}/>
        
        <label htmlFor="volume">Volume : </label>
        <input type="number" id="volume" name="volume" onChange={handleOnChange} value={rest.volume}/>
  
        <label htmlFor="price">Price : </label>
        <input type="number" id="price" name="price" onChange={handleOnChange} value={rest.price}/>
        
        <label htmlFor="description">Description : </label>
        <input type="string" id="description" name="description" onChange={handleOnChange} value={rest.description}/>
        
        <label htmlFor="deliveryTime">Delivery Time : </label>
        <input type="string" id="deliveryTime" name="deliveryTime" onChange={handleOnChange} value={rest.deliveryTime}/>
        
        <label htmlFor="schedule">Schedule : </label>
        <input type="string" id="schedule" name="schedule" onChange={handleOnChange} value={rest.schedule}/>
        
        
  
        <button className="btn">Submit</button>
      </form>
     </div>
  )
}