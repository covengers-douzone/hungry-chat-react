import React, {useState} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Tooltip,
    Alert,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import * as config from "../../config/config";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {reloadAction} from "../../Store/Actions/reloadAction";



function AddFriendModal( props ) {
    const [modal, setModal] = useState(false);

    const modalToggle = () => setModal(!modal);

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const tooltipToggle = () => {
        setAlertOpen(false);
        setExistFriendFailAlertOpen(false);
        setNotFoundFriendAlertOpen(false);
        setBadRequestAlertOpen(false);

        setTooltipOpen(!tooltipOpen);
    }

    const [email, setEmail] = useState();

    const [alertOpen, setAlertOpen] = useState(false);
    const [existFriendFailAlertOpen, setExistFriendFailAlertOpen] = useState(false);
    const [notFoundFriendAlertOpen, setNotFoundFriendAlertOpen] = useState(false);
    const [badRequestAlertOpen, setBadRequestAlertOpen] = useState(false);

    const dispatch = useDispatch();

    const {reload} = useSelector(state => state);

    const send = async (event) => {
        event.preventDefault();
        setAlertOpen(false);
        setExistFriendFailAlertOpen(false);
        setNotFoundFriendAlertOpen(false);
        setBadRequestAlertOpen(false);

        try{
            await axios.post(`${config.URL}/api/addFriend`, {
                username: email,
                Authorization:localStorage.getItem("Authorization"),
                userNo: Number(localStorage.getItem("userNo"))
            })
                .then(res => {
                    if(res.data.result === 'success'){
                        setAlertOpen(!alertOpen);
                    } else if(res.data.result === "fail" && res.data.message === "이메일이 일치하지 않습니다. 다시 한번 확인해주세요."){
                        setNotFoundFriendAlertOpen(!notFoundFriendAlertOpen);
                    } else if(res.data.result === "fail" && res.data.message === "이미 존재하는 친구입니다. 다시 한번 확인해주세요."){
                        setExistFriendFailAlertOpen(!existFriendFailAlertOpen);
                    } else if(res.data.result === "fail" && res.data.message === "잘못된 요청입니다. 다시 시도해주세요."){
                        setBadRequestAlertOpen(!badRequestAlertOpen);
                    }
                })
                .catch( err => {
                    console.log(`${err.message}`) })
        }catch (e) {
            console.log(e);
        }
        // setModal(!modal); // send 후 닫기
        dispatch(reloadAction(!reload));
    }

    return (
        <div>
            <button className="btn btn-light d-flex align-items-center" onClick={modalToggle} id="Tooltip-Add-Friend">
                <i className="ti ti-plus btn-icon"></i> 친구 추가
            </button>
            <Tooltip
                placement="bottom"
                isOpen={tooltipOpen}
                target={"Tooltip-Add-Friend"}
                toggle={tooltipToggle}>
                친구 추가
            </Tooltip>
            <Modal className="modal-dialog-zoom" isOpen={modal} centered>
                <ModalHeader toggle={modalToggle}>
                    <i className="ti ti-user mr-2"></i> 친구 추가
                </ModalHeader>
                <ModalBody>
                    <Alert isOpen={alertOpen} color="info">성공적으로 친구추가 되었습니다!</Alert>
                    <Alert isOpen={existFriendFailAlertOpen} color="info">이미 존재하는 친구입니다. 다시 한번 확인해주세요.</Alert>
                    <Alert isOpen={notFoundFriendAlertOpen} color="info">이메일이 일치하지 않습니다. 다시 한번 확인해주세요.</Alert>
                    <Alert isOpen={badRequestAlertOpen} color="info">잘못된 요청입니다. 다시 시도해주세요.</Alert>

                    <Form>
                        <FormGroup>
                            <Label for="email">이메일</Label>
                            <Input type="text" name="email" id="email" onChange={(event)=>{
                                const { value } = event.target;
                                setEmail(value);
                            }}/>
                        </FormGroup>
                        {/*<FormGroup>*/}
                        {/*    <Label for="message">Invitation message</Label>*/}
                        {/*    <Input type="textarea" name="message" id="message"/>*/}
                        {/*</FormGroup>*/}
                    </Form>
                </ModalBody>
                <ModalFooter>
                    {/*<Button color="primary" onClick={modalToggle}>Submit</Button>*/}
                    <Button color="primary" onClick={send}>제출하기</Button>

                </ModalFooter>
            </Modal>
        </div>
    )
}

export default AddFriendModal
