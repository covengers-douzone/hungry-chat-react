import React, {useEffect, useState} from "react"
import {ReactComponent as Logo} from '../assets/img/logo.svg'
import {useHistory} from "react-router-dom";

function SignUp() {
    let [ color, setColor ] = useState("deeppink");
    let [ code, setCode ] = useState('');
    let [ disabledCode, setDisabledCode ] = useState(true);
    let [ diabledSendBtn, setDisabledSendBtn ] = useState(true);
    let userPhoneNumber;
    let history = useHistory();

    function getNumHandler(e){
        e.preventDefault();
        if(e.target.value.length === 11){
            setDisabledSendBtn(!diabledSendBtn);
        }else {
            setDisabledSendBtn(true);
        }
        userPhoneNumber = e.target.value;
    }

    // sms 인증
    function smsApiHandler(e){
        e.preventDefault();
        setColor("blue");
        let authCode = Math.floor(Math.random()*100) + 1000;
        if(authCode>10000){
            authCode -= 1000;
        }

        setCode(authCode);// 인증코드
        console.log(setCode);
        console.log(userPhoneNumber);

        if(userPhoneNumber === "" || userPhoneNumber === null){
            alert("번호를 입력해주세요.");
        }
        fetch("http://localhost:8888/api/sendSms", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:8888",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                recipients : userPhoneNumber,
                text: authCode,
            })
        })
            .then(response =>  {
                if(response.ok) {
                    alert("인증 코드 발송 완료");
                    setDisabledCode(false);
                }else {
                    alert("인증 코드 발송 실패, 번호를 확인 해주세요.");
                }
            })
    }
    // sms 인증 끝

    //  회원가입 submit
    function handleSubmit(e) {
        e.preventDefault();

        if(e.target.text.value === e.target.code.value){
            fetch("http://localhost:8888/api/join", {
                method: "POST",
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": "http://localhost:8888",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    username: e.target.email.value,
                    password: e.target.password.value,
                    name: e.target.name.value,
                    phoneNumber: e.target.number.value,
                })
            })
                .then(response =>  {
                    if(response.status === 200) {
                        console.log(response)
                        history.push("/sign-in")
                    } else {
                        alert("이미 존재하는 아이디입니다.");
                        history.push("/sign-up");
                    }
                })
                // .then(response => {
                //     if(response.status === 200){
                //         location.pathname("/sign-in");
                //     }
                // })
                // .then(response => response.json())
                // .then(response => {
                //     if (response.token) {
                //         localStorage.setItem("wtw-token", response.token);
                //         this.props.history.push("/main_gh");
                //     } else if (!response.token) {
                //         alert("올바른 회원이 아닙니다");
                //         this.props.history.push("/signup_gh");
                //     }
                // });
        }else{
            alert("인증 실패");
            history.push("/sign-up")
        }
    }
    useEffect(() => document.body.classList.add('form-membership'), []);

    return (
        <div className="form-wrapper">
            <div className="logo">
                <Logo/>
            </div>
            <h5>Create account</h5>
            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <input name="name" type="text" className="form-control form-control-lg" placeholder="Name" required autoFocus/>
                </div>
                <div className="form-group">
                    <input name="email" type="email" className="form-control form-control-lg" placeholder="Email" required/>
                </div>
                <div className="form-group">
                    <input name="password" type="password" className="form-control form-control-lg" placeholder="Password" required/>
                </div>
                <div className="form-group">
                    <input onChange={ getNumHandler } id="number" name="number" type="number" className="form-control form-control-lg" placeholder="01012345678" required/>
                    <button onClick={ smsApiHandler } disabled={ diabledSendBtn} style={{backgroundColor:color}} className="btn btn-primary btn-block btn-lg">Send Code</button>
                </div>
                <div className="form-group">
                    <input disabled={ disabledCode } id="userNum" name="code" type="number" className="form-control form-control-lg" placeholder="Input your code" required/>
                </div>
                <input id="text" name="text" type="hidden" value={ code }  required/>
                <button type="submit" className="btn btn-primary btn-block btn-lg">Register</button>
                <hr/>
                <p className="text-muted">Already have an account?</p>
                <a href="/sign-in" className="btn btn-outline-light btnc-sm">Sign in!</a>
            </form>
        </div>
    )
}

export default SignUp
