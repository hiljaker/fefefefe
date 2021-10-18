import  axios  from 'axios';
import React, { useState } from 'react';
import { API_URL } from '../helpers/url';
import "./styles/ChangePassword.css"

function ChangePassword() {
    const [dataGanti, setDataGanti] = useState({
        newpass: "",
        confirmpass: ""
    })

    const inputHandler = (e) => {
        setDataGanti({ ...dataGanti, [e.target.name]: e.target.value })
    }

    const onConfirm = async () => {
        const { newpass, confirmpass } = dataGanti
        if (!newpass || !confirmpass) {
            alert(`kosong`)
        }
        let token = localStorage.getItem("token-access")
        try {
            await axios.put(`${API_URL}/auth/changepassword`, {
                password: dataGanti.newpass
            }, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            alert(`berhasil`)
            localStorage.removeItem("token-access")
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="cp-box">
            <h1>Ganti Password</h1>
            <div style={{marginBottom: 10}}>
                <input type="password" name="newpass" placeholder="Password Baru" onChange={inputHandler} />
            </div>
            <div style={{marginBottom: 10}}>
                <input type="password" name="confirmpass" placeholder="Konfirmasi Password" onChange={inputHandler} />
            </div>
            <button onClick={onConfirm}>Konfirmasi</button>
        </div>
    )
}

export default ChangePassword;