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

    const downloadFile = (url,filename) => {
        saveAs(url, filename) // Put your image url here.
    }

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
                       height: "500px",
                   }}
            >
                <ModalHeader toggle={props.toggle}>
                    <i className="fa fa-file-o" aria-hidden="true"></i>공유된 파일들
                </ModalHeader>
                <div className={"modal-content"} style={{'flex-direction':'row',height:'500px',alignItems: 'center'}}>
                    <PerfectScrollbar>
                        <div className="align-items-center" style={{height:'30px'}}>
                        </div>
                        {
                            props.fileList && props.fileList.length !== 0 ?
                                props.fileList.map((file,i) => {
                                    const url = config.URL + file.contents.split('public')[1];
                                    const filename = file.contents.split('public')[1].split('--')[1];
                                    const type = filename.split('.')[1];

                                    return( <div style={{alignItems: 'center',display: 'flex',marginLeft: '30px',marginBottom: '10px'}}>
                                        <div style={{alignItems: 'center',display: 'flex', border: '1px', borderColor: '#e1e1e1', borderStyle: 'solid', backgroundColor: 'white', borderRadius: '5px', minHeight: '60px', minWidth: '350px'}}>
                                            <div style={{display: 'inline-block', marginLeft: '10px', marginRight: '10px'}}>
                                                <div style={{paddingRight: '5px',paddingLeft: '5px', paddingTop: '1px', paddingBottom: '1px',border: '1px', borderColor: '#e1e1e1', borderRadius: '10px', backgroundColor: '#e1e1e1'}}>
                                                    <i className="ti ti-download" onClick={() => downloadFile(url,filename)}></i>
                                                </div>
                                            </div>
                                            <div style={{margin: '5px',display: 'flex', justifyContent: 'center'}}>
                                                <div style={{display: 'inline-block', marginRight: '10px'}}>
                                                    {filename}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{alignItems: 'center',margin: '5px',display: 'flex', justifyContent: 'center',border: '1px', borderColor: '#0abb87',borderStyle: 'solid',borderRadius: '5px',height: '60px',width: '80px'}}>
                                            <div style={{display: 'inline-block', color: '#0abb87'}}>
                                                {type}
                                            </div>
                                        </div>
                                    </div>);
                                })
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
