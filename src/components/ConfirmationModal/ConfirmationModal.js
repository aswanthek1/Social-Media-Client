import { Backdrop, Button, Fade, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { refreshReducer } from "../../Redux/RefreshSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "300px",
  bgcolor: "white",
  border: "1px solid white",
  borderRadius: "9px",
  boxShadow: 24,
  p: 4,
};

const ConfirmationModal = ({
  confirmModal,
  setConfirmModal,
  userId,
  postId,
}) => {
  console.log(userId, "00000000", postId);
  const dispatch = useDispatch();
  const handleClose = () => setConfirmModal(false);

  const deletePost = () => {
    try {
      axios
        .patch(`${process.env.REACT_APP_BACKEND_URL}/posts/deletePost`, {
          postId,
          userId,
        })
        .then((response) => {
          setConfirmModal(false);
          toast.success("Post deleted successfully", {
            style: {
              zIndex: 999,
            },
          });
          dispatch(refreshReducer());
        });
    } catch (error) {}
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={confirmModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={confirmModal}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                color="red"
              >
                <b> Are you sure ?</b>
              </Typography>
              <Box>
                <Button
                  onClick={() => deletePost()}
                  variant="contained"
                  color="error"
                  sx={{ marginTop: "30px" }}
                >
                  Yes
                </Button>
                <Button
                  onClick={() => setConfirmModal(false)}
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: "20px", marginTop: "30px" }}
                >
                  No
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <Toaster />
    </div>
  );
};

export default ConfirmationModal;
