"use client";
import React from "react";
import Slider from "react-slick"; 
import { FaGoogle, FaStar, FaCheckCircle } from "react-icons/fa";
import styles from "../styles/reviews.module.scss";

interface Review {
  author_name: string;
  rating: number;
  text: string;
  date: string;
}
 
const reviews: Review[] = [
    {
      author_name: "Ryan L.",
      rating: 5,
      text: "Very knowledgeable staff and a great variety of top shelf products. Always impressed by their recommendations.",
      date: "2025-07-02"
    },
    {
      author_name: "Kendra S.",
      rating: 5,
      text: "Love coming here — everyone is so friendly and they always have what I need.",
      date: "2025-06-29"
    },
    {
      author_name: "John D.",
      rating: 5,
      text: "Super attentive service. They walked me through all the strains to find exactly what I was after.",
      date: "2025-06-28"
    },
    {
      author_name: "Melissa P.",
      rating: 4,
      text: "Great place, good selection, but wish they had more edibles in stock.",
      date: "2025-06-20"
    },
    {
      author_name: "Eric M.",
      rating: 5,
      text: "Best dispensary in the area by far. Clean, modern, and the staff is top notch.",
      date: "2025-06-15"
    },
    {
      author_name: "Sara W.",
      rating: 5,
      text: "As a first time customer I felt totally comfortable. They explained everything and even gave me a discount.",
      date: "2025-06-10"
    },
    {
      author_name: "Jake H.",
      rating: 5,
      text: "Prices are fair and they often run specials. This is my new go-to spot.",
      date: "2025-06-05"
    },
    {
      author_name: "Tina B.",
      rating: 5,
      text: "Their budtenders actually know their stuff. Left with exactly what I needed for pain relief.",
      date: "2025-05-30"
    },
    {
      author_name: "Mike C.",
      rating: 4,
      text: "Solid experience overall. Checkout line was a little slow, but worth it for the quality.",
      date: "2025-05-25"
    },
    {
      author_name: "Ashley R.",
      rating: 5,
      text: "Love the vibe here. Modern interior, super clean, and everyone greets you with a smile.",
      date: "2025-05-20"
    }
  ];
  
export default function Reviews() {
      const settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: { slidesToShow: 2 }
          },
          {
            breakpoint: 600,
            settings: { slidesToShow: 1 }
          }
        ]
      };
    
      return (
        <div className={styles.manualReviewsWrapper}>
          <div className={styles.manualReviewsHeading}>
            <h4>OUR CUSTOMERS</h4>
            <h2>Testimonials & Reviews</h2>
          </div>
          <div className={styles.manualReviewsSliderWrapper}>
            <Slider {...settings}>
              {reviews.map((review, idx) => (
                <div key={idx}>
                  <div className={styles.manualReviewCard}>
                    <div className={styles.manualReviewCardHeader}>
                      <div className={styles.manualReviewAvatar}>
                        {review.author_name[0]}
                      </div>
                      <div className={styles.manualReviewCardName}>
                        <div className={styles.manualReviewName}>{review.author_name}</div>
                        <div className={styles.manualReviewStars}>
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                      <FaCheckCircle style={{ color: "#3ecf8e", marginLeft: "5px" }} />
                    </div>
                        
                      </div>
                      <FaGoogle className={styles.manualReviewGoogleIcon} />
                    </div>
                    
                    <div className={styles.manualReviewText}>
                      {review.text}
                    </div>
                    <div className={styles.manualReviewDate}>{review.date}</div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      );
    }
    