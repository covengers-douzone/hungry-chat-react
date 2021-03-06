import React, {useState, useEffect} from 'react'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import fetchApi from "../../Module/fetchApi";
import {useDispatch, useSelector} from "react-redux";
import {reloadAction} from "../../../Store/Actions/reloadAction";
import {sidebarAction} from "../../../Store/Actions/sidebarAction";
import axios from "axios";
import * as config from "../../../config/config";


const FollowersDropdown = ({friendNo, friendName, friendEmail, createRoom}) => {

    const dispatch = useDispatch();
    const {reload} = useSelector(state => state);
    const userNo = Number(localStorage.getItem("userNo"));

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    useEffect(()=> {

    },[]);

    const joinRoomHandler = async (event) => {
        event.preventDefault();
        createRoom(friendName,friendNo);
    }

    const AddFriendHandler = async (event) => {
        event.preventDefault();
        try{
            await axios.post(`${config.URL}/api/addFriend`, {
                username: friendEmail,
                Authorization:localStorage.getItem("Authorization"),
                userNo: userNo

            }).catch( err => {
                console.log(`${err.message}`) })
        }catch (e) {
            console.log(e);
        }
        dispatch(reloadAction(!reload));
    }


    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle tag="span">
                <i className="ti ti-more"></i>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem >
                    <li onClick={joinRoomHandler}>
                    채팅 생성
                    </li>
                </DropdownItem>
                <DropdownItem divider/>
                <DropdownItem >
                    <li onClick={AddFriendHandler}>
                        친구추가
                    </li>
                </DropdownItem>
                {/*<DropdownItem >Block</DropdownItem>*/}
            </DropdownMenu>
        </Dropdown>
    )
};

export default FollowersDropdown
