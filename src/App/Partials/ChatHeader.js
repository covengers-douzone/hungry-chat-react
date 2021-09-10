import React, {useState} from 'react'
import {useDispatch} from "react-redux"
import {
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap'
import VoiceCallModal from "../Modals/VoiceCallModal"
import VideoCallModal from "../Modals/VideoCallModal"
import {profileAction} from "../../Store/Actions/profileAction"
import {mobileProfileAction} from "../../Store/Actions/mobileProfileAction";

function ChatHeader(props) {

    const dispatch = useDispatch();

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const profileActions = () => {
        dispatch(profileAction(true));
        dispatch(mobileProfileAction(true))
    };

    return (
        <div className="chat-header">
            <div className="chat-header-user">
                {props.selectedChat.avatar}
                <div>
                    <h5>{props.selectedChat.name}</h5>
                    <small className="text-muted">
                        <i>온라인</i>
                    </small>
                </div>
            </div>
            <div className="chat-header-action">
                <ul className="list-inline">
                    {/*<li className="list-inline-item">
                        <VoiceCallModal/>
                    </li>
                    <li className="list-inline-item">
                        <VideoCallModal/>
                    </li>*/}
                    <li className="list-inline-item" data-toggle="tooltip">
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle
                                tag="span"
                                data-toggle="dropdown"
                                aria-expanded={dropdownOpen}
                            >
                                <button className="btn btn-secondary">
                                    <i className="ti ti-more"></i>
                                </button>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={profileActions} title="프로필">프로필</DropdownItem>
                                {/*<DropdownItem>Add to archive</DropdownItem>
                                <DropdownItem>Delete</DropdownItem>
                                <DropdownItem divider/>
                                <DropdownItem>Block</DropdownItem>*/}
                            </DropdownMenu>
                        </Dropdown>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ChatHeader
