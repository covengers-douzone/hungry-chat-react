import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'
import AddFriendsModal from "../../Modals/AddFriendModal"
import FriendsDropdown from "./FriendsDropdown"
import {mobileSidebarAction} from "../../../Store/Actions/mobileSidebarAction"
import FollowersDropdown from "./FollowersDropdown";
import fetchApi from "../../Module/fetchApi";
import {joinRoomAction} from "../../../Store/Actions/joinRoomAction";
import {participantNoAction} from "../../../Store/Actions/participantNoAction";
import {reloadAction} from "../../../Store/Actions/reloadAction";
import {sidebarAction} from "../../../Store/Actions/sidebarAction";
import {profileAction} from "../../../Store/Actions/profileAction";
import {mobileProfileAction} from "../../../Store/Actions/mobileProfileAction";

function Index({roomList, friendList, followerList, history, mobileSidebar }) {


    useEffect(() => {
        inputRef.current.focus();
    });

    const inputRef = useRef();

    const dispatch = useDispatch();

    const {reload} = useSelector(state => state);
    const userNo = Number(localStorage.getItem("userNo"));

    const mobileSidebarClose = () => {
        dispatch(mobileSidebarAction(false));
        document.body.classList.remove('navigation-open');
    };

    const [searchTerm, setSearchTerm] = useState("");

    const [addFriendsModalOpen, setAddFriendsModalOpen] = useState(false);

    const addFriendsModalToggle = () => setAddFriendsModalOpen(!addFriendsModalOpen);

    const createRoomHandler = async (friendName,friendNo) => {
        // friendsDropdown 은 type 이 모두 private 이다.(개인톡)
        try{
            const result = roomList && roomList.filter(room => {
                const isRoom = room.otherParticipantNo.filter(otherParticipantNo => {return otherParticipantNo.userNo === friendNo});
                return room.type === "private" && room.headcount === 2 && isRoom.length !== 0
            })
            if(result.length === 0){
                const roomNo = await fetchApi(null, null).createRoom(friendName, "Private Chat",2 ,"private", null , localStorage.getItem("Authorization"));
                const participantNo = (await fetchApi(null,null).createParticipant(userNo ,roomNo ,"ROLE_HOST", localStorage.getItem("Authorization") )).no;
                await fetchApi(null,null).createParticipant(friendNo ,roomNo ,"ROLE_MEMBER", localStorage.getItem("Authorization") )
                dispatch(joinRoomAction(true));
                dispatch(participantNoAction(participantNo));
                dispatch(reloadAction(!reload));
                dispatch(sidebarAction('Chats'));
            } else {
                dispatch(joinRoomAction(true));
                dispatch(participantNoAction(result[0].participantNo));
                dispatch(sidebarAction('Chats'));
            }
        }catch (e) {
            console.log(e.message)
        }
    }

    const profileActions = () => {
        dispatch(profileAction(true));
        dispatch(mobileProfileAction(true))
    };

    return (
        <div className="sidebar active">
            <header>
                <span>친구 목록</span>
                <ul className="list-inline">
                    <li className="list-inline-item">
                        <AddFriendsModal modal={addFriendsModalOpen} toggle={addFriendsModalToggle}/>
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
                    placeholder="친구검색" 
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
                                    <div onClick={profileActions}>
                                        {item.avatar}
                                    </div>
                                    <div className="users-list-body">
                                        <div>
                                            <h5>{item.name}</h5>
                                            <p>{item.comments}</p>
                                        </div>
                                        <div className="users-list-action action-toggle">
                                            <FriendsDropdown roomList={roomList} friendName={item.name} friendNo={item.no} friendEmail={item.email} createRoom={createRoomHandler}/>
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
                                    <div onClick={profileActions}>
                                        {item.avatar}
                                    </div>
                                    <div className="users-list-body">
                                        <div>
                                            <h5>{item.name}</h5>
                                            <p>{item.comments}</p>
                                        </div>
                                        <div className="users-list-action action-toggle">
                                            <FollowersDropdown friendName={item.name} friendNo={item.no} friendEmail={item.email} createRoom={createRoomHandler}/>
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
