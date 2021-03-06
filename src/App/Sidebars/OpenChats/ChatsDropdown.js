import React, {useState} from 'react'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import {profileAction} from "../../../Store/Actions/profileAction";
import {mobileProfileAction} from "../../../Store/Actions/mobileProfileAction";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import * as config from "../../../config/config";
import {reloadAction} from "../../../Store/Actions/reloadAction";
import {participantNoAction} from "../../../Store/Actions/participantNoAction";
import {roomNoAction} from "../../../Store/Actions/roomNoAction";
import {roomTypeAction} from "../../../Store/Actions/roomTypeAction";
import {selectedChatAction} from "../../../Store/Actions/selectedChatAction";
import {sidebarAction} from "../../../Store/Actions/sidebarAction";

const ChatsDropdown = ({chat}) => {

    const dispatch = useDispatch();
    const {reload} = useSelector(state => state);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const profileActions = () => {

            dispatch(profileAction(true));
            dispatch(mobileProfileAction(true))

    };

    const chatDeleteAction = async () => {
        try {
            await axios.post(`${config.URL}/api/deleteChat`, {
                openChatHostCheck: chat.openChatHostCheck,
                participantNo: chat.participantNo,
                roomNo: chat.id,
                Authorization: localStorage.getItem("Authorization"),
            }).then(res => {
                dispatch(reloadAction(!reload));
                dispatch(participantNoAction(false))
                dispatch(roomNoAction(false))
                dispatch(roomTypeAction(false))
                dispatch(selectedChatAction(false));
                dispatch(sidebarAction('Chats'));
            }).catch(err => {
                console.log(`${err.message}`)
            })
        } catch (e) {
            console.log(e.message);
        }
    }
    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle tag="a">
                <i className="ti ti-more"></i>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={profileActions}>?????????</DropdownItem>
                {(chat.openChatHost.no === Number(localStorage.getItem("userNo"))) && <DropdownItem onClick={chatDeleteAction}>????????????</DropdownItem>}

            </DropdownMenu>
        </Dropdown>
    )
};

export default ChatsDropdown
