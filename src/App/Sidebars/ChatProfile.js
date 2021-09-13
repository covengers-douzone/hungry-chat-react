import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import PerfectScrollbar from "react-perfect-scrollbar"
import {chatProfileAction} from "../../Store/Actions/chatProfileAction"
import {mobileChatProfileAction} from "../../Store/Actions/mobileChatProfileAction"
import fetchApi from "../Module/fetchApi";

function ChatProfile() {

    const dispatch = useDispatch();

    const {chatInfo} = useSelector(state => state);
    const {chatProfileSidebar, mobileChatProfileSidebar} = useSelector(state => state);
    const {reload} = useSelector(state => state);

    useEffect( ()=>{
        console.log(chatInfo);
    }, []);

    const profileActions = (e) => {
        e.preventDefault();
        dispatch(chatProfileAction(false));
        dispatch(mobileChatProfileAction(false))
    };
    ( mobileChatProfileSidebar || chatProfileSidebar ) && console.log('chatProfile',chatInfo);

    return (
        <div className={`sidebar-group ${mobileChatProfileSidebar ? "mobile-open" : ""}`}>
                <div className={chatProfileSidebar ? 'sidebar active' : 'sidebar'}>
                    <header>
                        <span>방 정보</span>
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <a href="/#/" onClick={(e) => profileActions(e)}
                                   className="btn btn-light">
                                    <i className="ti ti-close"></i>
                                </a>
                            </li>
                        </ul>
                    </header>
                    <div className="sidebar-body">
                        <PerfectScrollbar>
                            <div className="text-center">
                                <figure className="avatar avatar-state-danger avatar-xl mb-4">
                                    <img src={chatInfo.profileImageUrl} id="profile-avatar" className="rounded-circle" alt="avatar"/>
                                </figure>
                                <h5 className="text-primary mb-1">{chatInfo.name}</h5>
                                <small className="text-muted">계정 생성일: {chatInfo.createdAt}</small><br/>
                                <small className="text-muted">최근 로그인: {chatInfo.lastLoginAt}</small>
                            </div>
                            <hr/>
                            <div className="pl-4 pr-4">
                                <h6>인원 수</h6>
                                <p className="text-muted">{chatInfo.headcount} 명</p>
                            </div>
                            <div className="pl-4 pr-4">
                                <h6>참여자 정보</h6>
                                {
                                    chatInfo.otherParticipantNo.map(participant => {
                                        return (
                                            <span>
                                                <img src={participant.User.profileImageUrl} id="profile-avatar" className={"rounded-circle"} alt="avatar" style={{float: 'left'}}/>
                                                <p className="text-muted">{'     '+participant.User.name}</p>
                                            </span>
                                        );
                                    })
                                }
                            </div>
                            <div className="pl-4 pr-4">
                                <h6>휴대폰</h6>
                                <p className="text-muted">{chatInfo.phoneNumber}</p>
                            </div>

                            {/*/!*<hr/>*/}
                        <div className="pl-4 pr-4">
                            <h6>Media</h6>
                            <PerfectScrollbar>
                                <div className="files">
                                    <ul className="list-inline">
                                        <li className="list-inline-item">
                                            <a href="/#/">
                                                <figure className="avatar avatar-lg">
                                                    <span className="avatar-title bg-warning">
                                                        <i className="fa fa-file-pdf-o"></i>
                                                    </span>
                                                </figure>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="/#/">
                                                <figure className="avatar avatar-lg">
                                                    <span className="avatar-title bg-success">
                                                        <i className="fa fa-file-excel-o"></i>
                                                    </span>
                                                </figure>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="/#/">
                                                <figure className="avatar avatar-lg">
                                                    <span className="avatar-title bg-info">
                                                        <i className="fa fa-file-text-o"></i>
                                                    </span>
                                                </figure>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </PerfectScrollbar>
                        </div>
                        <hr/>
                        <div className="pl-4 pr-4">
                            <h6>Social Links</h6>
                            <ul className="list-inline social-links">
                                <li className="list-inline-item">
                                    <a href="/#/" className="btn btn-sm btn-floating btn-facebook">
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="/#/" className="btn btn-sm btn-floating btn-twitter">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="/#/" className="btn btn-sm btn-floating btn-dribbble">
                                        <i className="fa fa-dribbble"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="/#/" className="btn btn-sm btn-floating btn-whatsapp">
                                        <i className="fa fa-whatsapp"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="/#/" className="btn btn-sm btn-floating btn-linkedin">
                                        <i className="fa fa-linkedin"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="/#/" className="btn btn-sm btn-floating btn-google">
                                        <i className="fa fa-google"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="/#/" className="btn btn-sm btn-floating btn-behance">
                                        <i className="fa fa-behance"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="/#/" className="btn btn-sm btn-floating btn-instagram">
                                        <i className="fa fa-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <hr/>
                        {/*    */}
                        {/*<div className="pl-4 pr-4">*/}
                        {/*    <div className="form-group">*/}
                        {/*        <div className="form-item custom-control custom-switch">*/}
                        {/*            <input type="checkbox" className="custom-control-input" id="customSwitch11"/>*/}
                        {/*            <label className="custom-control-label" htmlFor="customSwitch11">Block</label>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className="form-group">*/}
                        {/*        <div className="form-item custom-control custom-switch">*/}
                        {/*            <input type="checkbox" className="custom-control-input" defaultChecked*/}
                        {/*                   id="customSwitch12"/>*/}
                        {/*            <label className="custom-control-label" htmlFor="customSwitch12">Mute</label>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className="form-group">*/}
                        {/*        <div className="form-item custom-control custom-switch">*/}
                        {/*            <input type="checkbox" className="custom-control-input" id="customSwitch13"/>*/}
                        {/*            <label className="custom-control-label" htmlFor="customSwitch13">Get*/}
                        {/*                notification</label>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        </PerfectScrollbar>
                    </div>
            </div>
        </div>
    )}

export default ChatProfile
