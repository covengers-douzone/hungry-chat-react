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
import fetchApi from "../Module/fetchApi";
import {useSelector} from "react-redux";




function AddGroupModal() {

    const [modal, setModal] = useState(false);
    const [friendsModal , setFriendsModal] = useState(false)

    const [title , setTitle] = useState("");

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const {UserNo} = useSelector(state => state)

    // Create Button Event
    const modalToggle = () => {
        setModal(!modal);
    }

    const inviteFriends = () => {
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
                친구 목록
            </Tooltip>
            <Modal className="modal-dialog-zoom" isOpen={modal} toggle={modalToggle} centered>
                <ModalHeader toggle={modalToggle}>
                    <i className="fa fa-users"></i> 친구 목록
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

export default AddGroupModal
