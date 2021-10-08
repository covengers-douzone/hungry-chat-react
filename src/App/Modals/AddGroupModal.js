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

import ManAvatar1 from "../../assets/img/man_avatar1.jpg"
import WomenAvatar4 from "../../assets/img/women_avatar4.jpg"
import inviteModal from "./InviteModal";
import fetchApi from "../Module/fetchApi";
import {useDispatch, useSelector} from "react-redux";
import InviteModal from "./InviteModal";
import {friendListAction} from "../../Store/Actions/friendListAction";
import {reloadAction} from "../../Store/Actions/reloadAction";

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
            // 그룹 추가 후 reload
            dispatch(reloadAction(!reload));
            setModal(!modal);
        }

    }

    const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

    // 방 제목 변경
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

    return (
        <div>
            <button className="btn btn-light" onClick={modalToggle} id="Tooltip-Add-Group">
                <i className="fa fa-users"></i>
            </button>
            <Tooltip
                isOpen={tooltipOpen}
                target={"Tooltip-Add-Group"}
                toggle={tooltipToggle}>
                신규 그룹
            </Tooltip>
            <Modal className="modal-dialog-zoom" isOpen={modal} centered>
                <ModalHeader toggle={modalToggle}>
                    <i className="fa fa-users"></i> 신규 그룹
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">방 제목</Label>
                            <InputGroup>
                                <Input hidden="hidden"/>
                                <Input type="text" name="title" id="title" onChange={titleEvent}/>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <p>방 인원 목록</p>
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
                            <Label for="description">방 설명</Label>
                            <Input type="textarea" name="description" id="description" onChange={(e)=>{
                                const {value} = e.target;
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

export default AddGroupModal
