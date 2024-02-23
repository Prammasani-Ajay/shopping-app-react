import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// const stylingsForNavbarElements = {
//     color: "gray",
//     textDecoration: "none",
//     fontSize: "18px",
// }


function Header(props) {
    let { cart } = props
    // console.log("props are ",cart)
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid shadow p-3 bg-body rounded">
                    <span className="navbar-brand mb-0 h1 fs-3 eachColumnFooter"> <FontAwesomeIcon icon={faBagShopping} /> MART</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav w-50 d-flex justify-content-evenly align-items-center">
                            <li className="nav-item navbarTitles">
                                <Link to="/Homepage" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item navbarTitles">
                                <Link to="/Shoppingpage" className="nav-link">Shop</Link>
                            </li>
                            <li className="nav-item navbarTitles">
                                <Link to="/Cartpage" className="nav-link">Cart</Link>
                            </li>
                            <li className="nav-item">
                                <FontAwesomeIcon icon={faUser} />
                            </li>
                            <li className="nav-item ">
                                <Link to="/Cartpage" className="nav-link">
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    <span className="itemsCountStyle">{`  ${cart.length}`}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}
export default Header;