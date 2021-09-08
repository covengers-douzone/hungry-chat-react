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


const FriendsDropdown = ({roomList, friendNo, friendName, friendEmail, userNo, createRoom}) => {

    const dispatch = useDispatch();

    const {reload} = useSelector(state => state);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    useEffect(()=> {

    },[]);

    const createRoomHandler = async (event) => {
        event.preventDefault();
        createRoom(friendName,friendNo);
    }

    const deleteFriendHandler = async (event) => {
        event.preventDefault();
        try{
            await axios.post(`${config.URL}/api/deleteFriend`, {
                friendNo: friendNo,
                Authorization:localStorage.getItem("Authorization"),
                userNo: userNo,
            })
            dispatch(reloadAction(!reload))
            .catch( err => {
                    console.log(`${err.message}`) })
        }catch (e) {
            console.log(e);
        }
        console.log(dispatch(reloadAction(!reload)));
        dispatch(reloadAction(!reload));
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

                <DropdownItem >
                    <li onClick={deleteFriendHandler}>
                    친구삭제
                    </li>
                </DropdownItem>

            </DropdownMenu>
        </Dropdown>
    )
};

export default FriendsDropdown
