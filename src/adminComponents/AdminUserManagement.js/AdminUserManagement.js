import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TableHeader from "../Table/TableHeader";
import { refreshReducer } from "../../Redux/RefreshSlice";
import { useDispatch, useSelector } from "react-redux";

const blockButtonStyle = {
  backgroundColor: "red",
  color: "white",
  padding: 5,
  borderRadius: "6px",
  width: "60px",
  fontSize: "12PX",
  border: "0px ",
};

const activateButtonStyle = {
  backgroundColor: "green",
  color: "white",
  padding: 5,
  borderRadius: "6px",
  width: "60px",
  fontSize: "12PX",
  border: "0px ",
};

const AdminUserManagement = () => {
  const [usersState, setUsersState] = useState([]);
  const adminToken = localStorage.getItem("adminToken");
  const refresh = useSelector((state) => state.refresh.refresh);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/admin/getUsers`, {
        headers: { token: adminToken },
      })
      .then((response) => {
        setUsersState(response.data);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }, [refresh]);

  const userAction = (id) => {
    console.log(id, "asdfdsf");
    axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/admin/userAction/${id}`)
      .then((response) => {
        console.log(response);
        dispatch(refreshReducer());
      })
      .catch((error) => console.log(error));
  };

  const userHeader = ["User Name", "Email", "Actions"];

  return (
    // <h1 style={{ color: "red", textAlign: "center", marginTop: "60px" }}>
    //   User management on progress...
    // </h1>

    <TableContainer component={Paper} sx={{ marginTop: "83px" }}>
      <Table
        sx={{ minWidth: 650, maxWidth: "100%", overflowX: "scroll" }}
        aria-label="simple table"
      >
        <TableHeader data={userHeader} />

        <TableBody>
          {usersState?.map((users) => {
            return (
              <TableRow>
                <TableCell align="center">
                  {users?.firstname} {users?.lastname}
                </TableCell>
                <TableCell align="center">{users?.email}</TableCell>
                <TableCell align="center">
                  <button
                    onClick={() => {
                      userAction(users._id);
                    }}
                    style={
                      users.accessDenied
                        ? activateButtonStyle
                        : blockButtonStyle
                    }
                  >
                    <b>{users.accessDenied ? "Activate" : "Block"}</b>
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminUserManagement;
