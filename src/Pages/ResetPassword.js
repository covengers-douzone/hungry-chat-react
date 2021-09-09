import React, {useEffect, useState} from "react"
import {ReactComponent as Logo} from '../assets/img/logo.svg'
import {useHistory} from "react-router-dom";
import { useForm } from "react-hook-form";

function ResetPassword({location}) {
    const { register, handleSubmit, errors } = useForm();
    let history = useHistory();
    const foundUsername = location.username;
    useEffect(() => document.body.classList.add('form-membership'), []);

    const onSubmit = function handleSubmit(errors, e) {
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
            history.push('/')
        }
    })
    }
    return (
        <div className="form-wrapper">
            <div className="logo">
                <Logo/>
            </div>
            <h5>Reset password</h5>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <div className="form-group">
                    <input id="username" name="username" className="form-control form-control-lg" type="hidden" value={foundUsername} />
                </div>
                <div className="form-group">
                    <input ref={register({
                        required:"Required",
                        pattern:{
                            value: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                            message: "문자,숫자,특수문자포함 8~15자리"
                        }
                    })} id="password" name="password" type="password" className="form-control form-control-lg" placeholder="문자,숫자,특수문자포함 8~15자리" required autoFocus/>
                    <span >{errors.password && errors.password.message}</span>
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">Submit</button>

                <hr/>
                <p className="text-muted">Take a different action.</p>
                or
                <a href="/" className="btn btn-sm btn-outline-light ml-1">Login!</a>
            </form>
        </div>
    )
}

export default ResetPassword
