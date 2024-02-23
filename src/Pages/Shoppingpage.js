import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { products, ratingStarsArray } from "../Components/Products";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from "react-toastify";
import tableImg from '../Assets/Images/table.jpg'

function Shoppingpage() {
    //default products to display
    let [userChoice, setUserChoice] = useState("sofa")

    const handleDropdown = (event) => {
        let selectedOpt = event.target.value;
        setUserChoice(selectedOpt);
    }
    //Filter based on input text and matching products will be pushed into an array.
    const [searchQuery, setSearchQuery] = useState('');
    const [updatedValue, setUpdatedValue] = useState([])

    const handleSearching = (event) => {
        setSearchQuery(event.target.value);
        setUpdatedValue(products.filter(product =>
            product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        ));
    };
    //Checking weather user using the searchbar or dropdown for sorting products
    let displayingProducts = searchQuery ? updatedValue.filter((item) => item.productName) : products.filter((item) => item.category === userChoice)

    //Accessing Data from Local Storage
    let [itemInCart, setItemInCart] = useState(JSON.parse(localStorage.getItem("cartData")))

    const handleAddCart = (productID) => {
        let newProductToCart = products.find((product) => product.id === productID)

        if (itemInCart.includes(newProductToCart)) {
            toast.error("Product already in Cart!")
        } else {
            setItemInCart([...itemInCart, newProductToCart]);
            toast.success("Product has been added to cart!");
        }
    }

    useEffect(() => {
        localStorage.setItem("cartData", JSON.stringify(itemInCart))

    }, [itemInCart, userChoice])


    return (
        <>
            <Header cart={itemInCart} />
            <ToastContainer />
            <section>
                <div className="imageContainer">
                    <img src={tableImg} alt="Img" id="tableImg" />
                </div>
                <h1 className="pageTitle">All Products</h1>
                <section className="allproducts">
                    <div className="container d-flex flex-column flex-sm-row justify-content-around">
                        <select name="Items" className="col-sm-2 col-md-auto btn btn-primary rounded-2" onChange={handleDropdown}>
                            <option value="sofa">Filter by Category</option>
                            <option value="sofa">Sofa's</option>
                            <option value="chair">Chairs</option>
                            <option value="mobile">Mobiles</option>
                            <option value="wireless">Wireless</option>
                        </select>
                        <input type="search" name="search" placeholder="Search Here..." className="col-md-6 rounded-5 ps-4" onChange={handleSearching} />
                    </div>
                    <section className='container text-start'>
                        <section className="d-flex flex-wrap justify-content-center">
                            {
                                displayingProducts.map((item, i) => (
                                    <div className="card" style={{ width: "21rem", margin: "10px", cursor: "pointer" }} key={(i)}>
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
            </section>
            <Footer />
        </>
    )
}
export default Shoppingpage;