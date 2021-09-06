import React, {useState, useEffect} from 'react'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import fetchApi from "../../Module/fetchApi";
import {useDispatch, useSelector} from "react-redux";
import {reloadAction} from "../../../Store/Actions/reloadAction";
import {sidebarAction} from "../../../Store/Actions/sidebarAction";
import {participantNoAction} from "../../../Store/Actions/participantNoAction";
import {joinRoomAction} from "../../../Store/Actions/joinRoomAction";
import axios from "axios";
import * as config from "../../../config/config";


const FriendsDropdown = ({roomList, friendNo, friendName}) => {

    const dispatch = useDispatch();

    const {reload} = useSelector(state => state);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    useEffect(()=> {

    },[]);

    const createRoomHandler = async (event) => {
        event.preventDefault();

        // friendsDropdown 은 type 이 모두 private 이다.(개인톡)
        try{
              const result = roomList && roomList.filter(room => {
                    return room.type === "private" && room.otherParticipantNo === friendNo
                })

            if(result.length === 0){
                const roomNo = await fetchApi(null, null).createRoom(friendName, "Private Chat",2 ,"private", null , localStorage.getItem("Authorization"));
                const participantNo = (await fetchApi(null,null).createParticipant(localStorage.getItem("userNo") ,roomNo ,"ROLE_HOST", localStorage.getItem("Authorization") )).no;
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

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle tag="span">
                {/*<i onClick={joinRoomHandler} className="ti ti-comments-smiley"></i>*/}
                <i className="ti ti-more"></i>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem >
                    <li onClick={createRoomHandler}>
                    채팅생성
                    </li>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
};

export default FriendsDropdown
