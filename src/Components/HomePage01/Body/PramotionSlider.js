import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "./PramotionSlider.css";
import BookImage from "../../../assests/Book.png";

const PramotionSlider = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show one photo at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: false, // Disable fade effect
    cssEase: "linear",
    arrows: true,
    prevArrow: <button className="slider-button-prev-button" />,
    nextArrow: <button className="slider-button-next-button" />,
    variableWidth: true, // Enable variable width for scrolling effect
  };

  const images = [
    "../../../assests/Pinnacle_colored_logo.svg",
    "../../../assests/Pinnacle_colored_logo.svg",
    "../../../assests/Pinnacle_colored_logo.svg",
    // Add more image URLs here
  ];

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className="pramotionSlider-fullpage">
      <Slider ref={sliderRef} {...settings} className="Slider">
        {images.map((image, index) => (
          <div className="slider01" key={index}>
            <div className="photoslider">
              <div className="image-content-div">
                <p>&nbsp;&nbsp;</p>
                <br />
                <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <br />
                <p>&nbsp;&nbsp;&nbsp;&nbsp;</p>

                <img src={BookImage} alt="logo" className="img"></img>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="slider-buttons">
        <button className="slider-button-prev-button" onClick={handlePrev}>
          <BsChevronLeft size={30} />
        </button>
        <button className="slider-button-next-button" onClick={handleNext}>
          <BsChevronRight size={30} />
        </button>
        <div className="Pramotion-Quote">SSC GS Theory Book<br/>Video course<br/>launched</div>
        <button className="lunch-btn">Launching Offer</button>
      </div>
    </div>
  );
};

export default PramotionSlider;
