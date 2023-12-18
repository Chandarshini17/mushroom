import './App.css';

import {useState,useEffect} from "react"
import axios from "axios";
import React from 'react';

axios.defaults.baseURL = "http://localhost:8080/"

function App() {

  const [dataList, setDataList] = useState([]);

  const getFetchData = async () => {
    const data = await axios.get("/sales");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data.map((item) => ({ ...item, num: 0 }))); // Assuming 'num' is initialized to 0.
    }
  };
  
  useEffect(()=>{
    getFetchData()
  },[])
  console.log(dataList)
  return (
   <>
   <div className="nav_items">
        <ul className="navbar">
          <li className="dropdown">
            <a href="/">Dashboard</a>
          </li>

          <li className="dropdown">
            <a href="/Order">Sales</a>
          </li>

          <li className="dropdown">
            <a href="/Inventory">Inventory</a>
          </li>

          <li className="dropdown">
            <a href="/Users">Users</a>
          </li>

          <li className="dropdown">
            <a href="/">Admin</a>
            <ul className="dropdown-content">
              <li><a href="/AddProduct">Add Products</a></li>
              <li><a href="/AddDelivery">Add Delivery Person</a></li>
              <li><a href="/Complaint">Complaints</a></li>
              <li><a href="/DeliveryDetails">Delivered Details</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <center>
      <div className='tableContainer'>
    <table>
      <thead>
        <tr>
          <th>USER</th>
          <th>PRODUCTS</th>
          <th>SHIPPING ADDRESS</th>
          <th>PAYMENT METHOD</th>
          {/* <th>INVOICE_DATE</th>
          <th>TYPE</th>
          <th>PAYMENT</th> */}
          
        </tr>
      </thead>
      <tbody>
      {dataList && dataList.length>0 ? (
    dataList.map((el)=>(
      <tr key={el.user}>
        <td>{el.user}</td>
        <td>{el.products}</td>
        <td>{el.shippingAddress}</td>
        <td>{el.paymentMethod}</td>
        {/* <td>{el.Invoiceno}</td>
        <td>{el.Invoicedate}</td>
        <td>{el.Type}</td>
        <td>{el.Paymentstatus}</td> */}
      </tr>
    ))
      ) : (
        <tr>
        <td colSpan="5" style={{ textAlign: 'center' }}>
          <p>No data</p>
        </td>
      </tr>
      )
}
</tbody>

    </table>
   </div>
   
      </center>
    </>
  );
}

export default App;