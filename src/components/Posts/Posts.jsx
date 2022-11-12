import { Box, Card, Typography, CardMedia, CardContent, CardActions, Avatar, IconButton, CardHeader, Checkbox } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import React, { useState, useEffect } from 'react'
import { CoPresent, Favorite, FavoriteBorder, MoreVert } from '@mui/icons-material';
import axios from 'axios'
import { useSelector } from 'react-redux'




function Posts(props) {
  const [likeState, setLikeState] = useState(false)
  const [likeNumber, setLikeNumber] = useState()
  const user = useSelector(state => state.user)


  const likePost = () => {
    axios.post('http://localhost:5000/postLike', { userid: user._id, postid: props.data._id }).then((e) => {
      console.log("liked response", e)
      if (e.data.message === 'liked') {
        setLikeState(true)
      } else {
        setLikeState(false)

      }
    })
  }


  useEffect(() => {
    const id = `${user._id}`
    let proplike = []
    proplike = `${props.data.likes}`
    proplike.includes(id) ? setLikeState(true) : setLikeState(false)

    const totalLike = props.data.likes.length
    console.log("totallike", totalLike)
    { totalLike > 0 ? setLikeNumber(totalLike) : setLikeNumber(0) }


    // axios.get('http://localhost:5000/getLike',{headers:{token:userToken,postid:props.data._id}}).then((e)=>{
    //   console.log("getusersss", e)
    // })

  }, [])

  return (
    <div>
      <Card sx={{ marginBlock: 3, marginInline: 2 }} elevation={5}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
              H
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={props.data.userId.firstname + " " + props.data.userId.lastname ? props.data.userId.firstname + " " + props.data.userId.lastname : null}
          subheader={props.data.date}
        />
        <CardMedia
          component="img"
          height={350}
          image={props.data.image ? props.data.image : null}
          alt="A"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.data.description ? props.data.description : null}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton
            onClick={likePost}
            aria-label="add to favorites"
          >
            {likeState ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
            {/* <Checkbox checked={likeState}  icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'red' }} />} /> */}
          </IconButton>
          <Typography>{likeNumber > 0 ? likeNumber : 0}</Typography>

          <IconButton aria-label="share">
            <InsertCommentIcon />
          </IconButton>

        </CardActions>

      </Card>

    </div>
  )
}

export default Posts
