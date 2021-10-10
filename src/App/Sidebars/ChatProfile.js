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

function ChatProfile() {

    const dispatch = useDispatch();

    const {selectedChat} = useSelector(state => state);
    const {chatProfileSidebar, mobileChatProfileSidebar} = useSelector(state => state);
    const userNo = Number(localStorage.getItem("userNo"));
    const [friendList , setFriendList] = useState([]);
    const [inviteList , setInviteList] = useState([]);

    //방안의 이미지들 보여주기 위한 모달 state
    const [openImageListModalOpen, setOpenImageListModalOpen] = useState(false);
    const [imageList, setImageList] = useState(false);

    const [openKickModalOpen , setOpenKickModalOpen] =  useState(false);
    const [checkedInviteItems, setCheckedInviteItems] = useState(new Set());
    const [checkedKickItems, setCheckedKickItems] = useState(new Set());
    const [openInviteModalOpen , setOpenInviteModalOpen] =  useState(false);


    useEffect(async () => {
        await fetchApi(friendList, setFriendList).getFriendList(userNo, localStorage.getItem("Authorization"))
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
            checkedInviteItems.add(item)
        }

    }
    const callbackInviteComplete = () => {
        if(localStorage.getItem("role") !== "ROLE_UNKNOWN"){
            console.log("친구 초대 완료" , checkedInviteItems)

        }

    }

    const callbackInviteDeleteItem = (item) => {
        if(localStorage.getItem("role") !== "ROLE_UNKNOWN") {
            checkedInviteItems.delete(item)
        }
    }

    const callbackKickAddItem = (item) => {
        if(localStorage.getItem("role") !== "ROLE_UNKNOWN"){
            checkedKickItems.add(item)
        }

    }
    const callbackKickComplete = () => {
        if(localStorage.getItem("role") !== "ROLE_UNKNOWN"){
            console.log("추바  완료" , checkedKickItems)
        }

    }

    const callbackKickDeleteItem = (item) => {
        if(localStorage.getItem("role") !== "ROLE_UNKNOWN") {
            checkedInviteItems.delete(item)
        }
    }
    const handleKickModal = (e) => {

        setCheckedKickItems(new Set())
        setOpenKickModalOpen(!openKickModalOpen)
    }



    const handleInviteModal = async (e) => {
        setCheckedInviteItems(new Set())
        friendList.map(
            (e1 , i1) => {
                selectedChat.otherParticipantNo.map((e2 , i2) =>{
                    if ( e2.User.no === e1.no){

                        friendList.splice(i1 , 1)
                    }
                })

            }
        );
        console.log("friendList" ,friendList)

        setOpenInviteModalOpen(!openInviteModalOpen)
    }
    // modal에서 사용; modal 닫을 때 실행되는 함수
    const editOpenImageListModalToggle = () => {
        // openImageModalOpen : false로 설정
        setOpenImageListModalOpen(!openImageListModalOpen);
    }

    const clickImage = async () => {
        const imageListFromDB = await fetchList(localStorage.getItem("Authorization")).getFileListInRoom(selectedChat.id /*roomNo*/,"IMG");

        setImageList(imageListFromDB);
        // modal open
        setOpenImageListModalOpen(true);
    }

    return (
        <div className={`sidebar-group ${mobileChatProfileSidebar ? "mobile-open" : ""}`}>
            <OpenImageListModal modal={openImageListModalOpen} toggle={editOpenImageListModalToggle} imageList={imageList} />
            <div className={chatProfileSidebar ? 'sidebar active' : 'sidebar'}>
                <header>
                    <span>방 정보</span>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <a href="/#/" onClick={(e) => profileActions(e)}
                               className="btn btn-light">
                                <i className="ti ti-close"></i>
                            </a>
                            <a className="btn btn-light" onClick={(e) => handleKickModal(e)}>
                                <i className="fa fa-ban"/>
                                <RoomKickModal modal = {openKickModalOpen} setModal={setOpenKickModalOpen} userList = {selectedChat.otherParticipantNo}
                                               callbackAddItem = {callbackKickAddItem} callbackDeleteItem={callbackKickDeleteItem}
                                               callbackComplete = {callbackKickComplete}>


                                </RoomKickModal>
                            </a>
                            <a className="btn btn-light" onClick={(e) => handleInviteModal(e)}>
                                <i className="fa fa-info"/>
                                <RoomInviteModal modal = {openInviteModalOpen} setModal={setOpenInviteModalOpen} friendList = {friendList}
                                                 callbackAddItem = {callbackInviteAddItem} callbackDeleteItem={callbackInviteDeleteItem}
                                                 callbackComplete = {callbackInviteComplete}
                                />
                            </a>
                        </li>
                    </ul>

                </header>
                <div className="sidebar-body">
                    <PerfectScrollbar>
                        <hr/>
                        <div className="pl-4 pr-4">
                            <h6>인원 수</h6>
                            <p className="text-muted">{selectedChat.headcount} 명</p>
                        </div>
                        <div className="pl-4 pr-4">
                            <h6>참여자 정보</h6>
                            {
                                // 나
                                <span>
                                    <img src={selectedChat.participant.User.profileImageUrl} id="profile-avatar" className={"rounded-circle"} alt="avatar" style={{float: 'left', width: '20px'}}/>
                                    <p className="text-muted">{'(나) '+selectedChat.participant.User.name}</p>
                                </span>
                            }
                            {
                                // 다른 참가자
                                selectedChat.otherParticipantNo.map(participant => {
                                    // unknown 제외
                                    if(participant.User.no !== 1 || participant.User.no !== 2){
                                        return (
                                            <span>
                                                <img src={participant.User.profileImageUrl} id="profile-avatar" className={"rounded-circle"} alt="avatar" style={{float: 'left', width: '20px'}}/>
                                                <p className="text-muted">{'     '+participant.User.name}</p>
                                            </span>
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
                        <div className="pl-4 pr-4">
                            <h6>파일</h6>
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
                                            <figure className="avatar avatar-lg">
                                                <span className="avatar-title bg-warning">
                                                    <i className="fa fa-file-pdf-o"></i>
                                                </span>
                                            </figure>
                                        </li>
                                        <li className="list-inline-item">
                                            <figure className="avatar avatar-lg">
                                                <span className="avatar-title bg-success">
                                                    <i className="fa fa-file-excel-o"></i>
                                                </span>
                                            </figure>
                                        </li>
                                        <li className="list-inline-item">
                                            <figure className="avatar avatar-lg">
                                                <span className="avatar-title bg-info">
                                                    <i className="fa fa-file-text-o"></i>
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