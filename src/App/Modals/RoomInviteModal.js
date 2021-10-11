import React, {useEffect, useState} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Tooltip,

} from 'reactstrap';
import fetchApi from "../Module/fetchApi";

function RoomInviteModal({
                             modal, setModal, inviteList , setInviteList, callbackAddItem, callbackDeleteItem , callbackComplete
                         }) {



    const [tooltipOpen, setTooltipOpen] = useState(false);

    const [bChecked, setChecked] = useState(false);


    const checkHandler = (item, {target}) => {
        setChecked(!bChecked);
        checkedItemHandler(item, target.checked);

    };

    const checkedItemHandler = (item, isChecked) => {

        if (isChecked) {
            callbackAddItem(item);

        } else if (!isChecked) {
            callbackDeleteItem(item);

        }

    };


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
        setInviteList([])
        setModal(!modal);
    }
    const inviteFriends = () => {
        setInviteList([])
        callbackComplete()
        setModal(!modal);
    }


    return (
        <div>
            <Modal className="modal-dialog-zoom" isOpen={modal} centered>
                <ModalHeader toggle={modalToggle}>
                    <i className="fa fa-info"></i> 친구 초대 {modal}
                </ModalHeader>
                <ModalBody>
                    {
                        modal === true ?
                            inviteList.map((item, i) => {
                                return <li key={i} className="list-group-item">
                                    {item.avatar}
                                    <div className="users-list-body">
                                        <div>
                                            <figure className="avatar">
                                                <img src={item.profileImageUrl} className="rounded-circle"
                                                     alt="avatar"/>
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

export default RoomInviteModal
