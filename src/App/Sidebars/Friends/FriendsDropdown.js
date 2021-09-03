import React, {useState, useEffect} from 'react'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import fetchApi from "../../Module/fetchApi";
import {useDispatch, useSelector} from "react-redux";
import {messageLengthAction} from "../../../Store/Actions/messageLengthAction";
import {reloadAction} from "../../../Store/Actions/reloadAction";
import {participantNoAction} from "../../../Store/Actions/participantNoAction";
import {roomNoAction} from "../../../Store/Actions/roomNoAction";
import {selectedChatAction} from "../../../Store/Actions/selectedChatAction";
import {mobileSidebarAction} from "../../../Store/Actions/mobileSidebarAction";
import {sidebarAction} from "../../../Store/Actions/sidebarAction";


const FriendsDropdown = ({friendNo, friendName, mobileSidebar, history, mobileSidebarClose}) => {

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
                <i className="ti ti-more"></i>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem >
                    <li onClick={joinRoomHandler}>
                    New chat
                    </li>
                </DropdownItem>
                <DropdownItem divider/>
                {/*<DropdownItem >Profile</DropdownItem>*/}
                {/*<DropdownItem >Block</DropdownItem>*/}
            </DropdownMenu>
        </Dropdown>
    )
};

export default FriendsDropdown
