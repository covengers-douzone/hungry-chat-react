import React, {useEffect, useState} from "react"
import {ReactComponent as Logo} from '../assets/img/logo.svg'
import {Alert} from "reactstrap";
import * as config from "../config/config"
import img from "../assets/img/covengers-logo.png"


function SignIn({history}) {
    const [alertOpen, setAlertOpen] = useState(false);
    function loginHandler(e){
        e.preventDefault();
        setAlertOpen(false);
        const username = e.target.email.value;
        const password = e.target.password.value;
        if(e.target.email.value !== '' || e.target.password.value !== ''){
            fetch(`${config.SPRING_URL}/api/user/activation`,{
                method: "POST",
                headers: {
                    "Access-Control-Allow-Headers":"Authorization",
                    "Access-Control-Allow-Origin": `${config.SPRING_URL}`,
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
                    setAlertOpen(true);
                }else {
                    return response.json();
                }
              }).then(response => {
                    if(response.data){
                                history.push({
                                    pathname: '/activation', 
                                    username: username,
                                    password: password,
                                    isDeleted: response.data
                                })
                    }else {
                                    fetch(`${config.SPRING_URL}/api/user/login`,{
                                        method: "POST",
                                        headers: {
                                            "Access-Control-Allow-Headers":"Authorization",
                                            "Access-Control-Allow-Origin": `${config.SPRING_URL}`,
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
                                                setAlertOpen(true);
                                                history.push('/');
                                            }
                                                return response.json();
                                    }).then(response => {
                                            window.localStorage.setItem("Authorization", response.Authorization);
                                            window.localStorage.setItem("username", response.username);
                                            window.localStorage.setItem("userNo", response.no.toString());
                                            window.localStorage.setItem("name", response.name);
                                            window.localStorage.setItem("role", response.role);
                                            console.log(localStorage.getItem("name"));
                                            console.log(response.Authorization);
                                            history.push('/chat');
                                        })
                                        .catch(error => {
                                            console.info("Error: "+ error.message);
                                            history.push("/");
                                    })
                            }
                        }).catch(error => {
                                console.info("Error: "+ error.message);
                                history.push("/");
                        })
        } else{
            setAlertOpen(true);
            history.push("/");
        }
    }

    const unknownLoginHandler = async (e) => {
        e.preventDefault();
        try {
            await fetch(`${config.SPRING_URL}/api/user/unknownLogin`, {
                method: "get",
                headers: {
                    "Accept": "application/json",
                },
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("unknownLoginHandler error occured");
                }
            }).then(response => {
                fetch(`${config.SPRING_URL}/api/user/login`, {
                    method: "POST",
                    headers: {
                        "Access-Control-Allow-Headers": "Authorization",
                        "Access-Control-Allow-Origin": `${config.SPRING_URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: response.data.username,
                        password: "Unknown"
                    })
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Unknown login Error")
                    }
                }).then(response => {
                    window.localStorage.setItem("Authorization", response.Authorization);
                    window.localStorage.setItem("username", response.username);
                    window.localStorage.setItem("userNo", response.no.toString());
                    window.localStorage.setItem("name", response.name);
                    window.localStorage.setItem("role", response.role);
                    console.log(localStorage.getItem("name"));
                    console.log(localStorage.getItem("Authorization"));
                    history.push('/chat');
                }).catch(error => {
                    alert("Error: " + error.message);
                    history.push("/");
                })
            }).catch(e => {
                console.log(e);
            })
        } catch (e) {
            console.log(e.message);
        }
    }

    useEffect(() => document.body.classList.add('form-membership'));

    return (
        <div className="form-wrapper">
            <div className="logo">
                <img src={img} style={{width:80, height:80}}/>
                {/*<Logo/>*/}
            </div>
            <h5>?????????</h5>
            <Alert isOpen={alertOpen} color="info">?????????/??????????????? ?????? ??????????????????.</Alert>
            <form onSubmit={ loginHandler }>
                <div className="form-group input-group-lg">
                    <input type="text" name="email" className="form-control" placeholder="?????????"/>
                </div>
                <div className="form-group input-group-lg">
                    <input type="password" name="password" className="form-control" placeholder="????????????"/>
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">?????????</button>
                
                <hr/>
                <div className="form-group d-flex justify-content-between">
                    <a href="/userinfo" className="btn btn-outline-light btn-sm">ID/PW ??????</a>
                    <a href="#" className="btn btn-outline-light btn-sm" onClick={unknownLoginHandler}>????????? ?????????</a>
                    <a href="/sign-up" className="btn btn-outline-light btn-sm">????????????</a>
                </div>
                {/*<hr/>*/}
                {/*<p className="text-muted">SNS ?????????</p>*/}
                {/*<ul className="list-inline">*/}
                {/*    <li className="list-inline-item">*/}
                {/*        <a href="/" className="btn btn-floating btn-facebook">*/}
                {/*            <i className="fa fa-facebook"></i>*/}
                {/*        </a>*/}
                {/*    </li>*/}
                {/*    <li className="list-inline-item">*/}
                {/*        <a href="/" className="btn btn-floating btn-google">*/}
                {/*            <i className="fa fa-google"></i>*/}
                {/*        </a>*/}
                {/*    </li>*/}
                {/*    <li className="list-inline-item">*/}
                {/*        <a href="/" className="btn btn-floating btn-instagram">*/}
                {/*            <i className="fa fa-instagram"></i>*/}
                {/*        </a>*/}
                {/*    </li>*/}
                {/*</ul>*/}
            </form>
        </div>
    )
}

export default SignIn
