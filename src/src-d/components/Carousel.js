import React, { useRef } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "./Carousel.css"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"

const PrevArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <button className={className} style={style} onClick={onClick}>
      <BsChevronLeft size={30} />
    </button>
  )
}

const NextArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <button className={className} style={style} onClick={onClick}>
      <BsChevronRight size={30} />
    </button>
  )
}

const CarouselMain = () => {
  const sliderRef = useRef(null)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
    autoPlay: true,
    fade: false,
    cssEase: "linear",
    arrow: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    variableWidth: true,
  }

  const images = [
    { id: 1, src: "/images/coverImage0101.svg" },
    { id: 2, src: "/images/coverImage0102.svg" },
  ]

  const handlePrev = () => {
    sliderRef.current.slickPrev()
  }

  const handleNext = () => {
    sliderRef.current.slickNext()
  }

  return (
    <div className="carouselSlide-fullpage">
      <Slider ref={sliderRef} {...settings} className="Slider">
        {images.map((image) => (
          <div className="slider01" key={image.id}>
            <div className="photoslider">
              <img src={image.src} alt="logo" className="img" />
            </div>
          </div>
        ))}
      </Slider>
      <div className="slider-buttons">
        <button className="slide-button-prev-button" onClick={handlePrev}>
          <BsChevronLeft size={30} />
        </button>
        <button className="slide-button-next-button" onClick={handleNext}>
          <BsChevronRight size={30} />
        </button>
        <div className="Carousel-Quote">
          <p>India's 1st platform where one can Establish a</p>
          <p className="break-quote">connection with Toppers directly.</p>
          <p className="small_qoute">Success is at your step now.</p>
        </div>
      </div>
    </div>
  )
}

export default CarouselMain
