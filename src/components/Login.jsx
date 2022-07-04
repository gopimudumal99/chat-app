import React from 'react'
import {GoogleOutlined,FacebookOutlined} from '@ant-design/icons'
const Login = () => {
  return (
    <div id='login-page'>
        <div id="login-card">
            <h2>Welcome to PeriChat</h2>
            <div className="login-button google">
                <GoogleOutlined/> Sing In with google
            </div>
            <br />
            <br />
            <div className="login-button facebook">
                <FacebookOutlined/> Sing In with facebook
            </div>
        </div>
    </div>
  )
}

export default Login