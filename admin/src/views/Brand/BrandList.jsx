import React, { useEffect, Fragment } from "react";
import { useAlert } from "react-alert";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
// import {
//   clearErrors,
//   deleteProduct,
//   getAdminProduct,
// } from "../../actions/productAction";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { clearErrors, deleteBrand, getBrand } from "../../actions/brandAction";
import { DELETE_BRAND_RESET } from "../../constants/brandConstants";
import axios from "axios";

const BrandList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, brand } = useSelector((state) => state.allBrand);
  const { error: deleteError, isDeleted } = useSelector((state) => state.brand);
  const deleteProductHandler = (id) => {
    dispatch(deleteBrand(id));
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
      alert.success("Xóa nhà cung cấp thành công");
      history.push("/admin/brands");
      dispatch({ type: DELETE_BRAND_RESET });
    }

    dispatch(getBrand());
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
      field: "name",
      headerName: "Tên nhà phân phối",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "address",
      headerName: "Địa chỉ ",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "productCate",
      headerName: "Danh mục cung cấp",
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
            {/* <Link to={`/admin/brand/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link> */}

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

  brand &&
    brand.forEach((item) => {
      console.log(item.address);
      rows.push({
        id: item._id,
        name: item.name,
        address: item.address,
        productCate: item.productCate,
      });
    });
  // {user.avatar.url}
  return (
    <>
      <h1 id="productListHeading">Danh sách nhà cung cấp</h1>
      <Link to="/admin/createBrand">
        <h4>
          {" "}
          <AddIcon />
          Thêm nhà cung cấp mới
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

export default BrandList;
