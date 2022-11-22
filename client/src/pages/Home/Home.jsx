import React, { Fragment } from "react";
import BannerSmall from "../../component/layout/Banner/BannerSmall";
// import LatestProduct from "../../components/Product/LatestProduct";
import NewProduct from "../../component/layout/Product/NewProduct";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../component/layout/Header/Header";
import Loader from "../../component/layout/Loader/Loader";
import SlideBar from "../../component/layout/Slidebar/SlideBar";
const Home = () => {
  return (
    <>
      <Loader />
      <Header />
      <SlideBar />
      <NewProduct />
      <BannerSmall />
    </>
  );
};

export default Home;
