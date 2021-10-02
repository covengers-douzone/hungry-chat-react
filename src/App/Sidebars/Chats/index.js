import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Tooltip} from 'reactstrap'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import AddGroupModal from "../../Modals/AddGroupModal"
import ChatsDropdown from "./ChatsDropdown"
import {sidebarAction} from "../../../Store/Actions/sidebarAction"
import {profileInfoAction} from "../../../Store/Actions/profileInfoAction";
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
import {messageAllLengthAction} from "../../../Store/Actions/messageAllLengthAction";
import {joinOKAction} from "../../../Store/Actions/joinOKAction";
import {chatForm, chatFormList, chatMessageForm} from "../../Module/chatForm";
import {profileAction} from "../../../Store/Actions/profileAction";
import {mobileProfileAction} from "../../../Store/Actions/mobileProfileAction";
import {roomTypeAction} from "../../../Store/Actions/roomTypeAction";
import {reloadAction} from "../../../Store/Actions/reloadAction";
import roleStyle from "../../Module/roleStyle";
import {lastPageAction} from "../../../Store/Actions/lastPageAction";
import {currentOnlineRoomUsersAction} from "../../../Store/Actions/currentOnlineRoomUsersAction";
import {lastReadNoLengthAction} from "../../../Store/Actions/lastReadNoLengthAction";
import {sendOkAction} from "../../../Store/Actions/sendOkAction";
const Index = React.forwardRef(({
                                    roomList,
                                    friendList,
                                    handleNotReadCount,
                                    notReadCount,
                                    history
                                }, scrollRef) => {

    const dispatch = useDispatch();

    const inputRef = useRef();

    const {selectedChat} = useSelector(state => state);
    const {participantNo} = useSelector(state => state);
    const {joinRoom} = useSelector(state => state);
    const {roomNo} = useSelector(state => state);
    const {reload} = useSelector(state => state)
    const {joinOk} = useSelector(state => state);
    const {sendOk} = useSelector(state => state);
    const userNo = Number(localStorage.getItem("userNo"));

    const [tooltipOpen1, setTooltipOpen1] = useState(false);
    const [tooltipOpen2, setTooltipOpen2] = useState(false);

    const [chatList, setChatList] = useState([]);

   // const [joinOk, setJoinOk] = useState(true)

    const [searchTerm, setSearchTerm] = useState("");

    let lastPage = 0
    let opacity = roleStyle().opacity()


    const toggle1 = () => setTooltipOpen1(!tooltipOpen1);
    const toggle2 = () => setTooltipOpen2(!tooltipOpen2);

    const callback = async ({socketUserNo, chatNo}) => {
        //await fetchList(localStorage.getItem("Authorization")).receiveChat(chatNo);
        await fetchApi(null, null).updateSendNotReadCount(chatNo, localStorage.getItem("Authorization"));

        // 챗 no값을 통해 리스트를 불러 온다
        const chat = await fetchApi(null, null).getChat(chatNo, localStorage.getItem("Authorization"));

        // message {} 에   chat에 대한 정보를 입력한다 , 단 chat.Participant.no를 사용 할 수 없다. 그래서 chat.participantNo 값을 통해 데이터를 Insert한다.
        const message = chatMessageForm(chat);
        message.userNo = userNo;

        Number(socketUserNo) === Number(participantNo) && selectedChat.messages && (message.outgoing = "outgoing-message");

        selectedChat.otherParticipant.map(other => {
            if(other.no === message.participantNo){
                message.profileImageUrl = other.User.profileImageUrl;
                message.nickname = other.User.nickname;
            }
        })
        selectedChat.messages && selectedChat.messages.push(message);

        console.log('sendOk',sendOk,!sendOk);
        dispatch(sendOkAction(!sendOk));
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

        console.log('selectedChat',selectedChat);
        const socket = io.connect(`${config.SOCKET_IP}:${config.SOCKET_PORT}`, {transports: ['websocket']});

        // 새로운 유저가 들어 왔을떄 Read 값을 변경 시키기 위해 제작,
        socket.on('roomUsers', async ({room, users}) => {
            dispatch(currentOnlineRoomUsersAction(users)); // 방에 있는 다른 유저가 온라인인지 오프라인인지 알기 위함
            setTimeout(async () => {
                // 새로운 유저 왔을 때

                //console.log("selectedChat.headcount" , selectedChat.headcount)


                if (users[users.length - 1].id !== socket.id) { //  내꺼를 업데이트 시킨다.
                    // chat list update
                    // lastPage가 -로 들어 갈때 처리 해주는 조건문

                    //쳇 리스트 갯수 구하기
                    const chatListCount = await fetchApi(chatList, setChatList).getChatListCount(selectedChat.id, localStorage.getItem("Authorization"))

                    if ((chatListCount.count <= config.CHAT_LIMIT)  ) {
                        lastPage = 0;
                    } else {
                        lastPage = chatListCount.count - config.CHAT_LIMIT
                        if(lastPage < 0 ){
                            lastPage = 0
                        }
                    }

                    const chatlist = await fetchApi(chatList, setChatList).getChatList(selectedChat.id, lastPage, config.CHAT_LIMIT, localStorage.getItem("Authorization"))
                    const chats = chatFormList(chatlist,participantNo);
                    selectedChat.messages = chats;
                    selectedChat.headcount = await fetchApi(chatList, setChatList).getHeadCount(participantNo, localStorage.getItem("Authorization"))
                    dispatch(messageLengthAction(selectedChat.messages.length - 1))
                    //console.log("selectedChat.headcount", selectedChat.headcount)
                   // dispatch(reloadAction(!reload))
                }
            }, 1000)

        })

        // 모든 메세지를 삭제
        socket.on('deleteMessage', async ({room, users, chatNo}) => {
            //setTimeout(async () => {
                // chat list update
            const idx = selectedChat.messages.findIndex(e => e.chatNo === chatNo)
            selectedChat.messages && (selectedChat.messages.splice(idx, 1));
            dispatch(messageLengthAction(selectedChat.messages.length - 1))
            //}, 100)
        })
      /*  if(localStorage.getItem("role") === "ROLE_UNKNOWN"){
            socket.emit("unknown", (localStorage.getItem("userNo")) , false)
        }*/

        socket.emit("joinParticipant", {
            nickName: selectedChat.name,
            roomNo: selectedChat.id,
            participantNo: selectedChat.participantNo,
            userNo : Number(localStorage.getItem("userNo"))
        }, async (response) => {
            if (response.status === 'ok') {
                // update status
                await fetchApi(null, null).setStatus(selectedChat.participantNo, 1, localStorage.getItem("Authorization"))

                const lastReadNo = await fetchApi(null, null).getLastReadNo(participantNo, localStorage.getItem("Authorization"))
                if (lastReadNo !== undefined) {
                    dispatch(lastReadNoAction(lastReadNo))
                }

                const lastReadNoCount = await fetchApi(null, null).getLastReadNoCount(participantNo, localStorage.getItem("Authorization"))

                // update notReadCount
                await fetchApi(null, null).updateRoomNotReadCount(participantNo, roomNo, localStorage.getItem("Authorization"))
                // set headCount(입장한 방)s
                dispatch(headCountAction(await fetchApi(null, null).getHeadCount(participantNo, localStorage.getItem("Authorization"))))

                //쳇 리스트 갯수 구하기
                const chatListCount = await fetchApi(chatList, setChatList).getChatListCount(selectedChat.id, localStorage.getItem("Authorization"))

                // 전체 채팅수가 10개 보다 적을때 처음부터 보여준다.
                // 아니라면 전체 에서 마지막 인덱스부터 보여준다
                if ((chatListCount.count <= config.CHAT_LIMIT)  ) {
                    lastPage = 0;
                } else {
                    lastPage = chatListCount.count - config.CHAT_LIMIT
                    if(lastPage < 0 ){
                        lastPage = 0
                    }
                }
                // console.log("CHAT_LIMIT" ,  config.CHAT_LIMIT)
                // console.log(" chatListCount.count" ,  chatListCount.count)
                // console.log("lastPage" , lastPage)

                if (lastReadNoCount && lastReadNoCount.count !== 0) {
                    const chatlist = await fetchApi(chatList, setChatList).getChatList(selectedChat.id, chatListCount.count - lastReadNoCount.count,lastReadNoCount.count, localStorage.getItem("Authorization"))
                    lastPage = chatListCount.count - lastReadNoCount.count
                    const chats = chatFormList(chatlist,participantNo);
                    selectedChat.messages = chats;
                } else {
                    const chatlist = await fetchApi(chatList, setChatList).getChatList(selectedChat.id, lastPage, config.CHAT_LIMIT, localStorage.getItem("Authorization"))
                    const chats = chatFormList(chatlist,participantNo);
                    selectedChat.messages = chats;
                }

                dispatch(lastPageAction(lastPage))
                // selectedChat.messages = chats;
                dispatch(messageAllLengthAction(chatListCount.count))
                dispatch(messageLengthAction(selectedChat.messages.length - 1))
                console.log("ok@@@@@@@@@@@@@@@@@@@@@" , lastReadNoCount.count)
                dispatch(lastReadNoLengthAction(lastReadNoCount.count))
              //  setJoinOk(!joinOk)
                dispatch(joinOKAction(!joinOk))
            }
        });
        socket.on('message', callback);

        return async () => {  // 방을 나갔을 경우  소켓을 닫고 해당 participantNo LastReadAt를 업데이트 시킨다
            if (roomNo) {
                console.log('left Room -------------------------------------------------------',selectedChat)
                const results = await fetchList(localStorage.getItem("Authorization")).leftRoom(selectedChat.participantNo);
                dispatch(reloadAction(!reload));
                socket.disconnect();
            }
        }
    }, [selectedChat]);

    const mobileSidebarClose = () => {
        dispatch(mobileSidebarAction(false));
        document.body.classList.remove('navigation-open');
    };


    const chatSelectHandle = async (chat,i) => {
        try {
            dispatch(profileInfoAction(chat));
            dispatch(participantNoAction(chat.participantNo))
            dispatch(roomNoAction(chat.id))

            // 방 들어 왔을때 방 headCount 업데이트
            let updateNotReadCount = [...notReadCount];
            updateNotReadCount[i] = 0;
            handleNotReadCount(updateNotReadCount);

            dispatch(roomTypeAction(chat.type))
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
                alert("chatSelectHandle : Token invalid or Token expired. Please login again");
                history.push("/");
                console.log("Error : {}", e.message);
            }
        }
    };


    const profileActions = (chat) => {

        let hostProfile;
        let otherUserProfile;
        chat.otherParticipantNo.map(participant => {
            if (participant.role === "ROLE_HOST") {
                hostProfile = participant.User
            }
            otherUserProfile = participant.User
        })
        // 개인톡(내가 방장일 경우)
        hostProfile === undefined ? dispatch(profileInfoAction(otherUserProfile)) : dispatch(profileInfoAction(hostProfile));
        dispatch(profileAction(true));
        dispatch(mobileProfileAction(true))
    };

    const ChatListView = (props) => {
        const {chat,i} = props;
        return <li style={chat.type === "public" ? {color: "yellowgreen"} : null}
                   className={"list-group-item " + (chat.id === selectedChat.id ? 'open-chat' : '')}>

            <div onClick={() => profileActions(chat)}>
                {chat.avatar}
            </div>
            <div className="users-list-body" onClick={() => chatSelectHandle(chat,i)} id={chat.id}
                 ref={ref => {
                     joinRoom && chat.participantNo === participantNo
                     && chatSelectHandle(chat) && dispatch(joinRoomAction(false))
                 }}>
                <h5>{chat.name}</h5>
                {chat.text}
            </div>
            <div className="users-list-body">
                <div className="users-list-action action-toggle">
                    {chat.unread_messages ? <div className="new-message-count">{chat.unread_messages}</div> : ''}
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
                    <li className="list-inline-item" style={opacity}>
                        <AddGroupModal friendList={friendList}/>
                    </li>
                    <li className="list-inline-item" style={opacity}>
                        <button onClick={() => localStorage.getItem("role") !== "ROLE_UNKNOWN" && dispatch(sidebarAction('Friends'))} className="btn btn-light"
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
                <input hidden="hidden"/>
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
                        <p style={{
                            color: "coral",
                            marginLeft: 25,
                        }}>{localStorage.getItem("name")}의 채팅 목록</p>
                        {roomList.filter((chat) => {
                            if (searchTerm == "") {
                                return chat
                            } else if (chat.name?.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return chat
                            }
                        }).map((chat, i) => {
                            return <ChatListView chat={chat} key={i} i={i}/>
                        })
                        }
                    </ul>
                </PerfectScrollbar>
            </div>
        </div>
    )
})

export default Index