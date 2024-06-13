import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import './Contact.css'
import contact from './img4.jpg'
import Footer from "../../Components/Footer/Footer";

export default function Contact() {

    return (
        <>
        <Navbar/>
            <section className="contact-section" id="contact-section">
                <div className="contact-bg">
                    <h3>Get in Touch with Us</h3>
                    <h2>contact us</h2>
                    <div className="line">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <p className="text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda iste facilis quos impedit fuga nobis modi debitis laboriosam velit reiciendis quisquam alias corporis, maxime enim, optio ab dolorum sequi qui.</p>
                </div>


                <div className="contact-body">
                    <div className="contact-info">
                        <div>
                            <span><i className="fas fa-mobile-alt"></i></span>
                            <span>Phone No.</span>
                            <span className="text">+94-719394292</span>
                        </div>
                        <div>
                            <span><i className="fas fa-envelope-open"></i></span>
                            <span>E-mail</span>
                            <span className="text">techspace@gmail.com</span>
                        </div>
                        <div>
                            <span><i className="fas fa-map-marker-alt"></i></span>
                            <span>Address</span>
                            <span className="text">Thonikkal, Vavuniya.</span>
                        </div>
                        <div>
                            <span><i className="fas fa-clock"></i></span>
                            <span>Opening Hours</span>
                            <span className="text">Monday - Friday (9:00 AM to 5:00 PM)</span>
                        </div>
                    </div>

                    <div className="contact-form">
                        <form>
                            <div>
                                <input type="text" className="form-control" placeholder="First Name" />
                                <input type="text" className="form-control" placeholder="Last Name" />
                            </div>
                            <div>
                                <input type="email" className="form-control" placeholder="E-mail" />
                                <input type="text" className="form-control" placeholder="Phone" />
                            </div>
                            <textarea rows="5" placeholder="Message" className="form-control"></textarea>
                            <input type="submit" className="send-btn" value="send message" />
                        </form>

                        <div className="map">
                            < iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.3913823540115!2d80.4913701!3d8.7491956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afc151b342b31b3%3A0xdd7096bd1d2bbe25!2sGoodshed%20Rd%2C%20Vavuniya!5e0!3m2!1sen!2slk!4v1714366987070!5m2!1sen!2slk" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
                <Footer/>
            </section>
        </>
    )
}