import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProducts, listProducts } from "../actions/productsActions";
import { useNavigate } from "react-router-dom";

import Loader from './Loader';
import Messages from './Messages';
import './styles/addProduct.css';

function AddProduct() {

  // Dispatch
  const dispatch = useDispatch();

  // Router 
  const navigate = useNavigate();
  const path = '/products';

  // State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [off_sale, setOff_sale] = useState(false);
  const [discount_percentage, setDiscount_percentage] = useState(0);

  // Store State
  const addProduct = useSelector((state) => state.createProducts);
  const { loading, error } = addProduct;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin

  // noAdmin
  const noAdmin = userInfo && !userInfo.is_admin;

  // noAdmin useEffect
  useEffect(() => {
    if (noAdmin) {
      navigate(path);
    }
  }, [noAdmin]);

  // Handle
  const handleSubmit = (e) => {

    e.preventDefault();

    dispatch(createProducts(name, description, price, off_sale, discount_percentage));
    dispatch(listProducts());
    navigate(path);

  };

  return (

    <>

      {loading ? (<Loader />)

        : error ? (<Messages>{error}</Messages>)

          : (

            <form onSubmit={handleSubmit} action="#" method="POST">

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
                placeholder="product"
                required />

              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                name="description"
                id="description"
                placeholder="description" />

              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                name="price"
                id="price"
                placeholder="price"
                required />

              <input
                value={off_sale}
                onChange={(e) => setOff_sale(e.target.checked)}
                type="checkbox"
                name="off_sale"
                id="off_sale" />

              {off_sale &&
                (
                  <input
                    value={discount_percentage}
                    onChange={(e) => setDiscount_percentage(e.target.value)}
                    type="number"
                    name="discount_percentage"
                    id="discount_percentage"
                    placeholder="discount percentage" />
                )
              }

              <button type="submit" className="add__product">Add Product</button>

            </form>

          )}
          
    </>

  );

};

export default AddProduct;
