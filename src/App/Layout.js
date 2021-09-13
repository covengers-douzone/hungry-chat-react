import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import SidebarIndex from "./Sidebars/index";
import Navigation from "./Navigation";
import Profile from "./Sidebars/Profile";
import ChatProfile from "./Sidebars/ChatProfile";

import Chat from "./Partials/Chat";
import DisconnectedModal from "./Modals/DisconnectedModal";
import {useSelector} from "react-redux";


function Layout({history}) {
    // pathVariable

    let upOffset = 0;
    let downOffset = 0;

    const scrollRef = useRef();
    const {profileSidebar, mobileProfileSidebar} = useSelector(state => state);
    const {chatProfileSidebar, mobileChatProfileSidebar} = useSelector(state => state);

    useEffect(() => {
        document.querySelector('*').addEventListener('click', (e) => {
            if (document.body.classList.contains('navigation-open') && e.target.nodeName === 'BODY') {
                document.body.classList.remove('navigation-open')
            }
        });
    }, []);


    return (

        <div className="layout">
            <Navigation/>
            <div className="content">
                <SidebarIndex history={history}  ref = {scrollRef}  upOffset = {upOffset}  downOffset={downOffset}/>
                <Chat history={history}  ref = {scrollRef} upOffset = {upOffset} downOffset ={downOffset} />
                {
                    (profileSidebar || mobileProfileSidebar) ? <Profile/> : null
                }
                {
                    (chatProfileSidebar || mobileChatProfileSidebar) ? <ChatProfile/> : null
                }
                <DisconnectedModal/>
            </div>
        </div>
    )
}

export default Layout
