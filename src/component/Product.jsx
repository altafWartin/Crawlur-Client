import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const Product = () => {
    const { id } = useParams();

    const [description, setDescription] = useState([]);
    const [data, setData] = useState([]);
    const [price, setPrice] = useState([]);
    const [product, setProduct] = useState(null);
    const [productInformation, setProductInformation] = useState(null);
    const [parsedInformation, setParsedInformation] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const jsonObject = JSON.parse(productInformation); // Parse JSON string to object

    // console.log(jsonObject); //


    console.log("produts", product);
    console.log("productInformation", productInformation);
    console.log("reviews", reviews);

    console.log(description)

    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addCart(product));
    }

    // useEffect(() => {
    //     const getProduct = async () => {
    //         try {
    //             // const response = await fetch(`/product/${asin}`);
    //             const response = await fetch(`http://localhost:8866/productt/B00NGV4506`);
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             const data = await response.json();

    //             console.log("data", data);
    //             // setProduct(data.products);

    //             // setDescription(data)
    //             // setPrice(data.frequently_bought_together.total_price.raw)
    //             // setData(data);
    //         } catch (error) {
    //             console.error('Error fetching product:', error);
    //         }
    //     }
    //     getProduct();
    // }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://wmy2zh-8866.csb.app/productt/B00NGV4506`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("data", data.productInformation[0]);

                setProduct(data.products);
                setProductInformation(data.productInformation[0]);
                setReviews(data.reviews);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to fetch product');
                setLoading(false);
            }
        };

        fetchProduct();
    }, []);

    if (loading) {
        return <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-dark" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>; // Show a loading indicator
    }

    if (error) {
        return <div>Error: {error}</div>; // Show an error message
    }
    const Loading = () => {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border text-dark" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    };

    const ShowProduct = () => {
        return (
            <>
                <div className='d-flex'  >


                    <div className="col-md-6 ml-10">
                        <img src="https://m.media-amazon.com/images/I/71iD5RyhuaL._AC_SL1500_.jpg" alt={product.title} height="400px" width="400px" />
                        {/* <img src={product.images[0]} alt={product.title} height="400px" width="400px" /> */}
                    </div>
                    <div className="col-md-6">
                        <h4 className="text-uppercase text-black-50">
                            {product.category}
                        </h4>
                        {product && (
                            <h1 className="display-12">
                                {product.product.title && product.product.title.substring(0, 130)}...
                            </h1>
                        )}
                        <p className="lead fw-bolder">

                            Rating      {product.product.rating} {product.product.rating && product.product.rating.rate}
                            <i className="fa fa-star"></i>
                        </p>
                        <h3 className="display-6 fw-bold my-4">
                            {price}

                        </h3>

                        <div className="product-information">
                            <h2>Product Information</h2>
                            <p>{productInformation}</p>
                            {/* <ul> */}
                                {/* {Object.keys(productInformation).map((key, index) => ( */}
                                    {/* <li key={index}> */}
                                        {/* <strong>{key}: </strong>{productInformation[key]} */}
                                    {/* </li> */}
                                {/* ))} */}
                            {/* </ul> */}
                        </div>
                        <button onClick={() => addProduct(product)} className="btn btn-outline-dark px-4 py-2">
                            Add to Cart
                        </button>
                        <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
                            Go to Cart
                        </NavLink>


                    </div>   
                    
                       </div>
                       <div className="product-information">
                            <h2>reviews </h2>
                            <p>{reviews}</p>
                            {/* <ul> */}
                                {/* {Object.keys(productInformation).map((key, index) => ( */}
                                    {/* <li key={index}> */}
                                        {/* <strong>{key}: </strong>{productInformation[key]} */}
                                    {/* </li> */}
                                {/* ))} */}
                            {/* </ul> */}
                        </div>
            </>
        )
    }

    return (
        <div>
            <div className="container py-5">
                <div className="row py-4">
                    {loading ? <Loading /> : <ShowProduct />}
                </div>
            </div>
        </div>
    )
}

export default Product
