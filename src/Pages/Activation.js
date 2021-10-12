import React, {useEffect, useState} from "react"
import {ReactComponent as Logo} from '../assets/img/logo.svg'
import {useHistory} from "react-router-dom";
import { func } from "prop-types";
import {Alert} from "reactstrap";
import * as config from "../config/config"
import img from "../assets/img/covengers-logo.png";

function Activation({location}) {
    
    const username = location.username;
    const isDeleted = location.isDeleted;
    console.log(isDeleted)
    const password = location.password;

    let [ color, setColor ] = useState("deeppink");
    let [ code, setCode ] = useState('');
    let [ disabledCode, setDisabledCode ] = useState(true);
    let [ disabledSendBtn, setDisabledSendBtn ] = useState(true);
    let [ userPhoneNumber, setUserPhoneNumber ]= useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [successAlertOpen, setSuccessAlertOpen] = useState(false);
    let [ authFail, setAuthFail ] = useState(false);
    let history = useHistory();

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
        }).then(response =>  {
                return response.json();
        }).then(response => {
                if(response.result === "success") { // 성공
                    setSuccessAlertOpen(true);
                    setDisabledCode(false);
                }else {
                    setAlertOpen(true);
                }
        }).catch(error => {
                console.error("Error: " + error.message);
                history.push("/");
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(e.target.text.value === e.target.code.value){
            fetch(`${config.SPRING_URL}/api/user/useractivation`, {
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
                    username: username,
                    name: e.target.name.value,
                    phoneNumber: e.target.number.value,
                    isDeleted: isDeleted
                })
            }).then(response =>  {
                    if(response.status === 200) {
                        fetch(`${config.SPRING_URL}/api/user/login`,{
                                        method: "POST",
                                        headers: {
                                            "Access-Control-Allow-Headers":"Authorization",
                                            "Access-Control-Allow-Origin":`${config.SPRING_URL}`,
                                            "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
                                            "Accept":"application/json",
                                            "Content-Type":"application/json"
                                        },
                                        body: JSON.stringify({
                                            username: username,
                                            password: password
                                        })
                                     }). then(response => {
                                            if(!response.ok){
                                                history.push('/');
                                            }
                                            return response.json();
                                     }).then(response => {
                                            window.localStorage.setItem("Authorization", response.Authorization);
                                            window.localStorage.setItem("username", response.username);
                                            window.localStorage.setItem("userNo", response.no.toString());
                                            window.localStorage.setItem("name", response.name);
                        
                                            console.log(localStorage.getItem("name"));
                                            console.log(response.Authorization);
                                            history.push('/chat');
                                        })
                                        .catch(error => {
                                        console.error("Error: "+error.message);
                                        alert("사용자 인증 실패")
                                        history.push("/");
                                    })
                    }else{
                        setAuthFail(true);
                        
                    }
                })
            
        }else{
            setAuthFail(true);
            history.push("/");
        }
    }


    useEffect(() => document.body.classList.add('form-membership'), []);

    return (
        <div className="form-wrapper">
            <div className="logo">
                <img src={img} style={{width:80, height:80}} onClick={()=>{
                    window.location.assign("/")
                }}/>
                {/*<Logo/>*/}
            </div>
            <h5>계정활성화</h5>
            <p>※ "{username}" 계정은 회원탈퇴를 하였습니다. 계정복구를 원하신다면 아래의 인증절차를 따라주십시오.</p> 
            
            <form onSubmit={ handleSubmit }>

                <div className="form-group">
                    <input name="name" type="text" className="form-control form-control-lg" placeholder="이름을 입력해주세요" required autoFocus/>
                </div>

                <div className="form-group">
                    <Alert isOpen={successAlertOpen} color="info">인증 코드 발송 성공</Alert>
                    <input onChange={ getNumHandler } value={ userPhoneNumber } id="number" name="number" type="number" className="form-control form-control-lg" placeholder="01012345678" required/>
                    <button onClick={ smsApiHandler } disabled={ disabledSendBtn} style={{backgroundColor:color}} className="btn btn-primary btn-block btn-lg">번호 전송</button>
                </div>
                <Alert isOpen={alertOpen} color="info">잘못된 인증 번호입니다.</Alert>
                <div className="form-group">
                    <input disabled={ disabledCode } id="userNum" name="code" type="number" className="form-control form-control-lg" placeholder="인증번호 입력" required/>
                </div>
                <input id="text" name="text" type="hidden" value={ code }  required/>
                <button className="btn btn-primary btn-block btn-lg">제출하기</button>
                <Alert isOpen={authFail} color="info">성함 및 휴대폰번호가 일치하지 않습니다.</Alert>
            </form>
        </div>
    )
}

export default Activation
