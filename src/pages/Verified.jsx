import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import axios from 'axios';
import { API_URL } from '../helpers/url';

function Verified(props) {
    const [condition, setCondition] = useState(1)

    const fetchData = async () => {
        const { token } = qs.parse(props.location.search)
        try {
            const res = await axios.get(`${API_URL}/auth/verified`, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            setCondition(2)
        } catch (error) {
            setCondition(3)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (condition === 1) {
        return (
            <div>
                <h1>Menunggu Verifikasi</h1>
            </div>
        )
    }
    if (condition === 2) {
        return (
            <div>
                <h1>Verifikasi Berhasil</h1>
                <Link to="/">Kembali ke Home</Link>
            </div>
        )
    }
    return (
        <div>
            <h1>Verifikasi Gagal</h1>
            <Link to="/">Kembali ke Home</Link>
        </div>
    )
}

export default Verified;