import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Tooltip} from 'reactstrap'
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import AddGroupModal from "../../Modals/AddGroupModal"
import ChatsDropdown from "./ChatsDropdown"
import {sidebarAction} from "../../../Store/Actions/sidebarAction"
import {chatLists} from "./Data";
//import {chatLists2} from "./Data2";
import {mobileSidebarAction} from "../../../Store/Actions/mobileSidebarAction";
import {selectedChatAction} from "../../../Store/Actions/selectedChatAction";

function Index() {

    useEffect(() => {
        inputRef.current.focus();
    });

    const dispatch = useDispatch();

    const inputRef = useRef();

    const {selectedChat} = useSelector(state => state);

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const [chatList, setChatList] = useState({});

    const toggle = () => setTooltipOpen(!tooltipOpen);

    const mobileSidebarClose = () => {
        dispatch(mobileSidebarAction(false));
        document.body.classList.remove('navigation-open');
    };

    const chatSelectHandle = (chat) => {
        chat.unread_messages = 0;
        dispatch(selectedChatAction(chat));
        dispatch(mobileSidebarAction(false));
    };

    const ChatListView = (props) => {
        const {chat} = props;

        return <li className={"list-group-item " + (chat.id === selectedChat.id ? 'open-chat' : '')}
                   onClick={() => chatSelectHandle(chat)}>
            {chat.avatar}
            <div className="users-list-body">
                <h5>{chat.name}</h5>
                {chat.text}
                <div className="users-list-action action-toggle">
                    {chat.unread_messages ? <div className="new-message-count">{chat.unread_messages}</div> : ''}
                    <ChatsDropdown/>
                </div>
            </div>
        </li>
    };

    // 비동기 통신
    const getlist = {
        getRoomList : async function () {
            try {
                const response = await fetch(`http://localhost:8888/api/roomlist?userNo=${1}`, {
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
            } catch (err) {
                console.error(err);
            }
        },
        getChatList : async function (roomNo) {
            try {
                const response = await fetch(`http://localhost:8888/api/chatlist?roomNo=${roomNo}`, {
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
        <div className="sidebar active">
            <header>
                <span>Chats</span>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <AddGroupModal/>
                    </li>
                    <li className="list-inline-item">
                        <button onClick={() => dispatch(sidebarAction('Friends'))} className="btn btn-light"
                                id="Tooltip-New-Chat">
                            <i className="ti ti-comment-alt"></i>
                        </button>
                        <Tooltip
                            isOpen={tooltipOpen}
                            target={"Tooltip-New-Chat"}
                            toggle={toggle}>
                            New chat
                        </Tooltip>
                    </li>
                    <li className="list-inline-item d-xl-none d-inline">
                        <button onClick={mobileSidebarClose} className="btn btn-light">
                            <i className="ti ti-close"></i>
                        </button>
                    </li>
                </ul>
            </header>
            <form>
                <input type="text" className="form-control" placeholder="Search chat" ref={inputRef}/>
            </form>
            <div className="sidebar-body">
                <PerfectScrollbar>
                    <ul className="list-group list-group-flush">
                        {
                            chatLists.map((chat, i) => <ChatListView chat={chat} key={i}/>)
                        }
                    </ul>
                </PerfectScrollbar>
            </div>
        </div>
    )
}

export default Index
