import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import TablePagination from "@mui/material/TablePagination";
import TableHeader from "../Table/TableHeader";
import { refreshReducer } from "../../Redux/RefreshSlice";
import TablePagination from "../Pagination/TablePagination";

const blockButtonStyle = {
  backgroundColor: "red",
  color: "white",
  padding: 5,
  borderRadius: "6px",
  width: "60px",
  fontSize: "12PX",
  border: "0px ",
  cursor: "pointer",
};

const activateButtonStyle = {
  backgroundColor: "green",
  color: "white",
  padding: 5,
  borderRadius: "6px",
  width: "60px",
  fontSize: "12PX",
  border: "0px ",
  cursor: "pointer",
};

const AdminUserManagement = () => {
  const [usersState, setUsersState] = useState([]);
  const [searchTable, setSearchTable] = useState("");
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
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

  useEffect(() => {
    console.log("changes   ", searchTable);
    if (searchTable.length > 0) {
      setTableData(
        usersState?.filter((item) => {
          return (
            item.firstname.toLowerCase().includes(searchTable.toLowerCase()) ||
            item.lastname.toLowerCase().includes(searchTable.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTable.toLowerCase())
          );
        })
      );
    } else if (searchTable.length === 0) {
      setTableData(usersState);
    }
  }, [searchTable, usersState]);

  const userAction = (id) => {
    axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/admin/userAction/${id}`)
      .then((response) => {
        console.log(response);
        dispatch(refreshReducer());
      })
      .catch((error) => console.log(error));
  };

  const userHeader = ["No.", "User Name", "Email", "Actions"];

  // const emptyRows = Math.min(rowsPerPage, tableData.length - page * rowsPerPage)

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "65px",
        }}
      >
        <h4>Total users : {tableData?.length}</h4>
        <TextField
          placeholder="Search..."
          size="small"
          sx={{}}
          value={searchTable}
          onChange={(event) => setSearchTable(event.target.value)}
        />
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: "35px" }}>
        <Table
          sx={{
            minWidth: 650,
            maxWidth: "100%",
            overflowX: "scroll",
            borderInline: "2px solid grey",
            borderTop: "2px solid grey",
          }}
          aria-label="simple table"
        >
          <TableHeader data={userHeader} />

          <TableBody>
            {tableData.length === 0 ? (
              <TableRow>
                <Typography variant="h6" style={{ color: "red", textAlign: "center" }}>
                  No users found
                </Typography>
              </TableRow>
            ) : null}
            {tableData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((users, index) => {
                return (
                  <TableRow key={users._id}>
                    <TableCell align="center">{index + 1}</TableCell>
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

            {/* {emptyRows > 0 && <TableRow style={{height: emptyRows}}/>} */}
          </TableBody>
        </Table>

        <TablePagination
          count={tableData.length}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </TableContainer>
    </>
  );
};

export default AdminUserManagement;
