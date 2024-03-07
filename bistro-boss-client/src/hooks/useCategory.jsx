import React from "react";
import useMenu from "./useMenu";

const useCategory = () => {
  const [menu] = useMenu();

  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
  const drinks = menu.filter((item) => item.category === "drinks");

  const allCategory = {
    dessert,
    soup,
    salad,
    pizza,
    offered,
    drinks,
  };

  return allCategory;
};

export default useCategory;
