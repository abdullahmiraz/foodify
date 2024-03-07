import React from "react";
import Slider from "react-slick";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

export default function Category() {
  return (
    
    <div>
      <SectionTitle heading={"Order Online"} subHeading={"From 11.00am to 10.00pm"}></SectionTitle>
      <div className="flex flex-col items-center">
      <div className="carousel gap-8">
        <div id="item1" className="carousel-item relative">
          <img src={slide1} alt="" />
          <h3 className="text-4xl absolute bottom-4 left-20  uppercase text-center -mt-16 text-white">
            Salads
          </h3>
        </div>
        <div id="item2" className="carousel-item relative">
          <img src={slide2} alt="" />
          <h3 className="text-4xl absolute bottom-4 left-20  uppercase text-center -mt-16 text-white">
            Pizzas
          </h3>
        </div>
        <div id="item3" className="carousel-item relative">
          <img src={slide3} alt="" />
          <h3 className="text-4xl absolute bottom-4 left-20  uppercase text-center -mt-16 text-white">
            Soups
          </h3>
        </div>
        <div id="item4" className="carousel-item relative">
          <img src={slide4} alt="" />
          <h3 className="text-4xl absolute bottom-4 left-20  uppercase text-center -mt-16 text-white">
            Desserts
          </h3>
        </div>
        <div id="item5" className="carousel-item relative">
          <img src={slide5} alt="" />
          <h3 className="text-4xl absolute bottom-4 left-20  uppercase text-center -mt-16 text-white">
            Salads
          </h3>
        </div>
        <div id="item3" className="carousel-item relative">
          <img src={slide3} alt="" />
          <h3 className="text-4xl absolute bottom-4 left-20  uppercase text-center -mt-16 text-white">
            Soups
          </h3>
        </div>
        <div id="item4" className="carousel-item relative">
          <img src={slide4} alt="" />
          <h3 className="text-4xl absolute bottom-4 left-20  uppercase text-center -mt-16 text-white">
            Desserts
          </h3>
        </div>
        <div id="item5" className="carousel-item relative">
          <img src={slide5} alt="" />
          <h3 className="text-4xl absolute bottom-4 left-20  uppercase text-center -mt-16 text-white">
            Salads
          </h3>
        </div>
      </div>

      <div id="item1" className="flex justify-center my-4 w-full py-2 gap-2">
        <a href="#item1" className="btn btn-xs">
          1
        </a>
        <a href="#item2" className="btn btn-xs">
          2
        </a>
        <a href="#item3" className="btn btn-xs">
          3
        </a>
        <a href="#item4" className="btn btn-xs">
          4
        </a>
        <a href="#item5" className="btn btn-xs">
          5
        </a>
      </div>
    </div>
    </div>
  );
}
