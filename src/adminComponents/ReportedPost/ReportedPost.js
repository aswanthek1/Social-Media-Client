import {
  Button,
  Paper,
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
import MainTable from "../Table/Table";

const ReportedPost = () => {
  const dispatch = useDispatch();
  const [emptyPosts, setEmptyPosts] = useState(false);
  const [reportedPosts, setReportedPosts] = useState([]);
  const adminToken = localStorage.getItem("adminToken");
  const refresh = useSelector((state) => state.refresh.refresh);



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
      {emptyPosts ? (
        <h1 style={{ color: "red", textAlign: "center", marginTop: "60px" }}>
          No posts are reported
        </h1>
      ) : (
        <MainTable
          reportedPosts={reportedPosts}
          setReportedPosts={setReportedPosts}
        />
      )}
      <Toaster />
    </>
  );
};

export default ReportedPost;
