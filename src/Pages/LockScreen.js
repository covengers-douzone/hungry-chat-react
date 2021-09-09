import React, {useEffect} from "react"
import {ReactComponent as Logo} from '../assets/img/logo.svg'
import WomenAvatar1 from '../assets/img/women_avatar1.jpg'

function LockScreen() {

    useEffect(() => document.body.classList.add('form-membership'), []);

    return (
        <div className="form-wrapper">
            <div className="logo">
                <Logo/>
            </div>
            <h5>비밀번호를 입력하세요.</h5>

            <form>
                <div className="form-group d-flex align-items-center">
                    <div className="mr-3">
                        <figure className="mb-4 avatar avatar-lg">
                            <img src={WomenAvatar1} className="rounded-circle" alt="avatar"/>
                        </figure>
                    </div>
                    <input type="password" className="form-control form-control-lg" placeholder="Password" required autoFocus/>
                </div>
                <button className="btn btn-primary btn-block btn-lg">로그인</button>
                <hr/>
                <a href="/" className="btn btn-sm btn-outline-light ml-1">로그인</a>
            </form>
        </div>
    )
}

export default LockScreen
