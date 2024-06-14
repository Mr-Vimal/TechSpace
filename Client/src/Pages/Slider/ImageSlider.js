import React, { useState, useEffect, useRef } from 'react';
import './ImageSlider.css';

const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const slideInterval = useRef(null);

    useEffect(() => {
        if (images && images.length > 0) {
            startSlider();
            return () => {
                stopSlider();
            };
        }
    }, [images]);

    const startSlider = () => {
        stopSlider();
        slideInterval.current = setInterval(() => {
            if (!isPaused) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }
        }, 3000); // Change slide every 3 seconds
    };

    const stopSlider = () => {
        if (slideInterval.current) {
            clearInterval(slideInterval.current);
        }
    };

    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    if (!images || images.length === 0) {
        return <div className="slider">No images to display</div>;
    }

    return (
        <div
            className="slider"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
        </div>
    );
};

const Imgs = () => {
    const images = [
        './logo3.jpg',
        './logo4.jpg',
        './logo5.jpg',
        './logo6.jpg',
    ];

    return (
        <div className="Img">
            <h1>Image Slider</h1>
            <ImageSlider images={images} />
        </div>
    );
};

export default Imgs;
