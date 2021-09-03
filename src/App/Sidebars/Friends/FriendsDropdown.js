import React, {useState, useEffect} from 'react'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import fetchApi from "../../Module/fetchApi";
import {useDispatch, useSelector} from "react-redux";
import {reloadAction} from "../../../Store/Actions/reloadAction";
import {sidebarAction} from "../../../Store/Actions/sidebarAction";
import axios from "axios";
import * as config from "../../../config/config";


const FriendsDropdown = ({friendNo, friendName}) => {

    const dispatch = useDispatch();

    const {reload} = useSelector(state => state);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    useEffect(()=> {

    },[]);

    const joinRoomHandler = async (event) => {
        event.preventDefault();
        const roomNo = await fetchApi(null, null).createRoom(friendName, 2 ,"private", null , localStorage.getItem("Authorization"));
        console.log("roomNo" , roomNo)
        await fetchApi(null,null).createParticipant(localStorage.getItem("userNo") ,roomNo ,"ROLE_HOST", localStorage.getItem("Authorization") )
        await fetchApi(null,null).createParticipant(friendNo ,roomNo ,"ROLE_MEMBER", localStorage.getItem("Authorization") )
        dispatch(reloadAction(!reload));
        dispatch(sidebarAction('Chats'));
    }

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle tag="span">
                <i onClick={joinRoomHandler} className="ti ti-comments-smiley"></i>
                {/*<i className="ti ti-more"></i>*/}
            </DropdownToggle>
            {/*<DropdownMenu>*/}
            {/*    <DropdownItem >*/}
            {/*        <li onClick={joinRoomHandler}>*/}
            {/*        New chat*/}
            {/*        </li>*/}
            {/*    </DropdownItem>*/}
            {/*</DropdownMenu>*/}
        </Dropdown>
    )
};

export default FriendsDropdown
