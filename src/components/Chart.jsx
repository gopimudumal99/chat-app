import React from 'react'
import {useNavigate} from 'react-router-dom'
// import {ChatEngine} from 'react-chat-engine'
import {auth} from '../firebase'
import {useAuth} from '../contexts/AuthContext'

const Chart = ()=>{
    const {user} = useAuth();
    
    const navigate = useNavigate()
    const handleLogout = async() =>{
        await auth.signOut()
        navigate("/")

    }

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    PeriChat
                </div>
                <div onClick={()=>handleLogout()} className="logout-tab">
                    Logout
                </div>
            </div>
        </div>
    )
}

export default Chart
