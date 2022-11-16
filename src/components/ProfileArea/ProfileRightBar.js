import { Button, styled } from '@mui/material'
import React from 'react'


const ProfileRightBar = () => {
  return (
    <div className='rightBarMain'>
      <div  className='rightbarTitle'>
        <span> <b> About Aswanth </b></span>
      </div>
      <div className='rightBarList'>
        <span>Followers : </span>
        <span>450 people</span>
      </div>
      <div className='rightBarList'>
        <span>Following : </span>
        <span>450 people</span>
      </div>
      <div className='rightBarList'>
        <span>Martial Status : </span>
        <span>Single</span>
      </div>
      <div className='rightBarList'>
        <span>Profession : </span>
        <span>Software Engineer</span>
      </div>

    </div>
  )
}

export default ProfileRightBar
