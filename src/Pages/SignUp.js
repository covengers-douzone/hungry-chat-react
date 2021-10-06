import React, {useEffect, useState} from "react"
import {ReactComponent as Logo} from '../assets/img/logo.svg'
import { useForm } from "react-hook-form";
import {Alert} from "reactstrap";
import * as config from "../config/config";
import img from "../assets/img/covengers-logo.png"


function SignUp({history}) {
    let [ color, setColor ] = useState("deeppink");
    let [ code, setCode ] = useState('');
    let [ disabledCode, setDisabledCode ] = useState(true);
    let [ disabledSendBtn, setDisabledSendBtn ] = useState(true);
    let [ userPhoneNumber, setUserPhoneNumber ]= useState('');
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const [failAlertOpen, setFailAlertOpen] = useState(false);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
    const [codeErrorAlertOpen, setCodeErrorAlertOpen] = useState(false);
    const [emailErrorAlertOpen, setEmailErrorAlertOpen] = useState(false);
    // const [count, setCount] = useState(5);

    const [userName, setUserName] = useState();

    const [inputCode, setInputCode] = useState();


    const { register, handleSubmit, errors } = useForm();

    function getNumHandler(e){
        e.preventDefault();
        if(e.target.value.length === 11){
            setDisabledSendBtn(!disabledSendBtn);
        }else {
            setDisabledSendBtn(true);
        }
        setUserPhoneNumber(e.target.value);
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
        //console.log(e.target.number.value);
        fetch(`${config.SPRING_URL}/api/user/sms`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": `${config.SPRING_URL}`,
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
                recipients : userPhoneNumber,
                text: authCode,
            })
        })
            .then(response =>  {
                return response.json();
            })
            .then(response => {
                if(response.result === "success") { // 성공
                    setSuccessAlertOpen(true)
                    setDisabledCode(false);
                    setFailAlertOpen(false);
                    setErrorAlertOpen(false);
                }else if(response.status === 400){ // 이미 등록된 번호
                    setFailAlertOpen(true);
                    setSuccessAlertOpen(false)
                    setErrorAlertOpen(false);
                }else { // 서버 문제
                    setErrorAlertOpen(true);
                    setFailAlertOpen(false);
                    setSuccessAlertOpen(false)
                }
            })
            .catch(error => {
                console.error("Error: " + error.message);
                history.push("/");
            })
    }
    // sms 인증 끝

     // */


    const onSubmit = function handleSubmit(errors, e){
        e.preventDefault();

        if(code.toString() === inputCode){
            fetch(`${config.SPRING_URL}/api/user/join`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Access-Control-Allow-Headers" : "Content-Type",
                    "Access-Control-Allow-Origin": `${config.SPRING_URL}`,
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
                    return response.json();
                })
                .then(response => {
                    if(response.result === "success"){
                        setEmailErrorAlertOpen(false);
                        setCodeErrorAlertOpen(false);
                        setSuccessAlertOpen(false);
                        setFailAlertOpen(false);
                        setErrorAlertOpen(false);
                        setAlertOpen(true);
                        setUserName(response.data.name);
                        setTimeout(()=>  {
                            history.push("/")
                        }, 5000);
                       //
                       // let interval = setInterval(()=>{
                       //
                       //     if(count === 1){
                       //      clearInterval(interval)
                       //     }
                       //     console.log(count);
                       // }, 1000)
                    }else{
                        setEmailErrorAlertOpen(false);
                        setCodeErrorAlertOpen(false);
                        setSuccessAlertOpen(false);
                        setFailAlertOpen(false);
                        setErrorAlertOpen(false);
                        setEmailErrorAlertOpen(true);
                        history.push("/sign-up");
                    }
                }).catch(error => {
                    alert("Error: " + error.message);
                    history.push("/");
                })
        } else {
            setEmailErrorAlertOpen(false);
            setCodeErrorAlertOpen(false);
            setSuccessAlertOpen(false);
            setFailAlertOpen(false);
            setErrorAlertOpen(false);

            setCodeErrorAlertOpen(true);
        }
    }

    useEffect(() => document.body.classList.add('form-membership'), []);

    return (
        <div className="form-wrapper">
            <div className="logo">
                <img src={img} style={{width:80, height:80}}/>
                {/*<Logo/>*/}
            </div>
            <h5>회원가입</h5>
            <Alert isOpen={alertOpen} color="info">{userName}님 회원가입을 축하합니다. 5초 뒤에 로그인 화면으로 이동합니다.</Alert>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <div className="form-group">
                    <input name="name" type="text" className="form-control form-control-lg" placeholder="이름" required autoFocus/>
                </div>

                <Alert isOpen={emailErrorAlertOpen} color="info">이미 존재하는 이메일입니다.</Alert>
                <div className="form-group">
                    <input name="email" type="email" className="form-control form-control-lg" placeholder="이메일" required/>
                </div>

                <div className="form-group">
                    <input ref={register({
                        required:"Required",
                        pattern:{
                            value: /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
                            message: "문자,숫자,특수문자포함 8~15자리"
                        }
                    })} name="password" type="password" className="form-control form-control-lg" placeholder="문자,숫자,특수문자포함 8~15자리"  required/>
                    <span >{errors.password && errors.password.message}</span>
                </div>

                <Alert isOpen={successAlertOpen} color="info">인증 코드 발송 성공</Alert>
                <Alert isOpen={failAlertOpen} color="info">이미 존재하는 번호입니다.</Alert>
                <Alert isOpen={errorAlertOpen} color="info">인증 코드 발송 실패</Alert>
                <div className="form-group">
                    <input onChange={ getNumHandler } value={ userPhoneNumber } id="number" name="number" type="number" className="form-control form-control-lg" placeholder="01012345678" required/>
                    <button onClick={ smsApiHandler } disabled={ disabledSendBtn } style={{backgroundColor:color}} className="btn btn-primary btn-block btn-lg">번호 전송</button>
                </div>

                <Alert isOpen={codeErrorAlertOpen} color="info">인증 코드가 일치하지 않습니다.</Alert>
                <div className="form-group">
                    <input onChange={(e) => {
                        let {value} = e.target;
                        setInputCode(value);
                    }} disabled={ disabledCode } id="code" name="code" type="number" className="form-control form-control-lg" placeholder="인증번호 입력" required/>
                </div>
                <input id="text" name="text" type="hidden" value={ code }  required/>
                <button type="submit" className="btn btn-primary btn-block btn-lg">회원가입</button>
                <hr/>
                <p className="text-muted">이미 계정을 가지고 계신가요?</p>
                <a href="/" className="btn btn-outline-light btn-sm">로그인</a>
            </form>
        </div>
    )
}

export default SignUp
