import React, {useState} from 'react'
import {
    Modal,
    ModalBody,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    ModalHeader,
    Input,
    InputGroupAddon,
    InputGroup,
    InputGroupText,
    CustomInput
} from 'reactstrap'

function OpenImageModal(props) {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <div>
            <Modal isOpen={props.modal} toggle={props.toggle} centered className="modal-dialog-zoom"
                   transparent={true}
                   style={{
                       width: "300px",
                   }}>
                <div className={"modal-content"} style={{"background-color": null}}>
                    <div className="align-items-center">
                        {
                            props.image ?
                                <div align={"center"}>
                                    <img
                                          style={{
                                            height: "200px"
                                          }}
                                          src={props.image}
                                          alt="avatar"
                                    />
                                </div>
                                : null
                        }
                    </div>
                    <ModalFooter>
                        <Button color="primary">저장하기</Button>
                    </ModalFooter>
                </div>
            </Modal>
        </div>
    )
}

export default OpenImageModal
