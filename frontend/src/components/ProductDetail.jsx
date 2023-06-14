import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct, productDetails, editImage } from "../actions/productsActions";
import { useParams, useNavigate } from "react-router-dom";

import Loader from "./Loader";
import Messages from "./Messages";

function ProductDetail() {

    // Id
    const { id } = useParams();

    // Navigate
    const navigate = useNavigate();
    const path = '/products';

    // Dispatch
    const dispatch = useDispatch();

    // Store State
    const productInfo = useSelector((state) => state.productDetails);
    const { loading, error, product } = productInfo;

    const deleteProductInfo = useSelector((state) => state.deleteProduct);
    const { success } = deleteProductInfo;

    // State
    const [image, setImage] = useState(null);
    
    // useEffect
    useEffect(() => {
        dispatch(productDetails(id));
    }, [dispatch, id, success]);

    // Price
    const formatPrice = (price) => {
        const formattedPrice = parseFloat(price).toFixed(2);
        return formattedPrice.endsWith(".00") ? parseInt(price) : formattedPrice;
    };

    // Delete Product
    const handleDelete = () => {
        if (window.confirm('Do you want to delete the product?')) {
            dispatch(deleteProduct(id));
            navigate(path);
        };
    };

    // Handle Upadate Image
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        dispatch(editImage(id, selectedImage));
    };

    return (

        <>

            {loading ? (<Loader />)

                : error ? (<Messages>{error}</Messages>)

                    : (

                        <>

                            {product && (

                                <section className="list__product">

                                    <h2>{product.name}</h2>

                                    <p>{product.description}</p>

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

                                    <button onClick={handleDelete}>Delete Product</button>

                                    <input type="file" accept="image/*" onChange={handleImageChange} />

                                    <button onClick={handleImageChange}>Update Image</button>

                                </section>

                            )}

                        </>

                    )}

        </>

    );

};

export default ProductDetail;
