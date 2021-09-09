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

function UploadFileModal(props) {

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

        props.handleFile(file,previewURL);
        props.toggle();
    }

    return (
        <div>
            <Modal isOpen={props.modal} toggle={props.toggle} centered className="modal-dialog-zoom">
                <ModalHeader toggle={props.toggle}>
                    <i className="ti ti-pencil"></i> 파일 올리기
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="avatar">파일</Label>
                            <div className="align-items-center">
                                <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile"
                                     onChange={onloadFile}
                                />
                                <br />
                                <br />
                                {
                                    previewURL ?
                                        <div align={"center"}>
                                            <img
                                                  style={{
                                                    height: "200px"
                                                  }}
                                                  src={previewURL}
                                                  alt="avatar"
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

export default UploadFileModal
