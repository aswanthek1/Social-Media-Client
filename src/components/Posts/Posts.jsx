import { Box, Card, Typography, CardMedia, CardContent, CardActions, Avatar, IconButton, CardHeader, Checkbox } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import React,{useState} from 'react'
import { Favorite, FavoriteBorder, MoreVert } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux'


function Posts() {
  const [ likeState, setLikeState] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const postsDetails = useSelector(state => state.post)
  console.log("post data from slice", postsDetails.post)

  return (
    postsDetails.post.map((postArray) => {
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
              title={postArray.userId.firstname + " " + postArray.userId.lastname ? postArray.userId.firstname + " " + postArray.userId.lastname : null}
              subheader={postArray.createdAt}
            />
            <CardMedia
              component="img"
              height={350}
              image={postArray.image ? postArray.image : null}
              alt="A"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {postArray.description ? postArray.description : null}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <Checkbox icon={<FavoriteBorder/>} checkedIcon={<Favorite sx={{ color: 'red' }} />} />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>

            </CardActions>

          </Card>
        </div>

      )
    })
  )
}

export default Posts
