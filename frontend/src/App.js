
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Shop } from './Pages/Shop';
import { Category } from './Pages/Category';
import { Product } from './Pages/Product';
import { Login } from './Pages/Login';
import { Cart } from './Pages/Cart';
import women from './Components/Assets/product_1.png'
import Register from './Pages/Register';
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/women' element={<Category banner={women} category="Women" />} />
        <Route path='/gents' element={<Category category="Gents" />} />
        <Route path="/product" element={<Product />}>
          <Route path=':productId' element={<Product />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

      </Routes>
    </div>
  );
}

export default App;
