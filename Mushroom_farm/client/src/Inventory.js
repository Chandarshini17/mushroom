import './App.css';
import { NumberBox, NumberBoxTypes } from 'devextreme-react/number-box';

import {useState,useEffect} from "react"
import axios from "axios";


axios.defaults.baseURL = "http://localhost:8080/"



function Inventory() {

  const [dataList, setDataList] = useState([]);

  const getFetchData = async () => {
    const data = await axios.get("/product");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data.map((item) => ({ ...item, num: 0 }))); // Assuming 'num' is initialized to 0.
    }
  };
  
  useEffect(()=>{
    getFetchData()
  },[])
  console.log(dataList)

  const handleAdd = (id, value) => {
    setDataList(prevDataList => {
      return prevDataList.map(item => {
        if (item._id === id) {
          return { ...item, num: item.num + value };
        }
        return item;
      });
    });
  };

  const handleSubtract = (id, value) => {
    setDataList(prevDataList => {
      return prevDataList.map(item => {
        if (item._id === id) {
          const newNum = item.num - value < 0 ? 0 : item.num - value;
          return { ...item, num: newNum };
        }
        return item;
      });
    });
  };

  return (
   <>
   <div className="nav_items">
        <ul className="navbar">
          <li className="dropdown">
            <a href="/Dashboard">Dashboard</a>
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
        
      <div className='tableContainer' >
    <table>
      <thead>
        <tr>
        <th>MUSHROOM NAME</th>
          
          <th>VOLUME</th>
          <th>PRICE</th>
          <th>DESCRIPTION</th>
          <th>DELIVERY TIME</th>
          <th>SCHEDULE</th>
          
          <th>
            
          </th>
        </tr>
      </thead>
      <tbody>
  {dataList && dataList.length>0 ? ( 
    dataList.map((el)=>(
      <tr key={el._id}>
       <td>{el.mushroomName}</td>
             
              <td>{el.volume}</td>
              <td>{el.price}</td>
              <td>{el.description}</td>
              <td>{el.deliveryTime}</td>
              <td>{el.schedule}</td>
          {/* <td>
          <NumberBox inputAttr={counter} />
        <button className="btn btn-delete" onClick={() => setCounter( {el.volume}+ counter)}>
            Add
            </button>

            <button className="btn btn-delete" onClick={() => setCounter({el.volume} + counter)}>
            Minus
            </button>
            </td> */}

<td>
                      <NumberBox value={el.num} onValueChanged={(e) => handleAdd(el._id, e.value)} />
                      <button className="btn btn-delete" onClick={() => handleAdd(el._id, 1)}>
                        Add
                      </button>
                      <button className="btn btn-delete" onClick={() => handleSubtract(el._id, 1)}>
                        Minus
                      </button>
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

export default Inventory;