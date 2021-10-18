import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import "./styles/Home.css"

function Home(props) {
    return (
        <div className="home-menu-box">
            <div>
                {props.auth.isLogin ? (
                    <h1>Sudah Login</h1>
                ) : (
                    <h1>Belum Login</h1>
                )}
            </div>
            <div className="link-menu">
                <Link to="/login">Log In</Link>
                <Link to="/verified">Status</Link>
            </div>
        </div>
    )
}

const MapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(MapStateToProps)(Home);