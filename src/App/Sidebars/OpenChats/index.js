import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Tooltip} from 'reactstrap'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
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
import {reloadAction} from "../../../Store/Actions/reloadAction";
import AddOpenChatModal from "../../Modals/AddOpenChatModal";
import AddGroupModal from "../../Modals/AddGroupModal";
import {chatForm,chatMessageForm} from "../../Module/chatForm";
import {lastReadNoAction} from "../../../Store/Actions/lastReadNoAction";
import {messageAllLengthAction} from "../../../Store/Actions/messageAllLengthAction";
import {joinOKAction} from "../../../Store/Actions/joinOKAction";
import fetchList from "../../Module/fetchList";

function Index({roomList, friendList, userNo, history,}) {

    // const socket = io.connect("http://192.168.254.8:9999", {transports: ['websocket']});

    const dispatch = useDispatch();

    const inputRef = useRef();

    const {selectedChat} = useSelector(state => state);

    const {participantNo} = useSelector(state => state);

    const {roomNo} = useSelector(state => state);

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const [chatList, setChatList] = useState([]);

    const [joinOk  , setJoinOk] = useState(true)

    const {reload} = useSelector(state => state);

    let lastPage = 0;

    const toggle = () => setTooltipOpen(!tooltipOpen);


    // useEffect(() => {
    //     inputRef.current.focus();
    // });

    const callback = async ({socketUserNo, chatNo}) => {
        await fetchApi(null, null).updateSendNotReadCount(chatNo);

        const chat = await fetchApi(null,null).getChat(chatNo,localStorage.getItem("Authorization"));

        const message = chatMessageForm(chat);
        message.userNo = userNo;

        Number(socketUserNo) === Number(participantNo) && selectedChat.messages && (message.type = "outgoing-message");

        selectedChat.messages && selectedChat.messages.push(message);

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

        socket.on('roomUsers', async ({room, users}) => {
            setTimeout(async () => {
                // 새로운 유저 왔을 때
                if (users[users.length - 1].id !== socket.id) {
                    // chat list update
                    const chatlist = await fetchApi(chatList, setChatList).getChatList(selectedChat.id, lastPage, config.CHAT_LIMIT, localStorage.getItem("Authorization"))
                    const chats = chatlist.map((chat) => chatForm(chat,participantNo));
                    selectedChat.messages = chats;
                    dispatch(messageLengthAction(selectedChat.messages.length - 1))
                }
            }, 1000)

        })
        socket.emit("join", {
            nickName: selectedChat.name,
            roomNo: selectedChat.id,
            participantNo: selectedChat.participantNo
        }, async (response) => {
            if (response.status === 'ok') {
                // update status
               await fetchApi(null, null).setStatus(selectedChat.participantNo, 1, localStorage.getItem("Authorization"))

               const lastReadNo = await fetchApi(null, null).getLastReadNo(participantNo, localStorage.getItem("Authorization"))
               dispatch(lastReadNoAction(lastReadNo))

               const lastReadNoCount = await fetchApi(null, null).getLastReadNoCount(participantNo, localStorage.getItem("Authorization"))

               // update notReadCount
               await fetchApi(null, null).updateRoomNotReadCount(participantNo, roomNo, localStorage.getItem("Authorization"))
               // set headCount(입장한 방)s
               dispatch(headCountAction(await fetchApi(null, null).getHeadCount(participantNo, localStorage.getItem("Authorization"))))

               //쳇 리스트 갯수 구하기
               const chatListCount = await fetchApi(chatList, setChatList).getChatListCount(selectedChat.id, localStorage.getItem("Authorization"))

               // lastPage가 -로 들어 갈때 처리 해주는 조건문
               if (chatListCount.count < config.CHAT_LIMIT || chatListCount >= 0) {
                   lastPage = 0;
               } else {
                   lastPage = chatListCount.count - config.CHAT_LIMIT
               }


               //  마지막 읽은 메세지가 존재 한다면  그 메시지 위치까지 페이징 시킨다 , 없다면  5개의 마지막 메시지만 보이게 한다.
               if (lastReadNoCount && lastReadNoCount.count !== 0) {
                   console.log("chatListCount.count", chatListCount.count)
                   console.log("lastReadNoCount.count", lastReadNoCount.count)
                   const chatlist = await fetchApi(chatList, setChatList).getChatList(selectedChat.id, chatListCount.count - lastReadNoCount.count, lastReadNoCount.count, localStorage.getItem("Authorization"))


                   const chats = chatlist.map(chatForm);
                   selectedChat.messages = chats;
               } else {
                   const chatlist = await fetchApi(chatList, setChatList).getChatList(selectedChat.id, lastPage, config.CHAT_LIMIT, localStorage.getItem("Authorization"))
                   const chats = chatlist.map(chatForm);
                   selectedChat.messages = chats;
               }


               // selectedChat.messages = chats;

               dispatch(messageAllLengthAction(chatListCount))
               dispatch(messageLengthAction(selectedChat.messages.length - 1))
               setJoinOk(!joinOk)
               dispatch(joinOKAction(joinOk))
            }
        });
        socket.on('message', callback);

        return async () => {  // 방을 나갔을 경우  소켓을 닫고 해당 participantNo LastReadAt를 업데이트 시킨다
            if (roomNo) {
                console.log("방나가기")
                const results = await fetchList(localStorage.getItem("Authorization")).leftRoom(selectedChat.participantNo);
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
            chat.unread_messages = 1
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
                {/*<div className="users-list-action action-toggle">*/}
                    {/*{chat.unread_messages ? <div className="new-message-count">{chat.unread_messages}</div> : ''}*/}
                    {/*<ChatsDropdown/>*/}
                {/*</div>*/}
            </div>
        </li>
    };

    return (
        <div className="sidebar active" style={{backgroundColor:"lightpink"}}>
            <header>
                <span>오픈 채팅</span>
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
                    <li className="list-inline-item">
                        <AddOpenChatModal userNo={userNo}/>
                        {/*<AddGroupModal userNo={userNo} friendList={friendList}/>*/}
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