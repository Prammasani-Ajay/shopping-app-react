import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faPlus} from '@fortawesome/free-solid-svg-icons';
import { SliderData, restCarousels, serviceData, discoutProducts, products, ratingStarsArray } from '../Components/Products';
import Footer from '../Components/Footer';
import { ToastContainer, toast } from 'react-toastify';

function Homepage() {
    const storedCartData = JSON.parse(localStorage.getItem("cartData"));
    // creating array to make it available in local storage
    let [itemInCart, setItemInCart] = useState(storedCartData || [])

    //Handling Add to cart button
    const handleAddCart = (productID) => {
        let newProductToCart = products.find((product) => product.id === productID)
        //Check weither the product already exist or not.
        if (itemInCart.includes(newProductToCart)) {
            toast.error("Product already in Cart!")
        } else {
            setItemInCart([...itemInCart, newProductToCart]);
            toast.success("Product has been added to cart!");
        }
    }
    useEffect(() => {

        localStorage.setItem("cartData", JSON.stringify(itemInCart))

    }, [itemInCart])

    return (
        <>
            <Header cart={itemInCart} />
            <ToastContainer />
            <header className='header'>
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    </div>
                    <div className="carousel-inner container">
                        <div className="carousel-item active row">
                            <div className='col-xl-12 d-flex flex-xl-row flex-md-column flex-sm-column flex-column align-items-center'>
                                <div className="col-md-6 md-text-center">
                                    <h2>{SliderData[0].title}</h2>
                                    <p className=' py-2'>{SliderData[0].desc}</p>
                                    <Link to='/Shoppingpage' ><h6>Visit Collections</h6></Link>
                                </div>
                                <img src={SliderData[0].cover} className="d-block" alt="My Image" />
                            </div>
                        </div>
                        {
                            restCarousels.map((obj,i) => (
                                <div className="carousel-item row" key={(i)}>
                                    <div className='col-xl-12 d-flex flex-xl-row flex-md-column flex-sm-column flex-column align-items-center'>
                                        <div>
                                            <h2>{obj.title}</h2>
                                            <p className='py-2'>{obj.desc}</p>
                                            <Link to='/Shoppingpage' ><h6>Visit Collections</h6></Link>
                                        </div>
                                        <img src={obj.cover} className="d-block w-20" alt="My Image" />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </header>
            {/* ....This Section belogs to Cards.... */}
            <section className='d-flex flex-wrap justify-content-evenly align-items-center m-5 py-5'>
                {
                    serviceData.map((item, index) => (
                        <div className="card text-center p-3 mb-3" style={{ width: "18rem", backgroundColor: item.bg }} key={(index)}>
                            <div className="card-body">
                                <span>{item.icon}</span>
                                <h6 className="card-subtitle my-2">{item.title}</h6>
                                <p className="card-text">{item.subtitle}</p>
                            </div>
                        </div>
                    ))
                }
            </section>
            {/* Best deals items Section */}
            <section className='discountSection'>
                <h3>Big Discount</h3>
                <section className='container text-start'>
                    <section className='d-flex flex-wrap justify-content-center'>
                        {
                            discoutProducts.map((item, index) => (
                                <div className="card eachCard" key={(index)}>
                                    <div className='d-flex justify-content-between align-items-center p-3'>
                                        <span className='priceDistount'>{`${item.discount}% Off`}</span>
                                        <FontAwesomeIcon icon={faHeart} className='favIcon fs-3 text-danger' />
                                    </div>
                                    <Link to={`/product/${item.id}`} style={{ height: "15rem" }}>
                                        <img src={item.imgUrl} className="card-img-top" alt="My Image" />
                                    </Link>
                                    <div className="card-body mt-5">
                                        <b className="card-title">{item.productName}</b><br />
                                        <div>{ratingStarsArray}</div>
                                    </div>
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <h5><b>{`$${item.price}`}</b></h5>
                                        <button onClick={() => { handleAddCart(item.id) }} className='plusBtn'><FontAwesomeIcon icon={faPlus} style={{ padding: '8px' }} /> </button>
                                    </div>
                                </div>
                            ))
                        }
                    </section>
                </section>
            </section>

            {/* New arraivals section  */}
            <section className='newArrivals'>
                <h3>New Arrivals</h3>
                <section className='container text-start'>
                    <section className='d-flex flex-wrap justify-content-center'>
                        {
                            products.filter((item) => item.category === "mobile" || item.category === "wireless").map((item, i) => (
                                <div className="card eachCard" key={(i)}>
                                    <Link to={`/product/${item.id}`} style={{ height: "15rem" }}>
                                        <img src={item.imgUrl} className="card-img-top" alt="My Image" />
                                    </Link>
                                    <div className="card-body mt-5">
                                        <b className="card-title">{item.productName}</b><br />
                                        <div>{ratingStarsArray}</div>
                                    </div>
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <h5><b>{`$${item.price}`}</b></h5>
                                        <button className='plusBtn' onClick={() => { handleAddCart(item.id) }}><FontAwesomeIcon icon={faPlus} style={{ padding: '8px' }} /> </button>
                                    </div>
                                </div>

                            ))
                        }
                    </section>
                </section>
            </section>

            {/* Best Sale section  */}
            <section className='discountSection'>
                <h3>Best Sales</h3>
                <section className='container text-start'>
                    <section className='d-flex flex-wrap justify-content-center'>
                        {
                            products.filter((item) => item.category === "sofa").map((item, i) => (
                                <div className="card eachCard" key={(i)}>
                                    <Link to={`/product/${item.id}`} style={{ height: "15rem" }}>
                                        <img src={item.imgUrl} className="card-img-top" alt="My Image" />
                                    </Link>
                                    <div className="card-body mt-5">
                                        <b className="card-title">{item.productName}</b><br />
                                        <div>{ratingStarsArray}</div>
                                    </div>
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <h5><b>{`$${item.price}`}</b></h5>
                                        <button className='plusBtn' onClick={() => { handleAddCart(item.id) }} ><FontAwesomeIcon icon={faPlus} style={{ padding: '8px' }} /> </button>
                                    </div>
                                </div>
                            ))
                        }
                    </section>
                </section>
            </section>
            <Footer />
        </>
    )
}
export default Homepage;