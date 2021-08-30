import React, {useEffect} from "react"
import {ReactComponent as Logo} from '../assets/img/logo.svg'

function PhoneCode() {

    useEffect(() => document.body.classList.add('form-membership'), []);

    return (
        <div className="form-wrapper">
            <div className="logo">
                <Logo/>
            </div>
            <h5>Enter code</h5>
            <p className="text-muted">Write the confirmation code that came to your phone in the box below.</p>
            <form>
                <div className="form-group">
                    <input type="text" className="form-control form-control-lg text-center" placeholder="_ _ _ _ _" autoFocus/>
                </div>
                <button className="btn btn-primary btn-block btn-lg">Confirm Code</button>
                <hr/>
                <p className="text-muted">Take a different action.</p>
                <a href="/sign-up" className="btn btn-sm btn-outline-light mr-1">Register now!</a>
                or
                <a href="/sign-in" className="btn btn-sm btn-outline-light ml-1">Login!</a>
            </form>
        </div>
    )
}

export default PhoneCode
