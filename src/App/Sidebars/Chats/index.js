import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Tooltip} from 'reactstrap'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import AddGroupModal from "../../Modals/AddGroupModal"
import ChatsDropdown from "./ChatsDropdown"
import {sidebarAction} from "../../../Store/Actions/sidebarAction"
import {chatInfoAction} from "../../../Store/Actions/chatInfoAction";
//import {chatLists} from "./Data";
import fetchApi from "../../Module/fetchApi";
import fetchList from "../../Module/fetchList";
import {mobileSidebarAction} from "../../../Store/Actions/mobileSidebarAction";
import {selectedChatAction} from "../../../Store/Actions/selectedChatAction";
import {messageLengthAction} from "../../../Store/Actions/messageLengthAction";
import io from "socket.io-client"
import {roomNoAction} from "../../../Store/Actions/roomNoAction";
import {participantNoAction} from "../../../Store/Actions/participantNoAction";
import * as config from "../../../config/config"
import {headCountAction} from "../../../Store/Actions/headCountAction";
import {joinRoomAction} from "../../../Store/Actions/joinRoomAction";
import {lastReadNoAction} from "../../../Store/Actions/lastReadNoAction";
import {func} from "prop-types";
import {messageAllLengthAction} from "../../../Store/Actions/messageAllLengthAction";
import {joinOKAction} from "../../../Store/Actions/joinOKAction";
import {chatForm, chatMessageForm} from "../../Module/chatForm";
import {chatProfileAction} from "../../../Store/Actions/chatProfileAction";
import {mobileChatProfileAction} from "../../../Store/Actions/mobileChatProfileAction";
import {profileAction} from "../../../Store/Actions/profileAction";
import {mobileProfileAction} from "../../../Store/Actions/mobileProfileAction";


