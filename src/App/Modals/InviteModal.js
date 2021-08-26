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

import {useSelector} from "react-redux";

function InviteModal({openValue}) {
    const friendsList = [{}]

    const [modal, setModal] = useState(false);

    const [tooltipOpen, setTooltipOpen] = useState(false);


    useEffect(() => {

        if(openValue === true){
            setModal(true)
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
    const modalToggle = () => {
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
                    <i className="fa fa-users"></i> 친구 목록
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">이름</Label>

                        </FormGroup>
                        <FormGroup>
                            <p>방 인원 목록</p>
                            <div className="avatar-group">

                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">방 설명</Label>
                            <Input type="textarea" name="description" id="description"/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={inviteFriends}>방 만들기</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default InviteModal
