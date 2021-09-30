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
import OpenImageModal from "./OpenImageModal";

function OpenImageListModal(props) {

    const [activeTab, setActiveTab] = useState('1');

    // image 클릭 시 image 크게 보이게 하는 modal
    const [openImageModalOpen, setOpenImageModalOpen] = useState(false);
    const [image, setImage] = useState(null); // OpemImageModal에 image source 넘겨주기 위함
    // modal에서 사용; modal 닫을 때 실행되는 함수
    const editOpenImageModalToggle = () => {
        // openImageModalOpen : false로 설정
        setOpenImageModalOpen(!openImageModalOpen);
        // image file 없애기
        setImage(null);
    }

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const imgDivStyle = {
        height: '120px',
        width: '120px',
        float: 'left'
    }

    // 이미지 클릭시 이미지 자세히 보게 하는 모달 열기
    const clickImage = (url) => {
        setImage(url);
        setOpenImageModalOpen(true);
    }

    return (
        <div>
            <Modal isOpen={props.modal} centered className="modal-dialog-zoom"
                   transparent={true}
                   style={{
                       height: "500px"
                   }}
            >
                <OpenImageModal modal={openImageModalOpen} toggle={editOpenImageModalToggle} image={image} />
                <ModalHeader toggle={props.toggle}>
                    <i className="fa fa-file-image-o" aria-hidden="true"></i>이미지 파일들
                </ModalHeader>
                <div className={"modal-content"} style={{'flex-direction':'row',height:'500px'}}>
                    <PerfectScrollbar>
                        <div className="align-items-center" style={{height:'30px'}}>
                        </div>
                        {
                            props.imageList && props.imageList.length !== 0 ?
                                props.imageList.map((image, i) => {
                                    const url = config.URL + image.contents.split('public')[1];
                                    return (
                                        <div align={"center"} style={imgDivStyle} onClick={(e) => {
                                            clickImage(url)
                                        }}>
                                            <img
                                                style={{
                                                    height: "100px",
                                                    margin: '10px'
                                                }}
                                                src={url}
                                                alt="avatar"
                                            />
                                        </div>
                                    );
                                })
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

export default OpenImageListModal
