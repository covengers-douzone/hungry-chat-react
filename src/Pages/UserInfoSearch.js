import React, {useEffect, useState} from "react"
import {ReactComponent as Logo} from '../assets/img/logo.svg'
import {useHistory} from "react-router-dom";
import { func } from "prop-types";

function UserInfoSearch() {

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

    function smsApiHandler(e){
        e.preventDefault();
        setColor("blue");
        let authCode = Math.floor(Math.random()*100) + 1000;
        if(authCode>10000){
            authCode -= 1000;
        }

        setCode(authCode);// 인증코드

        if(userPhoneNumber === "" || userPhoneNumber === null){
            alert("번호를 입력해주세요.");
        }
        fetch("http://localhost:8888/api/user/sms", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:8888",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
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
/*
    const handleSubmit = async function(e){
        e.preventDefault();
        if(e.target.text.value === e.target.code.value){
            
            const response = await fetch("http://localhost:8888/api/user/useridsearch", {
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
                    name: e.target.name.value,
                    phoneNumber: e.target.number.value
                })
            })

            const data = response.json();
            
                if(response.ok){
                    //console.log(response.clone().json()); 
                    // response.json().then((result) => {
                    //     console.log(result.username);
                    // })
                    history.push({
                        pathname: '/userId',
                        username: data.username
                    })
                } else{
                    alert("이름과 휴대폰번호가 일치하지 않습니다!");
                    history.push("/userinfo")
                }
        }else{
            alert("인증 실패");
            history.push("/userinfo")
        }
    }
*/

    function handleSubmit(e) {
        e.preventDefault();

        if(e.target.text.value === e.target.code.value){
            fetch("http://localhost:8888/api/user/useridsearch", {
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
                    name: e.target.name.value,
                    phoneNumber: e.target.number.value
                })
            })
                .then(response =>  {
                    if(response.status === 200) {
                    return response.json();
                    }
                })
                .then(data => {
                    console.log(data.username);
                    history.push({
                        pathname: '/userId', 
                        username: data.username
                    })
                }
                )
        }else{
            alert("인증 실패");
            history.push("/userinfo")
        }
    }


    useEffect(() => document.body.classList.add('form-membership'), []);

    return (
        <div className="form-wrapper">
            <div className="logo">
                <Logo/>
            </div>
            <h5>회원인증</h5>
            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <input name="name" type="text" className="form-control form-control-lg" placeholder="이름을 입력해주세요" required autoFocus/>
                </div>

                <div className="form-group">
                    <input onChange={ getNumHandler } id="number" name="number" type="number" className="form-control form-control-lg" placeholder="01012345678" required/>
                    <button onClick={ smsApiHandler } disabled={ diabledSendBtn} style={{backgroundColor:color}} className="btn btn-primary btn-block btn-lg">Send Code</button>
                </div>
                <div className="form-group">
                    <input disabled={ disabledCode } id="userNum" name="code" type="number" className="form-control form-control-lg" placeholder="Input your code" required/>
                </div>
                <input id="text" name="text" type="hidden" value={ code }  required/>
                <button className="btn btn-primary btn-block btn-lg">Submit</button>
                
                <hr/>
                <p className="text-muted">Take a different action.</p>
                <a href="/sign-up" className="btn btn-sm btn-outline-light mr-1">회원가입</a>
                or
                <a href="/" className="btn btn-sm btn-outline-light ml-1">로그인</a>
            </form>
        </div>
    )
}

export default UserInfoSearch
