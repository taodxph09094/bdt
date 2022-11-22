import React, { useEffect, Fragment } from "react";
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
  deleteCoupon,
  getAdminCoupon,
} from "../../actions/couponAction";
import { DELETE_COUPON_RESET } from "../../constants/couponConstants";

const Coupons = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, coupons } = useSelector((state) => state.coupons);
  console.log(coupons);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.coupon
  );
  const deleteProductHandler = (id) => {
    dispatch(deleteCoupon(id));
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
      alert.success("Xóa bài viết thành công");
      history.push("/admin/coupons");
      dispatch({ type: DELETE_COUPON_RESET });
    }

    dispatch(getAdminCoupon());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      flex: 0.5,
      align: "center",
    },
    {
      field: "code",
      headerName: "Mã giảm giá",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "value",
      headerName: "Giá trị",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Hành động",
      type: "number",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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

  coupons &&
    coupons.forEach((item) => {
      // setPrice(item.price);

      rows.push({
        id: item._id,
        code: item.code,
        value: item.value,
      });
    });
  return (
    <>
      <h1 id="productListHeading">Danh sách Mã</h1>
      <Link to="/admin/createCoupon">
        <h4>
          {" "}
          <AddIcon />
          Tạo mã mới
        </h4>
      </Link>
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

export default Coupons;
