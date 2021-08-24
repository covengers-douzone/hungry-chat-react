import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
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


function Index({userNo}) {

    const {selectedSidebar, mobileSidebar} = useSelector(state => state);

    const userRoomList = [];

    const [roomList, setRoomList] = useState([]);

    useEffect(()=>{
        fetchApi(roomList,setRoomList).getRoomList(userNo);
    },[]);

    roomList.map((room) => {
        userRoomList.push({
            id: room.no,
            name: room.title,
            avatar: <figure className="avatar avatar-state-success">
                <img src={ManAvatar1} className="rounded-circle" alt="avatar"/>
            </figure>,
            text: <p>What's up, how are you?</p>,
            date: '03:41 PM',
            unread_messages: 1
        });
    })

    return (
        <div className={`sidebar-group ${mobileSidebar ? "mobile-open" : ""}`}>
            {
                (() => {
                    if (selectedSidebar === 'Chats') {
                        return <ChatsIndex roomList={userRoomList} userNo={userNo}/>
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