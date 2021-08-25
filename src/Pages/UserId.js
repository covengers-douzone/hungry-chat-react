import React, {useEffect} from "react"
import {ReactComponent as Logo} from '../assets/img/logo.svg'

function UserId({location}) {

    const getParams = location.username;
    console.log(getParams);


    useEffect(() => document.body.classList.add('form-membership'), []);

    return (
        <div className="form-wrapper">
            <div className="logo">
                <Logo/>
            </div>
            <h5>ID 목록</h5>

            <form>
                <div className="form-group">
                    <h2 className="form-control form-control-lg">{getParams}</h2>
                </div>

                <hr/>

                <a href="/" className="btn btn-sm btn-outline-light mr-1">로그인하기</a>
                
                <button className="btn btn-sm btn-outline-light ml-1">비밀번호찾기</button>
                {/*<a href="/reset-password" className="btn btn-sm btn-outline-light ml-1">비밀번호찾기</a>*/}
            </form>
            
        </div>
    )
}

export default UserId
