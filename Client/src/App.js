import React from 'react';
import RouteTable from './Routes/Routes';
import { CartProvider } from './Context/CartContext';


function App() {
  return (
    <CartProvider>
        <RouteTable />
    </CartProvider>
  );
}

export default App;
    