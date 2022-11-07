import {Box, Card, Typography, CardMedia, CardContent, CardActions, Avatar, IconButton, CardHeader, Checkbox } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import React from 'react'
import { Favorite, FavoriteBorder, MoreVert } from '@mui/icons-material';

function Posts() {
  return (
    <div>
      <Card sx={{margin:3}}>
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
          title="Hermoine Granger"
          subheader="September 14, 2015"
        />
        <CardMedia
          component="img"
          height={350}
          image="https://images.pexels.com/photos/39003/scotland-united-kingdom-england-isle-of-skye-39003.jpeg?cs=srgb&dl=pexels-pixabay-39003.jpg&fm=jpg"
          alt="A"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the mussels,
            if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
          <Checkbox  icon={<FavoriteBorder/>} checkedIcon={<Favorite sx={{color:'red'}} /> }  />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>

        </CardActions>
       
      </Card>
    </div>
  )
}

export default Posts
