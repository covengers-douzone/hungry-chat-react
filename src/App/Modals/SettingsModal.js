import React, {useState, useEffect} from 'react'
import axios from "axios";
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
import * as config from "../../config/config";

function SettingsModal(props) {

    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    const [isOpenDiv, setIsOpenDiv] = useState(false);
    const toggleDiv = () => setIsOpenDiv(!isOpenDiv);
    const [ profileImage, setProfileImage ] = useState();
    const [ nickname, setNickname ] = useState();

    useEffect( () => {
        console.log(localStorage.getItem("userNo"));
        try{
            fetch(`${config.URL}/api/getUserByNo/${localStorage.getItem("userNo")}`, {
                method: 'get',
                credentials: 'include',
                headers: {
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Origin": `${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                    'Content-Type': 'text/plain',
                    'Accept': 'application/json',
                    Authorization: localStorage.getItem("Authorization")
                },
            }).then(res => {
                return res.json();

            }).then(res => {
                setProfileImage(res.data.profileImageUrl);
                setNickname(res.data.nickname);
            })
                .catch(err => {
                console.log(err);
            })
        }catch (err){
            console.log(err);
        }
    }, [])

    // 변경한 데이터 저장하기
    const [ password, setPassword ] = useState(null);
    const [ file, setFile ] = useState(null);

    const send = async event => {
        event.preventDefault();
        console.log(localStorage.getItem("userNo"));
        try{
            console.log(file);
            console.log(nickname);
            console.log(password);

            const formData = new FormData();
            formData.append("file", file);
            formData.append("Authorization", localStorage.getItem("Authorization"));
            formData.append("userNo", localStorage.getItem("userNo"));
            formData.append("nickname", nickname);
            formData.append("password", password);
            console.log(formData);

            await axios.post(`${config.FETCH_API_IP}:${config.FETCH_API_PORT}/api/updateSettings`, formData)
                .then( res => {
                    if(res.status !== 200){
                        throw Error;
                    }
                    console.log(res.data.data);
                    // document.getElementsByClassName("preview-img").src = `${config.FETCH_API_IP}:${config.FETCH_API_PORT}/assets/images/${res.data.data}`
                    setProfileImage(`${config.FETCH_API_IP}:${config.FETCH_API_PORT}/assets/images/${res.data.data}`);
                })
                .catch(err => {console.log(err)})

        }catch (err){
            console.log(err.response + err.message);
        }
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
                                <img className="preview-img" src={profileImage}
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
