import React, {useEffect,useState} from 'react'
import SidebarIndex from "./Sidebars/index"
import Navigation from "./Navigation"
import Profile from "./Sidebars/Profile"
import Chat from "./Partials/Chat"
import DisconnectedModal from "./Modals/DisconnectedModal";
import fetchApi from "./Module/fetchApi";


function Layout() {


    useEffect(() => {
        document.querySelector('*').addEventListener('click', (e) => {
            if (document.body.classList.contains('navigation-open') && e.target.nodeName === 'BODY') {
                document.body.classList.remove('navigation-open')
            }
        });
    }, []);

    const [roomList, setRoomList] = useState([]);
    const [chatList, setChatList] = useState([]);

    useEffect(()=>{
        fetchApi(roomList,setRoomList).getRoomList()
            .then( roomlist => {
                roomlist.map((room) => {
                    fetchApi(chatList,setChatList).getChatList(room.no);
                });
            });
    },[]);

    return (
        <div className="layout">
            <Navigation/>
            <div className="content">
                <SidebarIndex chatList={chatList} roomList={roomList} userNo={1}/> {/* userNo: 고치기 */}
                <Chat/>
                <Profile/>
                <DisconnectedModal/>
            </div>
        </div>
    )
}

export default Layout
