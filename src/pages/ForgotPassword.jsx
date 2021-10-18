import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from '../helpers/url';
import "./styles/ForgotPassword.css"

function ForgotPassword() {
    const [datafp, setdatafp] = useState("")
    const [hidekirim, sethidekirim] = useState(true)

    const inputHandler = (e) => {
        setdatafp(e.target.value)
    }

    const onCari = async () => {
        if (!datafp) {
            alert(`gaboleh kosong`)
        }
        try {
            let options = {
                params: {
                    email: datafp,
                    username: datafp
                }
            }
            let res = await axios.get(`${API_URL}/auth/forgot`, options)
            localStorage.setItem("token-access", res.data.token)
            if (res.data.length) {
                sethidekirim(false)
            } else {
                sethidekirim(true)
            }
            alert(`ada`)
        } catch (error) {
            alert(`ga ada`)
        }
    }

    return (
        <div className="fp-box">
            <h3>Masukkan email atau username</h3>
            <div style={{marginBottom: 10}}>
                <input type="text" name="datafp" placeholder="email atau username" onChange={inputHandler} />
            </div>
            <div style={{marginBottom: 10}}>
                <button onClick={onCari}>Cari</button>
            </div>
            <div>
                <button hidden={hidekirim}>Kirim email</button>
            </div>
        </div>
    )
}

export default ForgotPassword;