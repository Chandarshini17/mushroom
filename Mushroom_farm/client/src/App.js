import React from 'react';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import AddProduct from './AddProduct';
import Dashboard from './Dashboard'
import AddDelivery from './AddDelivery';
import Users from './Users';
import Sales from './Order';
import Inventory from './Inventory';
import Complaint from './Complaint';
import Delivery from './DeliveryDetails';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/AddDelivery" element={<AddDelivery />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/Order" element={<Sales />} />
        <Route path="/Inventory" element={<Inventory />} />
        <Route path="/Complaint" element={<Complaint />} />
        <Route path="/DeliveryDetails" element={<Delivery/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;



