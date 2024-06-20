import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Products from "../Pages/Products/Product";
import Contact from "../Pages/Contact/Contact";
import Login from "../Components/Form/Login/login";
import SignUp from "../Components/Form/SignUp/Signup";
import Quote from "../Pages/Quotation/Quote";
import Admin from "../Admin/Admin";
import UserProfile from "../Pages/User/User";
import AccountSetting from "../Pages/User/AccountSetting";
import PasswordChange from "../Pages/User/Password";
import Info from "../Pages/User/Info";
import DataShowing from "../Admin/ProductDataShowing";
// import Cart from "../Components/AddTo Cart/Cart";
import Details from "../Pages/Products/Details";
import Cart from "../Components/AddTo Cart/Cart";
import ProductDetails from "../Components/AddTo Cart/Cart";
import Card from "../Components/Card/Card";
import "@fortawesome/fontawesome-svg-core";
import "@fortawesome/react-fontawesome";
import Dropdown from "../Pages/Quotation/Quote";
import CheckoutForm from "../Pages/Checkout/CheckoutForm";
import PaidDetails from "../Admin/PaidDetails/PaidDetails";
import ImageSlider from "../Pages/Slider/ImageSlider";
import UserFetch from "../Admin/UserAdd/UserFetch";

export default function RouteTable() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/customBuild" element={<Quote />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/accountsetting" element={<AccountSetting />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/passwordchange" element={<PasswordChange />} />
        <Route path="/info" element={<Info />} />
        <Route path="/useradd" element={<UserFetch />} />
        <Route path="/datashowing" element={<DataShowing />} />
        <Route path="/details" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/dropdown" element={<Dropdown />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/paiddata" element={<PaidDetails />} />
        <Route path="/slider" element={<ImageSlider />} />
      </Routes>
    </div>
  );
}
