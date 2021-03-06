import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import PerfectScrollbar from "react-perfect-scrollbar"
import {chatProfileAction} from "../../Store/Actions/chatProfileAction"
import {mobileChatProfileAction} from "../../Store/Actions/mobileChatProfileAction"
import fetchList from "../Module/fetchList";
import OpenImageListModal from "../Modals/OpenImageListModal";
import OpenImageModal from "../Modals/OpenImageModal";
import InviteModal from "../Modals/InviteModal";
import {Modal} from "reactstrap";
import RoomInviteModal from "../Modals/RoomInviteModal";
import fetchApi from "../Module/fetchApi";
import RoomKickModal from "../Modals/RoomKickModal";
import roleStyle from "../Module/roleStyle";
import io from "socket.io-client";
import * as config from "../../config/config";
import {reloadAction} from "../../Store/Actions/reloadAction";
import OpenFileListModal from "../Modals/OpenFileListModal";

function ChatProfile() {
    let opacity = roleStyle().opacity()
    const dispatch = useDispatch();

    const {selectedChat} = useSelector(state => state);
    const {chatProfileSidebar, mobileChatProfileSidebar} = useSelector(state => state);
    const {roomNo} = useSelector(state => state)
    const {participantNo} = useSelector(state => state)
    const {reload} = useSelector(state => state)
    const userNo = Number(localStorage.getItem("userNo"));
    const [friendList , setFriendList] = useState([]);
    const [inviteList , setInviteList] = useState([]);

    const [actionOk , setActionOk] = useState(false);

    //방안의 이미지들 보여주기 위한 모달 state
    const [openImageListModalOpen, setOpenImageListModalOpen] = useState(false);
    const [openFileListModalOpen, setOpenFileListModalOpen] = useState(false);

    const [imageList, setImageList] = useState(false);
    const [fileList, setFileList] = useState(false);

    const [openKickModalOpen , setOpenKickModalOpen] =  useState(false);
    const [checkedInviteItems, setCheckedInviteItems] = useState([]);
    const [checkedKickItems, setCheckedKickItems] = useState([]);
    const [openInviteModalOpen , setOpenInviteModalOpen] =  useState(false);


    useEffect( () => {
        (async () => {

            await fetchApi(friendList, setFriendList).getFriendList(userNo, localStorage.getItem("Authorization"))
            console.log("chatProfile result " ,
                await fetchApi(null,null).getParticipantNo(participantNo, localStorage.getItem("Authorization")))
        })()


    },[])

    let unknownNum; // 알 수 없는 사용자 수

    ( mobileChatProfileSidebar || chatProfileSidebar ) && selectedChat && (unknownNum = selectedChat.otherParticipantNo.filter(other => {return other.User.no === 1}).length);

    const profileActions = (e) => {
        e.preventDefault();

         dispatch(chatProfileAction(false));
        dispatch(mobileChatProfileAction(false))
    };


    const callbackInviteAddItem = (item) => {
        if(localStorage.getItem("role") !== "ROLE_UNKNOWN"){
            checkedInviteItems.push(item)
        }

    }
    const callbackInviteComplete = () => {
        if(localStorage.getItem("role") !== "ROLE_UNKNOWN"){
            checkedInviteItems.map(async (e,i) => {
                const results = await fetchApi(null,null).addParticipant(e, roomNo,localStorage.getItem("Authorization"))
                await  fetchApi(null,null).updateHeadCount("join",roomNo,localStorage.getItem("Authorization"))
                console.log("e" , results)
            })

            dispatch(reloadAction(!reload))

        }
    }


    const callbackInviteDeleteItem = (item) => {
        if(localStorage.getItem("role") !== "ROLE_UNKNOWN") {
            checkedInviteItems.splice(item,1)
        }
    }

    const callbackKickAddItem = (item) => {
        if(localStorage.getItem("role") !== "ROLE_UNKNOWN"){
            checkedKickItems.push(item)
        }

    }
    const callbackKickComplete = () => {
        if(localStorage.getItem("role") !== "ROLE_UNKNOWN"){
            checkedKickItems.map(async (e,i) => {

               const results = await fetchApi(null,null).deleteParticipant(e.User.no,e.roomNo,localStorage.getItem("Authorization"))
                await  fetchApi(null,null).updateHeadCount("exit",roomNo,localStorage.getItem("Authorization"))
                await fetchApi(null,null).setStatus(participantNo,0,localStorage.getItem("Authorization"));
                const socket = io.connect(`${config.SOCKET_IP}:${config.SOCKET_PORT}`, {transports: ['websocket']});

                socket.emit("kick", ({roomNo , userNo: e.User.no}) , async (response) => {
                    if (response.status === 'ok') {
                        socket.disconnect();
                    }
                });
               console.log("results" , results)
            })

            dispatch(reloadAction(!reload))
        }

    }

    const callbackKickDeleteItem = (item) => {
        if(localStorage.getItem("role") !== "ROLE_UNKNOWN") {
            checkedInviteItems.splice(item,1)
        }
    }
    const handleKickModal = (e) => {


        console.log("selectedChat.participant.User.no ", selectedChat.participant.role)


        if(selectedChat.participant.role === "ROLE_HOST"){
            setCheckedKickItems([])
            setOpenKickModalOpen(!openKickModalOpen)
        }

    }



    const handleInviteModal = async (e) => {

        console.log("selectedChat" ,selectedChat)

        if(localStorage.getItem("role") !== "ROLE_UNKNOWN"){
        setCheckedInviteItems([])
        friendList.forEach(
            (e1 , i1) => {

                selectedChat.otherParticipantNo.forEach(async (e2 , i2) =>{

                    if ( Number(e2.User.no) === Number(e1.no)){
                        delete friendList[i1]
                    }/*else if ( Number(e2.User.no) !== Number(e1.no)){
                        console.log("푸쉬" , e2.User.no)
                        console.log("푸쉬" , e1.no)
                        inviteList.push(e1)
                    }*/
                })

            }
        );
        console.log("friendList.",friendList)
        setOpenInviteModalOpen(!openInviteModalOpen)
        }
    }
    // modal에서 사용; modal 닫을 때 실행되는 함수
    const editOpenImageListModalToggle = () => {
        // openImageModalOpen : false로 설정
        setOpenImageListModalOpen(!openImageListModalOpen);
    }

    // modal에서 사용; modal 닫을 때 실행되는 함수
    const editOpenFileListModalToggle = () => {
        // openImageModalOpen : false로 설정
        setOpenFileListModalOpen(!openFileListModalOpen);
    }

    const clickImage = async () => {
        const imageListFromDB = await fetchList(localStorage.getItem("Authorization")).getFileListInRoom(selectedChat.id /*roomNo*/,"IMG");

        setImageList(imageListFromDB);
        // modal open
        setOpenImageListModalOpen(true);
    }

    const clickFileList = async () => {
        const fileListFromDB = await fetchList(localStorage.getItem("Authorization")).getFileListInRoom(selectedChat.id /*roomNo*/,"APPLICATION");

        console.log(fileListFromDB)
        setFileList(fileListFromDB);
        setOpenFileListModalOpen(true);
    }

    return (
        <div className={`sidebar-group ${mobileChatProfileSidebar ? "mobile-open" : ""}`}>
            <OpenImageListModal modal={openImageListModalOpen} toggle={editOpenImageListModalToggle} imageList={imageList} />
            <OpenFileListModal modal={openFileListModalOpen} toggle={editOpenFileListModalToggle} fileList={fileList} />
            <div className={chatProfileSidebar ? 'sidebar active' : 'sidebar'}>
                <header>
                    <span className={'text-success'}>Room Info</span>
                    <ul className="list-inline">
                        <li className="list-inline-item">

                            {
                                (selectedChat.otherParticipant.length !== 0) &&
                                (selectedChat.participant.role === "ROLE_HOST" && (selectedChat.name !==  selectedChat.otherParticipantNo[0].User.name)) ?
                                    <a  className="btn btn-danger" onClick={(e) => handleKickModal(e)} style={{marginRight: '15px'}}>
                                        <i className="fa fa-ban"  />
                                        <RoomKickModal modal = {openKickModalOpen} setModal={setOpenKickModalOpen} userList = {selectedChat.otherParticipantNo}
                                                       callbackAddItem = {callbackKickAddItem} callbackDeleteItem={callbackKickDeleteItem}
                                                       callbackComplete = {callbackKickComplete}>


                                        </RoomKickModal>

                                    </a>
                                    : null
                            }

                            {/*(selectedChat.participant.role !== "ROLE_HOST")*/}
                            {

                                (selectedChat.otherParticipant.length !== 0) &&
                                ((selectedChat.name !==  selectedChat.otherParticipantNo[0].User.name)   ) ?
                                <a className="btn btn-success" onClick={(e) => handleInviteModal(e)} style={{marginRight: '15px'}}>
                                    <i className="fa fa-plus" style={opacity}/>
                                    <RoomInviteModal modal={openInviteModalOpen} setModal={setOpenInviteModalOpen}
                                                     inviteList={friendList}
                                                     setInviteList={setInviteList}
                                                     callbackAddItem={callbackInviteAddItem}
                                                     callbackDeleteItem={callbackInviteDeleteItem}
                                                     callbackComplete={callbackInviteComplete}
                                    />
                                </a> : null

                            }{
                            (Number(selectedChat.headcount) === 1 && unknownNum === 0) ?
                                <a className="btn btn-light" onClick={(e) => handleInviteModal(e)}>
                                    <i className="fa fa-info" style={opacity}/>
                                    <RoomInviteModal modal={openInviteModalOpen} setModal={setOpenInviteModalOpen}
                                                     inviteList={friendList}
                                                     setInviteList={setInviteList}
                                                     callbackAddItem={callbackInviteAddItem}
                                                     callbackDeleteItem={callbackInviteDeleteItem}
                                                     callbackComplete={callbackInviteComplete}
                                    />
                                </a> : null
                        }

                            <a onClick={(e) => profileActions(e)}
                               className="btn btn-light">
                                <i className="ti ti-close"></i>
                            </a>
                        </li>


                    </ul>

                </header>
                <div className="sidebar-body">
                    <PerfectScrollbar>
                        <hr/>
                        <div className="pl-4 pr-4 text-success" style={{marginBottom: '3px'}}>
                            <h6>Type</h6>
                            <p className="text-muted">{selectedChat.type === 'private' && selectedChat.otherParticipant.length < 2 ? '1:1 채팅방':
                            selectedChat.type === 'private' ? '그룹방' : '오픈 채팅방'}</p>
                        </div>
                        <hr/>
                        <div className="pl-4 pr-4 text-success" style={{marginBottom: '3px'}}>
                            <h6>Headcount</h6>
                            <p className="text-muted">{selectedChat.headcount} 명</p>
                        </div>
                        <hr/>

                        <div className="pl-4 pr-4 text-success" style={{marginBottom: '3px'}}>
                            <h6>Participant</h6>
                            {
                                // 나
                                <div>
                                    <img src={selectedChat.participant.User.profileImageUrl} id="profile-avatar" className={"rounded-circle"} alt="avatar" style={{display: 'inline-block', width: '30px', height: '30px',marginRight: '10px'}}/>
                                    <p className="text-muted" style={{display: 'inline-block'}}>{'(나) '+selectedChat.participant.User.name + " "} </p>
                                    <b style={{float: 'right'}}>{(selectedChat.participant.role === "ROLE_HOST") ? "방장" : "멤버"}</b>
                                </div>
                            }
                            {
                                // 다른 참가자
                                selectedChat.otherParticipantNo.map(participant => {
                                    // unknown 제외
                                    if(Number(participant.userNo) !== 1 && Number(participant.userNo) !== 2){
                                        return (
                                            <div>
                                                <img src={participant.User.profileImageUrl} id="profile-avatar" className={"rounded-circle"} alt="avatar" style={{display: 'inline-block', width: '30px', height: '30px',marginRight: '10px'}}/>
                                                <p className="text-muted" style={{display: 'inline-block'}}>{'     '+participant.User.name + " " }</p>
                                                <b style={{float: 'right'}}>{(participant.role === "ROLE_HOST") ? "방장" : "멤버"}</b>
                                            </div>
                                        );
                                    }
                                })
                            }
                            {
                                // unknown
                                unknownNum > 0 ?
                                    <span>
                                        <p className="text-muted">{'알 수 없는 참가자 ('+ unknownNum + ')'}</p>
                                    </span>
                                    : null
                            }
                        </div>

                        <hr/>
                        <div className="pl-4 pr-4 text-success" style={{marginBottom: '3px'}}>
                            <h6>File</h6>
                            <PerfectScrollbar>
                                <div className="files">
                                    <ul className="list-inline">
                                        <li className="list-inline-item">
                                            <figure className="avatar avatar-lg" onClick={()=>{clickImage()}}>
                                                <span className="avatar-title bg-info">
                                                    <i className="fa fa-file-image-o" aria-hidden="true"></i>
                                                </span>
                                            </figure>
                                        </li>
                                        <li className="list-inline-item">
                                            <figure className="avatar avatar-lg" onClick={()=>{clickFileList()}}>
                                                <span className="avatar-title bg-success">
                                                    <i className="fa fa-file-o" aria-hidden="true"></i>
                                                </span>
                                            </figure>
                                        </li>
                                    </ul>
                                </div>
                            </PerfectScrollbar>
                        </div>

                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    )}

export default ChatProfile