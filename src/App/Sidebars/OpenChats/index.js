import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Tooltip} from 'reactstrap'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import ChatsDropdown from "./ChatsDropdown"
import {sidebarAction} from "../../../Store/Actions/sidebarAction"
import fetchApi from "../../Module/fetchApi";
import {mobileSidebarAction} from "../../../Store/Actions/mobileSidebarAction";
import {participantNoAction} from "../../../Store/Actions/participantNoAction";
import {reloadAction} from "../../../Store/Actions/reloadAction";
import AddOpenChatModal from "../../Modals/AddOpenChatModal";
import OpenChatPasswordModal from "../../Modals/OpenChatPasswordModal";
import {joinRoomAction} from "../../../Store/Actions/joinRoomAction";
import {profileAction} from "../../../Store/Actions/profileAction";
import {mobileProfileAction} from "../../../Store/Actions/mobileProfileAction";
import {profileInfoAction} from "../../../Store/Actions/profileInfoAction";
import roleStyle from "../../Module/roleStyle";

function Index({roomList, openRoomList, history,}) {
    let opacity = roleStyle().opacity()

    const dispatch = useDispatch();
    const inputRef = useRef();
    const {selectedChat} = useSelector(state => state);
    const {reload} = useSelector(state => state);
    const {participantNo} = useSelector(state => state);
    const {roomNo} = useSelector(state => state);
    const userNo = Number(localStorage.getItem("userNo"));

    const [searchTerm, setSearchTerm] = useState("");

    const [modal, setModal] = useState(false);
    const [enterPasswordChat, setEnterPasswordChat] = useState();


    let lastPage = 0;

    const mobileSidebarClose = () => {
        dispatch(mobileSidebarAction(false));
        document.body.classList.remove('navigation-open');
    };

    const chatSelectHandle = async (chat) => {
        try {
            if (chat.password) {
                setEnterPasswordChat(chat);
                setModal(!modal);
            } else {
                const result = roomList && roomList.filter(room => {
                    return (room.type === "public" || room.type === "official") && room.participantNo === chat.participantNo;
                })

                if (result.length === 0) {

                    const roomNo = chat.id
                    const participantNo = (await fetchApi(null, null).createParticipant(localStorage.getItem("userNo"), chat.id, "ROLE_MEMBER",
                        localStorage.getItem("Authorization"))).no;
                    //  dispatch(messageLengthAction(selectedChat.messages.length))
                    dispatch(participantNoAction(participantNo));
                    dispatch(reloadAction(!reload));
                    await fetchApi(null, null).updateHeadCount("join", roomNo, localStorage.getItem("Authorization"))
                } else {
                    dispatch(participantNoAction(result[0].participantNo));
                }

                dispatch(sidebarAction('Chats'));
                dispatch(joinRoomAction(true));
                console.log(" dispatch(joinRoomAction(true))")


            }
        } catch (e) {
            console.log(e.message);
            // if (e === "System Error") {
            //     history.push("/error/500") // 500 Page(DB error) // 수정 필요
            // } else {
            //     // Token 문제 발생 시 -> return null -> length error -> catch
            //     alert("Token invalid or Token expired. Please login again");
            //     history.push("/sign-in");
            //     console.log("Error : {}", e.message);
            // }
        }
    };

    const profileActions = (chat) => {
        // 개인톡(내가 방장일 경우)
        dispatch(profileInfoAction(chat.openChatHost));
        dispatch(profileAction(true));
        dispatch(mobileProfileAction(true))
    };


    const ChatListView = (props) => {
        const {chat} = props;

        return <li style={chat.password ? {color: "palevioletred"} : null}
                   className={"list-group-item " + (chat.id === selectedChat.id ? 'open-chat' : '')}>
            <div onClick={() => profileActions(chat)}>
                {chat.avatar}
            </div>
            <div className="users-list-body" onClick={() => chatSelectHandle(chat)} id={chat.id}>
                {chat.password ? <h5><i className="ti ti-key"></i> {chat.name}</h5> : <h5>{chat.name}</h5>}
                {chat.text}
            </div>
            <div className="users-list-body">
                <div className="users-list-action action-toggle">
                    {/*{chat.unread_messages ? <div className="new-message-count">{chat.unread_messages}</div> : ''}*/}
                    <ChatsDropdown chat={chat}/>
                </div>
            </div>
        </li>
    };

    return (
        <div className="sidebar active">
            <header>
                <span>오픈 채팅</span>
                <OpenChatPasswordModal modal={modal} setModal={setModal} enterPasswordChat={enterPasswordChat}
                                       roomList={roomList}/>
                <ul className="list-inline">
                    {/*<li className="list-inline-item">*/}
                    {/*    <button onClick={() => dispatch(sidebarAction('Open-chat'))} className="btn btn-light"*/}
                    {/*            id="Tooltip-New-Chat">*/}
                    {/*        <i className="ti ti-comment-alt"></i>*/}
                    {/*    </button>*/}
                    {/*    <Tooltip*/}
                    {/*        isOpen={tooltipOpen}*/}
                    {/*        target={"Tooltip-New-Chat"}*/}
                    {/*        toggle={toggle}>*/}
                    {/*        오픈 채팅*/}
                    {/*    </Tooltip>*/}
                    {/*</li>*/}
                    <li className="list-inline-item" style={opacity}>
                        <AddOpenChatModal/>
                        {/*<AddGroupModal friendList={friendList}/>*/}
                    </li>
                    {/*<li className="list-inline-item">*/}
                    {/*    <button onClick={() => dispatch(sidebarAction('Friends'))} className="btn btn-light"*/}
                    {/*            id="Tooltip-New-Chat">*/}
                    {/*        <i className="ti ti-comment-alt"></i>*/}
                    {/*    </button>*/}
                    {/*    <Tooltip*/}
                    {/*        isOpen={tooltipOpen}*/}
                    {/*        target={"Tooltip-New-Chat"}*/}
                    {/*        toggle={toggle}>*/}
                    {/*        친구 초대*/}
                    {/*    </Tooltip>*/}
                    {/*</li>*/}
                    <li className="list-inline-item d-xl-none d-inline">
                        <button onClick={mobileSidebarClose} className="btn btn-light">
                            <i className="ti ti-close"></i>
                        </button>
                    </li>
                </ul>
            </header>
            <form>
                <input type="text" className="form-control" placeholder="Search chat" ref={inputRef} onChange={e => {
                    setSearchTerm(e.target.value)
                }}/>
            </form>
            <div className="sidebar-body">
                <PerfectScrollbar>
                    <ul className="list-group list-group-flush">
                        <p style={{
                            color: "black",
                            marginLeft: 25,
                        }}>오픈채팅방</p>
                        {openRoomList.filter((chat) => {
                            if (searchTerm == "") {
                                return chat
                            } else if (chat.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return chat
                            }
                        }).map((chat, i) => <ChatListView chat={chat} key={i}/>)
                        }
                    </ul>
                </PerfectScrollbar>
            </div>
        </div>
    )
}

export default Index