import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'
import axios from "axios";
import {reloadAction} from "../../Store/Actions/reloadAction";
import {sidebarAction} from "../../Store/Actions/sidebarAction";
import * as config from "../../config/config";
import {participantNoAction} from "../../Store/Actions/participantNoAction";
import {roomNoAction} from "../../Store/Actions/roomNoAction";
import {selectedChatAction} from "../../Store/Actions/selectedChatAction";
import {chatProfileAction} from "../../Store/Actions/chatProfileAction";
import {mobileChatProfileAction} from "../../Store/Actions/mobileChatProfileAction";
import CalendarModal from "../Modals/CalendarModal";


import {roomTypeAction} from "../../Store/Actions/roomTypeAction";
import fetchApi from "../Module/fetchApi";
import CodeBlockModal from "../Modals/CodeBlockModal";
import {MdCheckBox} from "react-icons/all";
import {markDownAction} from "../../Store/Actions/markDownAction";

function ChatHeader(props) {

    const dispatch = useDispatch();
    const {profileInfo} = useSelector(state => state);
    const {reload} = useSelector(state => state);
    const {roomNo} = useSelector(state=>state)
    const {userNo} = useSelector(state=>state)
    const {selectedChat, currentOnlineRoomUsers, participantNo, currentOnlineUsers } = useSelector(state=>state);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [otherParticipantStatus, setOtherParticipantStatus] = useState(false);
    const [rerender, setRerender] = useState(false);

    const {markDown} = useSelector(state => state);


    const [calenderModalOpen, setCalendarModalOpen] = useState(false);

    const calenderModalToggle = () => setCalendarModalOpen(prevState => !prevState);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const chatProfileActions = () => {
        dispatch(chatProfileAction(true));
        dispatch(mobileChatProfileAction(true));
    }

    const handleChecked = (e) => {
        dispatch(markDownAction(!markDown))

    }



    const chatDeleteAction = async () => {
        try {
            await axios.post(`${config.URL}/api/deleteChat`, {
                openChatHostCheck: profileInfo.openChatHostCheck,
                participantNo: profileInfo.participantNo,
                roomNo: profileInfo.id,
                Authorization: localStorage.getItem("Authorization"),
            }).then(async res => {
                await fetchApi(null, null).updateHeadCount("exit", roomNo, localStorage.getItem("Authorization"))
                dispatch(reloadAction(!reload));
                dispatch(participantNoAction(false))
                dispatch(roomNoAction(false))
                dispatch(roomTypeAction(false))
                dispatch(selectedChatAction(false));
                dispatch(sidebarAction('Chats'));
            }).catch(err => {
                console.log(`${err.message}`)
            })
        } catch (e) {
            console.log(e.message);
        }
        dispatch(reloadAction(!reload));
    }

    useEffect(()=> {
        let status = false;
        currentOnlineRoomUsers && currentOnlineRoomUsers.map(user => {
            // ??? ?????? ?????? ????????? ?????????
            if(Number(user.participantNo) !== Number(participantNo)){
                status = true;
            }
        })
        setOtherParticipantStatus(status);
    },[currentOnlineRoomUsers])

    useEffect(()=>{

        if(selectedChat.headcount < 3 && selectedChat.type === 'private'){
            let status = false;

            currentOnlineUsers && currentOnlineUsers.users.map(currentUser => {
                if(Number(currentUser.userLocalStorage.userNo) === Number(selectedChat.otherParticipant[0].User.no)){
                    status = true;
                }
            })

            selectedChat.avatar = (<figure className={status ? "avatar avatar-state-success" : "avatar"}>
                                        <img src={selectedChat.avatar.props.children.props.src}
                                             className="rounded-circle" alt="avatar"/>
                                    </figure>)

            setRerender(!rerender);
        }

    },[currentOnlineUsers]);

    return (

        <div className="chat-header">
            <div className="chat-header-user">
                {selectedChat.avatar}
                <div>
                    <h5>{selectedChat.name}</h5>
                    {/* 1:1 ???????????? ?????? ?????????, ???????????? ?????? ????????? */}
                    {
                        selectedChat.type === 'private' && selectedChat.headcount === 2 ?
                            <small className="text-muted">
                                {
                                    otherParticipantStatus ? <i className={'text-primary'}>????????? ?????? ???</i> : null
                                }
                            </small>
                        : null
                    }
                </div>
            </div>
            <div className="chat-header-action">
                <ul className="list-inline">
                    {/*<CalendarModal modal={calenderModalOpen} toggle={calenderModalToggle} />*/}
                    {/*<li className="list-inline-item">*/}
                    {/*    <VoiceCallModal/>*/}
                    {/*</li>*/}
                    <li className="list-inline-item">
                        <input type="checkbox" checked={markDown} onChange={handleChecked}/> ???????????? ON/OFF

                    </li>

                    <li className="list-inline-item" data-toggle="tooltip">
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle
                                tag="span"
                                data-toggle="dropdown"
                                aria-expanded={dropdownOpen}
                            >
                                <button className="btn btn-secondary">
                                    <i className="ti ti-more"></i>
                                </button>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={chatProfileActions} title="?????????">????????? ??????</DropdownItem>
                                <DropdownItem divider/>

                                <DropdownItem onClick={() => {
                                    toggle()
                                    setCalendarModalOpen(true)}} title="??????">
                                    <CalendarModal roomNo={roomNo} modal={calenderModalOpen} toggle={calenderModalToggle}/>
                                    <i className="ti ti-calendar" style={{paddingRight:8}}></i>
                                    ??????
                                </DropdownItem>

                                <DropdownItem divider/>
                                <DropdownItem onClick={chatDeleteAction} title="??????????????????" style={{color:"deeppink"}}>????????? ?????????</DropdownItem>

                                {/*<DropdownItem onClick={profileActions} title="?????????">?????????</DropdownItem>*/}
                                {/*<DropdownItem>Add to archive</DropdownItem>*/}
                                {/*<DropdownItem>Delete</DropdownItem>*/}
                                {/*<DropdownItem>Block</DropdownItem>*/}
                            </DropdownMenu>
                        </Dropdown>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ChatHeader
