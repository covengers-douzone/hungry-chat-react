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
import ReactPlayer from "react-player";

function UploadVideoModal(props) {

    const [activeTab, setActiveTab] = useState('1');
    const [ file, setFile ] = useState(null);
    const [ previewURL, setPreviewUrl ] = useState(null);
    const [reader, setReader] = useState(null);

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const onloadFile = (event) => {
         event.preventDefault();

         let reader = new FileReader();
         const file = event.target.files[0];

         reader.onloadend = () => {
             setFile(file);
             setPreviewUrl(reader.result);
         }
         reader.readAsDataURL(file);
         setReader(reader);
     }

    const handleSubmit = async event => {
        event.preventDefault();

        // chatFooter에 파일 받은거 올림
        props.handleFile(file,previewURL);

        // 데이터 비우기
        setReader(null);
        setFile(null);
        setPreviewUrl(null);
        props.toggle();
    }

    return (
        <div>
            <Modal isOpen={props.modal} centered className="modal-dialog-zoom">
                <ModalHeader toggle={props.toggle}>
                <i class="fa fa-upload" aria-hidden="true"></i> 동영상 올리기
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="avatar">동영상</Label>
                            <div className="align-items-center">
                                <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile"
                                     onChange={onloadFile}
                                />
                                <br />
                                <br />
                                {
                                    previewURL ?
                                        <div align={"center"}>
                                            <ReactPlayer
                                                  className='react-player'
                                                  url={previewURL}
                                                  width='100%'
                                                  height='100%'
                                                  playing
                                                />
                                        </div>
                                        : null
                                }

                            </div>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>저장하기</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default UploadVideoModal
