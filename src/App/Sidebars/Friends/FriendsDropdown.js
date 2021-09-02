import React, {useState, useEffect} from 'react'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import fetchApi from "../../Module/fetchApi";
import {useDispatch, useSelector} from "react-redux";
import {messageLengthAction} from "../../../Store/Actions/messageLengthAction";
import {reloadAction} from "../../../Store/Actions/reloadAction";


const FriendsDropdown = ({friendNo, friendName}) => {

    const dispatch = useDispatch();

    const {reload} = useSelector(state => state);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [reloadState, setReloadState]=useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    useEffect(()=> {

    },[]);

    const joinRoomHandler = async (event) => {
        event.preventDefault();

        const roomNo = await fetchApi(null, null).createRoom(friendName, 2 ,"private", null , localStorage.getItem("Authorization"));
        console.log("roomNo" , roomNo)
        await fetchApi(null,null).createParticipant(localStorage.getItem("userNo") ,roomNo ,"ROLE_HOST", localStorage.getItem("Authorization") )
        await fetchApi(null,null).createParticipant(friendNo ,roomNo ,"ROLE_MEMBER", localStorage.getItem("Authorization") )
        setReloadState(!reloadState);
        dispatch(reloadAction(!reload));
        // console.log("hi");
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
                <DropdownItem >Profile</DropdownItem>
                <DropdownItem divider/>
                <DropdownItem >Block</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
};

export default FriendsDropdown
