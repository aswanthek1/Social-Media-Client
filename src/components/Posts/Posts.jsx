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
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
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
import { postUpdate, updatePostOnload } from "../../Redux/PostSlice";
import { refreshReducer } from "../../Redux/RefreshSlice";
import { update } from "../../Redux/UserSlice";
import InputEmoji from "react-input-emoji";
import EmojiPicker from "emoji-picker-react";
import { Picker } from "emoji-mart";
import ScrollToBottom from "react-scroll-to-bottom";

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

  const [likeState, setLikeState] = useState(false);
  const [likeNumber, setLikeNumber] = useState(0);
  const [imojiState, setImojiState] = useState(false);
  const [postData, setPostData] = useState([]);
  const user = useSelector((state) => state.user);
  const refresh = useSelector((state) => state.refresh.refresh);
  
  useEffect(()=>{
    setPostData(props.data)
  },[])


  useEffect(() => {
    const id = `${user._id}`;
    let proplike = [];
    proplike = `${props.data.likes}`;
    proplike.includes(id) ? setLikeState(true) : setLikeState(false);
    
    const totalLike = props.data.likes.length;
    setLikeNumber(props.data.likes.length);
  }, [refresh]);
  
  const likePost = () => {
    axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/posts/postLike`, {
      userid: user._id,
      postid: props.data._id,
    })
    .then((response) => {
      console.log("liked response", response);
        if (response.data.liked) {
          // setLikeState(true)
          dispatch(refreshReducer());
        } else if (response.data.unlike) {
          // setLikeState(false)
          dispatch(refreshReducer());
        }
      });
    };
    
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

    if (!postData) return <div style={{backgroundColor:'red', display:"flex",justifyContent:'center',alignItems:'center'}}><h1>loading</h1></div>
    
    return (
      <>
  {  <div>
      <Card
        sx={{ marginBottom: 4, marginInline: "auto", width:{sm:430, xs:'100%'}, maxWidth:{sm: 600,xs:'100%'}}}
        elevation={5}
      >
        <CardHeader
          avatar={
            <Avatar
              alt={user.firstname}
              src={user.profileimage[0]}
              sx={{ bgcolor: "red" }}
              aria-label="recipe"
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={
            props.data.userId.firstname + " " + props.data.userId.lastname
              ? props.data.userId.firstname + " " + props.data.userId.lastname
              : null
          }
          subheader={props.data.date}
        />
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
            {/* {likeState ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />} */}
            <Checkbox
              checked={likeState}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
          </IconButton>
          {/* <Badge badgeContent={4} color="" sx={{marginInline:'3px'}} /> */}
          <Typography>
            {" "}
            <b> {likeNumber} </b>
          </Typography>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <InsertCommentIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <ScrollToBottom>
              <Box sx={{ maxHeight: 200 }}>
                {props.data.comments.map((obj) => {
                  return (
                    <>
                      <p
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
    </div>}
    </>
  );
}

export default Posts;
