import React, { useEffect, Fragment } from "react";
import { useAlert } from "react-alert";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,
} from "../../actions/productAction";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
const Products = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  console.log(products);
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
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
      alert.success("Xóa sách thành công");
      history.push("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
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
      headerName: "Tên sản phẩm",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "price",
      headerName: "Giá ",
      type: "number",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "stock",
      headerName: "Số lượng ",
      type: "number",
      flex: 0.3,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category",
      headerName: "Danh mục",
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

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

  products &&
    products.forEach((item) => {
      // setPrice(item.price);
      rows.push({
        id: item._id,
        name: item.name,
        price: item.price - (item.price * item.promotion) / 100,
        stock: item.Stock,
        category: item.category,
      });
    });
  // {user.avatar.url}
  return (
    <>
      <h1 id="productListHeading">Danh sách sản phẩm</h1>
      <Link to="/admin/createProduct">
        <h4>
          {" "}
          <AddIcon />
          Thêm sản phẩm mới
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

export default Products;
