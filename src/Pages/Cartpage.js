import { useEffect, useState } from "react"
import Header from "../Components/Header"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {  faCartPlus, faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import Footer from "../Components/Footer"

export function Cartpage() {
    let storedItemsCart = JSON.parse(localStorage.getItem("cartData"));

    let [availCartData, setCartData] = useState(storedItemsCart);
    let [isClicked, setIsClicked] = useState(false);

    const handlingIncrement = (id) => {
        // Create a new array with updated quantities
        const updatedCartData = availCartData.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }
            return item;
        });

        // Update the cart data state
        setCartData(updatedCartData);
    }

    const handlingDecrement = (id) => {
        // Create a new array with updated quantities
        const updatedCartData = availCartData.map(item => {
            if (item.id === id) {
                if (item.quantity > 1) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    };
                }
            }
            return item;
        });

        // Update the cart data state
        setCartData(updatedCartData);
    }

    const deleteItem = (id) => {
        // Create a new array with updated quantities
        const updatedCartData = availCartData.filter(item => item.id !== id)

        // Update the cart data state
        setCartData(updatedCartData);
    }

    const totalAmount = () => {
        let total = 0;
        // console.log(availCartData)
        {
            availCartData.map((item) => {
                total += item.price * item.quantity
            })
        }
        return total
    }

    useEffect(() => {
        // Store updated cart data in local storage whenever it changes
        localStorage.setItem("cartData", JSON.stringify(availCartData));
    }, [availCartData]);

    return (
        <>
            <Header cart={availCartData} />
            <section className=" container d-flex flex-column flex-md-row justify-content-around" style={{ backgroundColor: "#e8e8e8", padding: "35px 0px" }}>
                <section className="allItemsBody">
                    {
                        availCartData.length > 0 ? availCartData.map((product, index) => (
                            <div id="itemStyle" key={(index)}>
                                <div className="d-flex flex-row-reverse">
                                    <FontAwesomeIcon icon={faXmark} style={{ fontSize: "25px", cursor: "pointer" }} onClick={() => { deleteItem(product.id) }} />
                                </div>
                                <div className="d-flex justify-content-evenly align-items-center">
                                    <Link to={`/product/${product.id}`} className="col-3">
                                        <img src={product.imgUrl} alt="Img" className="imgInCart" />
                                    </Link>
                                    <div className="col-6 ms-1">
                                        <b>{product.productName}</b><br />
                                        <span>{`$${product.price} * ${product.quantity}   : `}</span>
                                        <b>{`  $${product.price * product.quantity}`}</b>
                                    </div>
                                    <div className="col-3">
                                        <button onClick={() => { handlingIncrement(product.id) }} className="me-1 border border-dark-subtle border-1 rounded-1"><FontAwesomeIcon icon={faPlus} /></button>
                                        <button onClick={() => { handlingDecrement(product.id) }} className="ms-1 border border-dark-subtle border-1 rounded-1"><FontAwesomeIcon icon={faMinus} /></button>
                                    </div>
                                </div>
                            </div>
                        )) : <div className="text-center"><Link to={`/Homepage`}><FontAwesomeIcon icon={faCartPlus} className="text-danger mt-5" style={{fontSize:'50px'}}/></Link><h2 className="mt-3 text-primary">Empty Cart..!</h2></div>
                    }
                </section>
                <section className="align-self-start mt-4 mt-md-0" id="cartSummary">
                    <h4>Cart Summart </h4>
                    <p>Total price : </p>
                    <h5>{`$${totalAmount()}`}</h5>
                </section>
            </section>
            <Footer />
        </>
    )
}
