import './App.css';

import {useState,useEffect} from "react"
import axios from "axios";


axios.defaults.baseURL = "http://localhost:8080/"

function DeliveryDetails() {

  const [dataList, setDataList] = useState([]);


  const getFetchData = async () => {
    const data = await axios.get("/deliveryDetails");
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
        <th>S_NO</th>
        <th>USER NAME</th>
        <th>PERSON NAME</th>
        <th>PHONE NUMBER</th>
        <th>DELIVERY ITEMS</th>
        <th>DELIVERY STATUS</th>
        </tr>
      </thead>
      <tbody>
  {dataList && dataList.length>0 ? (
    dataList.map((el)=>(
     <tr key={el.s_no}>
        <td>{el.user_name}</td>
        <td>{el.person_name}</td>
        <td>{el.phn}</td>
        <td>{el.delivery_items}</td>
        <td>
        <label>
        <input type="checkbox" id="myCheckbox"/>
        Delivered 
        </label>
        </td>
        
        
      </tr>
    ))
      
    ):(
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

export default DeliveryDetails;