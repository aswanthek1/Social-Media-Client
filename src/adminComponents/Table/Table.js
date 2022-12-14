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
import React,{ useState } from "react";
import { useDispatch} from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { refreshReducer } from "../../Redux/RefreshSlice";
import TableHeader from "./TableHeader";
import ViewPostModal from "../ReportedPost/ViewPostModal";

const MainTable = ({ reportedPosts }) => {
  const dispatch = useDispatch();
  const [postModal, setPostModal] = useState(false)
  const [modalData, setModalData] = useState({})
  

  const declineRequest = (postId) => {
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

  const headerCell = [
    "No.",
    "Image",
    "Posted By",
    "Posted Date",
    "Reasons",
    "Remove Post",
    "Decline Request",
  ];

  return (
    <>
      <TableContainer component={Paper} sx={{ marginTop: "83px" }}>
        <Table
          sx={{ minWidth: 650, maxWidth: "100%", overflowX: "scroll", border:'2px solid grey' }}
          aria-label="simple table"
        >
          <TableHeader data={headerCell} />

          <TableBody>
            {reportedPosts
              ? reportedPosts.map((obj,index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="center" >{index +1}</TableCell>
                      <TableCell component="th" scope="row" align="center">
                        <img
                         onClick={() => {
                          setPostModal(true)
                          setModalData(obj.postId)
                        }}
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
                            removeReportedPost(obj.postId?._id);
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
                            declineRequest(obj.postId?._id);
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
        </Table>
      </TableContainer>
     { postModal ? <ViewPostModal open={postModal} setOpen={setPostModal} modalData={modalData} /> : null}
    </>
  );
};

export default MainTable;
