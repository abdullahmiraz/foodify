import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import PopularMenu from "../PopularMenu/PopularMenu";
import Featured from "../Featured/Featured";
import Testimonials from "../Testimonials/Testimonials";

const getPageTitle = () => {
  const fileName = import.meta.url.split("/").pop();
  const pageName = fileName.replace(/\.[^/.]+$/, "");
  return pageName || "Home";
};

const Home = () => {
  const pageTitle = getPageTitle();

  return (
    <div>
      <Helmet>
        <title>Foodify / {pageTitle}</title>
      </Helmet>
      <Banner />
      <Category />
      <PopularMenu />
      <Featured />
      <Testimonials />
    </div>
  );
};

export default Home;
