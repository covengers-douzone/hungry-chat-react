import React, {useEffect} from 'react'
import SidebarIndex from "./Sidebars/index"
import Navigation from "./Navigation"
import Profile from "./Sidebars/Profile"
import Chat from "./Partials/Chat"
import DisconnectedModal from "./Modals/DisconnectedModal";

function Layout() {


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
                <SidebarIndex/>
                <Chat/>
                <Profile/>
                <DisconnectedModal/>
            </div>
        </div>
    )
}

export default Layout
