import { Camera, Image } from '@mui/icons-material'
import { Box, Button, IconButton, Modal, styled, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'


const StyledModal = styled(Modal)({
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center'
})



const ProfileEditingModal = (props) => {

    const [coverImageSelected, setCoverImage] = useState('')
    const [profileImageSelected, setProfileImage] = useState('')

    const uploadCoverImage = () => {
        const formData = new FormData()
        formData.append('file', coverImageSelected)
        formData.append('upload_preset', "xdqnbual")
        try {
            const userToken = localStorage.getItem('userToken')
            axios.post('http://api.cloudinary.com/v1_1/dm0l6abeb/image/upload', formData).then((response) => {
                return axios.post('http://localhost:5000/addCoverImg', { coverimage: response.data.secure_url }, { headers: { token: userToken } }).then((response) => {
                    console.log(response)
                })
            })
        } catch (error) {
            console.log('error', error)
        }
    }

    const uploadProfileImage = () => {
        const formData = new FormData()
        formData.append('file', profileImageSelected)
        formData.append('upload_preset', "himv7zii")
        try {
            const userToken = localStorage.getItem('userToken')
            axios.post('http://api.cloudinary.com/v1_1/dm0l6abeb/image/upload', formData).then((response) => {
                console.log(response)
                return axios.post('http://localhost:5000/addProfileImg', { profileimage: response.data.secure_url }, { headers: { token: userToken } }).then((response))
            })
        } catch (error) {
             console.log('error',error)
        }
    }


    ///====================================================modal for cover photo======================///
    return (
        <div>
            return (
            <div>
                <StyledModal
                    keepMounted
                    open={props.modalState}
                    onClose={() => props.modalOpenState(false)}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box bgcolor='white' width={600} height={280} borderRadius={5}>
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2" align='center' marginTop='20px'>
                            <b> You want to change your cover photo</b>
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <img
                                style={{ width: '300px', height: '100px' }}
                                src="https://images.unsplash.com/photo-1589489873423-d1745278a8f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2NvdGxhbmR8ZW58MHx8MHx8&w=1000&q=80"
                                alt="" />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', justifyContent: 'space-around', marginTop: '18px' }}>
                            <IconButton color="primary" aria-label="upload picture" component="label">
                                <Typography>Choose from gallery</Typography>
                                <input hidden accept="image/*" onChange={(event) => {
                                    setCoverImage(event.target.files[0])
                                }} type="file" />
                                <Image color='secondary' />
                            </IconButton>
                            <IconButton color="primary" aria-label="upload picture" component="label">
                                <Typography>Capture One</Typography>
                                <input hidden accept="image/*" type="file" />
                                <Camera color='secondary' />
                            </IconButton>
                            <Button variant="contained" type='submit' size='small' onClick={uploadCoverImage}>Upload</Button>
                        </div>
                    </Box>
                </StyledModal>
            </div>
            )


            {/* /////========================modal for profile picture==============================/// */}

            return (

            <div>
                <StyledModal
                    keepMounted
                    open={props.profileModalState}
                    onClose={() => props.profileModalOpenState(false)}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box bgcolor='white' width={600} height={280} borderRadius={5}>
                        <Typography id="keep-mounted-modal-title" variant="h6" component="h2" align='center' marginTop='20px'>
                            <b> You want to change your profile photo</b>
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
                            <img
                                style={{ width: '110px', height: '110px', borderRadius: '50%' }}
                                src="https://thumbs.dreamstime.com/b/handsome-male-model-posing-elegant-smile-88528667.jpg"
                                alt="" />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', justifyContent: 'space-around', marginTop: '18px' }}>
                            <IconButton color="primary" aria-label="upload picture" component="label">
                                <Typography>Choose from gallery</Typography>
                                <input
                                    hidden accept="image/*"
                                    onChange={(event) => setProfileImage(event.target.files[0])}
                                    type="file" />
                                <Image color='secondary' />
                            </IconButton>
                            <IconButton color="primary" type='submit' aria-label="upload picture" component="label">
                                <Typography>Capture One</Typography>
                                <input
                                    hidden
                                    accept="image/*"
                                    type="file" />
                                <Camera color='secondary' />
                            </IconButton>
                            <Button variant="contained" type='submit' size='small' onClick={uploadProfileImage}>Upload</Button>

                        </div>
                    </Box>
                </StyledModal>
            </div>
            )
        </div>
    )
}

export default ProfileEditingModal
