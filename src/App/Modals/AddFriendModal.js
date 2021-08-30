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

function AddFriendModal() {
    const [modal, setModal] = useState(false);

    const modalToggle = () => setModal(!modal);

    const [tooltipOpen, setTooltipOpen] = useState(false);

    const tooltipToggle = () => setTooltipOpen(!tooltipOpen);

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
                            <Input type="text" name="email" id="email"/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="message">Invitation message</Label>
                            <Input type="textarea" name="message" id="message"/>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={modalToggle}>Submit</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default AddFriendModal
