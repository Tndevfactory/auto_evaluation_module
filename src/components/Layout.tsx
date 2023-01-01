import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotals, getCartItemsById } from "../features/cart/cartSlice";
import { useEffect } from "react";

import {
  Layout,
  Menu,
  Divider,
  MenuProps,
  Space,
  Avatar,
  AutoComplete,
  Input,
  Dropdown,
  Button,
  Badge,
  Card,
  Row,
  Col,
  Grid,
  Tag,
  Typography,
  BackTop,
} from "antd";

export default function () {
  // redux toolkit store
  //const { cartItems, loading, error } = useSelector((store: any) => store.cart);
  const { isOpen } = useSelector((store: any) => store.modal);
  const dispatch = useDispatch();

  /*  if (loading == "pending") {
    // loading state
  } else if (loading == "rejected") {
    // error state
    // display error
    console.log(error);
  } else if (loading == "succeeded") {
    // fullfilled state
  } else {
    // another state loading === idle
    dispatch(getCartItemsById(5));
  } */
  return (
    <>
      <Navbar />
      <Layout className="bg-slate-100">
        <Outlet />
      </Layout>
    </>
  );
}
