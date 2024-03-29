import { Helmet } from "react-helmet-async";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import orderCoverImg from "../../assets/shop/order.jpg";
import Cover from "../Shared/Cover/Cover";
import OrderTab from "./OrderTab";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useCategory from "../../hooks/useCategory";

const Order = () => {
  const { dessert, soup, salad, pizza, offered, drinks } = useCategory();
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];
  const { category } = useParams();
  const initialIndex = categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex);

  return (
    <div>
      <Helmet>
        <title>Foodify | Order Food</title>
      </Helmet>
      <Cover img={orderCoverImg} title="Order Food"></Cover>
      <Tabs
        className="mx-8"
        defaultIndex={1}
        onSelect={(index) => setTabIndex(index)}
      >
        <TabList>
          <Tab>Salad</Tab>
          <Tab>Pizza</Tab>
          <Tab>Soup</Tab>
          <Tab>Dessert</Tab>
          <Tab>Drinks</Tab>
        </TabList>
        <TabPanel>
          <OrderTab items={salad}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={pizza}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={soup}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={dessert}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab items={drinks}></OrderTab>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Order;
