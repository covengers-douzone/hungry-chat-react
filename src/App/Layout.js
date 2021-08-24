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
