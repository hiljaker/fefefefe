import axios from "axios"
import React, { useEffect } from "react"
import { connect } from "react-redux"
import { Route, Switch } from "react-router-dom"
import { API_URL } from "./helpers/url"
import ChangePassword from "./pages/ChangePassword"
import ForgotPassword from "./pages/ForgotPassword"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/Signup"
import Upload from "./pages/Upload"
import Verified from "./pages/Verified"
import { loginAction } from "./redux/actions"

function App(props) {
    const keepLoggedIn = async () => {
        let token = localStorage.getItem("token-access")
        let res = await axios.get(`${API_URL}/auth/keep/login`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        props.loginAction(res.data.data)
    }

    // const keepLoggedIn = async () => {
    //     let token = localStorage.getItem("token-access")
    //     if (token) {
    //         try {
    //             let res = await axios.get(`${API_URL}/auth/login`, {
    //                 headers: {
    //                     Authorization: "Bearer " + token
    //                 }
    //             })
    //             props.loginAction(res.data.data)
    //         } catch (error) {
    //             alert(error)
    //         }
    //     }
    // }

    useEffect(() => {
        keepLoggedIn()
    }, [])

    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/login/:forgot" component={ForgotPassword} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/verified" exact component={Verified} />
            <Route path="/changepassword" exact component={ChangePassword} />
            <Route path="/upload" exact component={Upload} />
        </Switch>
    )
}

const MapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(MapStateToProps, { loginAction })(App)
