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
import {saveAs} from 'file-saver';
import ReactPlayer from 'react-player';
import {CopyBlock, dracula} from "react-code-blocks";
import {sample, TopBar} from "../CodeBlock";
import PerfectScrollbar from "react-perfect-scrollbar"

function OpenCodeModal(props) {

    const [activeTab, setActiveTab] = useState('1');
    const [lineNumbers, toggleLineNumbers] = useState(true);
// Create Button Event
    const modalToggle = () => {

        props.setModal(!props.modal)

    }

    const codeCopy = () => {
        props.setModal(false)
    }

    return (
        <div>
            <Modal style={{minWidth: '75%'}}
                   className="modal-dialog-zoom" isOpen={props.modal} centered>
                <ModalHeader toggle={modalToggle}>
                    <i className="fa fa-code">
                    </i> 코드 창
                </ModalHeader>

                <ModalBody>
                    <div className="container mx-auto p-4">
                        {/*<a><b>코드라인</b></a>*/}
                        {/*<input type={"checkbox"}/>*/}
                        <div>
                            <PerfectScrollbar>
                                <div className="demo" style={{maxHeight: '300px'}}>
                                    <CopyBlock

                                        language={props.language}
                                        text={props.text}
                                        wrapLines={true}
                                        theme={dracula}
                                        showLineNumbers={true}
                                        codeBlock

                                    />
                                </div>
                            </PerfectScrollbar>
                        </div>
                    </div>
                </ModalBody>

            </Modal>
        </div>
    )
}

export default OpenCodeModal
