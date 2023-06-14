// React Router Dom
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Css
import './app.css';

// Components
import PrivateRoute from './components/PrivateRoute';
import Nav from './components/Nav';
//--------------- NO USER ---------------//
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
//--------------- USER ---------------//
import Main from './components/Main';
import Products from './components/Products';
import Profile from './components/Profile';
import EditUser from './components/EditUser';
import AddProduct from './components/AddProduct';
import ProductDetail from './components/ProductDetail';

function App() {

  return (
    <BrowserRouter>

      <Nav />

      <Routes>

        <Route element={<PrivateRoute />}>

          <Route path='/' exact element={<Main />} />
          <Route path='/products' element={<Products />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/editUser' element={<EditUser />} />
          <Route path='addProduct' element={<AddProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />

        </Route>

        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

      </Routes>

    </BrowserRouter>
  );

};

export default App;