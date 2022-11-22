import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { DataGrid } from "@material-ui/data-grid";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { clearErrors, deleteUser, getAllUsers } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstansts";
import "./style.css";
const UserList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      alert.success(message);
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, history, isDeleted, message]);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      flex: 0.5,
      align: "center",
    },

    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      flex: 0.5,
      align: "center",
    },
    {
      field: "name",
      headerName: "Tên",
      headerAlign: "center",
      flex: 0.5,
      align: "center",
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
      headerAlign: "center",
      flex: 0.5,
      align: "center",
    },
    {
      field: "role",
      headerName: "Quyền",
      type: "number",
      headerAlign: "center",
      flex: 0.5,
      align: "center",
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
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
      headerAlign: "center",
      flex: 0.3,
      align: "center",
      renderCell: (params) => {
        return (
          <Fragment>
            <Link
              className
              to={`/admin/user/${params.getValue(params.id, "id")}`}
            >
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
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

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
        phone: item.phone,
      });
    });

  return (
    <>
      <h1 id="productListHeading">Danh sách tài khoản</h1>
      <Link to="/admin/createUser">
        <h4>
          {" "}
          <AddIcon />
          Tạo tài khoản
        </h4>
      </Link>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        className="userList"
        autoHeight
      />
    </>
  );
};

export default UserList;
