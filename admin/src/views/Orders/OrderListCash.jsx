import React, { useEffect, Fragment, useState } from "react";
import { useAlert } from "react-alert";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  clearErrors,
  deleteOrderSystem,
  getOrderSystem,
} from "../../actions/orderSysAction";
import { Row, Col, Form } from "react-bootstrap";
import { DELETE_ORDEROFF_RESET } from "../../constants/orderSysConstants";
const OrderListCash = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, ordersSystem, totalAmountCash } = useSelector(
    (state) => state.allOrderSystem
  );

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.orderSystem
  );
  const [monAndDate, setMonth] = useState("");
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrderSystem(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Xóa thành công");
      history.push("/admin/ordersCash");
      dispatch({ type: DELETE_ORDEROFF_RESET });
    }

    dispatch(getOrderSystem(monAndDate));
  }, [dispatch, alert, error, deleteError, history, isDeleted, monAndDate]);

  // console.log(totalAmountCash);
  const columns = [
    { field: "id", headerName: " ID", minWidth: 50, flex: 0.19 },
    {
      field: "name",
      headerName: " Tên khách hàng",
      minWidth: 180,
      flex: 0.3,
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 150,
      flex: 0.2,
    },
    {
      field: "amount",
      headerName: "Giá  ",
      type: "number",
      minWidth: 150,
      flex: 0.2,
    },
    {
      field: "date",
      headerName: "Ngày mua",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã hoàn thành"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/orderCash/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  ordersSystem &&
    ordersSystem.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
        name: item.name,
        date: item.dateFind,
      });
    });
  return (
    <>
      <h1 id="productListHeading">
        Danh sách đơn hàng thanh toán khi nhận hàng
      </h1>
      <Link to="/admin/orders">
        <h4>
          {" "}
          <AddIcon />
          Danh sách đơn hàng ( thanh toán Online)
        </h4>
      </Link>
      <div className="searchOrder">
        <Row>
          {/* <Col className="pr-1" md="3">
            <label>Tìm kiếm theo ngày (chọn )</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </Col> */}
          <Col className="pr-1" md="3">
            <Form.Group>
              <label>Tìm kiếm theo ngày (nhập )</label>
              <Form.Control
                placeholder="Nhập ngày"
                type="text"
                onChange={(e) => setMonth(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        className="productList"
        autoHeight
      />
    </>
  );
};

export default OrderListCash;
