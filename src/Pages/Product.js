import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useParams, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import tableImg from "../Assets/Images/table.jpg";
import { products, ratingStarsArray } from '../Components/Products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer,toast } from "react-toastify";

function Product() {
    window.scrollTo(0, 0);
    let { id } = useParams();

    let details = products.filter((item) => item.id === id)

    const handleDiscription = () => {
        let rawData = details.map((item) => item.description)
        setData(rawData)
    }
    const handleReviews = () => {
        let rawData = details.map((item) => item.reviews.map((item) =>
            <div>
                <p>{ratingStarsArray}  ({item.rating})</p>
                <p>{item.text}</p>
                <hr className="w-25" />
            </div>
        ));
        setData(rawData)
    }
    //data to display on screen
    let [displayingData, setData] = useState(details.map((item) => item.description))
    //accessing data from local storage
    let [itemInCart, setItemInCart] = useState(JSON.parse(localStorage.getItem("cartData")));

    const handleAddCart = (productID) => {
        let newProductToCart = products.find((product) => product.id === productID)

        if(itemInCart.includes(newProductToCart)){
            toast.error("Product already in Cart!")
        }else{
            setItemInCart([...itemInCart,newProductToCart]);
            toast.success("Product has been added to cart!");
        }
    }
    useEffect(() => {

        localStorage.setItem("cartData", JSON.stringify(itemInCart))

    }, [displayingData, itemInCart]);

    return (
        <>
            <Header cart={itemInCart} />
            <ToastContainer/>
            {
                products.filter((ele) => ele.id === id).map((item,i) => (
                    <section key={(i)}>
                        <div className="imageContainer">
                            <img src={tableImg} alt="Img" id="tableImg"/>
                            <h1 className="pageTitle">{item.productName}</h1>
                        </div>
                        <section className="container productDetails">
                            <section className="col-xl-12 d-flex flex-xl-row flex-md-column flex-sm-column flex-column align-items-center">
                                <div className="col">
                                    <img src={item.imgUrl} alt="Img" width='100%'/>
                                </div>
                                <div className="col">
                                    <h2>{item.productName}</h2>
                                    <span>{ratingStarsArray}</span> <p>{`${item.avgRating} Rating`}</p>
                                    <h3>{`$${item.price}`}</h3>
                                    <b>{`Category : ${(item.category).toUpperCase()}`}</b>
                                    <p>{item.shortDesc}</p>
                                    <input type="number" name="number" className="my-3" style={{width:'5rem'}}/> <br />
                                    <button className="btn btn-danger" onClick={() => { handleAddCart(item.id) }}>Add To Cart</button>
                                </div>
                            </section>
                            {/* This section belongs to description Part */}
                            <section className="mt-5 pt-5">
                                <div>
                                    <span className="mx-3" style={{ cursor: "pointer" }} onClick={handleDiscription}>Discription</span>
                                    <span style={{ cursor: "pointer" }} onClick={handleReviews}>{`Reviews (${item.reviews.length})`}</span>
                                </div>
                                <div className="m-3 pt-3">
                                    <p>{displayingData}</p>
                                </div>
                            </section>

                            <section style={{ margin: "7rem 0rem"}}>
                                <h2 style={{ marginBottom: "4rem" }}>You Might also Like :</h2>
                                {
                                    <section className='d-flex flex-wrap justify-content-center'>
                                        {
                                            products.filter((product) => product.category === item.category && product.id !== id).map((product, i) => (
                                                <div className="card" style={{ width: "21rem", margin: "10px", cursor: "pointer" }} key={(i)}>
                                                    <Link to={`/product/${product.id}`} style={{ height: "15rem" }}>
                                                        <img src={product.imgUrl} className="card-img-top" alt="My Image" />
                                                    </Link>
                                                    <div className="card-body mt-5">
                                                        <b className="card-title">{product.productName}</b><br />
                                                        <div>{ratingStarsArray}</div>
                                                    </div>
                                                    <div className="card-body d-flex justify-content-between align-items-center">
                                                        <h5><b>{`$${product.price}`}</b></h5>
                                                        <button className='plusBtn' onClick={() => { handleAddCart(product.id) }}><FontAwesomeIcon icon={faPlus} style={{padding:'8px'}}/> </button>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </section>
                                }
                            </section>
                        </section>
                    </section>
                ))
            }
            <Footer />
        </>
    )
}
export default Product;