import React, {useState} from 'react'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'

const FavoritesDropdown = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle tag="span">
                <i className="ti ti-more"></i>
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>New chat</DropdownItem>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem divider/>
                <DropdownItem>Block</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
};

export default FavoritesDropdown
