import React, {useEffect} from "react"
import {ReactComponent as Logo} from '../assets/img/logo.svg'
import {useHistory} from "react-router-dom";


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
    }
    useEffect(() => document.body.classList.add('form-membership'), []);



    return (
        <div className="form-wrapper">
            <div className="logo">
                <Logo/>
            </div>
            <h5>Sign in</h5>
            <form onSubmit={ loginHandler }>
                <div className="form-group input-group-lg">
                    <input type="text" name="email" className="form-control" placeholder="Username or email"/>
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
                        <a href="/" className="btn btn-floating btn-dribbble">
                            <i className="fa fa-dribbble"></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/" className="btn btn-floating btn-linkedin">
                            <i className="fa fa-linkedin"></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/" className="btn btn-floating btn-google">
                            <i className="fa fa-google"></i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a href="/" className="btn btn-floating btn-behance">
                            <i className="fa fa-behance"></i>
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

export default SignIn
