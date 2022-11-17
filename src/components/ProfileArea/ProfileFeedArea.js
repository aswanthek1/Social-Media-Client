import { Box, Card, Grid, CardMedia, CardHeader, Avatar, IconButton, CardContent, Typography, CardActions, TextField, Checkbox } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from 'react'
import './ProfileAreaStyles.css'
import { Favorite, FavoriteBorder } from '@mui/icons-material';

const ProfileArea = () => {

  return (
    <Box >
      <Card className='feedMainCard' sx={{ marginBottom: 4 }} elevation={5}>
        <CardHeader
          avatar={
            <Avatar alt='User' src='/static/images/avatar/1.jpg' sx={{ bgcolor: 'red' }} aria-label="recipe">

            </Avatar>
          }
          action={
            <IconButton aria-label="settings">

            </IconButton>
          }
          title='User main'
          subheader='12/34/2000'
        />
        <CardMedia
          component="img"
          sx={{ objectFit: 'unset' }}
          height='400'
          width='0'
          image='https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHw%3D&w=1000&q=80'
          alt="A"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            this is a Card
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
          >
            {/* {likeState ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />} */}
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'red' }} />} />
          </IconButton>
          {/* <Badge badgeContent={4} color="" sx={{marginInline:'3px'}} /> */}
          <Typography> <b> 12 </b></Typography>

        </CardActions>

      </Card>



      <Card className='feedMainCard' sx={{ marginBottom: 4 }} elevation={5}>
        <CardHeader
          avatar={
            <Avatar alt='User' src='/static/images/avatar/1.jpg' sx={{ bgcolor: 'red' }} aria-label="recipe">

            </Avatar>
          }
          action={
            <IconButton aria-label="settings">

            </IconButton>
          }
          title='User main'
          subheader='12/34/2000'
        />
        <CardMedia
          component="img"
          sx={{ objectFit: 'unset' }}
          height='400'
          width='0'
          image='https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHw%3D&w=1000&q=80'
          alt="A"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            this is a Card
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
          >
            {/* {likeState ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />} */}
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'red' }} />} />
          </IconButton>
          {/* <Badge badgeContent={4} color="" sx={{marginInline:'3px'}} /> */}
          <Typography> <b> 12 </b></Typography>

        </CardActions>

      </Card>





      <Card className='feedMainCard' sx={{ marginBottom: 4 }} elevation={5}>
        <CardHeader
          avatar={
            <Avatar alt='User' src='/static/images/avatar/1.jpg' sx={{ bgcolor: 'red' }} aria-label="recipe">

            </Avatar>
          }
          action={
            <IconButton aria-label="settings">

            </IconButton>
          }
          title='User main'
          subheader='12/34/2000'
        />
        <CardMedia
          component="img"
          sx={{ objectFit: 'unset' }}
          height='400'
          width='0'
          image='https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHw%3D&w=1000&q=80'
          alt="A"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            this is a Card
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
          >
            {/* {likeState ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />} */}
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'red' }} />} />
          </IconButton>
          {/* <Badge badgeContent={4} color="" sx={{marginInline:'3px'}} /> */}
          <Typography> <b> 12 </b></Typography>

        </CardActions>

      </Card>



    </Box>
  )
}

export default ProfileArea
