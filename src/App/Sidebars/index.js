import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ChatsIndex from "./Chats"
import FriendsIndex from "./Friends"
import FavoritesIndex from "./Favorites"
import fetchApi from "../Module/fetchApi";


function Index({userNo, history}) {

    const dispatch = useDispatch;
    const {selectedSidebar, mobileSidebar} = useSelector(state => state);
    const userRoomList = [];
    const userFriendList = [];
    const userFollowerList = [];
    const [friendList, setFriendList] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [followerList, setFollowerList] = useState([]);

    useEffect(()=>{
        try{
            fetchApi(roomList,setRoomList).getRoomList(userNo, localStorage.getItem("Authorization"));
            fetchApi(friendList,setFriendList).getFriendList(userNo, localStorage.getItem("Authorization"))
            fetchApi(followerList, setFollowerList).getFollowerList(userNo, localStorage.getItem("Authorization"))
        }catch (err){
            console.log(err);
        }
    },[]);

    roomList.map((room,i) => {
        const currentParticipant = room.Participants.filter(participant => {return Number(participant.userNo) === Number(userNo)})[0];
        const otherParticipant = room.Participants.filter(participant => {return Number(participant.userNo) !== Number(userNo)});
        // console.log(i);
        // console.log(currentParticipant);
        // console.log(otherParticipant);
        userRoomList.push({
            id: room.no,
            name: room.title,
            participantNo : currentParticipant.no,
            avatar: <figure className="avatar avatar-state-success">
                <img src={otherParticipant[0].User.profileImageUrl} className="rounded-circle" alt="avatar"/>
            </figure>,
            text: <p>What's up, how are you?</p>,
            date: '03:41 PM',
            unread_messages: 1,
            messages: []
        });
    })


        friendList.map((friend, i) => {
            userFriendList.push({
                no: friend.no,
                name: friend.name,
                comments: friend.comments,
                avatar: <figure className="avatar">
                    <img src={friend.profileImageUrl} className="rounded-circle" alt="avatar"/>
                </figure>
            })
        });

        followerList.map((follower, i) => {
                userFollowerList.push({
                    no: follower.no,
                    name: follower.name,
                    comments: follower.comments,
                    avatar: <figure className="avatar">
                        <img src={follower.profileImageUrl} className="rounded-circle" alt="avatar"/>
                    </figure>
                })
        });


            return (
                <div className={`sidebar-group ${mobileSidebar ? "mobile-open" : ""}`}>
                    {
                        (() => {
                            if (selectedSidebar === 'Chats') {
                                return <ChatsIndex roomList={userRoomList} friendList={friendList} userNo={userNo}
                                                   history={history}/>
                            } else if (selectedSidebar === 'Friends') {
                                return <FriendsIndex roomList={userRoomList} friendList={userFriendList}
                                                     followerList={userFollowerList} userNo={userNo} history={history}/>
                            } else if (selectedSidebar === 'Favorites') {
                                return <FavoritesIndex/>
                            }
                        })()
                    }
                </div>
            )

        }
export default Index