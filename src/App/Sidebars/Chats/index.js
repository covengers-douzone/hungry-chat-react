import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Tooltip} from 'reactstrap'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import AddGroupModal from "../../Modals/AddGroupModal"
import ChatsDropdown from "./ChatsDropdown"
import {sidebarAction} from "../../../Store/Actions/sidebarAction"
//import {chatLists} from "./Data";
import fetchApi from "../../Module/fetchApi";
import {mobileSidebarAction} from "../../../Store/Actions/mobileSidebarAction";
import {selectedChatAction} from "../../../Store/Actions/selectedChatAction";
import {messageLengthAction} from "../../../Store/Actions/messageLengthAction";
import io from "socket.io-client"
import {roomNoAction} from "../../../Store/Actions/roomNoAction";
import {participantNoAction} from "../../../Store/Actions/participantNoAction";
import * as config from  "../../../config/config"
import {headCountAction} from "../../../Store/Actions/headCountAction";

function Index({roomList, userNo, history}) {


    // const socket = io.connect("http://192.168.254.8:9999", {transports: ['websocket']});

    const dispatch = useDispatch();

    const inputRef = useRef();

    const {selectedChat} = useSelector(state => state);

    const {participantNo} = useSelector(state => state);

    const {roomNo} = useSelector(state => state);

    let headCount;

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const [chatList, setChatList] = useState([]);


    const toggle = () => setTooltipOpen(!tooltipOpen);


    useEffect(() => {
        inputRef.current.focus();
    });

    const callback =  async ({socketUserNo, text, data, notReadCount , chatNo}) => {
        console.log('--->callback', selectedChat.messages.length); //[] -> {}
        socketUserNo === userNo && selectedChat.messages && selectedChat.messages.push({
            userNo, text, data, notReadCount, type: "outgoing-message"
        })
        socketUserNo !== userNo && selectedChat.messages && selectedChat.messages.push({
            userNo, text, data, notReadCount
        })


       fetchApi(null,null).updateSendNotReadCount(chatNo);

        dispatch(messageLengthAction(selectedChat.messages.length)) // 메세지보내면 렌더링 시킬려고




        

    }


    useEffect(() => {
        if (!selectedChat || (Array.isArray(selectedChat) && !selectedChat.length)) {
            return;
        }

        const socket = io.connect(`${config.SOCKET_IP}:${config.SOCKET_PORT}`, {transports: ['websocket']});

        socket.emit("join", {
            nickName: selectedChat.name,
            roomNo: selectedChat.id,
        }, async (response) => {
            console.log("join res ", response.status)
            response.status === 'ok' && await fetchApi(null, null).setStatus(selectedChat.participantNo, 1, localStorage.getItem("Authorization"))
            dispatch(headCountAction(await fetchApi(null,null).getHeadCount(participantNo,localStorage.getItem("Authorization") )))
            console.log("headCount" , headCount)



        });
        socket.on('message', callback);

        return () => {
            if (roomNo) {
                console.log("방 나가기")
                fetchApi(null, null).setStatus(participantNo, 0);
                socket.disconnect();
            }
        }

    }, [selectedChat]);

    const mobileSidebarClose = () => {
        dispatch(mobileSidebarAction(false));
        document.body.classList.remove('navigation-open');
    };


    const chatSelectHandle = async (chat) => {
        try{
            const chatlist = await fetchApi(chatList, setChatList).getChatList(chat.id, localStorage.getItem("Authorization"))
            if (chatlist === "System Error"){
               throw chatlist;
            }
            let room;
            if (chatlist.length !== 0) {
                room = roomList.filter(room => room.id === chatlist[0].roomNo);
            }

            if (room && room.length) {
                room[0].messages = chatlist.map(chat => {
                    if (chat.Participant.no !== Number(userNo)) {
                        return ({
                            text: chat.contents,
                            date: chat.createdAt
                        })
                    } else {
                        return ({
                            text: chat.contents,
                            date: chat.createdAt,
                            type: 'outgoing-message'
                        })
                    }
                });

            }


            chat.unread_messages = 0;

            dispatch(participantNoAction(chat.participantNo))
            dispatch(roomNoAction(chat.id))
            if (chat.messages) {
                dispatch(messageLengthAction(chat.messages.length))
            }

            dispatch(selectedChatAction(chat));
            dispatch(mobileSidebarAction(false));

        } catch (e){
            if(e === "System Error"){
                history.push("/error/500") // 500 Page(DB error) // 수정 필요
            } else {
                // Token 문제 발생 시 -> return null -> length error -> catch
                alert("Token invalid or Token expired. Please login again");
                history.push("/sign-in");
                console.log("Error : {}", e.message);
            }
        }
    };

    const ChatListView = (props) => {
        const {chat} = props;

        return <li className={"list-group-item " + (chat.id === selectedChat.id ? 'open-chat' : '')}
                   onClick={() => chatSelectHandle(chat)}>
            {chat.avatar}
            <div className="users-list-body">
                <h5>{chat.name}</h5>
                {chat.text}
                <div className="users-list-action action-toggle">
                    {chat.unread_messages ? <div className="new-message-count">{chat.unread_messages}</div> : ''}
                    <ChatsDropdown/>
                </div>
            </div>
        </li>
    };

    return (
        <div className="sidebar active">
            <header>
                <span>Chats</span>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <AddGroupModal userNo = {userNo}/>
                    </li>
                    <li className="list-inline-item">
                        <button onClick={() => dispatch(sidebarAction('Friends'))} className="btn btn-light"
                                id="Tooltip-New-Chat">
                            <i className="ti ti-comment-alt"></i>
                        </button>
                        <Tooltip
                            isOpen={tooltipOpen}
                            target={"Tooltip-New-Chat"}
                            toggle={toggle}>
                            New chat
                        </Tooltip>
                    </li>
                    <li className="list-inline-item d-xl-none d-inline">
                        <button onClick={mobileSidebarClose} className="btn btn-light">
                            <i className="ti ti-close"></i>
                        </button>
                    </li>
                </ul>
            </header>
            <form>
                <input type="text" className="form-control" placeholder="Search chat" ref={inputRef}/>
            </form>
            <div className="sidebar-body">
                <PerfectScrollbar>
                    <ul className="list-group list-group-flush">{
                        roomList.map((chat, i) => <ChatListView chat={chat} key={i}/>)
                    }
                    </ul>
                </PerfectScrollbar>
            </div>
        </div>
    )
}

export default Index