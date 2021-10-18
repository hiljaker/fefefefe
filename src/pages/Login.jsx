import axios from "axios"
import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { Link, Redirect } from "react-router-dom"
import { API_URL } from "../helpers/url"
import "./styles/Login.css"
import { loginAction } from "../redux/actions"

function Login(props) {

    const [inputLogin, setInputLogin] = useState({
        username: "",
        password: ""
    })

    const inputHandler = (e) => {
        setInputLogin({ ...inputLogin, [e.target.name]: e.target.value })
    }

    const onLogin = async () => {
        const { username, password } = inputLogin
        if (!username || !password) {
            alert(`Jangan ada yang kosong dong`)
            return
        }
        try {
            const options = {
                params: {
                    username: username,
                    password: password
                }
            }
            let res = await axios.get(`${API_URL}/auth/login`, options)
            localStorage.setItem("token-access", res.data.token)
            props.loginAction(res.data.data)
            alert(`berhasil`)
        } catch (error) {
            alert(error.message)
        }
    }

    if (props.auth.isLogin) {
        return <Redirect to="/" />
    }

    return (
        <div className="login-box">
            <h1>Login</h1>
            <div style={{ marginBottom: 10 }}>
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={inputHandler}
                />
            </div>
            <div style={{ marginBottom: 10 }}>
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={inputHandler}
                />
            </div>
            <button onClick={onLogin}>Login</button>
            <p>
                Tidak punya akun? <Link to="/signup">Sign Up</Link> sekarang!
            </p>
            <Link to="login/forgot">Lupa Password</Link>
        </div>
    )
}

const MapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(MapStateToProps, {loginAction})(Login)
