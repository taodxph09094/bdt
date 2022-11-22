import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />

      <Typography>Bạn đã mượn sách thành công </Typography>
      <Link to="/orders">Xem lịch sử mượn</Link>
    </div>
  );
};

export default OrderSuccess;
