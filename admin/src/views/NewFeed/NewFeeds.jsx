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
  deleteNewFeed,
  getAdminNewFeed,
} from "../../actions/newFeedAction";
import { DELETE_NEWFEED_RESET } from "../../constants/newFeedConstants";

const NewFeeds = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, newFeeds } = useSelector((state) => state.newFeeds);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.newFeed
  );
  console.log(newFeeds);
  const deleteProductHandler = (id) => {
    dispatch(deleteNewFeed(id));
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
      history.push("/admin/newFeed-List");
      dispatch({ type: DELETE_NEWFEED_RESET });
    }

    dispatch(getAdminNewFeed());
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
      field: "image",
      headerName: "Hình ảnh",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "title",
      headerName: "Tiêu đề",
      flex: 0.5,
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
            <Link to={`/admin/newFeed/${params.getValue(params.id, "id")}`}>
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

  newFeeds &&
    newFeeds.forEach((item) => {
      // setPrice(item.price);

      rows.push({
        id: item._id,
        image: item.image,
        title: item.title,
        category: item.category,
      });
    });
  return (
    <>
      <h1 id="productListHeading">Danh sách bài viết</h1>
      <Link to="/admin/createNewFeed">
        <h4>
          {" "}
          <AddIcon />
          Tạo bài viết mới
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

export default NewFeeds;
