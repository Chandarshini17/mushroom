import './App.css';
import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";

function App() {
  const [dataList, setDataList] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  const getFetchData = async () => {
    try {
      const response = await axios.get("/dashboard");
      console.log("API Response:", response.data);
  
      if (response.data.success) {
        setDataList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);
  
    
  
    useEffect(() => {
      const formattedDate = new Date().toLocaleDateString();
      setCurrentDate(formattedDate);
    }, []);

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
      <div className='dataContainer' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
  <h2>Date: {currentDate}</h2>
  {dataList.length > 0 ? (
    dataList.map((el, index) => (
      <div key={index} style={{ marginBottom: '10px' }}>
        <h3>Mushroom product {el.s_no}</h3>
        <p><strong>PLANNED:</strong> {el.planned}</p>
        <p><strong>UNPLANNED:</strong> {el.unplanned}</p>
        <p><strong>STOCK:</strong> {el.stock}</p>
        <p><strong>TOTAL:</strong> {el.total}</p>
      </div>
    ))
  ) : (
    <p>No data</p>
  )}
</div>

</div>

    </>
  );
}

export default App;