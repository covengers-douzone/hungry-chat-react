import React, {useEffect, useState} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Tooltip,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroup,
} from 'reactstrap';
import fetchApi from "../Module/fetchApi";

import {useSelector} from "react-redux";
import {friendLists} from "../Sidebars/Friends/Data";
import FriendsDropdown from "../Sidebars/Friends/FriendsDropdown";
import friendListReducer from "../../Store/Reducers/friendListReducer";
import WomenAvatar4 from "../../assets/img/women_avatar4.jpg";

function InviteModal({
                         openValue,
                         friendList,
                         callbackItem,
                         callbackAddItem,
                         callbackDeleteItem,
                         callbackComplete
                     }) {

    const [modal, setModal] = useState(false);

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const [bChecked, setChecked] = useState(false);


    const checkHandler = (item, {target}) => {
        setChecked(!bChecked);
        checkedItemHandler(item, target.checked);

    };

    const checkedItemHandler = (item, isChecked) => {
        console.log("friendList" , friendList)
        if (isChecked) {
            callbackAddItem(item);
            //  callbackItem(no);
        } else if (!isChecked) {
            callbackDeleteItem(item);
            //    callbackItem(no);
        }

    };

    useEffect(() => {

        if (openValue === true) {
            setModal(true)
        } else {
            setModal(!openValue);
        }

    }, [openValue])
    useEffect(() => {
        setModal(false)
    }, [])

    useEffect(() => {
        function handleTouchMove(event) {
            if (modal) {
                event.preventDefault(); // 여기가 핵심
            }
        }
        window.addEventListener("touchmove", handleTouchMove, {
            passive: false
        });
        return () =>
            window.removeEventListener("touchmove", handleTouchMove);
    }, [modal]);

    // Create Button Event
    const modalToggle = async () => {
        setModal(!modal);
    }
    const inviteFriends = () => {
        callbackComplete()
        setModal(!modal);
    }

    const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

    const AvatarTooltip = (props) => {

        const [tooltipOpen, setTooltipOpen] = useState(false);

        const toggle = () => setTooltipOpen(!tooltipOpen);

        return <Tooltip
            placement="top"
            isOpen={tooltipOpen}
            target={"Tooltip-Avatar" + props.id}
            toggle={toggle}>
            {props.name}
        </Tooltip>
    };


    return (
        <div>
            <Modal className="modal-dialog-zoom" isOpen={modal} centered>
                <ModalHeader toggle={modalToggle}>
                    <i className="fa fa-users"></i> 친구 목록 {modal}
                </ModalHeader>
                <ModalBody>
                    {
                        modal === true ?
                            friendList.map((item, i) => {
                                return <li key={i} className="list-group-item">
                                    {item.avatar}
                                    <div className="users-list-body">
                                        <div>
                                            <figure className="avatar">
                                                <img src={item.profileImageUrl} className="rounded-circle" alt="avatar"/>
                                            </figure>

                                            <h5>{item.name}</h5>
                                            <p>{item.nickname}</p>
                                        </div>
                                        <div>
                                            <input type="checkbox" key={i} style={{
                                                width: 20,
                                                height: 20,
                                            }} onChange={(e) => checkHandler(item, e)}/>
                                        </div>
                                    </div>
                                </li>
                            }) : null

                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={inviteFriends}>선택</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default InviteModal
