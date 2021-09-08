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
import {useDispatch, useSelector} from "react-redux";
import {reloadAction} from "../../Store/Actions/reloadAction";

function AddOpenChatModal({userNo}) {

    const [modal, setModal] = useState(false);

    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const disfetch = useDispatch();
    const {reload} = useSelector(state => state);

    // Create Button Event
    const modalToggle = () => {
        setModal(!modal);
    }

    const createRoom = async () => {
        // const headcount = checkedItems.size + 1
        const roomNo = await fetchApi(null, null).createRoom(title, content === '' ? "Open Chat" : content,1 ,"public", null , localStorage.getItem("Authorization"));
        await fetchApi(null,null).createParticipant(userNo ,roomNo ,"ROLE_HOST", localStorage.getItem("Authorization") )
            // await fetchApi(null,null).createParticipant(item ,roomNo ,"ROLE_MEMBER", localStorage.getItem("Authorization") )
        setModal(!modal);
        disfetch(reloadAction(!reload));
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
            <button className="btn btn-light" onClick={modalToggle} id="Tooltip-Add-Group">
                <i className="fa fa-users"></i>
            </button>
            <Tooltip
                isOpen={tooltipOpen}
                target={"Tooltip-Add-Group"}
                toggle={tooltipToggle}>
                방 만들기
            </Tooltip>
            <Modal className="modal-dialog-zoom" isOpen={modal} toggle={modalToggle} centered>
                <ModalHeader toggle={modalToggle}>
                    <i className="fa fa-users"></i> 방 만들기
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">방 제목</Label>
                            <InputGroup>
                                <Input type="text" name="title" id="title" onChange={ (e) => {
                                    const {value} = e.target
                                    setTitle(value);
                                }}/>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">방 설명</Label>
                            <Input type="textarea" name="description" id="description" onChange={ (e) => {
                                const {value} = e.target
                                setContent(value);
                            }}/>
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

export default AddOpenChatModal
