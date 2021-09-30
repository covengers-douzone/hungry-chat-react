import React, {useState} from 'react'
import {
    Modal,
    ModalFooter,
    ModalBody,
} from 'reactstrap'

import ModalHeader from 'reactstrap/lib/ModalHeader';

function OpenMessageModal(props) {
    let modalHeight = '300px';

    return (
        <div>
            <Modal isOpen={props.modal}  centered className="modal-dialog-zoom"
                   transparent={true}
                   style={{
                       width: modalHeight,                       
                   }}
            >
                <ModalHeader>
                <div>전체 글보기</div>
                </ModalHeader>
                <ModalBody style={{border: "1px solid brown", padding: "0px"}} >
                <div className={"modal-content"} style={{backgroundColor: "#f5f5f5"}}>
                    <div className="align-items-center" style={{backgroundColor: "#f5f5f5" , overflow: "auto", height:"400px"}}>  
                                    <div align={"center"} style={{backgroundColor: "#FAF0E6" }}>
                                        {props.text}
                                    </div>
                    </div>
                </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default OpenMessageModal
