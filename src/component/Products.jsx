import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';
import Search from './Search'; // Import the Search component

const Products = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('mobile');
    let componentMounted = true;

    // Function to handle input change
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch products from the API
        fetch('https://wmy2zh-8866.csb.app/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("data", data.search_results);
                setProducts(data.search_results);
                setFilter(data.search_results);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestData = { search_product: searchTerm };

        console.log('Data being sent:', requestData); // Log the data being sent

        setLoading(true);
        try {
            const response = await fetch('http://localhost:8866/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ search_product: searchTerm }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setFilter(data.search_results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };


    const Loading = () => {
        return (
            <div className="d-flex justify-content-center mt-5">
                <div className="spinner-border text-dark" role="status">
                <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    };

    const filterProduct = (cat) => {
        const updateList = data.filter((x) => x.category === cat);
        setFilter(updateList);
    };

    const ShowProducts = () => {
        return (
            <>

                {filter.map((product) => (
                    <div className="col-md-3 mb-4" key={product.asin}>
                        <div className="card h-100 text-center p-4">
                            <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
                            <div className="card-body">
                                <h5 className="card-title mb-0">{product.title.substring(0, 12)}...</h5>
                                <p className="card-text lead fw-bold">{product.price.raw}</p>
                                <NavLink to={`/product/B0855B5Z6F`} className="btn btn-outline-dark">Buy Now</NavLink>
                            </div>
                        </div>
                    </div>
                ))}
            </>
        );
    };

    return (
        <div>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
                        <hr />
                    </div>
                </div>
                <Search

                    searchTerm={searchTerm}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                />
                <div className="row justify-content-center">
                    <div className="button d-flex justify-content-center mb-5 pb-5">
                        <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)}>All</button>
                        <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
                        <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
                        <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("jewelery")}>Jewelery</button>
                        <button className="btn btn-outline-dark me-2" onClick={() => filterProduct("electronics")}>Electronic</button>
                    </div>
                    {loading ? <Loading /> : <ShowProducts />}
                </div>
            </div>
        </div>
    );
};

export default Products;
