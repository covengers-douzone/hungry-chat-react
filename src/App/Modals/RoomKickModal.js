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

function RoomKickModal({
                           modal, setModal, userList, callbackAddItem, callbackDeleteItem, callbackComplete
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
        console.log("userList@@@@@@@@@@@@@@@@@@@@@@@ ", userList)
        setModal(!modal);
    }
    const KickUsers = () => {
        callbackComplete()
        setModal(!modal);
    }


    return (
        <div>
            <Modal className="modal-dialog-zoom" isOpen={modal} centered>
                <ModalHeader toggle={modalToggle}>
                    <i className="fa fa-ban"></i> 인원 추방 {modal}
                </ModalHeader>
                <ModalBody>
                    {
                        modal === true ?
                            userList.map((item, i) => {
                                return       (item.User.no !== 1 && item.User.no !== 2) && <li key={i} className="list-group-item">
                                    {item.avatar}
                                    <div className="users-list-body">
                                        <div>
                                            <figure className="avatar">
                                                <img src={item.User.profileImageUrl} className="rounded-circle"
                                                     alt="avatar"/>
                                            </figure>

                                            <h5>{item.User.name}</h5>
                                            <p>{item.User.nickname}</p>
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
                    <Button color="primary" onClick={KickUsers}>선택</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default RoomKickModal
