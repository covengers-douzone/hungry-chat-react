import React, {useEffect,useState} from 'react';
import {useParams} from "react-router-dom";
import SidebarIndex from "./Sidebars/index";
import Navigation from "./Navigation";
import Profile from "./Sidebars/Profile";
import Chat from "./Partials/Chat";
import DisconnectedModal from "./Modals/DisconnectedModal";
import fetchApi from "./Module/fetchApi";


function Layout() {

    // pathVariable
    const {userNo} = useParams();

    useEffect(() => {
        document.querySelector('*').addEventListener('click', (e) => {
            if (document.body.classList.contains('navigation-open') && e.target.nodeName === 'BODY') {
                document.body.classList.remove('navigation-open')
            }
        });
    }, []);

    // get room list & chat list
    // useEffect(()=>{
    //     fetchApi(roomList,setRoomList).getRoomList(userNo)
    //         .then( roomlist => {
    //             //const roomNoList = roomlist.map((room) => {return room.no});
    //             roomlist.map((room) => {
    //                 fetchApi(chatList,setChatList).getChatList(room.no);
    //             });
    //         });
    // },[]);

    // useEffect(()=>{
    //     const getBoardList =  async () =>  {
    //         const roomNoList = fetchApi(roomList,setRoomList).getRoomList(userNo)
    //         const roomNos = await roomlist.filter((room) => {return room.no});
    //         await fetchApi(chatList,setChatList).getChatList(room.no);
    //     }
    // },[]);

    return (
        <div className="layout">
            <Navigation/>
            <div className="content">
                <SidebarIndex userNo={userNo}/>
                <Chat/>
                <Profile/>
                <DisconnectedModal/>
            </div>
        </div>
    )
}

export default Layout
