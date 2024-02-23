import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faCartShopping, faCoffee, faUser } from '@fortawesome/free-solid-svg-icons';


function Footer(){
    const bgColor = {
        backgroundColor:"#00468b",
        color:"#ffffff",
    }
    const footerStyle = {
        listStyle:"none",
    }
    return(
        <>
            <section className='p-5' style={bgColor}>
                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4'>
                    <div className='col eachColumnFooter'>
                        <h3><FontAwesomeIcon icon={faBagShopping}/> Mart</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nostrum accusantium iste, voluptas cumque provident!</p>
                    </div>
                    <ul className='col listOfItemsInFooter' style={footerStyle}>
                        <li><h3 className='eachColumnFooter'>About Us</h3></li>
                        <li>Careers</li>
                        <li>Our Stores</li>
                        <li>Our Cares</li>
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                    </ul>
                    <ul className='col listOfItemsInFooter' style={footerStyle}>
                        <li><h3 className='eachColumnFooter'>Customer Care</h3></li>
                        <li>Help Center</li>
                        <li>How to Buy</li>
                        <li>Track your Order</li>
                        <li>Corporate & Bulk Purchasing</li>
                        <li>Returns & Refunds</li>
                    </ul>
                    <div className='col'>
                        <h3 className='eachColumnFooter'>Contact Us</h3>
                        <p>70 Washington Square South,New York,NY 10012, United States</p>
                        <p>Email: example@gmail.com</p>
                        <p>Phone: +1 1123456789</p>
                    </div>

                </div>
            </section>
        </>
    )
}
export default Footer;