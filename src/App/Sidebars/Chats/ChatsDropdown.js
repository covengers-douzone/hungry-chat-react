import React, {useState} from 'react'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import {profileAction} from "../../../Store/Actions/profileAction";
import {mobileProfileAction} from "../../../Store/Actions/mobileProfileAction";
import {useDispatch, useSelector} from "react-redux";
import {reloadAction} from "../../../Store/Actions/reloadAction";
import axios from "axios";
import * as config from "../../../config/config";
import fetchApi from "../../Module/fetchApi";

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
                fetchApi(null, null).updateHeadCount("exit",chat.id, localStorage.getItem("Authorization"))
                dispatch(reloadAction(!reload));
            }).catch(err => {
                console.log(`${err.message}`)
            })
        } catch (e) {
            console.log(e.message);
        }
    }


    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}  disabled={(localStorage.getItem("role") === "ROLE_UNKNOWN")}>
            <DropdownToggle tag="a">
                <i className="ti ti-more"></i>
                {/*<i className="ti ti-trash" style={{color:"red"}}></i>*/}
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={profileActions}>프로필</DropdownItem>
                <DropdownItem onClick={chatDeleteAction}>삭제하기</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
};

export default ChatsDropdown
