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
    Collapse, Alert
} from 'reactstrap'
import classnames from 'classnames'
import * as config from "../../config/config";
import {useHistory} from "react-router-dom";

function SettingsModal(props) {

    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    const [isOpenDiv, setIsOpenDiv] = useState(false);
    const toggleDiv = () => setIsOpenDiv(!isOpenDiv);

    // 변경한 데이터 저장하기
    const [ profileImage, setProfileImage ] = useState();
    const [ nickname, setNickname ] = useState();
    const [ name, setName ] = useState();
    const [ comments, setComments ] = useState();
    const [ password, setPassword ] = useState(null);
    const [ file, setFile ] = useState(null);
    const [ username, setUsername ] = useState();
    const [ phoneNumber, setPhoneNumber ]  = useState();
    const [alertOpen, setAlertOpen] = useState(false);
    const [validationOpen, setValidationOpen] = useState(false);


    let history = useHistory();

    useEffect( () => {
        try{
            fetch(`${config.URL}/api/getUserByNo/${localStorage.getItem("userNo")}`, {
                method: 'get',
                credentials: 'include',
                headers: {
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Origin": `${config.URL}`,
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
                setUsername(res.data.username);
                setName(res.data.name);
                setComments(res.data.comments);
            })
                .catch(err => {
                console.log(err);
            })
        }catch (err){
            console.log(err);
        }
    }, [])

    const send = async () => {
        try{
            const formData = new FormData();
            console.log(localStorage.getItem("Authorization"));
            formData.append("file", file);
            formData.append("Authorization", localStorage.getItem("Authorization"));
            formData.append("userNo", localStorage.getItem("userNo"));
            formData.append("comments", comments);
            formData.append("nickname", nickname);
            await axios.post(`${config.URL}/api/updateSettings`, formData)
                .then( res => {
                    if(res.status !== 200){
                        throw Error;
                    }
                    setProfileImage(res.data.data);
                })
                .catch(err => {console.log(err)})

        }catch (err){
            console.log(err.response + err.message);
        }
        // props.toggle();
    }

    const changePasswordHandler = async (e) => {
        setValidationOpen(false);
        setAlertOpen(false);

        if(!/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/.test(password)){
            setValidationOpen(!validationOpen);
            console.log(password)
            return false
        }
        e.preventDefault();
        console.log(username);
        console.log(password);

        if(password !== null){
            try{
                await fetch(`${config.SPRING_URL}/api/auth/passwordupdate`, {
                    method: 'post',
                    credentials: 'include',
                    body:JSON.stringify({
                        username : username,
                        password : password
                    }),
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.SPRING_URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        'Content-Type': 'application/json',
                        // 'Accept': 'application/json',
                        Authorization: localStorage.getItem("Authorization")
                    },
                }).then(res => {
                    if (res.ok){
                        setAlertOpen(!alertOpen);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }catch (err){
                console.log(err);
            }
        } // 여기 else 자리에 validator 넣고 alert 추가해주면 될 듯
    }

    const sendOut = async event => {
        event.preventDefault();
        try{
            // var deleteData = [];
            // deleteData[0].append("Authorization", localStorage.getItem("Authorization"));
            // deleteData[1].append("userNo", localStorage.getItem("userNo"));
            // deleteData[2].append("isDeleted", 1);
            // console.log("deleteData : ", deleteData);

            await axios.post(`${config.URL}/api/deleteUserInfo`, {data : {
                "Authorization" : localStorage.getItem("Authorization"),
                "userNo": localStorage.getItem("userNo"),
                "isDeleted": 1
            }}
            
            )
                .then( res => {
                    if(res.status !== 200){
                        throw Error;
                    }else if(res.status === 200){
                        history.push("/");
                    }
                })
                .catch(err => {console.log(err)})

        }catch (err){
            console.log(err.response + err.message);
        }
        props.toggle();
    }
    return (
        <Modal isOpen={props.modal}  centered className="modal-dialog-zoom">
            <ModalHeader toggle={props.toggle}>
                <i className="ti ti-settings"></i> 설정
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
                            프로필
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/"
                                 className={classnames({active: activeTab === '2'})}
                                 onClick={() => {
                                     toggle('2');
                                 }}
                        >
                            비밀번호 변경
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/"
                            className={classnames({active: activeTab === '3'})}
                            onClick={() => {
                                toggle('3');
                            }}
                        >
                            채팅
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#/"
                            className={classnames({active: activeTab === '4'})}
                            onClick={() => {
                                toggle('4');
                            }}
                        >
                            회원탈퇴
                        </NavLink>
                    </NavItem>
                    {/*<NavItem>*/}
                    {/*    <NavLink href="#/"*/}
                    {/*        className={classnames({active: activeTab === '3'})}*/}
                    {/*        onClick={() => {*/}
                    {/*            toggle('3');*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        Profile*/}
                    {/*    </NavLink>*/}
                    {/*</NavItem>*/}
                </Nav>
                <Form>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <FormGroup>
                                <CustomInput type="switch" id="accountCustomSwitch1" name="customSwitch"
                                             label="이름을 닉네임으로 사용하시겠습니까?" defaultChecked/>
                            </FormGroup>
                            <div className="preview text-center">
                                <img className="preview-img" src={profileImage}
                                     alt="프로필 이미지" width="200" height="200"/>
                                <div className="browse-button">
                                    <i className="fa fa-pencil-alt"/>
                                    <input className="browse-input" type="file" name="UploadedFile"
                                           id="UploadedFile" onChange={(event) => {
                                               const file = event.target.files[0];
                                               setFile(file);
                                               const reader = new FileReader();
                                                reader.readAsDataURL(file);
                                                reader.onloadend = () => {
                                                    setProfileImage(reader.result)
                                                }
                                    }}/>
                                </div>
                                <span className="Error"/>
                            </div>
                            <br/>
                            <br/>

                             <div className="setting-account">
                                 <label htmlFor="name" id="name">이름   </label>
                                <input type="text" name="name" placeholder={name} onChange={ (event) => {
                                    const { value } = event.target;
                                    setName(value);
                                }}/>
                            </div>
                            <div className="setting-account">
                                <label htmlFor="name" id="nickname">닉네임   </label>
                                <input type="text" name="nickname" placeholder={nickname} onChange={ (event) => {
                                    const { value } = event.target;
                                    setNickname(value);
                                }}/>
                            </div>
                            <div className="setting-account">
                                <label htmlFor="name" id="comments">상태 메시지 </label>
                                <input type="text" name="comments" placeholder={comments} onChange={ (event) => {
                                    const { value } = event.target;
                                    setComments(value);
                                }}/>
                            </div>

                        </TabPane>
                        <TabPane tabId="2">
                            <div className="setting-account">
                                <Alert isOpen={alertOpen} color="info">비밀번호가 변경되었습니다.</Alert>
                                <Alert isOpen={validationOpen} color="info">문자,숫자,특수문자포함 8~15자리를 사용해야합니다.</Alert>

                                <div className="setting-account">
                                    <label htmlFor="password" id="password"> 비밀번호 </label>
                                    <input type="password" name="password"  onChange={ (event) => {
                                        const { value } = event.target;
                                        setPassword(value);
                                    }}/>
                                </div>
                            </div> 
                        </TabPane>
                        <TabPane tabId="3">

                            <div className="setting-account">
                                <label htmlFor="name" id="Background"> 배경화면 </label>
                                <input type="file" name="backgroundImageUrl" />
                            </div>

                        </TabPane>
                        <TabPane tabId="4">

                            <div className="setting-account-widhaldraw">
                                 <label>※이용약관</label>
                                 <p>① 회원탈퇴 시 사용자의 정보가 바로 삭제되는 것은 아닙니다.</p>
                                 <p>② 사용자는 탈퇴 후에도 로그인 시 서비스 이용이 가능합니다.</p>
                                 <p>③ 탈퇴 후 3개월 동안 로그인 기록이 없을시 해당 모든 정보가 삭제됩니다.</p>
                            </div> 

                        </TabPane>
                    </TabContent>
                </Form>
            </ModalBody>
            <ModalFooter>
                {
                activeTab != '4'
                ?
                activeTab != '2' ? <Button color="primary" onClick={send}>저장하기</Button> :  <Button color="primary" onClick={changePasswordHandler}>변경하기</Button>
                : 
                <Button color="danger" onClick={sendOut}>탈퇴하기</Button>
                }
            </ModalFooter>
        </Modal>
    )
}

export default SettingsModal
