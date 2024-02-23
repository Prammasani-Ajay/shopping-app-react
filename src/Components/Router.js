import { Route, Routes } from "react-router-dom";
import Product from "../Pages/Product";
import Homepage from "../Pages/Homepage";
import Shoppingpage from "../Pages/Shoppingpage";
import { Cartpage } from "../Pages/Cartpage";


function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/Homepage" element={<Homepage />} />
                <Route path="/Shoppingpage" element={<Shoppingpage />} />
                <Route path="/Cartpage" element={<Cartpage />} />
                <Route path="/product/:id" Component={Product} />
            </Routes>
        </>
    )
}
export default Router;