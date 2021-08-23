import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import ChatsIndex from "./Chats"
import FriendsIndex from "./Friends"
import FavoritesIndex from "./Favorites"

function Index() {

    const {selectedSidebar, mobileSidebar} = useSelector(state => state);

    const [chatList, setChatList] = useState([]);

    useEffect(()=>{
        getlist.getRoomList();
    },[]);

     // chat list
     const getlist = {
        getRoomList : async function () {
            try {
                const response = await fetch(`http://localhost:9999/api/roomlist?userNo=${1}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'applcation/json'
                    }
                });
    
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
    
                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
    
                json.data.length > 0 && setChatList([...chatList, ...json.data]);
                console.log('layout in',json.data);
            } catch (err) {
                console.error(err);
            }
        },
        getChatList : async function (roomNo) {
            try {
                const response = await fetch(`http://localhost:9999/api/chatlist?roomNo=${roomNo}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'applcation/json'
                    }
                });
    
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
    
                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                
                //json.data.length > 0 && setChatList([...chatList, ...json.data]);
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <div className={`sidebar-group ${mobileSidebar ? "mobile-open" : ""}`}>
            {
                (() => {
                    if (selectedSidebar === 'Chats') {
                        return <ChatsIndex chatList={chatList}/>
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
