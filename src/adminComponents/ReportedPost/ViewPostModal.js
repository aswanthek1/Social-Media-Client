import React from "react";
import { Backdrop, Fade, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Posts from "../../components/Posts/Posts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "white",
  border: "1px solid white",
  borderRadius: "9px",
  boxShadow: 24,
  p: 4,
};
const ViewPostModal = ({ open, setOpen, modalData }) => {
  console.log("modaldata", modalData);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                color="red"
              >
                <b> Are you sure ?</b>
              </Typography> */}

              {/* <Posts data={modalData}/> */}
              <img
                style={{ height: "400px", objectFit: "cover" }}
                src={modalData.image}
                alt=""
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                }}
              >
                <div>
                <b> {modalData.likes.length} </b><span><b>Likes</b></span>{" "}
                </div>
                <div>
                <b>{modalData.comments.length} </b><span><b>Comments</b></span>{" "}
                </div>
              </div>
              <Box></Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ViewPostModal;
