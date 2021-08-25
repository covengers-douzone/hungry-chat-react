import { func } from "prop-types";
import React, {useEffect} from "react"
import {ReactComponent as Logo} from '../assets/img/logo.svg'
import {useHistory} from "react-router-dom";

function UserId({location}) {
    let history = useHistory();
    const userName = location.username;
    console.log(userName);
    useEffect(() => document.body.classList.add('form-membership'), []);
    
    // let history = useHistory();
    // function handleSubmit(e) {
    //     e.preventDefault();

    //     fetch("http://localhost:8888/api/user/userpassword", {
    //         method: "POST",
    //         credentials: 'include',
    //             headers: {
    //                 "Access-Control-Allow-Headers" : "Content-Type",
    //                 "Access-Control-Allow-Origin": "http://localhost:8888",
    //                 "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    //                 'Accept': 'application/json, text/plain',
    //                 'Content-Type': 'application/json;charset=UTF-8'
    //             },
    //             body: JSON.stringify({
    //                 username : e.target.id.value
    //             })
    //     })
    //     .then(response => {
    //         if(response.status === 200){
    //         return response.json();
    //         }
    //     })
    //     .then(data => {
    //         console.log(data.username);
    //         history.push({
    //             pathname: '/reset-password',
    //             username: data.username
    //         })
    //     })
        
    // }
    function toFindPassword(){
        history.push({
            pathname: '/reset-password', 
            username: userName
        })
    }

    return (
        <div className="form-wrapper">
            <div className="logo">
                <Logo/>
            </div>
            <h5>ID 목록</h5>

            <form>
                <div className="form-group">
                    <h2 id={userName} name={userName} className="form-control form-control-lg">{userName}</h2>
                </div>

                <hr/>

                <a href="/" className="btn btn-sm btn-outline-light mr-1">로그인하기</a>
                
                <button type="button" onClick = {toFindPassword} className="btn btn-sm btn-outline-light ml-1">비밀번호찾기</button>
                
            </form>
            
        </div>
    )
}

export default UserId
