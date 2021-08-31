import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ChatsIndex from "./Chats"
import FriendsIndex from "./Friends"
import FavoritesIndex from "./Favorites"
import fetchApi from "../Module/fetchApi";

import ManAvatar1 from "../../assets/img/man_avatar1.jpg"
import ManAvatar2 from "../../assets/img/man_avatar2.jpg"
import ManAvatar3 from "../../assets/img/man_avatar3.jpg"
import ManAvatar4 from "../../assets/img/man_avatar4.jpg"
import WomenAvatar1 from "../../assets/img/women_avatar1.jpg"
import WomenAvatar2 from "../../assets/img/women_avatar2.jpg"
import WomenAvatar5 from "../../assets/img/women_avatar5.jpg"
import {userNoAction} from "../../Store/Actions/userNoAction";



function Index({userNo, history}) {

    const dispatch = useDispatch;
    const {selectedSidebar, mobileSidebar} = useSelector(state => state);
    const userRoomList = [];
    const [friendList, setFriendList] = useState([]);
    const [roomList, setRoomList] = useState([]);



    useEffect(()=>{
        fetchApi(roomList,setRoomList).getRoomList(userNo, localStorage.getItem("Authorization"));
        fetchApi(friendList,setFriendList).getFriendList(userNo, localStorage.getItem("Authorization"))
    },[]);

    roomList.map((room) => {
        userRoomList.push({
            id: room.no,
            name: room.title,
            participantNo : room.Participants[0].no,
            avatar: <figure className="avatar avatar-state-success">
                <img src={ManAvatar1} className="rounded-circle" alt="avatar"/>
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
                        return <FriendsIndex/>
                    } else if (selectedSidebar === 'Favorites') {
                        return <FavoritesIndex/>
                    }
                })()
            }
        </div>
    )
}

export default Index