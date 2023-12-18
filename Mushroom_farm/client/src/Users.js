import './App.css';
import {useState,useEffect} from "react"
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/"

function App() {

  const [dataList,setDataList] = useState()

    const getFetchData = async () => {
    try {
      const response = await axios.get("/users");
      console.log("API Response:", response.data);
  
      if (response.data.success) {
        setDataList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(()=>{
    getFetchData()
  },[])
  

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
   
   <div className="container">
   

   <div className='tableContainer'>
    <table>
      <thead>
        <tr>
        
          <th>USER_NAME</th>
          <th>EMAIL</th>
          <th>MObileNo</th>
          <th>Address</th>
          <th>Orders</th>
          {/* <th>Item_Details</th>
          <th>Qty</th>
          <th>Dplan</th>
          <th>Dperson1</th>
          <th>Dperson2</th> */}
        </tr>
      </thead>
      <tbody>
      {dataList && dataList.length>0 ? (
          dataList.map((el)=>(
            
              <tr key={el.name}>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>{el.phn}</td>
                <td>{el.addresses}</td>
                <td>{el.orders}</td>
                {/* <td>{el.items_details}</td>
                <td>{el.Qty}</td>
                <td>{el.Dplan}</td>
                <td>{el.Dperson1}</td>
                <td>{el.Dperson2}</td> */}
              </tr>
            ))
          )
          : (
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
   
   </div>
   
   </>
  );
}

export default App;