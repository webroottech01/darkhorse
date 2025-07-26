import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import './OffersSlider.css';

const slideData = [
  {
    id: 1,
    title: 'Summer Deal',
    imageUrl: '/offers/we-are-open.webp',
    alt: 'Summer clothing sale with 30% off',
  },
  {
    id: 2,
    title: 'Electronics Bonanza',
    imageUrl: '/offers/monday-nym.webp',
    alt: 'Discounted smartphones and gadgets',
  },
  {
    id: 3,
    title: 'Travel Essentials',
    imageUrl: '/offers/resizedbannerace.webp',
    alt: 'Travel bags and accessories on sale',
  },
  {
    id: 4,
    title: 'Fitness Gear',
    imageUrl: '/offers/delivery-banner.webp',
    alt: 'Home workout equipment offers',
  },
  {
    id: 5,
    title: 'Winter Collection',
    imageUrl: '/offers/rove-diamond-series.webp',
    alt: 'Warm clothing for winter discounts',
  },
]

const OffersSlider = () => {
  const settings = {
    className: 'center',
    // dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    // speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    // speed: 500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '40px',
        },
      },
    ],
  }

  return (
    <section
      className="offers-slider-wrapper container"
      aria-label="Offers Carousel"
    >
      <div className="offers-slider-wrapperinner">
        <Slider {...settings}>
          {slideData.map((slide) => (
            <div key={slide.id} className="slide">
              <figure>
                <img
                  src={slide.imageUrl}
                  alt={slide.alt}
                  loading="lazy"
                  className="slide-image"
                />
                {/* {slide.title && <figcaption className="slide-caption">{slide.title}</figcaption>} */}
              </figure>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default OffersSlider
