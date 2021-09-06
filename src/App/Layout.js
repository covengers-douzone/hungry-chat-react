import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import SidebarIndex from "./Sidebars/index";
import Navigation from "./Navigation";
import Profile from "./Sidebars/Profile";

import Chat from "./Partials/Chat";
import DisconnectedModal from "./Modals/DisconnectedModal";
import fetchApi from "./Module/fetchApi";
import {useDispatch, useSelector} from "react-redux";
import {userNoAction} from "../Store/Actions/userNoAction";


function Layout({history}) {
    // pathVariable

    let upOffset = 0;
    let downOffset = 0;

    const {UserNo} = useParams();

    const scrollRef = useRef()



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
                <SidebarIndex userNo={UserNo} history={history}  ref = {scrollRef}  upOffset = {upOffset}  downOffset={downOffset}/>
                <Chat ref = {scrollRef} upOffset = {upOffset} downOffset ={downOffset} />
                <Profile/>
                <DisconnectedModal/>
            </div>
        </div>
    )
}

export default Layout
