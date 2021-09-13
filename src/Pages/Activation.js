import React, {useEffect, useState} from "react"
import {ReactComponent as Logo} from '../assets/img/logo.svg'
import {useHistory} from "react-router-dom";
import { func } from "prop-types";

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
        fetch("http://localhost:8888/api/user/sms", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:8888",
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
                    alert("인증 코드 발송 완료");
                    setDisabledCode(false);
                }else if(response.status === 400){ // 이미 등록된 번호
                    alert(response.message);
                }else { // 서버 문제
                    alert("인증 코드 발송 실패");
                }
            })
            .catch(error => {
                alert("Error: " + error.message);
                history.push("/");
            })
    }

    function handleSubmit(e) {
        e.preventDefault();

        if(e.target.text.value === e.target.code.value){
            fetch("http://localhost:8888/api/user/activation", {
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
                    username: username,
                    name: e.target.name.value,
                    phoneNumber: e.target.number.value,
                    isDeleted: isDeleted
                })
            })
                .then(response =>  {
                    if(response.status === 200) {
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
                                            username: username,
                                            password: password
                                        })
                                    }). then(response => {
                                        console.log(response.status);
                                        if(response.status === 401){
                                            alert("계정 정보가 일치하지 않습니다. 다시 시도해주세요");
                                            console.log("중복된 데이터가 있는지 확인할것.")
                                            history.push("/");
                                        }else if (response.status === 500){
                                            history.push("/");
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
                                            console.log(response.Authorization);
                                            history.push('/chat');
                                        })
                                        .catch(error => {
                                        alert("Error: "+error.message);
                                        history.push("/");
                                    })
                    }else{
                        alert("이름과 휴대폰번호를 다시 확인해주세요")
                        history.push("/")
                    }
                })
            
        }else{
            alert("인증 실패");
            history.push("/")
        }
    }


    useEffect(() => document.body.classList.add('form-membership'), []);

    return (
        <div className="form-wrapper">
            <div className="logo">
                <Logo/>
            </div>
            <h5>계정활성화</h5>
            <p>※ "{username}" 계정은 회원탈퇴를 하였습니다. 계정복구를 원하신다면 아래의 인증절차를 따라주십시오.</p> 
            
            <form onSubmit={ handleSubmit }>

                <div className="form-group">
                    <input name="name" type="text" className="form-control form-control-lg" placeholder="이름을 입력해주세요" required autoFocus/>
                </div>

                <div className="form-group">
                    <input onChange={ getNumHandler } value={ userPhoneNumber } id="number" name="number" type="number" className="form-control form-control-lg" placeholder="01012345678" required/>
                    <button onClick={ smsApiHandler } disabled={ disabledSendBtn} style={{backgroundColor:color}} className="btn btn-primary btn-block btn-lg">번호 전송</button>
                </div>
                <div className="form-group">
                    <input disabled={ disabledCode } id="userNum" name="code" type="number" className="form-control form-control-lg" placeholder="인증번호 입력" required/>
                </div>
                <input id="text" name="text" type="hidden" value={ code }  required/>
                <button className="btn btn-primary btn-block btn-lg">제출하기</button>
            </form>
        </div>
    )
}

export default Activation
