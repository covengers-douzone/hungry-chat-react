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
import {useDispatch, useSelector} from "react-redux";
import {reloadAction} from "../../Store/Actions/reloadAction";
import fetchApi from "../Module/fetchApi";
import {participantNoAction} from "../../Store/Actions/participantNoAction";
import {joinRoomAction} from "../../Store/Actions/joinRoomAction";
import {sidebarAction} from "../../Store/Actions/sidebarAction";

function OpenChatPasswordModal({modal, setModal, enterPasswordChat, roomList}) {


    const dispatch = useDispatch();
    const {reload} = useSelector(state => state);
    const [password, setPassword] = useState("");
    const [wrongPasswordAlert, setWrongPasswordAlert] = useState(false);

    // // Create Button Event
    // const modalToggle = () => {
    //     setModal(!modal);
    // }
    //
    const confirmPassword = async (e) => {
        e.preventDefault();
        setWrongPasswordAlert(false);
        if(password === enterPasswordChat.password){
            const result = roomList && roomList.filter(room => {
                return room.type === "public" && room.participantNo === enterPasswordChat.participantNo;
            })
            if(result.length === 0){
                const participantNo = (await fetchApi(null,null).createParticipant(localStorage.getItem("userNo") ,enterPasswordChat.id ,"ROLE_MEMBER", localStorage.getItem("Authorization") )).no;
                dispatch(participantNoAction(participantNo));
                dispatch(reloadAction(!reload));
            } else {
                dispatch(participantNoAction(result[0].participantNo));
            }
            dispatch(joinRoomAction(true));
            dispatch(sidebarAction('Chats'));
        }else{
            setWrongPasswordAlert(true);
        }
        dispatch(reloadAction(!reload));
    }
    const modalClose = () => {
        setModal(!modal);
    }

    return (
        <div>
            <Modal className="modal-dialog-zoom" isOpen={modal} centered>
                {/*<ModalHeader toggle={modalToggle}>*/}
                <ModalHeader >
                     <i className="fa fa-users"></i> 비밀번호 입력
                </ModalHeader>
                <ModalBody>
                    <Alert isOpen={wrongPasswordAlert} color="info">비밀번호가 일치하지 않습니다. 다시 한번 확인해주세요.</Alert>
                    <Form>
                        <FormGroup>
                            <Label for="password">비밀번호</Label>
                            <InputGroup>
                                <Input type="password" name="password" id="password" onChange={ (e) => {
                                    const {value} = e.target
                                    setPassword(value);
                                }}/>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={confirmPassword}>입장하기</Button>
                    <Button color="primary" onClick={modalClose}>취소하기</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default OpenChatPasswordModal
