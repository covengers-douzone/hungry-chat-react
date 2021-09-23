import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import PerfectScrollbar from "react-perfect-scrollbar"
import {chatProfileAction} from "../../Store/Actions/chatProfileAction"
import {mobileChatProfileAction} from "../../Store/Actions/mobileChatProfileAction"
import fetchList from "../Module/fetchList";
import OpenImageListModal from "../Modals/OpenImageListModal";
import OpenImageModal from "../Modals/OpenImageModal";

function ChatProfile() {

    const dispatch = useDispatch();

    const {selectedChat} = useSelector(state => state);
    const {chatProfileSidebar, mobileChatProfileSidebar} = useSelector(state => state);
    const {reload} = useSelector(state => state);

    //방안의 이미지들 보여주기 위한 모달 state
    const [openImageListModalOpen, setOpenImageListModalOpen] = useState(false);
    const [imageList, setImageList] = useState(false);

    let unknownNum; // 알 수 없는 사용자 수

    ( mobileChatProfileSidebar || chatProfileSidebar ) && selectedChat && (unknownNum = selectedChat.otherParticipantNo.filter(other => {return other.User.no === 1}).length);

    const profileActions = (e) => {
        e.preventDefault();
        dispatch(chatProfileAction(false));
        dispatch(mobileChatProfileAction(false))
    };

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
                                    if(participant.User.no !== 1){
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
                        {/*<hr/>*/}
                        {/*<div className="pl-4 pr-4">*/}
                        {/*    <h6>Social Links</h6>*/}
                        {/*    <ul className="list-inline social-links">*/}
                        {/*        <li className="list-inline-item">*/}
                        {/*            <a href="/#/" className="btn btn-sm btn-floating btn-facebook">*/}
                        {/*                <i className="fa fa-facebook"></i>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li className="list-inline-item">*/}
                        {/*            <a href="/#/" className="btn btn-sm btn-floating btn-twitter">*/}
                        {/*                <i className="fa fa-twitter"></i>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li className="list-inline-item">*/}
                        {/*            <a href="/#/" className="btn btn-sm btn-floating btn-dribbble">*/}
                        {/*                <i className="fa fa-dribbble"></i>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li className="list-inline-item">*/}
                        {/*            <a href="/#/" className="btn btn-sm btn-floating btn-whatsapp">*/}
                        {/*                <i className="fa fa-whatsapp"></i>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li className="list-inline-item">*/}
                        {/*            <a href="/#/" className="btn btn-sm btn-floating btn-linkedin">*/}
                        {/*                <i className="fa fa-linkedin"></i>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li className="list-inline-item">*/}
                        {/*            <a href="/#/" className="btn btn-sm btn-floating btn-google">*/}
                        {/*                <i className="fa fa-google"></i>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li className="list-inline-item">*/}
                        {/*            <a href="/#/" className="btn btn-sm btn-floating btn-behance">*/}
                        {/*                <i className="fa fa-behance"></i>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*        <li className="list-inline-item">*/}
                        {/*            <a href="/#/" className="btn btn-sm btn-floating btn-instagram">*/}
                        {/*                <i className="fa fa-instagram"></i>*/}
                        {/*            </a>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                        {/*<hr/>*/}

                    {/*<div className="pl-4 pr-4">*/}
                    {/*    <div className="form-group">*/}
                    {/*        <div className="form-item custom-control custom-switch">*/}
                    {/*            <input type="checkbox" className="custom-control-input" id="customSwitch11"/>*/}
                    {/*            <label className="custom-control-label" htmlFor="customSwitch11">Block</label>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="form-group">*/}
                    {/*        <div className="form-item custom-control custom-switch">*/}
                    {/*            <input type="checkbox" className="custom-control-input" defaultChecked*/}
                    {/*                   id="customSwitch12"/>*/}
                    {/*            <label className="custom-control-label" htmlFor="customSwitch12">Mute</label>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="form-group">*/}
                    {/*        <div className="form-item custom-control custom-switch">*/}
                    {/*            <input type="checkbox" className="custom-control-input" id="customSwitch13"/>*/}
                    {/*            <label className="custom-control-label" htmlFor="customSwitch13">Get*/}
                    {/*                notification</label>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    )}

export default ChatProfile