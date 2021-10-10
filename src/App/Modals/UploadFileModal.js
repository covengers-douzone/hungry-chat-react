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
import Files from 'react-files'

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
         const fileType = file.type.split('/')[0];

         console.log('file',file,fileType)
         reader.readAsDataURL(file);
         reader.onloadend = () => {
             setFile(file);
             if(fileType === 'image'){
                 setPreviewUrl(reader.result);
             } else if(fileType === 'application'){

             }
         }
         setReader(reader);
     }

    const handleSubmit = async event => {
        event.preventDefault();

        const fileType = file.type.split('/')[0];

        // chatFooter에 파일 받은거 올림
        fileType === 'image' && props.handleFile(file,previewURL);
        fileType === 'application' && props.handleFile(file,null);

        // 데이터 비우기
        setReader(null);
        setFile(null);
        setPreviewUrl(null);
        props.toggle();
    }

    return (
        <div>
            <Modal isOpen={props.modal}  centered className="modal-dialog-zoom">
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
