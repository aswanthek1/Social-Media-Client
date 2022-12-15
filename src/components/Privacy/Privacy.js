import { Container, Grid, Paper } from '@mui/material'
import React from 'react'

const Privacy = () => {
  return (
    <>
       <Container maxWidth="xs">
       <Grid sx={{ position: "relative" }}>
       <Paper
            elevation={6}
            sx={{
              padding: 4,
              height: 300,
              marginInline: "auto",
              marginTop: "26%",
            }}
          >
            <p>Under working</p>
          </Paper>
       </Grid>
       </Container>
    </>
  )
}

export default Privacy
