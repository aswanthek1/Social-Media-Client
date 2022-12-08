import {
  Box,
  Card,
  Typography,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  CardHeader,
  Checkbox,
  Badge,
  styled,
  TextField,
  Button,
  FormHelperText,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect } from "react";
import {
  CoPresent,
  Favorite,
  FavoriteBorder,
  MoreVert,
} from "@mui/icons-material";
import Collapse from "@mui/material/Collapse";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import SendIcon from "@mui/icons-material/Send";
import { useFormik } from "formik";
import * as yup from "yup";
import { refreshReducer } from "../../Redux/RefreshSlice";
import InputEmoji from "react-input-emoji";
import EmojiPicker from "emoji-picker-react";
import { Picker } from "emoji-mart";
import ScrollToBottom from "react-scroll-to-bottom";
import { useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "2%",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Posts(props) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigate = useNavigate();
  const [likeState, setLikeState] = useState(false);
  const [likeNumber, setLikeNumber] = useState(0);
  const [savedState, setSavedState] = useState(false);
  const [imojiState, setImojiState] = useState(false);
  const user = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePost = (postId) => {
    try {
      Swal.fire({
        title: "If you do this it will be deleted permenently",
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          const userId = user._id;
          axios
            .patch(`${process.env.REACT_APP_BACKEND_URL}/posts/deletePost`, {
              postId,
              userId,
            })
            .then((response) => {
              toast.success("Post deleted successfully", {
                style: {
                  zIndex: 999,
                },
              });
              dispatch(refreshReducer());
            });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const savePost = (postId) => {
    try {
      const userId = user._id;
      axios
        .patch(`${process.env.REACT_APP_BACKEND_URL}/posts/savePost`, {
          postId,
          userId,
        })
        .then((response) => {
          if (response.data.message === "post saved") {
            toast.success("Post moved to saved posts");
            setSavedState(true);
            dispatch(refreshReducer());
          } else {
            toast.success("Post removed from saved posts");
            dispatch(refreshReducer());
            setSavedState(false);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = () => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/posts/postLike`, {
        userid: user._id,
        postid: props.data._id,
      })
      .then((response) => {
        console.log("liked response", response);
        if (response.data.liked) {
          setLikeState(true);
          dispatch(refreshReducer());
        } else if (response.data.unlike) {
          setLikeState(false);
          dispatch(refreshReducer());
        }
      });
  };

  useEffect(() => {
    console.log(typeof user._id, typeof props.data.likes[0]);
    const id = `${user._id}`;
    let proplike = [];
    proplike = `${props.data.likes}`;
    proplike.includes(id) ? setLikeState(true) : setLikeState(false);
  }, []);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      if (values.comment.trim() === "") {
        console.log("Please type something");
        return;
      }
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/posts/addComment/${user._id}`,
          { values, postid: props.data._id }
        )
        .then((response) => {
          console.log("comment response", response);
          //  dispatch(updatePostOnload(e.data))
          dispatch(refreshReducer());
          resetForm({ values: "" });
        });
    },
    validationSchema: yup.object({
      comment: yup.string().required("Add some comments"),
    }),
  });

  return (
    <>
      {
        <div>
          <Card
            sx={{
              marginBottom: 4,
              marginInline: "auto",
              width: { md: 430, sm: "100%" },
              maxWidth: { sm: 600, xs: "100%" },
            }}
            elevation={5}
          >
            <CardHeader
              avatar={
                <Avatar
                  alt={props.data.userId ? props.data.userId.firstname : null}
                  src={
                    props.data.userId ? props.data.userId.profileimage : null
                  }
                  sx={{ bgcolor: "red" }}
                  aria-label="recipe"
                  onClick={() => {
                    navigate(`/profile/${props.data.userId._id}`);
                    localStorage.setItem("profileUser", props.data.userId._id);
                  }}
                ></Avatar>
              }
              action={
                <IconButton
                  aria-label="settings"
                  id="fade-button"
                  aria-controls={open ? "fade-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <MoreVert />
                </IconButton>
              }
              title={
                props.data.userId
                  ? props.data.userId.firstname +
                    " " +
                    props.data.userId.lastname
                  : null
              }
              subheader={props.data.date}
            />
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              {props.data.userId._id === user._id ? (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    deletePost(props.data._id);
                  }}
                >
                  Delete Post
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    savePost(props.data._id);
                  }}
                >
                  {/* {savedState || props.saved ? "Remove post from saved" : "Save Post"} */}

                  {user.saved.includes(props.data._id)
                    ? "Remove post from saved"
                    : "Save Post"}
                </MenuItem>
              )}
            </Menu>
            <CardMedia
              component="img"
              sx={{ objectFit: "cover" }}
              height="400"
              // width="400px"
              image={props.data.image ? props.data.image : null}
              alt="A"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {props.data.description ? props.data.description : null}
              </Typography>
            </CardContent>

            <CardActions disableSpacing>
              <IconButton onClick={likePost} aria-label="add to favorites">
                {likeState ? (
                  <Favorite sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
              {/* <Badge badgeContent={4} color="" sx={{marginInline:'3px'}} /> */}
              <Typography>
                {" "}
                <b> {props.data.likes.length} likes </b>
              </Typography>

              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <InsertCommentIcon />
              </ExpandMore>
              <Typography>
                {" "}
                <b> {props.data.comments.length} Comments </b>
              </Typography>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <ScrollToBottom>
                  <Box sx={{ maxHeight: 200 }}>
                    {props.data.comments.map((obj) => {
                      return (
                        <>
                          <p
                            key={obj._id}
                            style={{
                              color: "red",
                              fontSize: "12px",
                              fontWeight: "800",
                            }}
                          >
                            {obj.commentBy.firstname}
                          </p>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box marginBottom={2} height="30px" bgColor="aqua">
                              {obj.comment}
                            </Box>

                            <Box bgColor="aqua">{obj.createdAt}</Box>
                          </Box>
                        </>
                      );
                    })}
                  </Box>
                </ScrollToBottom>

                <form action="" onSubmit={formik.handleSubmit}>
                  <TextField
                    name="comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    fullWidth
                    variant="standard"
                    color="warning"
                    focused
                    InputProps={{
                      // startAdornment:<IconButton onClick={()=>setImojiState(true)} onDoubleClick={()=> {setImojiState(false)}}>😎</IconButton>,
                      endAdornment: (
                        <IconButton type="submit">
                          <SendIcon />
                        </IconButton>
                      ),
                    }}
                  />
                  {/* { imojiState ? <Picker/> : null} */}
                  {formik.touched.comment && formik.errors.comment ? (
                    <FormHelperText sx={{ color: "red" }}>
                      {formik.errors.comment}
                    </FormHelperText>
                  ) : null}
                </form>
              </CardContent>
            </Collapse>
          </Card>
          <Toaster />
        </div>
      }
    </>
  );
}

export default Posts;
