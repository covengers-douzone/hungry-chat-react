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


function AddFriendModal({ userNo }) {
    const [modal, setModal] = useState(false);

    const modalToggle = () => setModal(!modal);

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

    const [email, setEmail] = useState();

    const send = async (event) => {
        event.preventDefault();
        try{
            await axios.post(`${config.URL}/api/addFriend`, {
                username: email,
                Authorization:localStorage.getItem("Authorization"),
                userNo:userNo
            })
                .then(res => {
                    if(res.status !== 200){

                    }
                    console.log("hi");
                })
                .catch( err => { console.log(err.response + err.message) })
        }catch (e) {
            console.log(e);
        }

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
                    <Alert color="info">Send invitations to friends.</Alert>
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
