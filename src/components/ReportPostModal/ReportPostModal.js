import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  styled,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ReportPostModal = ({ reported, setReported, reportedId }) => {
  const [reportData, setReportData] = useState("");

  const makeReport = (event) => {
    event.preventDefault();
    if (reportData === "") {
      console.log("Select some thing");
    } else {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/posts/reportPost`, {
          data: reportData,
          postId: reportedId,
        })
        .then((response) => {
          if (response.data.message === "updated") {
            setReported(false);
            toast.success("Report request has added");
          } else {
            console.log("cant report this post");
          }
        });
    }
  };

  return (
    <>
      <StyledModal
        open={reported}
        onClose={(e) => setReported(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} height={280} bgcolor="white" p={3} borderRadius={5}>
          <Typography variant="h6" color="grey" textAlign="center">
            <b> Choose a reason</b>
          </Typography>

          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              sx={{ marginTop: "20px", marginLeft: "20px" }}
              onChange={(event) => {
                setReportData(event.target.value);
              }}
            >
              <FormControlLabel
                sx={{ fontSize: "10px" }}
                value="Type1"
                control={<Radio />}
                label="Nudity"
              />
              <FormControlLabel
                sx={{ fontSize: "20px" }}
                value="Type2"
                control={<Radio />}
                label="Its a spam"
              />
              <FormControlLabel
                sx={{ fontSize: "20px" }}
                value="Type3"
                control={<Radio />}
                label="Violence"
              />
              <FormControlLabel
                sx={{ fontSize: "20px" }}
                value="Type4"
                control={<Radio />}
                label="Hate speech"
              />
            </RadioGroup>
            <Button
              size="small"
              type="submit"
              onClick={makeReport}
              sx={{ marginLeft: "146px", marginTop: "20px" }}
              variant="contained"
              color="error"
            >
              Report
            </Button>
          </FormControl>
        </Box>
      </StyledModal>
      <Toaster />
    </>
  );
};

export default ReportPostModal;
