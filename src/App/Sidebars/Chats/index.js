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
import * as config from "../../../config/config"
import {headCountAction} from "../../../Store/Actions/headCountAction";

function Index({roomList, friendList, userNo, history,}) {

    // const socket = io.connect("http://192.168.254.8:9999", {transports: ['websocket']});

    const dispatch = useDispatch();

    const inputRef = useRef();

    const {selectedChat} = useSelector(state => state);

    const {participantNo} = useSelector(state => state);

    const {roomNo} = useSelector(state => state);

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const [chatList, setChatList] = useState([]);

    const [roomOk , setRoomOk] = useState(false);

    const chatForm = (chat) => {
        const chatMessage = {
            text: chat.contents,
            date: chat.createdAt,
            notReadCount: chat.notReadCount,
        }
        if (chat.Participant.no !== Number(participantNo)) {
            return chatMessage;
        } else {
            chatMessage.type = 'outgoing-message'
            return chatMessage;
        }
    }


    const toggle = () => setTooltipOpen(!tooltipOpen);


    useEffect(() => {
        inputRef.current.focus();
    });

    const callback = async ({socketUserNo, chatNo}) => {
        await fetchApi(null, null).updateSendNotReadCount(chatNo);

        const chat = await fetchApi(null,null).getChat(chatNo,localStorage.getItem("Authorization"));

        const message ={
            userNo , text: chat.contents ,date: chat.createdAt , notReadCount: chat.notReadCount
        }
        Number(socketUserNo) === Number(participantNo) && selectedChat.messages && (message.type = "outgoing-message");

        selectedChat.messages && selectedChat.messages.push(message);

        console.log(message)
        dispatch(messageLengthAction(selectedChat.messages.length)) // 메세지보내면 렌더링 시킬려고
    }

    setTimeout(async () => {
        if (!selectedChat || (Array.isArray(selectedChat) && !selectedChat.length)) {
            return;
        } else {
            console.log("", selectedChat.messages[selectedChat.messages.length - 1])
            if (selectedChat.messages[selectedChat.messages.length - 1] === 0) { // 마지막 메시지가 0 이라면

            }
        }

    }, 3000)

    useEffect(() => {
        if (!selectedChat || (Array.isArray(selectedChat) && !selectedChat.length)) {
            return;
        }

        const socket = io.connect(`${config.SOCKET_IP}:${config.SOCKET_PORT}`, {transports: ['websocket']});

        socket.on('roomUsers',async ({room,users})=>{
            setTimeout(async () => {
                // 새로운 유저 왔을 때
                if(users[users.length -1].id !== socket.id){
                    // chat list update
                    const chatlist = await fetchApi(chatList, setChatList).getChatList(selectedChat.id, localStorage.getItem("Authorization"))
                    const chats = chatlist.map(chatForm);
                    selectedChat.messages = chats;
                    dispatch(messageLengthAction(selectedChat.messages.length - 1))
                }
            } , 1000)

        })
        socket.emit("join", {
            nickName: selectedChat.name,
            roomNo: selectedChat.id,
        }, async (response) => {
            if(response.status === 'ok'){
                // update status
                await fetchApi(null, null).setStatus(selectedChat.participantNo, 1, localStorage.getItem("Authorization"))
                // update notReadCount
                await fetchApi(null, null).updateRoomNotReadCount(participantNo, roomNo, localStorage.getItem("Authorization"))
                // set headCount(입장한 방)
                dispatch(headCountAction(await fetchApi(null, null).getHeadCount(participantNo, localStorage.getItem("Authorization"))))
                // chat list 불러오기
                const chatlist = await fetchApi(chatList, setChatList).getChatList(selectedChat.id, localStorage.getItem("Authorization"))
                const chats = chatlist.map(chatForm);
                selectedChat.messages = chats;
                dispatch(messageLengthAction(selectedChat.messages.length - 1))
            }
        });
        socket.on('message', callback);

        return async () => {  // 방을 나갔을 경우  소켓을 닫고 해당 participantNo LastReadAt를 업데이트 시킨다
            if (roomNo) {
                console.log("방나가기")
                await fetchApi(null, null).setStatus(participantNo, 0, localStorage.getItem("Authorization"));
                await fetchApi(null, null).updateLastReadAt(participantNo, localStorage.getItem("Authorization"))
                socket.disconnect();
            }
        }

    }, [selectedChat]);

    const mobileSidebarClose = () => {
        dispatch(mobileSidebarAction(false));
        document.body.classList.remove('navigation-open');
    };


    const chatSelectHandle = async (chat) => {
        try {
            chat.unread_messages = 0
            dispatch(participantNoAction(chat.participantNo))
            dispatch(roomNoAction(chat.id))
            if (chat.messages) {
                dispatch(messageLengthAction(chat.messages.length))
            }
            dispatch(selectedChatAction(chat));
            dispatch(mobileSidebarAction(false));

        } catch (e) {
            if (e === "System Error") {
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
                        <AddGroupModal userNo={userNo} friendList={friendList}/>
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