const Index = React.forwardRef(({
                                    roomList,
                                    friendList,
                                    history
                                }, scrollRef) => {


    // const socket = io.connect("http://192.168.254.8:9999", {transports: ['websocket']});

    const dispatch = useDispatch();

    const inputRef = useRef();

    const {selectedChat} = useSelector(state => state);
    const {participantNo} = useSelector(state => state);
    const {joinRoom} = useSelector(state => state);
    const {roomNo} = useSelector(state => state);
    const userNo = Number(localStorage.getItem("userNo"));

    const [tooltipOpen1, setTooltipOpen1] = useState(false);
    const [tooltipOpen2, setTooltipOpen2] = useState(false);

    const [chatList, setChatList] = useState([]);

    const [joinOk, setJoinOk] = useState(true)

    const [searchTerm, setSearchTerm] = useState("");

    let lastPage = 0

    const toggle1 = () => setTooltipOpen1(!tooltipOpen1);
    const toggle2 = () => setTooltipOpen2(!tooltipOpen2);

    const callback = async ({socketUserNo, chatNo}) => {

        //await fetchList(localStorage.getItem("Authorization")).receiveChat(chatNo);

        await fetchApi(null, null).updateSendNotReadCount(chatNo);

        // 챗 no값을 통해 리스트를 불러 온다
        const chat = await fetchApi(null, null).getChat(chatNo, localStorage.getItem("Authorization"));

        // message {} 에   chat에 대한 정보를 입력한다 , 단 chat.Participant.no를 사용 할 수 없다. 그래서 chat.participantNo 값을 통해 데이터를 Insert한다.
        const message = chatMessageForm(chat);
        message.userNo = userNo;

        Number(socketUserNo) === Number(participantNo) && selectedChat.messages && (message.type = "outgoing-message");

        selectedChat.messages && selectedChat.messages.push(message);

        console.log(message)
        dispatch(messageLengthAction(selectedChat.messages.length)) // 메세지보내면 렌더링 시킬려고
    }

    setTimeout(async () => {
        if (!selectedChat || (Array.isArray(selectedChat) && !selectedChat.length)) {
            return;
        } else {
            if (selectedChat.messages[selectedChat.messages.length - 1] === 0) { // 마지막 메시지가 0 이라면

            }
        }

    }, 3000)


    const handleCheck = (e) => {

    }


    useEffect(() => {
        if (!selectedChat || (Array.isArray(selectedChat) && !selectedChat.length)) {
            return;
        }

        const socket = io.connect(`${config.SOCKET_IP}:${config.SOCKET_PORT}`, {transports: ['websocket']});

        // 새로운 유저가 들어 왔을떄 Read 값을 변경 시키기 위해 제작,
        socket.on('roomUsers', async ({room, users}) => {
            setTimeout(async () => {
                // 새로운 유저 왔을 때
                if (users[users.length - 1].id !== socket.id) {
                    // chat list update
                    const chatlist = await fetchApi(chatList, setChatList).getChatList(selectedChat.id, lastPage, config.CHAT_LIMIT, localStorage.getItem("Authorization"))
                    const chats = chatlist.map((chat) => chatForm(chat, participantNo));
                    selectedChat.messages = chats;
                    dispatch(messageLengthAction(selectedChat.messages.length - 1))
                }
            }, 1000)

        })

        // 모든 메세지를 삭제
        socket.on('deleteMessage' ,async ({room, users , chatNo})=>{
            setTimeout(async () => {
                // 새로운 유저 왔을 때
                // chat list updateㄴ
                const idx = selectedChat.messages.findIndex(e => e.chatNo === chatNo)
                selectedChat.messages && (selectedChat.messages.splice (idx , 1));
                dispatch(messageLengthAction(selectedChat.messages.length - 1))
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
                if(lastReadNo !== undefined){
                    dispatch(lastReadNoAction(lastReadNo))
                }
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
                    const chatlist = await fetchApi(chatList, setChatList).getChatList(selectedChat.id, chatListCount.count - lastReadNoCount.count, lastReadNoCount.count, localStorage.getItem("Authorization"))

                    const chats = chatlist.map((chat,i) => chatForm(chat,participantNo,i));
                    selectedChat.messages = chats;
                } else {
                    const chatlist = await fetchApi(chatList, setChatList).getChatList(selectedChat.id, lastPage, config.CHAT_LIMIT, localStorage.getItem("Authorization"))
                    const chats = chatlist.map((chat,i) => chatForm(chat,participantNo,i));
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
            dispatch(chatInfoAction(chat));
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
                history.push("/");
                console.log("Error : {}", e.message);
            }
        }
    };


    const profileActions = (chat) => {
        let hostProfile;
        let otherUserProfile;
        chat.otherParticipantNo.map(participant => {
            if(participant.role === "ROLE_HOST"){
                hostProfile = participant.User
            }
            otherUserProfile = participant.User
        })
        // 개인톡(내가 방장일 경우)
        hostProfile === undefined ? dispatch(chatInfoAction(otherUserProfile)) : dispatch(chatInfoAction(hostProfile));
        dispatch(profileAction(true));
        dispatch(mobileProfileAction(true))
    };

    const ChatListView = (props) => {
        const {chat} = props;
        return <li style={ chat.type === "public" ? {color:"yellowgreen"} : null } className={"list-group-item " + (chat.id === selectedChat.id ? 'open-chat' : '')}>

            <div onClick={() => profileActions(chat)}>
                {chat.avatar}
            </div>
            <div className="users-list-body" onClick={() => chatSelectHandle(chat)} id={chat.id}
                 ref={ref => {
                     joinRoom && chat.participantNo === participantNo
                     && chatSelectHandle(chat) && dispatch(joinRoomAction(false))}}>
                <h5>{chat.name}</h5>
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
                <span>채팅</span>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <button onClick={() => dispatch(sidebarAction('Open-chat'))} className="btn btn-light"
                                id="Tooltip-New-Open-Chat">
                            <i className="ti ti-themify-favicon"></i>
                        </button>
                        <Tooltip
                            isOpen={tooltipOpen1}
                            target={"Tooltip-New-Open-Chat"}
                            toggle={toggle1}>
                            오픈 채팅
                        </Tooltip>
                    </li>
                    <li className="list-inline-item">
                        <AddGroupModal friendList={friendList}/>
                    </li>
                    <li className="list-inline-item">
                        <button onClick={() => dispatch(sidebarAction('Friends'))} className="btn btn-light"
                                id="Tooltip-New-Chat">
                            <i className="ti ti-comment-alt"></i>
                        </button>
                        <Tooltip
                            isOpen={tooltipOpen2}
                            target={"Tooltip-New-Chat"}
                            toggle={toggle2}>
                            채팅방 만들기
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

                <input
                    type="text"
                    className="form-control"
                    placeholder="채팅검색"
                    ref={inputRef}
                    onChange={e => {
                        setSearchTerm(e.target.value)
                    }}
                />
            </form>
            <div className="sidebar-body">
                <PerfectScrollbar>
                    <ul className="list-group list-group-flush">
                        <p style={ {
                            color:"coral",
                            marginLeft:25,
                        }}>{localStorage.getItem("name")}의 채팅 목록</p>
                        {roomList.filter((chat) => {
                            if(searchTerm == ""){
                                return chat
                            } else if( chat.name?.toLowerCase().includes(searchTerm.toLowerCase())){
                                return chat
                            }
                        }).map((chat, i) => {return <ChatListView chat={chat} key={i}/> })
                        }
                    </ul>
                </PerfectScrollbar>
            </div>
        </div>
    )
})

export default Index