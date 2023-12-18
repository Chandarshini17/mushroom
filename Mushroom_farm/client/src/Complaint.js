import './App.css';

import {useState,useEffect} from "react"
import axios from "axios";


axios.defaults.baseURL = "http://localhost:8080/"

function Complaint() {

  const [dataList, setDataList] = useState([]);


  const getFetchData = async () => {
    const data = await axios.get("/complaints");
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
        <th>EMAIL</th>
        <th>TYPE OF COMPLAINT</th>
        <th>iSSUE DATE</th>
        <th>DATE OF ISSUE</th>
        <th>DETAILS OF ISSUE</th>
        <th>Attachment</th>
        </tr>
      </thead>
      <tbody>
  {dataList && dataList.length>0 ? (
    dataList.map((el)=>(
     <tr key={el.email}>
      <td>{el.email}</td>
        <td>{el.typeOfComplaint}</td>
        <td>{el.issueDate}</td>
        <td>{el.detailsOfIssue}</td>
        <td>{el.pictureOfIssue}</td>
        
        
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

export default Complaint;