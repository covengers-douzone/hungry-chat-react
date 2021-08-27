import React, {useState} from 'react';
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

import ManAvatar1 from "../../assets/img/man_avatar1.jpg"
import WomenAvatar4 from "../../assets/img/women_avatar4.jpg"
import inviteModal from "./InviteModal";
import fetchApi from "../Module/fetchApi";
import {useSelector} from "react-redux";
import InviteModal from "./InviteModal";





function AddGroupModal() {

    const [modal, setModal] = useState(false);
    const [title , setTitle] = useState("");

    const [openInvite , setOpenInvite] = useState(false);

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const {UserNo} = useSelector(state => state)

    const openInviteModal  = () => {
            setOpenInvite(!openInvite)
    }

    // Create Button Event
    const modalToggle = () => {
        setModal(!modal);
    }

    const createRoom = () => {
        fetchApi(null,null).create(title,2, localStorage.getItem("Authorization"));
        setModal(!modal);
    }

    const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

    // 방 제목 변경
    const titleEvent = (e) => {
        setTitle(e.target.value);
    }

    const addFriends  = (e) =>{

    }
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
            <button className="btn btn-light" onClick={modalToggle} id="Tooltip-Add-Group">
                <i className="fa fa-users"></i>
            </button>
            <Tooltip
                isOpen={tooltipOpen}
                target={"Tooltip-Add-Group"}
                toggle={tooltipToggle}>
                New Group
            </Tooltip>
            <Modal className="modal-dialog-zoom" isOpen={modal} toggle={modalToggle} centered>
                <ModalHeader toggle={modalToggle}>
                    <i className="fa fa-users"></i> New Group
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">방 제목</Label>
                            <InputGroup>
                                <Input type="text" name="title" id="title" onChange = {titleEvent}/>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <p>방 인원 목록</p>
                            <div className="avatar-group">
                                <figure className="avatar" id="Tooltip-Avatar1">
                                    <span className="avatar-title bg-success rounded-circle">T</span>
                                </figure>
                                <AvatarTooltip name="Tobit Spraging" id={1}/>

                                <figure className="avatar" id="Tooltip-Avatar2">
                                    <img src={WomenAvatar4} className="rounded-circle" alt="avatar"/>
                                </figure>
                                <AvatarTooltip name="Cloe Jeayes" id={2}/>

                                <a onClick={openInviteModal} title="Add friends" id="Tooltip-Avatar6">
                                    <InviteModal openValue = {openInvite}/>
                                    <figure className="avatar">
                                        <span className="avatar-title bg-primary rounded-circle">+</span>
                                    </figure>
                                </a>
                                <AvatarTooltip name="Add friends" id={6}/>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">방 설명</Label>
                            <Input type="textarea" name="description" id="description"/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={createRoom}>방 만들기</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default AddGroupModal
