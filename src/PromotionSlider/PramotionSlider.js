import React, { useEffect, useState } from "react";
import "./PramotionSlider.css";
import Image1 from './coverImage0101.svg';
import Image2 from "./coverImage0102.svg";
import {AiOutlineRight,AiOutlineLeft} from 'react-icons/ai';
import {BiShareAlt} from 'react-icons/bi'
const PramotionSlider = () => {
  const data = [
    {
      image1: "./coverImage0101.svg",
      image2:"./coverImage0102.svg",
      text1:
        "SSC GS Theory Book Video course launched ",
      buttonText: "Launching Offer",
    },
    {
        image1: "./coverImage0101.svg",
        image2:"./coverImage0102.svg",
        text1:
          "SSC GS Theory Book Video course launched ",
        buttonText: "Launching Offer",
      },
      {
        image1: "./coverImage0101.svg",
        image2:"./coverImage0102.svg",
        text1:
          "SSC GS Theory Book Video course launched ",
        buttonText: "Launching Offer",
      }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselInfiniteScroll = () => {
    if (currentIndex === data.length - 1) {
      return setCurrentIndex(0);
    }
    return setCurrentIndex(currentIndex + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      carouselInfiniteScroll();
    }, 5000);
    return () => clearInterval(interval);
  });

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === data.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="Pramotion-slider-fullpage">
    <div className="slider">
      <div className="carousel-container">
        <div>
          <div onClick={goToPrevious} className="leftArrowStyles">
          <AiOutlineLeft/>
          </div>

          <div onClick={goToNext} className="rightArrowStyles">
          <AiOutlineRight/>
          </div>
        </div>
        {/*Carousel*/}
        {data.map((item, index) => {
          return (
            <div
              className="carousel-item"
              style={{ transform: `translate( -${currentIndex * 100}%)` }}
              key={index}
            >
              <div className="description">
                <h1>{item.text1}</h1>
               <div>
                <button type="button" className="buttonText">
                  {item.buttonText}
                </button>

                <button className="Share-button"><BiShareAlt size={25} className="Share-icon"/></button>
                </div>
              </div>

              {/* Image-section */}

              <div className="imagediv">
                <div>
                <img
                //   src={require(`../images/${item.image}.jpg`)}
                src={Image1}
                  alt={item.text1}
                  className="image"
                />
                </div>
                <div>
                <img
                //   src={require(`../images/${item.image}.jpg`)}
                src={Image2}
                  alt={item.text1}
                  className="image"
                />
                </div>
              </div>


              {/* ************************* */}
            </div>
          );
        })}
      </div>

      <div className="dotsContainerStyles">
        {data.map((slide, slideIndex) => (
          <div
            className="dotStyles"
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
          ></div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default PramotionSlider;
