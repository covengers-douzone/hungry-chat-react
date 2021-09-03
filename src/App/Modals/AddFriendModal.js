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

    const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

    const [email, setEmail] = useState();

    const [alertOpen, setAlertOpen] = useState(false);

    const dispatch = useDispatch();

    const {reload} = useSelector(state => state);

    const send = async (event) => {
        event.preventDefault();

        try{
            await axios.post(`${config.URL}/api/addFriend`, {
                username: email,
                Authorization:localStorage.getItem("Authorization"),
                userNo: props.userNo
            })
                .then(res => {
                    setAlertOpen(!alertOpen);
                })
                .catch( err => {
                    alert("일치하는 이메일이 존재하지 않습니다.");
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
                <i className="ti ti-plus btn-icon"></i> Add Friends
            </button>
            <Tooltip
                placement="bottom"
                isOpen={tooltipOpen}
                target={"Tooltip-Add-Friend"}
                toggle={tooltipToggle}>
                Add Friend
            </Tooltip>
            <Modal className="modal-dialog-zoom" isOpen={modal} toggle={modalToggle} centered>
                <ModalHeader toggle={modalToggle}>
                    <i className="ti ti-user mr-2"></i> Add Friends
                </ModalHeader>
                <ModalBody>
                    <Alert isOpen={alertOpen} color="info">Successfully added new friend</Alert>
                    <Form>
                        <FormGroup>
                            <Label for="email">Email addresses</Label>
                            <Input type="text" name="email" id="email" onChange={(event)=>{
                                const { value } = event.target;
                                console.log(value);
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
                    <Button color="primary" onClick={send}>Submit</Button>

                </ModalFooter>
            </Modal>
        </div>
    )
}

export default AddFriendModal
