import { func } from "prop-types";
import React, {useEffect} from "react"
import {ReactComponent as Logo} from '../assets/img/logo.svg'
import {useHistory} from "react-router-dom";
import img from "../assets/img/covengers-logo.png";

function UserId({location}) {
    let history = useHistory();
    const userName = location.username;
    useEffect(() => document.body.classList.add('form-membership'), []);

    function toFindPassword(){
        history.push({
            pathname: '/reset-password', 
            username: userName
        })
    }

    return (
        <div className="form-wrapper">
            <div className="logo">
                <img src={img} style={{width:80, height:80}} onClick={()=>{
                    window.location.assign("/")
                }}/>
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
