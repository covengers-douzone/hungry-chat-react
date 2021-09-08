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
                if(response.status === 401){
                    alert("계정 정보가 일치하지 않습니다. 다시 시도해주세요");
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
                    window.localStorage.setItem("Authorization", response.Authorization);
                    window.localStorage.setItem("username", response.username);
                    window.localStorage.setItem("userNo", response.no.toString());
                    window.localStorage.setItem("name", response.name);

                    console.log(localStorage.getItem("name"));
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
            <h5>로그인</h5>
            <form onSubmit={ loginHandler }>
                <div className="form-group input-group-lg">
                    <input type="text" name="email" className="form-control" placeholder="이메일"/>
                </div>
                <div className="form-group input-group-lg">
                    <input type="password" name="password" className="form-control" placeholder="비밀번호"/>
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">로그인</button>
                
                <hr/>
                <div className="form-group d-flex justify-content-between">
                    <a href="/userinfo" className="btn btn-outline-light btn-sm">ID/PW 찾기</a>
                    <a href="/unknown-user" className="btn btn-outline-light btn-sm">비회원 로그인</a>
                    <a href="/sign-up" className="btn btn-outline-light btn-sm">회원가입</a>
                </div>
                <hr/>
                <p className="text-muted">SNS 로그인</p>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <a href="/" className="btn btn-floating btn-facebook">
                            <i className="fa fa-facebook"></i>
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
            </form>
        </div>
    )
}

export default SignIn
