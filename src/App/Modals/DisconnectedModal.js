import React, {useState} from 'react'
import {Button, Modal, ModalBody, ModalFooter} from "reactstrap";
import {ReactComponent as DisconnectedSvg} from "../../assets/disconnected.svg";

function DisconnectedModal() {

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    return (
        <Modal isOpen={modal} toggle={toggle} centered backdrop="static"
               className="modal-dialog-zoom">
            <ModalBody>
                <div className="connection-error">
                    <h4 className="text-center">연결이 끊겼습니다..</h4>
                    <DisconnectedSvg/>
                </div>
            </ModalBody>
            <ModalFooter className="justify-content-center">
                <Button color="primary" size="lg" onClick={toggle}>재연결</Button>
            </ModalFooter>
        </Modal>
    )
}

export default DisconnectedModal
