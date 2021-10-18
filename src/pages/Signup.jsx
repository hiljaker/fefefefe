import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { API_URL } from '../helpers/url';
import { loginAction } from '../redux/actions';
import "./styles/Signup.css"

function SignUp(props) {
    const [dataSignup, setDataSignup] = useState({
        email: "",
        username: "",
        password: "",
        confirmpass: ""
    })

    const inputHandler = (e) => {
        setDataSignup({ ...dataSignup, [e.target.name]: e.target.value })
    }

    const onSignup = async () => {
        const { username, email, password, confirmpass } = dataSignup
        if (password !== confirmpass) {
            alert(`salah kali tuh password`)
        }
        let signupBody = {
            username,
            email,
            password
        }
        try {
            const res = await axios.post(`${API_URL}/auth/register`, signupBody)
            console.log(res.data);
            localStorage.setItem("token-access", res.data.token)
            props.loginAction(res.data.data)
            alert(`berhasil`)
        } catch (error) {
            alert(`gagal`)
        }
    }

    if (props.auth.isLogin) {
        return <Redirect to="/" />
    }

    return (
        <div className="signup-box">
            <h1>Sign Up</h1>
            <div style={{marginBottom: 10}}>
                <input type="text" name="email" placeholder="email" onChange={inputHandler} />
            </div>
            <div style={{marginBottom: 10}}>
                <input type="text" name="username" placeholder="username" onChange={inputHandler} />
            </div>
            <div style={{marginBottom: 10}}>
                <input type="password" name="password" placeholder="password" onChange={inputHandler} />
            </div>
            <div style={{marginBottom: 10}}>
                <input type="password" name="confirmpass" placeholder="confim password" onChange={inputHandler} />
            </div>
            <button onClick={onSignup}>Sign Up</button>
        </div>
    );
}

const MapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(MapStateToProps, {loginAction}) (SignUp);