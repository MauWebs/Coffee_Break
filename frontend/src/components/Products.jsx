import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productsActions";
import { Link } from "react-router-dom";

import Loader from "./Loader";
import Messages from "./Messages";
import './styles/products.css';

function Products() {

  // Dispatch
  const dispatch = useDispatch();

  // Store State
  const productList = useSelector((state) => state.listProducts);
  const { error, loading, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin

  // listProducts useEffect
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // isAdmin
  const isAdmin = userInfo && userInfo.is_admin;

  // Price
  const formatPrice = (price) => {
    const formattedPrice = parseFloat(price).toFixed(2);
    return formattedPrice.endsWith(".00") ? parseInt(price) : formattedPrice;
  };

  return (

    <>

      {loading ? (<Loader />)

        : error ? (<Messages>{error}</Messages>)

          : (

            <>

              {isAdmin && (

                <>

                  <Link to='/addProduct' className="add__product__link">Add product</Link>

                </>

              )}

              <div className="products__container">

                {products && products.map((product) => (


                  <section key={product.id} className="list__product">

                    <Link to={`/product/${product.id}`}>

                      <img src={product.image} alt={product.name} /> <br />

                      {<h2>{product.name}</h2>} <br />

                      {<h3>{product.description}</h3>} <br />

                      {product.off_sale ?

                        (
                          <>
                            <h4>old price:<s>{formatPrice(product.price)} $ </s></h4>
                            <h4>price: {formatPrice(product.price - (product.price * product.discount_percentage) / 100)} $</h4>
                            <h5>discount: {product.discount_percentage} % </h5>
                          </>
                        )

                        :

                        (
                          <>
                            <h4>price: {formatPrice(product.price)} $ </h4>
                          </>
                        )

                      }

                    </Link>

                  </section>

                ))}

              </div>

            </>

          )
      }

    </>

  );

};

export default Products;
