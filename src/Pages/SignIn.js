import React, {useEffect, useState} from "react"
import {ReactComponent as Logo} from '../assets/img/logo.svg'
import {useHistory} from "react-router-dom";
import { connect } from "react-redux";
import {userLogin} from '../api/authenticationService';
import { authenticate, authFailure, authSuccess } from '../redux/authActions';

const SignIn= ({loading,error, ...props}) => {
    let history = useHistory();
    const [values, setValues] = useState({
        username: '',
        password: ''
    });

<<<<<<< HEAD
    const handleSubmit=(evt)=>{
        evt.preventDefault();
        props.authenticate();

        userLogin(values).then((response)=>{
            console.log("res: " , response);

            if(response.status === 200){
                props.setUser(response.date);
                props.history.push('/chat');
            }else{
                props.logingFailure("Something Wrong!Please Try Again");
            }
        }).catch((err)=>{
            if(err && err.response){
            
                switch(err.response.status){
                    case 401:
                        console.log("401 status");
                        props.loginFailure("Authentication Failed.Bad Credentials");
                        break;
                    default:
                        props.loginFailure('Something Wrong!Please Try Again'); 
    
                }
    
                }
                else{
                    props.loginFailure('Something Wrong!Please Try Again');
                }
        })
=======
function SignIn() {
    let history = useHistory();


    function loginHandler(e){
        console.log(e.target.email.value);
        console.log(e.target.password.value);
        e.preventDefault();
        if(e.target.email !== null && e.target.password !== null){
            fetch("http://localhost:8888/api/user/login", {
                method: "POST",
                headers: {
                    // "Access-Control-Allow-Headers":"Content-Type",
                    "Access-Control-Allow-Headers":"Authorizationc",
                    "Access-Control-Allow-Origin":"http://localhost:8888",
                    "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
                    "Accept":"application/json, text/plain",
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    username: e.target.email.value,
                    password: e.target.password.value,
                })
            }). then(response => {
                history.push("/");
                console.log(response);

            }).catch(error => {
                console.log(error);
            })
        } else {
            alert("아이디/패스워드를 입력하세요.");
            history.push("/sign-in")
        }
>>>>>>> 960708d19df25d6ad6af52e2ec7ccb98ad610155
    }

    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }));
    };
    console.log("Loading ",loading);
    useEffect(() => document.body.classList.add('form-membership'), []);



    return (
        <div className="form-wrapper">
            <div className="logo">
                <Logo/>
            </div>
            <h5>로그인</h5>
            <form onSubmit={handleSubmit} noValidate={false}>
                <div className="form-group input-group-lg">
                    <input type="text" name="username" className="form-control" placeholder="email"/>
                </div>
                <div className="form-group input-group-lg">
                    <input type="password" name="password" className="form-control" placeholder="Password"/>
                </div>
                <div className="form-group d-flex justify-content-between">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" defaultChecked id="customCheck1"/>
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                    <a href="/reset-password">Reset password</a>
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">Sign in</button>
                <hr/>
                <p className="text-muted">Login with your social media account.</p>
                
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <a href="/" className="btn btn-floating btn-facebook">
                            <i className="fa fa-facebook"></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/" className="btn btn-floating btn-twitter">
                            <i className="fa fa-twitter"></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/" className="btn btn-floating btn-google">
                            <i className="fa fa-google"></i>
                        </a>
                    </li>

                    <li className="list-inline-item">
                        <a href="/" className="btn btn-floating btn-instagram">
                            <i className="fa fa-instagram"></i>
                        </a>
                    </li>
                </ul>
                <hr/>
                <p className="text-muted">Don't have an account?</p>
                <a href="/sign-up" className="btn btn-outline-light btn-sm">Register now!</a>
            </form>
        </div>
    )
}

const mapStateToProps=({auth})=>{
    console.log("state ",auth)
    return {
        loading:auth,
        error:auth
}}

const mapDispatchToProps=(dispatch)=>{

    return {
        authenticate :()=> dispatch(authenticate()),
        setUser:(data)=> dispatch(authSuccess(data)),
        loginFailure:(message)=>dispatch(authFailure(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
