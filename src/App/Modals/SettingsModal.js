import React, {useState, useEffect} from 'react'
import {getNickname} from "../Module/axiosApi";
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
    ModalHeader,
    Input,
    CustomInput,
    Collapse
} from 'reactstrap'
import classnames from 'classnames'

function SettingsModal(props) {

    const [ profileImage, setProfileImage ] = useState("http://simpleicon.com/wp-content/uploads/account.png");
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    const [isOpenDiv, setIsOpenDiv] = useState(false);
    const toggleDiv = () => setIsOpenDiv(!isOpenDiv);


    // 변경한 데이터 저장하기
    const [ nickname, setNickname ] = useState(localStorage.getItem("name"));
    const [ password, setPassword ] = useState(null);
    const [ file, setFile ] = useState(null);

    const send = event => {
        const data = new FormData();
        data.append("file", file);
        data.append("nickname", nickname);
        data.append("userNo", localStorage.getItem("userNo"));
        if(password != null){
            data.append("password", password.toString());
        }
        getNickname(data);
    }

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} centered className="modal-dialog-zoom">
            <ModalHeader toggle={props.toggle}>
                <i className="ti ti-settings"></i> Settings
            </ModalHeader>
            <ModalBody>
                <Nav tabs>
                    <NavItem>
                        <NavLink href="#/"
                            className={classnames({active: activeTab === '1'})}
                            onClick={() => {
                                toggle('1');
                            }}
                        >
                            Account
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/"
                            className={classnames({active: activeTab === '2'})}
                            onClick={() => {
                                toggle('2');
                            }}
                        >
                            Chat
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/"
                            className={classnames({active: activeTab === '3'})}
                            onClick={() => {
                                toggle('3');
                            }}
                        >
                            Profile
                        </NavLink>
                    </NavItem>
                </Nav>
                <Form>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <FormGroup>
                                <CustomInput type="switch" id="accountCustomSwitch1" name="customSwitch"
                                             label="Set nickname using name" defaultChecked/>
                            </FormGroup>
                            <div className="preview text-center">
                                <img className="preview-img" src={ profileImage }
                                     alt="Preview Image" width="200" height="200"/>
                                <div className="browse-button">
                                    <i className="fa fa-pencil-alt"/>
                                    <input className="browse-input" type="file" name="UploadedFile"
                                           id="UploadedFile" onChange={(event) => {
                                               const file = event.target.files[0];
                                               setFile(file);
                                    }}/>
                                </div>
                                <span className="Error"/>
                            </div>
                            <br/>
                            <br/>
                             <div className="setting-account">
                                 <label htmlFor="name"> Nickname </label>
                                <input type="text" name="nickname" placeholder={nickname} onChange={ (event) => {
                                    const { value } = event.target;
                                    setNickname(value);
                                }}/>
                            </div>
                             <div className="setting-account">
                                 <label htmlFor="password"> Password </label>
                                 <input type="password" name="password" onChange={ (event) => {
                                     const { value } = event.target;
                                     setPassword(value);
                                 }}/>
                             </div>
                        </TabPane>
                        <TabPane tabId="2">
                             <div className="setting-account">
                                 <label htmlFor="name"> Background </label>
                                 <input type="file" name="backgroundImageUrl" />
                             </div>
                        </TabPane>
                    </TabContent>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={send}>Save</Button>
            </ModalFooter>
        </Modal>
    )
}

export default SettingsModal
