import {
  Fab,
  Modal,
  Tooltip,
  Box,
  styled,
  Typography,
  TextField,
  ButtonGroup,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { Add as AddIcon, Image } from "@mui/icons-material";
import { Stack } from "@mui/system";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updatePostOnload } from "../../Redux/PostSlice";
import { refreshReducer } from "../../Redux/RefreshSlice";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

function Add() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [imageSelected, setImageSelected] = useState([]);
  const [description, setDescription] = useState("");
  const [circularProgress, setCircularProgress] = useState(false);
  const user = useSelector((state) => state.user);
  const [file, setFile] = useState("");

  const uploadPost = () => {
    setCircularProgress(true);
    const formData = new FormData();
    const descriptionData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "q9zryfyr");
    descriptionData.append("text", description);
    try {
      const userToken = localStorage.getItem("userToken");
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dm0l6abeb/image/upload",
          formData
        )
        .then((response) => {
          return axios
            .post(
              `${process.env.REACT_APP_BACKEND_URL}/posts/addPost`,
              { image: response.data.secure_url, description: description },
              { headers: { token: userToken } }
            )
            .then((res) => {
              setCircularProgress(false);
              dispatch(refreshReducer());
              dispatch(updatePostOnload(res.data));
              setImageSelected(null);
              setFile(null);
              setOpen(false);
            });
        });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Add Post"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add ">
          <AddIcon />
        </Fab>
      </Tooltip>

      <StyledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={400} maxHeight={680} bgcolor="white" p={3} borderRadius={5}>
          <Typography variant="h6" color="grey" textAlign="center">
            Create Post
          </Typography>
          {file ? (
            <img
              src={file ? file : null}
              style={{ width: "300px", height: "150px", marginLeft: "45px" }}
              alt=""
            />
          ) : null}
          <TextField
            fullWidth
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            type="text"
            id="standard-multiline-static"
            // multiline
            rows={3}
            placeholder="What's on your mind ?"
            variant="standard"
          />
          <Stack direction="row" gap={1} marginTop={1} mb={3}>
            {/* <EmojiEmotions color='primary' /> */}

            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                onChange={(event) => {
                  setImageSelected(event.target.files[0]);
                  setFile(URL.createObjectURL(event.target.files[0]));
                }}
                // name='postimages'
                multiple
                type="file"
              />
              <Image color="secondary" />
            </IconButton>
            {/* <VideoCameraBack color='success' />
                        <PersonAdd color='error' /> */}
          </Stack>
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            {circularProgress ? (
              <CircularProgress
                sx={{
                  color: "red",
                  position: "absolute",
                  zIndex: 1,
                  left: "40%",
                }}
              />
            ) : null}
            <Button type="submit" onClick={uploadPost}>
              Post
            </Button>
            {/* <Button sx={{ width: '100px' }}><DateRange /></Button> */}
          </ButtonGroup>
        </Box>
      </StyledModal>
    </>
  );
}

export default Add;
