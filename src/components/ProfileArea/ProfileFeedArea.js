// import { Box, Card, Grid, CardMedia, CardHeader, Avatar, IconButton, CardContent, Typography, CardActions, TextField, Checkbox, Collapse } from '@mui/material'
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import ShareIcon from '@mui/icons-material/Share';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import React from 'react'
// import './ProfileAreaStyles.css'
// import { ExpandMore, Favorite, FavoriteBorder,MoreVert } from '@mui/icons-material';
// import InsertCommentIcon from '@mui/icons-material/InsertComment';
// import { useFormik } from 'formik'
// import * as yup from 'yup'


// const ProfileArea = ( props ) => {

//   return (
//     <Box >
//       <Card className='feedMainCard' sx={{ marginBottom: 4 }} elevation={5}>
//         <CardHeader
//           avatar={
//             <Avatar alt='User' src='/static/images/avatar/1.jpg' sx={{ bgcolor: 'red' }} aria-label="recipe">

//             </Avatar>
//           }
//           action={
//             <IconButton aria-label="settings">

//             </IconButton>
//           }
//           title={props.data.userId.firstname + " " + props.data.userId.lastname ? props.data.userId.firstname + " " + props.data.userId.lastname : null }
//           subheader={props.data.date}
//         />
//         <CardMedia
//           component="img"
//           sx={{ objectFit: 'unset' }}
//           height='400'
//           width='0'
//           image={props.data.image ? props.data.image : null}
//           alt="A"
//         />
//         <CardContent>
//           <Typography variant="body2" color="text.secondary">
//             this is a Card
//           </Typography>
//         </CardContent>

//         <CardActions disableSpacing>
//           <IconButton
//             aria-label="add to favorites"
//           >
//             {/* {likeState ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />} */}
//             <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'red' }} />} />
//           </IconButton>
//           {/* <Badge badgeContent={4} color="" sx={{marginInline:'3px'}} /> */}
//           <Typography> <b> 12 </b></Typography>
         
//           <ExpandMore
//             expand={expanded}
//             onClick={handleExpandClick}
//             aria-expanded={expanded}
//             aria-label="show more"
//           >
//             <InsertCommentIcon />
//           </ExpandMore>

//         </CardActions>

//         <Collapse in={expanded} timeout="auto" unmountOnExit>
//           <CardContent>
//             <Box sx={{ maxHeight: 200, overflowY: 'scroll' }}>
//               {props.data.comments.map((obj) => {
//                 return (
//                   <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
//                     <Box marginBottom={2} height="30px" bgColor='aqua' >
//                       {obj.comment}
//                     </Box>
//                     <Box bgColor='aqua' >{obj.createdAt}</Box>
//                   </Box>
//                 )
//               })}
//             </Box>

//             <form action="" onSubmit={formik.handleSubmit}>
//               <TextField
//                 name='comment'
//                 value={formik.values.comment}
//                 onChange={formik.handleChange}
//                 fullWidth
//                 variant="standard"
//                 color="warning"
//                 focused
//                 InputProps={{
//                   // startAdornment:<IconButton onClick={()=>setImojiState(true)} onDoubleClick={()=> {setImojiState(false)}}>😎</IconButton>,
//                   endAdornment: <IconButton type='submit'><SendIcon /></IconButton>
//                 }}
//               />
//               {/* { imojiState ? <Picker/> : null} */}
//               {formik.touched.comment && formik.errors.comment ? <FormHelperText sx={{ color: 'red' }} >{formik.errors.comment}</FormHelperText> : null}
//             </form>
//           </CardContent>
//         </Collapse>

//       </Card>
//     </Box>
//   )
// }

// export default ProfileArea
