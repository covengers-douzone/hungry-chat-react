import React, {useEffect, useState} from "react"
import {ReactComponent as Logo} from '../assets/img/logo.svg'
import {useHistory} from "react-router-dom";
import { func } from "prop-types";

function UserInfoSearch() {

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
                history.push("/sign-in");
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
                        response.json().then(data => {
                            console.log(data.username);
                            history.push({
                                pathname: '/userId', 
                                username: data.username
                             })
                        })
                    }else{
                        alert("이름과 휴대폰번호를 다시 확인해주세요")
                        history.push("/userinfo")
                    }
                })
            
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
                    <input onChange={ getNumHandler } value={ userPhoneNumber } id="number" name="number" type="number" className="form-control form-control-lg" placeholder="01012345678" required/>
                    <button onClick={ smsApiHandler } disabled={ disabledSendBtn} style={{backgroundColor:color}} className="btn btn-primary btn-block btn-lg">번호 전송</button>
                </div>
                <div className="form-group">
                    <input disabled={ disabledCode } id="userNum" name="code" type="number" className="form-control form-control-lg" placeholder="인증번호 입력" required/>
                </div>
                <input id="text" name="text" type="hidden" value={ code }  required/>
                <button className="btn btn-primary btn-block btn-lg">제출하기</button>
                
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
