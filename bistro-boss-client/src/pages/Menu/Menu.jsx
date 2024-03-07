import React from "react";
import useMenu from "../../hooks/useMenu";
import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover/Cover";

// image imports here
import menuImg from "../../assets/menu/menu-bg.jpg";
import soupImg from "../../assets/menu/soup-bg.jpg";
import saladImg from "../../assets/menu/salad-bg.jpg";
import pizzaImg from "../../assets/menu/pizza-bg.jpg";
import dessertImg from "../../assets/menu/dessert-bg.jpeg";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import MenuCategory from "./MenuCategory";
import useCategory from "../../hooks/useCategory";

const Menu = () => {
  const { dessert, soup, salad, pizza, offered, drinks } = useCategory();
  return (
    <div>
      <Helmet>
        <title>Foodify / Menu</title>
      </Helmet>
      <Cover img={menuImg} title={"Our Menu"} />

      {/* main cover starts  */}
      <SectionTitle subHeading={"Don't Miss "} heading={"Today's Offer"} />
      <MenuCategory
        items={dessert}
        title={"Dessert"}
        img={dessertImg}
        subTitle={"Indulge your sweet tooth with our delightful desserts"}
      />
      <MenuCategory
        items={soup}
        title={"Soup"}
        img={soupImg}
        subTitle={"Warm up with our savory and comforting soups"}
      />
      <MenuCategory
        items={salad}
        title={"Salad"}
        img={saladImg}
        subTitle={"Refresh with our healthy and flavorful salad options"}
      />
      <MenuCategory
        items={pizza}
        title={"Pizza"}
        img={pizzaImg}
        subTitle={"Savor the taste of our mouth-watering pizzas"}
      />
      <MenuCategory
        items={offered}
        title={"Special Offer"}
        img={menuImg}
        subTitle={"Explore exclusive dishes available for a limited time"}
      />
      <MenuCategory
        items={drinks}
        title={"Drinks"}
        img={menuImg}
        subTitle={"Drink your favorite juices and wine with us"}
      />
    </div>
  );
};

export default Menu;
