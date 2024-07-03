import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import YouTubeVideo from './YouTubeShorts';
import YouTubeShorts from './YouTubeShorts';
import './ImageGrid.css';
import { Gallery } from "react-grid-gallery";
import { Tweet } from 'react-tweet';



const Product = () => {
    const { id } = useParams();

    const [description, setDescription] = useState([]);
    const [data, setData] = useState([]);
    const [price, setPrice] = useState([]);
    const [parsedInformation, setParsedInformation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [shortsId, setShortsId] = useState('2g811Eo7K8U'); // Example Shorts video ID

    const [product, setProduct] = useState(null);
    const [productInformation, setProductInformation] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [youtubShorts, setYoutubeShorts] = useState([]);
    const [youtubVideos, setYoutubeVideos] = useState([]);
    const [youtubShortsLink, setyoutubShortsLink] = useState([]);
    const [instagramData, setInstagramData] = useState([]);
    const [tiktokData, setTiktokData] = useState([]);
    const [twitterData, setTwitterData] = useState([]);

    console.log("produts", product);
    console.log("productInformation", productInformation);
    console.log("reviews", reviews);
    console.log("youtubeShorts", youtubShorts);
    console.log("youtubShortsLink", youtubShortsLink)
    console.log("instagramData", instagramData)
    console.log("tiktokData", tiktokData)
    console.log("twitterData", twitterData)


    console.log(description)

    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addCart(product));
    }


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8866/productt/B00NGV4506`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                // Assuming the structure of the API response matches your needs
                setProduct(data.products); // Assuming `data.products` is the product object
                // setProductInformation(data.productInformation); // Assuming `data.productInformation` is an array and you want the first item
                // setReviews(data.reviews); // Assuming `data.reviews` contains reviews related to the product
                // setYoutubeShorts(data.youtubeShorts)
                // setYoutubeVideos(data.youtubeVideos)
                setInstagramData(data.instagramData)
                setTiktokData(data.tiktokData)
                setTwitterData(data.twitterData)
                // Map through youtubeShorts and create the array of links
                // const youtubeShortsLinks = data.youtubeShorts.map(video => "https://youtube.com/shorts/" + video.video_id);

                // // Set the array to setyoutubShortsLink
                // setyoutubShortsLink(youtubeShortsLinks); 
                setLoading(false); // Once data is fetched and set, setLoading to false
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to fetch product'); // Set an error message if fetching fails
                setLoading(false); // Even if fetching fails, setLoading to false
            }
        };

        fetchProduct(); // Call fetchProduct() when the component mounts (empty dependency array means it only runs once)
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
                            {/* <p>{productInformation}</p> */}
                            {/* {productInformation.map((item, index) => ( */}
                            {/* <ul key={index}> */}
                            {/* {item.map((pair, i) => { */}
                            {/* // Extracting key and value from each object in the inner array */}
                            {/* const key = Object.keys(pair)[0]; // Assuming each object has only one key */}
                            {/* const value = pair[key]; */}
                            {/*  */}
                            {/* return ( */}
                            {/* <li key={i}> */}
                            {/* <p><strong>{key}:</strong> {value}</p> */}
                            {/* </li> */}
                            {/* ); */}
                            {/* })} */}
                            {/* </ul> */}
                            {/* ))} */}

                        </div>
                        <button onClick={() => addProduct(product)} className="btn btn-outline-dark px-4 py-2">
                            Add to Cart
                        </button>
                        <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
                            Go to Cart
                        </NavLink>


                    </div>

                </div>
                <div className="product-information mb-10 mt-8">
                    <h2 className='bg-gray'>Reviews</h2>
                    <div className="  reviews-container d-flex">
                        <div style={{ marginRight: "30px" }} className=" col-md-6 mr-2 pr-2  positive-reviews">
                            <ul class="list-group">
                                <h3 class="list-group-item list-group-item-action active">Positive Reviews</h3>
                                {/* {reviews */}
                                {/* .filter(review => review.sentiment === 'POSITIVE') */}
                                {/* .map((review, index) => ( */}
                                {/* <li class="list-group-item" key={index}> */}
                                {/* {review.review} */}
                                {/* </li> */}
                                {/* ))} */}
                            </ul>
                        </div>
                        <div style={{ marginRight: "30px" }} className="col-md-6 mr-2 pr-2  negative-reviews">
                            <ul class="list-group">
                                <h3 class="list-group-item list-group-item-action active">Negative Reviews</h3>

                                {reviews
                                    .filter(review => review.sentiment === 'NEGATIVE')
                                    .map((review, index) => (
                                        <li class="list-group-item" key={index} className="bg-orange">
                                            {review.review}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="row d-flex ">
                    <h1> Youtube Videos</h1>
                    <div className="col-6 ">
                        <div
                            id="carouselExampleControls1"
                            className=" carousel slide vertical-carousel"
                            data-ride="carousel"
                            style={{ height: '600px', width: '400px', position: 'relative' }}
                        >
                            <div style={{ top: '100px', left: '0px' }} className="carousel-inner">
                                {youtubShorts.slice(0, 10).map((video, index) => (
                                    <div className={`carousel-item text-center ${index === 0 ? 'active' : ''}`} key={index}>
                                        <YouTubeShorts videoId={video.video_id} />
                                    </div>
                                ))}
                            </div>
                            <a
                                className="carousel-control-prev bg-dark"
                                href="#carouselExampleControls1"
                                role="button"
                                data-slide="prev"
                                style={{ height: "250px", top: '50px', left: "150px", transform: 'translateY(-50%) rotate(90deg)' }}
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a
                                className="carousel-control-next bg-dark"
                                href="#carouselExampleControls1"
                                role="button"
                                data-slide="next"
                                style={{ height: "250px", left: "150px", top: '330px', bottom: '20px', transform: 'translateY(50%) rotate(90deg)' }}
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                    <div className="col-6 ">
                        <div
                            id="carouselExampleControls2"
                            className="carousel slide vertical-carousel"
                            data-ride="carousel"
                            style={{ height: '600px', width: '760px', position: 'relative' }}
                        >
                            <div style={{ top: '185px', left: '-110px' }} className="carousel-inner">
                                {youtubVideos.slice(0, 10).map((video, index) => (
                                    <div className={`carousel-item text-center ${index === 0 ? 'active' : ''}`} key={index}>
                                        <iframe
                                            width="500"  // Adjust the width here
                                            height="240" // Adjust the height here
                                            src={`https://www.youtube.com/embed/${video.video_id}`}
                                            frameborder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen
                                            referrerpolicy="strict-origin-when-cross-origin"
                                            title="Ninja Professional Blender 1000 Watts Review"
                                            id="widget42"
                                        ></iframe>


                                    </div>
                                ))}
                            </div>
                            <a
                                className="carousel-control-prev bg-dark"
                                href="#carouselExampleControls2"
                                role="button"
                                data-slide="prev"
                                style={{ height: "250px", width: "60px", top: '50px', left: "150px", transform: 'translateY(-50%) rotate(90deg)' }}
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a
                                className="carousel-control-next bg-dark"
                                href="#carouselExampleControls2"
                                role="button"
                                data-slide="next"
                                style={{ height: "250px", width: "60px", left: "150px", top: '330px', bottom: '20px', transform: 'translateY(50%) rotate(90deg)' }}
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>

                    </div>
                </div>
                <div style={{ marginTop: "50px", }} className="row d-flex ">
                    <h1>Instagram Feeds</h1>
                    <div className="row">
                        {instagramData.map((item, index) => (
                            <div className="column" key={index}>

                                <img
                                    src={`data:image/jpeg;base64,${item.base64Image}`}
                                    alt={item.alt}
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{ marginTop: "50px" }} className="row d-flex ">
                    <h1>Tweets</h1>
                    <div className="row">
                        {twitterData.map((item, index) => (
                            <div className="column" key={index}>
                                <div data-theme="dark">
                                    <Tweet id={item.id} />
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
                <div style={{ marginTop: "50px" }} className="row d-flex border border-primary">
                    <h1>  Tiktok </h1>
                    <div className="row">

                        {/* {tiktokData.map((item, index) => (
                            <div className="column" key={index}>
                                <img src={item.displayUrl} alt={item.displayUrl} />
                            
                            </div>

                        ))} */}

                    </div>

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
