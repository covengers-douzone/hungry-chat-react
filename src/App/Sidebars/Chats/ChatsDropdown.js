import React, {useState} from 'react'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import {profileAction} from "../../../Store/Actions/profileAction";
import {mobileProfileAction} from "../../../Store/Actions/mobileProfileAction";
import {useDispatch} from "react-redux";

const ChatsDropdown = () => {

    const dispatch = useDispatch();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const profileActions = () => {
        dispatch(profileAction(true));
        dispatch(mobileProfileAction(true))
    };

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle tag="a">
                <i className="ti ti-more"></i>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={profileActions}>프로필</DropdownItem>
                <DropdownItem>삭제하기</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
};

export default ChatsDropdown
