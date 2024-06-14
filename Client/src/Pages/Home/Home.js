import React from "react";
import './Home.css';
// import Footer from "../../Components/Footer/Footer";
import Products from "../Products/Product";
import Footer from "../../Components/Footer/Footer";
import logo2 from './123.avif'
import Navbar from "../../Components/Navbar/Navbar";
import ImageSlider from "../Slider/ImageSlider";
export default function Home() {

    return (
        <>
        <Navbar/>
            <div className="landing-pagee">
                <div className="land-right">
                    <div className="homeletter">
                        <p className="sub-title">The Season to </p>
                        <h1 className="homelet1">BUILD PC</h1>
                    </div>
                    <div className="homebtn">
                        <button type="button" className="homebtn1"><a href="/products">See More</a></button>
                        <button type="button" className="homebtn2"><a href="/custombuild">Dream System</a></button>
                    </div>
                </div>
                <div className="land-left">
                    <div className="land-img">
                        <img src={logo2} />
                    </div>
                </div>
            </div>
            {/* <Products /> */}
            <Footer />
            <ImageSlider/>

        </>
    );
}
