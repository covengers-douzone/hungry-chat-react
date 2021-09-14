import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'
import {profileAction} from "../../Store/Actions/profileAction"
import {mobileProfileAction} from "../../Store/Actions/mobileProfileAction";
import axios from "axios";
import {reloadAction} from "../../Store/Actions/reloadAction";
import {sidebarAction} from "../../Store/Actions/sidebarAction";
import * as config from "../../config/config";
import {mobileSidebarAction} from "../../Store/Actions/mobileSidebarAction";
import {participantNoAction} from "../../Store/Actions/participantNoAction";
import {roomNoAction} from "../../Store/Actions/roomNoAction";
import {selectedChatAction} from "../../Store/Actions/selectedChatAction";
import {chatProfileAction} from "../../Store/Actions/chatProfileAction";
//import {mobileChatProfileAction} from "../../Store/Actions/mobileChatProfileAction";
import {roomTypeAction} from "../../Store/Actions/roomTypeAction";
import fetchApi from "../Module/fetchApi";

function ChatHeader(props) {

    const dispatch = useDispatch();
    const {profileInfo} = useSelector(state => state);
    const {reload} = useSelector(state => state);
    const {roomNo} = useSelector(state=>state)
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    // const profileActions = () => {
    //     dispatch(profileAction(true));
    //     dispatch(mobileProfileAction(true))
    // };

    const chatProfileActions = () => {
        dispatch(chatProfileAction(true));
        //dispatch(mobileChatProfileAction(true));
    }

    const chatDeleteAction = async () => {
        try {
            await axios.post(`${config.URL}/api/deleteChat`, {
                openChatHostCheck: profileInfo.openChatHostCheck,
                participantNo: profileInfo.participantNo,
                roomNo: profileInfo.id,
                Authorization: localStorage.getItem("Authorization"),
            }).then(res => {
                fetchApi(null, null).updateHeadCount("exit",roomNo, localStorage.getItem("Authorization"))
                dispatch(reloadAction(!reload));
                dispatch(participantNoAction(false))
                dispatch(roomNoAction(false))
                dispatch(roomTypeAction(false))
                dispatch(selectedChatAction(false));
                dispatch(sidebarAction('Chat'));

            }).catch(err => {
                console.log(`${err.message}`)
            })
        } catch (e) {
            console.log(e.message);
        }
        dispatch(reloadAction(!reload));
    }


    return (
        <div className="chat-header">
            <div className="chat-header-user">
                {props.selectedChat.avatar}
                <div>
                    <h5>{props.selectedChat.name}</h5>
                    <small className="text-muted">
                        <i>온라인</i>
                    </small>
                </div>
            </div>
            <div className="chat-header-action">
                <ul className="list-inline">

                    {/*<li className="list-inline-item">*/}
                    {/*    <VoiceCallModal/>*/}
                    {/*</li>*/}
                    {/*<li className="list-inline-item">*/}
                    {/*    <VideoCallModal/>*/}
                    {/*</li>*/}

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
                                {/*<DropdownItem onClick={profileActions} title="프로필">프로필</DropdownItem>*/}
                                <DropdownItem divider/>
                                <DropdownItem onClick={chatDeleteAction} title="채팅방나가기" style={{color:"deeppink"}}>채팅방 나가기</DropdownItem>
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
