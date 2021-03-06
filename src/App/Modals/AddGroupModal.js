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
    InputGroup, Alert,
} from 'reactstrap';

import ManAvatar1 from "../../assets/img/man_avatar1.jpg"
import WomenAvatar4 from "../../assets/img/women_avatar4.jpg"
import inviteModal from "./InviteModal";
import fetchApi from "../Module/fetchApi";
import {useDispatch, useSelector} from "react-redux";
import InviteModal from "./InviteModal";
import {friendListAction} from "../../Store/Actions/friendListAction";
import {reloadAction} from "../../Store/Actions/reloadAction";
import io from "socket.io-client";
import * as config from "../../config/config";

function AddGroupModal({friendList}) {

    const [modal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const userNo = Number(localStorage.getItem("userNo"));

    const [openInvite, setOpenInvite] = useState(false);

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const [checkedItems, setCheckedItems] = useState(new Set());

    const dispatch = useDispatch();

    const [completeInvite , setCompleteInvite] = useState(false)

    const [createdRoom, setCreatedRoom] = useState(false);

    const {reload} = useSelector(state => state);

    const callbackSetItem = (checkItems) => {
        if(localStorage.getItem("role") !== "ROLE_UNKNOWN")
            setCheckedItems(checkItems)
    }
    const callbackComplete = () => {
        if(localStorage.getItem("role") !== "ROLE_UNKNOWN")
            setCompleteInvite(!completeInvite)
    }
    const callbackAddItem = (value) => {
        if(localStorage.getItem("role") !== "ROLE_UNKNOWN")
        checkedItems.add(value)
    }
    const callbackDeleteItem = (value) => {
        if(localStorage.getItem("role") !== "ROLE_UNKNOWN")
        checkedItems.delete(value)
    }


    const openInviteModal = async () => {
        if(localStorage.getItem("role") !== "ROLE_UNKNOWN")
        {
            setCheckedItems(new Set())
            setOpenInvite(!openInvite)
        }
    }

    // Create Button Event
    const modalToggle = () => {
        if(localStorage.getItem("role") !== "ROLE_UNKNOWN")
        setModal(!modal);
    }

    const createRoom = async () => {
        if(localStorage.getItem("role") !== "ROLE_UNKNOWN"){
            const headcount = checkedItems.size + 1
            const roomNo = await fetchApi(null, null).createRoom(title,content === '' ? "Private Chat" : content, headcount ,"private", null , localStorage.getItem("Authorization"));

            await fetchApi(null,null).createParticipant(userNo ,roomNo ,"ROLE_HOST", localStorage.getItem("Authorization") )

            Array.from(checkedItems).map(async (item, index) => (
                await fetchApi(null,null).createParticipant(item.no ,roomNo ,"ROLE_MEMBER", localStorage.getItem("Authorization") )
            ));
            // ?????? ?????? ??? reload
            dispatch(reloadAction(!reload));
            setCreatedRoom(true);
            setModal(!modal);
        }

    }

    const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

    // ??? ?????? ??????
    const titleEvent = (e) => {
        setTitle(e.target.value);
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

    useEffect(() => {

        if(createdRoom){
            const socket = io.connect(`${config.SOCKET_IP}:${config.SOCKET_PORT}`, {transports: ['websocket']});

            const invitedMembers = Array.from(checkedItems).map(member => {
                return member.no
            })
            socket.emit("createdRoom", invitedMembers , async (response) => {
                if (response.status === 'ok') {
                    socket.disconnect();
                }
            });
            console.log('createdRoom',invitedMembers)

            setCreatedRoom(false)
        }

    },[createdRoom])

    return (
        <div>
            <button className="btn btn-light" onClick={modalToggle} id="Tooltip-Add-Group">
                <i className="fa fa-users"></i>
            </button>
            <Tooltip
                isOpen={tooltipOpen}
                target={"Tooltip-Add-Group"}
                toggle={tooltipToggle}>
                ?????? ??????
            </Tooltip>
            <Modal className="modal-dialog-zoom" isOpen={modal} centered>
                <ModalHeader toggle={modalToggle}>
                    <i className="fa fa-users"></i> ?????? ??????
                </ModalHeader>
                <ModalBody>
                    <Alert isOpen={checkedItems.size < 2} color="info">????????? 2????????? ??????????????????.</Alert>
                    <Form>
                        <FormGroup>
                            <Label for="title">??? ??????</Label>
                            <InputGroup>
                                <Input hidden="hidden"/>
                                <Input type="text" name="title" id="title" onChange={titleEvent}/>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <p>??? ?????? ??????</p>
                            <div className="avatar-group">

                                {
                                    Array.from(checkedItems).map((item, index) => (

                                            <figure className="avatar" >
                                                <img src={item.profileImageUrl} className="rounded-circle" alt="avatar"/>
                                            </figure>
                                    ))
                                }



                                <a onClick={openInviteModal} title="Add friends" id="Tooltip-Avatar6">
                                    <InviteModal openValue={openInvite}
                                                 friendList={friendList} callbackItem={callbackSetItem}
                                                 callbackAddItem={callbackAddItem}
                                                 callbackDeleteItem={callbackDeleteItem}
                                                 callbackComplete ={callbackComplete}
                                    />
                                    <figure className="avatar">
                                        <span className="avatar-title bg-primary rounded-circle">+</span>
                                    </figure>
                                </a>
                                <AvatarTooltip name="Add friends" id={6}/>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">??? ??????</Label>
                            <Input type="textarea" name="description" id="description" onChange={(e)=>{
                                const {value} = e.target;
                                setContent(value);
                            }}/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={createRoom} disabled={checkedItems.size < 2}>??? ?????????</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default AddGroupModal
