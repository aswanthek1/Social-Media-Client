import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { refreshReducer } from "../../Redux/RefreshSlice";

const ReportedPost = () => {
  const dispatch = useDispatch();
  const [emptyPosts, setEmptyPosts] = useState(false);
  const [reportedPosts, setReportedPosts] = useState([]);
  const adminToken = localStorage.getItem("adminToken");
  const refresh = useSelector((state) => state.refresh.refresh);

  const removeReportedPost = (postId) => {
    axios
      .patch(`${process.env.REACT_APP_BACKEND_URL}/admin/post/report`, {
        postId: postId,
      })
      .then((response) => {
        if (response.data.message === "Removed") {
          dispatch(refreshReducer());
          toast.success("Post removed successfully");
        }
      });
  };

  const declineRequest = (postId) => {
    console.log("postid for reporting", postId);
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_URL}/admin/post/declineReport/${postId}`
      )
      .then((response) => {
        console.log("response for decling", response);
        dispatch(refreshReducer());
        toast.success("Request declined");
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/admin/reportedPosts`, {
        headers: { token: adminToken },
      })
      .then((response) => {
        console.log(response);
        if (response.data.length < 1) {
          setEmptyPosts(true);
        } else {
          setEmptyPosts(false);
          setReportedPosts(response.data);
        }
      });
  }, [refresh]);
  console.log("present state", reportedPosts);
  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: "83px" }}>
        <Table
          sx={{ minWidth: 650, maxWidth: "100%", overflowX: "scroll" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Image</b>
              </TableCell>
              <TableCell align="center">
                <b>Posted By</b>
              </TableCell>
              <TableCell align="center">
                <b>Posted Date</b>
              </TableCell>
              <TableCell align="center">
                <b>Reasons</b>
              </TableCell>
              <TableCell align="center">
                <b>Remove Post</b>
              </TableCell>
              <TableCell align="center">
                <b>Decline Request</b>
              </TableCell>
            </TableRow>
          </TableHead>
          {emptyPosts ? (
            <h3
              style={{ color: "red", textAlign: "center", marginTop: "20px" }}
            >
              No posts are reported
            </h3>
          ) : (
            <TableBody>
              {reportedPosts
                ? reportedPosts.map((obj) => {
                    return (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <img
                            style={{
                              width: "70px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                            src={obj.postId.image ? obj.postId.image[0] : null}
                            alt=""
                          />
                        </TableCell>
                        <TableCell align="center">
                          {obj.postId.userId.firstname
                            ? obj.postId.userId.firstname
                            : null}
                        </TableCell>
                        <TableCell align="center">
                          {obj.postId.date ? obj.postId.date : null}
                        </TableCell>
                        <TableCell align="center">
                          {obj.Type1 ? "Nudity" : null}
                          {obj.Type2 ? "Its a spam" : null}
                          <br />
                          {obj.Type3 ? "Violence" : null}
                          <br />
                          {obj.Type4 ? "Hate speech" : null}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => {
                              removeReportedPost(obj.postId._id);
                            }}
                          >
                            Remove
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => {
                              declineRequest(obj.postId._id);
                            }}
                          >
                            Decline
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                : "No posts reported yet"}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Toaster />
    </>
  );
};

export default ReportedPost;
