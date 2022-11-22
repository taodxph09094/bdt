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
  deleteFeedback,
  getFeedback,
} from "../../actions/feedbackAction";
import { DELETE_FEEDBACK_RESET } from "../../constants/feedbackConstants";
const Feedback = ({ history }) => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, feedback } = useSelector((state) => state.allFeedback);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.feedback
  );
  console.log(feedback);
  const deleteProductHandler = (id) => {
    dispatch(deleteFeedback(id));
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
      alert.success("Xóa bài viết thành côßng");
      history.push("/admin/feedbacks");
      dispatch({ type: DELETE_FEEDBACK_RESET });
    }

    dispatch(getFeedback());
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
      headerName: "Hình ảnh",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Tiêu đề",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "content",
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
            <Link to={`/admin/feedback/${params.getValue(params.id, "id")}`}>
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

  feedback &&
    feedback.forEach((item) => {
      // setPrice(item.price);
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        content: item.content,
      });
    });
  return (
    <>
      <h1 id="productListHeading">Danh sách góp ý</h1>

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

export default Feedback;
