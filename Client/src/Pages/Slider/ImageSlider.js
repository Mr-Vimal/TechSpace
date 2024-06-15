import React, { useState, useEffect, useRef } from 'react';
import './ImageSlider.css';
import Logo1 from './logo3.jpg';
import Logo2 from './logo4.jpg';
import Logo3 from './logo5.jpg';

const ImageSlider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const slideInterval = useRef(null);

    useEffect(() => {
        startSlideshow();
        return () => clearInterval(slideInterval.current);
    }, []);

    const slides = [
        { src: Logo1, caption: 'Caption Text', productName: 'Product One' },
        { src: Logo2, caption: 'Caption Two', productName: 'Product Two' },
        { src: Logo3, caption: 'Caption Three', productName: 'Product Three' }
    ];

    const startSlideshow = () => {
        slideInterval.current = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000);
    };

    const pauseSlideshow = () => {
        clearInterval(slideInterval.current);
    };

    return (
        <div className="image-slider">
            <div
                className="slideshow-container"
                onMouseEnter={pauseSlideshow}
                onMouseLeave={startSlideshow}
            >
                {slides.map((slide, index) => (
                    <div
                        className={`mySlides fade ${index === slideIndex ? 'active' : ''}`}
                        key={index}
                        style={{ display: index === slideIndex ? 'flex' : 'none' }}
                    >
                        <div className="product-name">
                            <h3>{slide.productName}</h3>
                        </div>
                        <div className="slide-content">
                            <img src={slide.src} className="slide-image" alt={slide.caption} />
                            <div className="text">{slide.caption}</div>
                        </div>
                    </div>
                ))}
            </div>
            <br />
            <div style={{ textAlign: 'center' }}>
                {slides.map((_, index) => (
                    <span
                        className={`dot ${index === slideIndex ? 'active' : ''}`}
                        key={index}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
