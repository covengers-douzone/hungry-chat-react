import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ChatsIndex from "./Chats"
import FriendsIndex from "./Friends"
import FavoritesIndex from "./Favorites"
import OpenChatsIndex from "./OpenChats"
import fetchApi from "../Module/fetchApi";

const Index = React.forwardRef(({userNo, history}, scrollRef) => {

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
    const {reload} = useSelector(state => state);

    useEffect( ()=>{
        console.log('reload',reload);
        try{
            fetchApi(roomList,setRoomList).getRoomList(userNo, localStorage.getItem("Authorization"));
            fetchApi(friendList,setFriendList).getFriendList(userNo, localStorage.getItem("Authorization"))
            fetchApi(followerList, setFollowerList).getFollowerList(userNo, localStorage.getItem("Authorization"))
            fetchApi(openRoomList,setOpenRoomList).getOpenChatRoomList(userNo, localStorage.getItem("Authorization"));
        }catch (err){
            console.log(err);
        }
    }, [reload]);


    // 오픈 채팅은 생성한 사람의 프로필 이미지가 나오도록 해야한다.
         openRoomList.map((room,i) => {
             const openChatHost = room.Participants.filter(participant => {return participant.role === "ROLE_HOST"})[0];
             // console.log(room.Participants && room.Participants[0].role === "ROLE_HOST" && room.Participants[0].User.name);
             userOpenRoomList.push({
                 id: room.no,
                 name: openChatHost && openChatHost.User.name,
                 participantNo : openChatHost && openChatHost.no,
                 avatar: <figure className="avatar avatar-state-success">
                     <img src={ openChatHost && openChatHost.User.profileImageUrl} className="rounded-circle" alt="avatar"/>
                 </figure>,
                 text: <p>What's up, how are you?</p>,
                 date: '03:41 PM',
                 unread_messages: 1,
                 messages: []
             });
        })

        roomList.map((room,i) => {
            const openChatHost = room.Participants.filter(participant => {return participant.role === "ROLE_HOST"})[0];
            const currentParticipant = room.Participants.filter(participant => {return Number(participant.userNo) === Number(userNo)})[0];
            const otherParticipant = room.Participants.filter(participant => {return Number(participant.userNo) !== Number(userNo)});

            if(room.type === "private"){
                userRoomList.push({
                    id: room.no,
                    type: room.type,
                    name: otherParticipant && otherParticipant[0] && otherParticipant[0].User.name,
                    participantNo : currentParticipant.no,
                    avatar: <figure className="avatar avatar-state-success">
                        <img src={ otherParticipant && otherParticipant[0] && otherParticipant[0].User.profileImageUrl} className="rounded-circle" alt="avatar"/>
                    </figure>,
                    text: <p>What's up, how are you?</p>,
                    date: '03:41 PM',
                    unread_messages: 1,
                    messages: []
                });
            } else if(room.type === "public"){
                userRoomList.push({
                    id: room.no,
                    type: room.type,
                    name: openChatHost && openChatHost.User.name,
                    participantNo : openChatHost && openChatHost.no,
                    avatar: <figure className="avatar avatar-state-success">
                        <img  src={ openChatHost && openChatHost.User.profileImageUrl} className="rounded-circle" alt="avatar"/>
                    </figure>,
                    text: <p>What's up, how are you?</p>,
                    date: '03:41 PM',
                    unread_messages: 1,
                    messages: []
                });
            }
    })


    friendList.map((friend, i) => {
        userFriendList.push({
            no: friend.no,
            name: friend.name,
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
                        return <ChatsIndex roomList={userRoomList} friendList={friendList} userNo={userNo}
                                           history={history} ref={scrollRef}/>
                    } else if (selectedSidebar === 'Friends') {
                        return <FriendsIndex mobileSidebar={mobileSidebar} roomList={userRoomList}
                                             friendList={userFriendList}
                                             followerList={userFollowerList} userNo={userNo} history={history}/>
                    } else if (selectedSidebar === 'Favorites') {
                        return <FavoritesIndex/>
                    } else if (selectedSidebar === 'Open-chat') {
                        return <OpenChatsIndex roomList={userOpenRoomList} friendList={friendList} userNo={userNo}
                                               history={history}/>
                    }
                })()
            }
        </div>
    )
})
export default Index