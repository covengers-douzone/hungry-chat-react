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
            // 나 말고 다른 유저가 있다면
            if(Number(user.participantNo) !== Number(participantNo)){
                status = true;
            }
        })
        setOtherParticipantStatus(status);
    },[currentOnlineRoomUsers])

    useEffect(()=>{
        console.log('currentUsers',selectedChat.otherParticipant[0].User.no, currentOnlineUsers)

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

    },[currentOnlineUsers]);

    return (

        <div className="chat-header">
            <div className="chat-header-user">
                {selectedChat.avatar}
                <div>
                    <h5>{selectedChat.name}</h5>
                    {/* 1:1 개인톡인 경우 온라인, 오프라인 여부 알려줌 */}
                    {
                        selectedChat.type === 'private' && selectedChat.headcount === 2 ?
                            <small className="text-muted">
                                {
                                    otherParticipantStatus ? <i className={'text-primary'}>채팅방 접속</i> : <i>오프라인</i>
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
                        <input type="checkbox" checked={markDown} onChange={handleChecked}/> 마크다운 ON/OFF

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
                                <DropdownItem onClick={chatProfileActions} title="프로필">채팅방 정보</DropdownItem>
                                <DropdownItem divider/>

                                <DropdownItem onClick={() => {
                                    toggle()
                                    setCalendarModalOpen(true)}} title="일정">
                                    <CalendarModal roomNo={roomNo} modal={calenderModalOpen} toggle={calenderModalToggle}/>
                                    <i className="ti ti-calendar" style={{paddingRight:8}}></i>
                                    일정
                                </DropdownItem>

                                <DropdownItem divider/>
                                <DropdownItem onClick={chatDeleteAction} title="채팅방나가기" style={{color:"deeppink"}}>채팅방 나가기</DropdownItem>

                                {/*<DropdownItem onClick={profileActions} title="프로필">프로필</DropdownItem>*/}
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
