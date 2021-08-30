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

function InviteModal({userNo,openValue , friendList}) {


    const [modal, setModal] = useState(false);

    const [tooltipOpen, setTooltipOpen] = useState(false);

    useEffect(() => {


        if(openValue === true){
            setModal(true)
            console.log("friendList" , friendList)
        }else{
            setModal(!openValue);
        }

    },[openValue])
    useEffect(() => {
       setModal(false)
    },[])

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
    const modalToggle =  async () => {
        console.log()
        setModal(!modal);
    }
    const inviteFriends = () => {
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
            <Modal className="modal-dialog-zoom" isOpen={modal} toggle={modalToggle} centered>
                <ModalHeader toggle={modalToggle}>
                    <i className="fa fa-users"></i> 친구 목록 {modal}
                </ModalHeader>
                <ModalBody>
                    {
//

                        modal === true ?
                        friendLists.map((item, i) => {
                                return <li key={i} className="list-group-item">
                                    <div className="users-list-body">
                                        <div>
                                            <h5>{item.userNo}</h5>
                                            <p>{item.friendNo}</p>
                                        </div>
                                        <div>
                                            <input type="checkbox" style ={{
                                                width : 20,
                                                height : 20,
                                            }}/>
                                        </div>
                                    </div>
                                </li>
                            }) : null

                    }
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={inviteFriends}>방 만들기</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default InviteModal
