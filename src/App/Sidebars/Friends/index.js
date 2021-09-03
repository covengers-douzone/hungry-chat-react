import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import AddFriendsModal from "../../Modals/AddFriendModal"
import FriendsDropdown from "./FriendsDropdown"
import {mobileSidebarAction} from "../../../Store/Actions/mobileSidebarAction"
import FollowersDropdown from "./FollowersDropdown";

function Index({roomList, friendList, followerList, userNo, history, mobileSidebar }) {


    useEffect(() => {
        inputRef.current.focus();
    });

    const inputRef = useRef();

    const dispatch = useDispatch();

    const mobileSidebarClose = () => {
        dispatch(mobileSidebarAction(false));
        document.body.classList.remove('navigation-open');
    };

    const [searchTerm, setSearchTerm] = useState("");

    const [addFriendsModalOpen, setAddFriendsModalOpen] = useState(false);

    const addFriendsModalToggle = () => setAddFriendsModalOpen(!addFriendsModalOpen);

    return (
        <div className="sidebar active">
            <header>
                <span>Friends</span>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <AddFriendsModal modal={addFriendsModalOpen} toggle={addFriendsModalToggle} userNo={userNo}/>
                    </li>
                    <li className="list-inline-item d-xl-none d-inline">
                        <button onClick={mobileSidebarClose} className="btn btn-light">
                            <i className="ti ti-close"></i>
                        </button>
                    </li>
                </ul>
            </header>
            <form>
                <input
                    type="text" 
                    className="form-control" 
                    placeholder="Search friends" 
                    ref={inputRef} 
                    onChange={e=> {
                        setSearchTerm(e.target.value)
                        }}
                />
            </form>
            <div className="sidebar-body">
                <PerfectScrollbar>
                    <ul className="list-group list-group-flush">
                        <p style={ {
                            color:"coral",
                            marginLeft:25,
                        }}>친구 목록</p>
                        {friendList.filter((item) => {
                            if(searchTerm == ""){
                                return item
                            } else if( item.name.toLowerCase().includes(searchTerm.toLowerCase())){
                                return item
                            }
                        }).map((item, i) => {
                                return <li key={i} className="list-group-item">
                                    {item.avatar}
                                    <div className="users-list-body">
                                        <div>
                                            <h5>{item.name}</h5>
                                            <p>{item.comments}</p>
                                        </div>
                                        <div className="users-list-action action-toggle">
                                            <FriendsDropdown friendName={item.name} friendNo={item.no}/>
                                        </div>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                        <ul className="list-group list-group-flush">
                            <p style={ {
                                color:"coral",
                                marginLeft:25,
                            }}>나를 친구 추가한 사람들</p>
                            {followerList.filter((item) => {
                                if(searchTerm == ""){
                                    return item
                                } else if( item.name.toLowerCase().includes(searchTerm.toLowerCase())){
                                    return item
                                }
                            }).map((item, i) => {
                                return <li key={i} className="list-group-item">
                                    {item.avatar}
                                    <div className="users-list-body">
                                        <div>
                                            <h5>{item.name}</h5>
                                            <p>{item.comments}</p>
                                        </div>
                                        <div className="users-list-action action-toggle">
                                            <FollowersDropdown friendName={item.name} friendNo={item.no} friendEmail={item.email} userNo={userNo}/>
                                        </div>
                                    </div>
                                </li>
                            })
                            }
                        </ul>
                </PerfectScrollbar>
            </div>
        </div>
    )
}

export default Index
