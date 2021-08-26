import React, {useEffect, useState} from "react"
import {ReactComponent as Logo} from '../assets/img/logo.svg'
//import {useLocation} from "react-router";
import {useHistory} from "react-router-dom";

function ResetPassword({location}) {

    let history = useHistory();
    const foundUsername = location.username;
    console.log(foundUsername);
    useEffect(() => document.body.classList.add('form-membership'), []);

    function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:8888/api/user/passwordupdate", {
        method: "POST",
        credentials: 'include',
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "http://localhost:8888",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value
        })
    })
    .then(response => {
        if(response.ok) {
            history.push('/sign-in')
        }
    })
    }
    return (
        <div className="form-wrapper">
            <div className="logo">
                <Logo/>
            </div>
            <h5>Reset password</h5>
            <form onSubmit = {handleSubmit}>
                <div className="form-group">
                    <input id="username" name="username" className="form-control form-control-lg" type="hidden" value={foundUsername} />
                </div>
                <div className="form-group">
                    <input id="password" name="password" type="password" className="form-control form-control-lg" placeholder="password" required autoFocus/>
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">Submit</button>

                <hr/>
                <p className="text-muted">Take a different action.</p>
                or
                <a href="/sign-in" className="btn btn-sm btn-outline-light ml-1">Login!</a>
            </form>
        </div>
    )
}

export default ResetPassword
