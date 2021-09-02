import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ChatsIndex from "./Chats"
import FriendsIndex from "./Friends"
import FavoritesIndex from "./Favorites"
import fetchApi from "../Module/fetchApi";


function Index({userNo, history}) {

    const dispatch = useDispatch;
    const {selectedSidebar, mobileSidebar} = useSelector(state => state);
    const userRoomList = [];
    const [friendList, setFriendList] = useState([]);
    const [roomList, setRoomList] = useState([]);

    useEffect(()=>{
        try{
            fetchApi(roomList,setRoomList).getRoomList(userNo, localStorage.getItem("Authorization"));
            fetchApi(friendList,setFriendList).getFriendList(userNo, localStorage.getItem("Authorization"))
        }catch (err){
            console.log(err);
        }
    },[]);

    roomList.map((room,i) => {
        const currentParticipant = room.Participants.filter(participant => {return Number(participant.userNo) === Number(userNo)})[0];
        const otherParticipant = room.Participants.filter(participant => {return Number(participant.userNo) !== Number(userNo)});
        userRoomList.push({
            id: room.no,
            name: room.title,
            participantNo : currentParticipant.no,
            avatar: <figure className="avatar avatar-state-success">
                <img src={otherParticipant[0].User.profileImageUrl} className="rounded-circle" alt="avatar"/>
            </figure>,
            text: <p>What's up, how are you?</p>,
            date: '03:41 PM',
            unread_messages: 1,
            messages: []
        });
    })
    return (
        <div className={`sidebar-group ${mobileSidebar ? "mobile-open" : ""}`}>
            {
                (() => {
                    if (selectedSidebar === 'Chats') {
                        return <ChatsIndex roomList={userRoomList} friendList={friendList} userNo={userNo} history={history}/>
                    } else if (selectedSidebar === 'Friends') {
                        return <FriendsIndex roomList={userRoomList} friendList={friendList} userNo={userNo} history={history}/>
                    } else if (selectedSidebar === 'Favorites') {
                        return <FavoritesIndex/>
                    }
                })()
            }
        </div>
    )
}

export default Index