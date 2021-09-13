import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ChatsIndex from "./Chats"
import FriendsIndex from "./Friends"
import FavoritesIndex from "./Favorites"
import OpenChatsIndex from "./OpenChats"
import fetchApi from "../Module/fetchApi";

const Index = React.forwardRef(({history}, scrollRef) => {

    const dispatch = useDispatch;
    const {selectedSidebar, mobileSidebar} = useSelector(state => state);
    const userRoomList = [];
    const userOpenRoomList = [];
    const userFriendList = [];
    const userFollowerList = [];
    const [friendList, setFriendList] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [openRoomList, setOpenRoomList] = useState([]);
    const [followerList, setFollowerList] = useState([]);
    const userNo = Number(localStorage.getItem("userNo"));
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');

    const {reload} = useSelector(state => state);

    useEffect(() => {
        try {
            // 비회원 로직
            if (localStorage.getItem("role") === "ROLE_UNKNOWN") { // 비회원 로직
                console.log("권한:" , localStorage.getItem("role"))
                fetchApi(roomList, setRoomList).getRoomList(userNo, localStorage.getItem("Authorization"));
                fetchApi(openRoomList, setOpenRoomList).getOpenChatRoomList('official', localStorage.getItem("Authorization"));
            } else { // 회원 로직
                fetchApi(roomList, setRoomList).getRoomList(userNo, localStorage.getItem("Authorization"));
                fetchApi(friendList, setFriendList).getFriendList(userNo, localStorage.getItem("Authorization"))
                fetchApi(followerList, setFollowerList).getFollowerList(userNo, localStorage.getItem("Authorization"))
                fetchApi(openRoomList, setOpenRoomList).getOpenChatRoomList("public", localStorage.getItem("Authorization"));
            }

        } catch (err) {
            console.log(err);
        }
    }, [reload]);

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

        if (room.type === "private") {
            userRoomList.push({
                id: room.no,
                type: room.type,
                name: otherParticipant && otherParticipant[0] && otherParticipant[0].User.name,
                participantNo: currentParticipant.no, // 이 채팅방의 '나'
                otherParticipantNo: otherParticipant && otherParticipant.filter(participant => {
                    return participant.no
                }), // 이 채팅방의 '너'
                avatar: <figure className="avatar avatar-state-success">
                    <img src={otherParticipant && otherParticipant[0] && otherParticipant[0].User.profileImageUrl}
                         className="rounded-circle" alt="avatar"/>
                </figure>,
                text: <p>{room.content === "Private Chat" ? 'Private Chat' : room.content}</p>,
                date: '03:41 PM',
                unread_messages: 1,
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
                otherParticipantNo: otherParticipant && otherParticipant.filter(participant => {
                    return participant.no
                }),
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
        } else if (room.type === "official") {
            userRoomList.push({
                id: room.no,
                type: room.type,
                name: room.title === '' ? openChatHost && openChatHost.User.name + " 님의 오픈 채팅입니다." : room.title,
                phoneNumber: openChatHost && openChatHost.User.phoneNumber,
                password: room.password,
                openChatHostNo: openChatHost && openChatHost.no,
                participantNo: currentParticipant && currentParticipant.no,
                otherParticipantNo: otherParticipant && otherParticipant.filter(participant => {
                    return participant.no
                }),
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
        }
    })


    friendList.map((friend, i) => {
        userFriendList.push({
            no: friend.no,
            name: friend.name,
            email: friend.email,
            comments: friend.comments,
            avatar: <figure className="avatar">
                <img src={friend.profileImageUrl} className="rounded-circle" alt="avatar"/>
            </figure>
        })
    });

    followerList.map((follower, i) => {
        userFollowerList.push({
            no: follower.no,
            email: follower.username,
            name: follower.name,
            comments: follower.comments,
            avatar: <figure className="avatar">
                <img src={follower.profileImageUrl} className="rounded-circle" alt="avatar"/>
            </figure>
        })
    });

    return (
        <div className={`sidebar-group ${mobileSidebar ? "mobile-open" : ""}`}>
            {
                (() => {
                    if (selectedSidebar === 'Chats') {
                        return <ChatsIndex roomList={userRoomList} friendList={friendList}
                                           history={history} ref={scrollRef}/>
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