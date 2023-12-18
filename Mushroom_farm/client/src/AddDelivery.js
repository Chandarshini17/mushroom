import './App.css';
import {useState,useEffect} from "react"
import axios from "axios";
import { FormTable2 } from './components/FormTable2';

axios.defaults.baseURL = "http://localhost:8080/"

function AddDelivery() {

  const [addSection,setAddSection] = useState(false)
  
  const [formData,setFormData] = useState({
    s_no : "",
    p_id : "",
    person_name : "",
    phn : "",
    
  })
  
  const [dataList,setDataList] = useState([])

  const handleOnChange = (e) =>{
    const  {value,name} = e.target
    setFormData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  // const handleSubmit=async(e)=>{
  //   e.preventDefault()
  //   const data = await axios.post("/delivery/create",formData)
  //   console.log(data)
  //   if(data.data.success){
  //     setAddSection(false)
  //     alert(data.data.message)
  //     getFetchData()
  //   }
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("/delivery/create", formData);
      if (data.data.success) {
        setAddSection(false);
        alert(data.data.message);
        getFetchData(); // Assuming this function fetches and updates the data.
      } else {
        alert(data.data.message); // Display the server's error message.
      }
    } catch (error) {
      console.error("Error with the create request:", error);
      // You can also set a state to show a user-friendly error message.
      // setError("An error occurred while processing your request.");
    }
  };

  

  const getFetchData = async () => {
    try {
      const response = await axios.get("/delivery");
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
  

  const handleDelete = async(id)=>{
    const data = await axios.delete("/delivery/delete/"+id)
   
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
    }
  }
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
   <button className="btn btn-add" onClick={()=>setAddSection(true)}>Add</button>

   {
    addSection && (
      <FormTable2
      handleSubmit={handleSubmit}
      handleOnChange={handleOnChange}
      handleClose={()=>setAddSection(false)}
      rest={formData}
      />
    )
   }
  
<br></br>
<br></br>
   <div className='tableContainer'>
    <table>
      <thead>
        <tr>
          <th>SI_NO</th>
          <th>ID</th>
          <th>PERSON_NAME</th>
          <th>NUMBER</th>
          <th>
            
          </th>
        </tr>
      </thead>
      <tbody>
      {dataList && dataList.length > 0 ? (
  dataList.map((el) => (
    <tr key={el._id}>
      <td>{el.s_no}</td>
      <td>{el.p_id}</td>
      <td>{el.person_name}</td>
      <td>{el.phn}</td>
      <td>
        
        <button className="btn btn-delete" onClick={() => handleDelete(el._id)}>
          Delete
        </button>
      </td>
    </tr>
    
  ))
  
) : (
  <tr>
  <td colSpan="5" style={{ textAlign: 'center' }}>
    <p>No data</p>
  </td>
</tr>


)}


</tbody>
    </table>  
   </div>
   
   </div>
   </>
  );
}

export default AddDelivery;