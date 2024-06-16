import './App.css';
import Navbar from './component/Navbar';
import Home from './component/Home';
import { Routes, Route } from "react-router-dom";
import Products from './component/Products';
import Product from './component/Product';
import Cart from './component/Cart';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route  path='/' element={<Home/>} />
        <Route  path='/products' element={<Products/>} />
        <Route  path='/product/:asin' element={<Product/>} />
        <Route  path='/cart' element={<Cart/>} />
      </Routes>
    </>
  );
}

export default App;
