import React, {useEffect} from "react"
import {ReactComponent as Logo} from '../assets/img/logo.svg'


function SignIn({history}) {
    function loginHandler(e){
        e.preventDefault();
        if(e.target.email.value !== '' || e.target.password.value !== ''){
            fetch("http://localhost:8888/api/user/login",{
                method: "POST",
                headers: {
                    "Access-Control-Allow-Headers":"Authorization",
                    "Access-Control-Allow-Origin":"http://localhost:8888",
                    "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    username: e.target.email.value,
                    password: e.target.password.value,
                })
            }). then(response => {
                console.log(response.status);
                if(response.status === 401){
                    alert("계정 정보가 일치하지 않습니다. 다시 시도해주세요");
                    console.log("중복된 데이터가 있는지 확인할것.")
                    history.push("/sign-in");
                }else if (response.status === 500){
                    history.push("/sign-in");
                    console.log("500 Error, 서버를 재시작해주세요.");
                }else {
                    if(response.ok){
                        return response.json();
                    }
                }
            })
                .then(response => {
                    localStorage.setItem("Authorization", response.Authorization);
                    localStorage.setItem("username", response.username);
                    localStorage.setItem("userNo", response.no.toString());
                    localStorage.setItem("name", response.name);

                    console.log(response.name);
                    console.log(response.username);
                    console.log(response.Authorization);
                    console.log(response.no);
                    history.push('/'+response.no);
                })
                .catch(error => {
                alert("Error: "+error.message);
                history.push("/sign-in");
            })
        } else{
            alert("아이디/패스워드를 입력하세요.");
            history.push("/sign-in");
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
                    <input type="text" name="email" className="form-control" placeholder="Email"/>
                </div>
                <div className="form-group input-group-lg">
                    <input type="password" name="password" className="form-control" placeholder="Password"/>
                </div>
                <div className="form-group d-flex justify-content-between">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" defaultChecked id="customCheck1"/>
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                    <a href="/userinfo" className="btn btn-outline-light btn-sm">ID/PW 찾기</a>
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
