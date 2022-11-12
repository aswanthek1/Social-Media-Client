import { Box } from '@mui/material';
import React from 'react'
import Posts from '../Posts/Posts'
import { useSelector, useDispatch } from 'react-redux'



function Feed() {
  const postsDetails = useSelector(state => state.post)
  console.log("feed post", postsDetails)
  return (
    
    <Box flex={4} p={1} >
      {postsDetails.post.map((postArray) => {
        return (
          <Posts key={postArray._id} data={postArray} />

        )
      }


      )}
    </Box>
  )
}

export default Feed
