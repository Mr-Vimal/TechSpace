import React from 'react';
import RouteTable from './Routes/Routes';
import { CartProvider } from './Context/CartContext';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <CartProvider>
      <ToastContainer />
      <RouteTable />
    </CartProvider>
  );
}

export default App;
