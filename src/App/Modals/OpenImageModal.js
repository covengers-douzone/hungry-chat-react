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
import { saveAs } from 'file-saver';

function OpenImageModal(props) {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    let imageHeight = '200px';
    let modalHeight = '300px';
    let marginTop = '50px';

    const getImageSize = (src) => {

        const img = new Image();
        let width;
        let height;

        img.src = src;
        width = img.width;
        height = img.height;

        return {width,height};
    }

    const calculateImageRatio = () => {
        const {width,height} = getImageSize(props.image);

        if(height > 400){
            if(width > height){
                imageHeight = ((height/width)*400).toString() + 'px';
            } else {
                imageHeight = '400px';
            }
            modalHeight = '500px';
        } else {
            imageHeight = height.toString() + 'px';
            modalHeight = (height + 50).toString() + 'px';
            marginTop = '30px';
        }
    }

    const downloadImage = () => {
        const image_name = props.image.split('--');
        saveAs(props.image, image_name[1]) // Put your image url here.
    }

    props.image && calculateImageRatio();

    return (
        <div>
            <Modal isOpen={props.modal} toggle={props.toggle} centered className="modal-dialog-zoom"
                   transparent={true}
                   style={{
                       width: modalHeight,
                   }}
            >
                <div className={"modal-content"} style={{"background-color": null}}>
                    <div className="align-items-center" style={{'margin-top': marginTop}}>
                        {
                            props.image ?
                                <div align={"center"}>
                                    <img
                                          style={{
                                            height: imageHeight
                                          }}
                                          src={props.image}
                                          alt="avatar"
                                    />
                                </div>
                                : null
                        }
                    </div>
                    <ModalFooter style={{padding: '30px','flex-direction': 'column'}}>
                        <div className="align-items-center">
                            <i className="ti ti-download" onClick={() => downloadImage()}></i>
                        </div>
                    </ModalFooter>
                </div>
            </Modal>
        </div>
    )
}

export default OpenImageModal
