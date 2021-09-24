import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ChatsIndex from "./Chats"
import FriendsIndex from "./Friends"
import FavoritesIndex from "./Favorites"
import OpenChatsIndex from "./OpenChats"
import GameIndex from "./Game"
import fetchApi from "../Module/fetchApi";
import io from "socket.io-client";
import * as config from "../../config/config";


const Index = React.forwardRef(({history}, scrollRef) => {

    const dispatch = useDispatch();
    const {selectedSidebar, mobileSidebar} = useSelector(state => state);
    const {selectedChat} = useSelector(state => state);
    const userRoomList = [];
    const userOpenRoomList = [];
    const userFriendList = [];
    const userFollowerList = [];
    const [friendList, setFriendList] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [openRoomList, setOpenRoomList] = useState([]);
    const [followerList, setFollowerList] = useState([]);
    const [notReadCount, setNotReadCount] = useState([]);
    const userNo = Number(localStorage.getItem("userNo"));
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');

    const {reload} = useSelector(state => state);
    const socket = io(`${config.SOCKET_IP}:${config.SOCKET_PORT}`, {
        transports: ['websocket']});
    const [userSocket,setUserSocket] = useState();


    const handleNotReadCount = (notReadCount) => {
        setNotReadCount(notReadCount);
    }

    // user가 사이트에 입장했을 때
    useEffect(()=>{
        if(localStorage === null) return;

        const userSocket = io.connect(`${config.SOCKET_IP}:${config.SOCKET_PORT}`, {transports: ['websocket']});
        setUserSocket(userSocket);

        // 사이트 접속시, 사이트에 접속해있는 user 정보를 서버에 전달
        // 서버의 경우 user 정보를 토대로 user가 참여한 방 모두를 구독시킴
        userSocket.emit('joinUser',{
            user: localStorage
        })

        // 사이트 접속해있는 유저에 한해서 참여한 방에서 누군가 메세지를 보낸 경우, roomList 를 업데이트 시킴
        userSocket.on('getMessage', async ({socketUserNo, roomNo}) => {
            // roomList update (for unread count)
            // 현재 있는 방이 아니라면
            if(Number(roomNo) !== Number(selectedChat.id)){
                const notReadCount_ = (await fetchApi(roomList, setRoomList).getRoomList(userNo, localStorage.getItem("Authorization"))).unreadChatCount;

                const room = roomList.map((room,i) => {
                    if(Number(room.no) === Number(roomNo)) return i;
                })
                setNotReadCount(notReadCount_);
            }
        });

        return (() => {
            userSocket.disconnect();
        })

    },[localStorage,selectedChat]); // selectedChat 보다는 room 생성시마다 변경되도록 하면 좋을 듯

    useEffect(() => {
        (async () => {
            try {
                // 비회원 로직
                if (localStorage.getItem("role") === "ROLE_UNKNOWN") { // 비회원 로직
                    const notReadCount_ = (await fetchApi(roomList, setRoomList).getRoomList(userNo, localStorage.getItem("Authorization"))).unreadChatCount;
                    setNotReadCount(notReadCount_);
                    await fetchApi(openRoomList, setOpenRoomList).getOpenChatRoomList('official', localStorage.getItem("Authorization"));


                } else { // 회원 로직
                    const notReadCount_ = (await fetchApi(roomList, setRoomList).getRoomList(userNo, localStorage.getItem("Authorization"))).unreadChatCount;
                    setNotReadCount(notReadCount_);
                    await fetchApi(friendList, setFriendList).getFriendList(userNo, localStorage.getItem("Authorization"))
                    await fetchApi(followerList, setFollowerList).getFollowerList(userNo, localStorage.getItem("Authorization"))
                    await fetchApi(openRoomList, setOpenRoomList).getOpenChatRoomList("public", localStorage.getItem("Authorization"));
                }
            } catch (err) {
                console.log('sidebar err',err);
                if (err === "System Error") {
                    history.push("/error/500") // 500 Page(DB error) // 수정 필요
                } else {
                    // Token 문제 발생 시 -> return null -> length error -> catch
                    alert("Token invalid or Token expired. Please login again");
                    history.push("/");
                    console.log("Error : {}", err.message);
                }
            }
        })()
    }, [reload]);

    useEffect( () => {
        if (localStorage.getItem("role") === "ROLE_UNKNOWN") { // 비회원 로직
            socket.emit("unknown", (localStorage.getItem("userNo")) , false)
        }

    } , [])

    openRoomList.map((room, i) => {
        const openChatHost = room.Participants.filter(participant => {
            return participant.role === "ROLE_HOST"
        })[0];
        const currentParticipant = room.Participants.filter(participant => {
            return Number(participant.userNo) === Number(userNo)
        })[0];
        const otherParticipant = room.Participants.filter(participant => {
            return Number(participant.userNo) !== Number(userNo)
        });

        userOpenRoomList.push({
            id: room.no,
            type: room.type,
            name: room.title === '' ? openChatHost && openChatHost.User.name + " 님의 오픈 채팅입니다." : room.title,
            password: room.password,
            openChatHostNo: openChatHost && openChatHost.no,
            openChatHost: openChatHost && openChatHost.User,
            participantNo: currentParticipant && currentParticipant.no,
            otherParticipantNo: otherParticipant && otherParticipant.map((participant) => participant.no),
            avatar: <figure className="avatar avatar-state-success">
                <img src={openChatHost && openChatHost.User.profileImageUrl} className="rounded-circle"
                     alt="avatar"/>
            </figure>,
            text: <p>{room.content === "Open Chat" ? 'Open Chat' : room.content}</p>,
            date: '03:41 PM',
            unread_messages: 1,
            messages: [],
            openChatHostCheck: currentParticipant && openChatHost && openChatHost.no === currentParticipant.no,
            headcount: room.headCount
        });
    })
    // 오픈 채팅은 생성한 사람의 프로필 이미지가 나오도록 해야한다.
    roomList.map((room, i) => {

        const openChatHost = room.Participants.filter(participant => {
            return participant.role === "ROLE_HOST"
        })[0];
        const currentParticipant = room.Participants.filter(participant => {
            return Number(participant.userNo) === Number(userNo)
        })[0];
        const otherParticipant = room.Participants.filter(participant => {
            return Number(participant.userNo) !== Number(userNo)
        });

        const unread_message_count = notReadCount && notReadCount[i];

        if (room.type === "private") {

            // (방 제목) 다른 유저들의 이름
            let otherParticipantsName;

            // 방제가 없고, 그룹톡인 경우
            if (room.title === '' && room.headCount > 2) {
                otherParticipantsName = otherParticipant && otherParticipant.map(other => {
                    return other.User.name
                }).join(',');
                // 그룹톡이고 방제가 있는 경우
            } else if (room.headCount > 2) {
                otherParticipantsName = room.title;
                // 1:1톡인 경우
            } else {
                otherParticipantsName = otherParticipant && otherParticipant[0] && otherParticipant[0].User.name;
            }

            userRoomList.push({
                id: room.no,
                type: room.type,
                name: otherParticipantsName,
                participantNo: currentParticipant.no, // 이 채팅방의 '나'
                participant: currentParticipant,
                otherParticipantNo: otherParticipant && otherParticipant.filter(participant => {
                    return participant.no
                }), // 이 채팅방의 '너'
                avatar: <figure className="avatar avatar-state-success">
                    <img src={otherParticipant && otherParticipant[0] && otherParticipant[0].User.profileImageUrl}
                         className="rounded-circle" alt="avatar"/>
                </figure>,
                text: <p>{room.content === "Private Chat" ? 'Private Chat' : room.content}</p>,
                date: '03:41 PM',
                unread_messages: unread_message_count,
                messages: [],
                openChatHostCheck: false,
                headcount: room.headCount
            });
        } else if (room.type === "public") {
            userRoomList.push({
                id: room.no,
                type: room.type,
                name: room.title === '' ? openChatHost && openChatHost.User.name + " 님의 오픈 채팅입니다." : room.title,
                password: room.password,
                openChatHostNo: openChatHost && openChatHost.no,
                participantNo: currentParticipant && currentParticipant.no,
                participant: currentParticipant,
                otherParticipantNo: otherParticipant && otherParticipant.filter(participant => {
                    return participant.no
                }),
                avatar: <figure className="avatar avatar-state-success">
                    <img src={openChatHost && openChatHost.User.profileImageUrl} className="rounded-circle"
                         alt="avatar"/>
                </figure>,
                text: <p>{room.content === "Open Chat" ? 'Open Chat' : room.content}</p>,
                date: '03:41 PM',
                unread_messages: unread_message_count,
                messages: [],
                openChatHostCheck: currentParticipant && openChatHost && openChatHost.no === currentParticipant.no,
                headcount: room.headCount
            });
        } else if (room.type === "official") {
            userRoomList.push({
                id: room.no,
                type: room.type,
                name: room.title === '' ? openChatHost && openChatHost.User.name + " 님의 오픈 채팅입니다." : room.title,
                phoneNumber: openChatHost && openChatHost.User.phoneNumber,
                password: room.password,
                openChatHostNo: openChatHost && openChatHost.no,
                participantNo: currentParticipant && currentParticipant.no,
                participant: currentParticipant,
                otherParticipantNo: otherParticipant && otherParticipant.filter(participant => {
                    return participant.no
                }),
                avatar: <figure className="avatar avatar-state-success">
                    <img src={openChatHost && openChatHost.User.profileImageUrl} className="rounded-circle"
                         alt="avatar"/>
                </figure>,
                text: <p>{room.content === "Open Chat" ? 'Open Chat' : room.content}</p>,
                date: '03:41 PM',
                unread_messages: unread_message_count,
                messages: [],
                openChatHostCheck: currentParticipant && openChatHost && openChatHost.no === currentParticipant.no,
                headcount: room.headCount
            });
        }
    })


    friendList.map((friend, i) => {
        userFriendList.push({
            no: friend.no,
            name: friend.name,
            username: friend.username,
            comments: friend.comments,
            avatar: <figure className="avatar">
                <img src={friend.profileImageUrl} className="rounded-circle" alt="avatar"/>
            </figure>,
            createdAt: friend.createdAt,
            lastLoginAt: friend.lastLoginAt,
            profileImageUrl: friend.profileImageUrl,
            phoneNumber: friend.phoneNumber
        })
    });

    followerList.map((follower, i) => {
        userFollowerList.push({
            no: follower.no,
            username: follower.username,
            name: follower.name,
            comments: follower.comments,
            avatar: <figure className="avatar">
                <img src={follower.profileImageUrl} className="rounded-circle" alt="avatar"/>
            </figure>,
            createdAt: follower.createdAt,
            lastLoginAt: follower.lastLoginAt,
            profileImageUrl: follower.profileImageUrl,
            phoneNumber: follower.phoneNumber
        })
    });

    return (
        <div className={`sidebar-group ${mobileSidebar ? "mobile-open" : ""}`}>
            {
                (() => {
                    if (selectedSidebar === 'Chats') {
                        return <ChatsIndex roomList={userRoomList} friendList={friendList}
                                           history={history} handleNotReadCount={handleNotReadCount} notReadCount={notReadCount} ref={scrollRef}/>
                    } else if (selectedSidebar === 'Friends') {
                        return <FriendsIndex mobileSidebar={mobileSidebar} roomList={userRoomList}
                                             friendList={userFriendList}
                                             followerList={userFollowerList} history={history}/>
                    } else if (selectedSidebar === 'Favorites') {
                        return <FavoritesIndex/>
                    } else if (selectedSidebar === 'Open-chat') {

                        return <OpenChatsIndex roomList={userRoomList} openRoomList={userOpenRoomList}
                                               friendList={friendList}
                                               history={history}/>
                    }
                })()
            }
        </div>    
        
     
    )
})
export default Index