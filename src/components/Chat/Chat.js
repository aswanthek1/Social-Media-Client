import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import './Chat.css'

const Chat = () => {
    return (
        <>
            <div>
                <Navbar />
            </div>
            <div>
                <div>
                    <Sidebar />
                </div>
                <div className='chatRight'>
                    <div className="chatList">
                        <h3>Chat list</h3>
                    </div>
                    <div className='messagingArea'>
                        <h3>Messaging area</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat
