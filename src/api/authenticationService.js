import React from 'react'
import axios from 'axios'

const getToken = ()=>{
    return localStorage.getItem('USER_KEY');
}

export const userLogin = (authRequest) => {
    return axios({
        'method' : 'POST',
        'url' : `${process.env.hostUrl||'http://localhost:8888'}/api/login`,
        'data' : authRequest
    })
}

export const fetchUserData = (authRequest0 => {
    return axios({
        method: 'GET',
        url: `${process.env.hostUrl||'http://localhost:8888'}/api/login1`,
        headers:{
            'Authorization': 'Bearer '+getToken()
        }
    })
})