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
import PerfectScrollbar from "react-perfect-scrollbar";
import { saveAs } from 'file-saver';
import * as config from "../../config/config";

function OpenFileListModal(props) {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const imgDivStyle = {
        height: '120px',
        width: '120px',
        float: 'left'
    }

    return (
        <div>
            <Modal isOpen={props.modal} centered className="modal-dialog-zoom"
                   transparent={true}
                   style={{
                       height: "500px"
                   }}
            >
                <ModalHeader toggle={props.toggle}>
                    <i className="fa fa-file-o" aria-hidden="true"></i>File List
                </ModalHeader>
                <div className={"modal-content"} style={{'flex-direction':'row',height:'500px'}}>
                    <PerfectScrollbar>
                        <div className="align-items-center" style={{height:'30px'}}>
                        </div>
                        {
                            props.fileList && props.fileList.length !== 0 ?
                                <div></div>
                                // props.imageList.map((image, i) => {
                                //     const url = config.URL + image.contents.split('public')[1];
                                //     return (
                                //         <div align={"center"} style={imgDivStyle}>
                                //             <img
                                //                 style={{
                                //                     height: "100px",
                                //                     margin: '10px'
                                //                 }}
                                //                 src={url}
                                //                 alt="avatar"
                                //             />
                                //         </div>
                                //     );
                                // })
                                :
                                (<div align={"center"} style={{width: '500px'}}>
                                    <h6 style={{'margin-top': '170px'}}>파일이 없습니다.</h6>
                                </div>)
                        }
                    </PerfectScrollbar>
                    <br/>
                </div>
            </Modal>
        </div>
    )
}

export default OpenFileListModal
