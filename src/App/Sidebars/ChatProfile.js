// import React, {useState, useEffect} from 'react'
// import {useDispatch, useSelector} from "react-redux"
// import PerfectScrollbar from "react-perfect-scrollbar"
// import fetchApi from "../Module/fetchApi";
//
// function ChatProfile() {
//
//     const dispatch = useDispatch();
//
//     const userNo = Number(localStorage.getItem("userNo"));
//     const userChatProfileList = [];
//     const {reload} = useSelector(state => state);
//     const [chatProfileList, setChatProfileList] = useState([]);
//
//     useEffect( ()=>{
//         try{
//             fetchApi(chatProfileList,setChatProfileList).getRoomList(userNo, localStorage.getItem("Authorization"))
//         }catch (err){
//             console.log(err);
//         }
//     }, [reload]);
//
//     chatProfileList.map((partner, i) => {
//         userChatProfileList.push({
//             no: partner.no,
//             content: partner.content,
//             email: partner.email,
//             comments: partner.comments,
//             phoneNumber: partner.phoneNumber,
//             avatar: <figure className="avatar">
//                 <img src={partner.profileImageUrl} className="rounded-circle" alt="avatar"/>
//             </figure>
//         })
//     });
//     console.log(userChatProfileList);
//
//     JSON.stringify(chatProfileList[1], ["Participants"])
//
//     const {chatProfileSidebar, mobileChatProfileSidebar} = useSelector(state => state);
//
//     const profileActions = (e) => {
//         e.preventDefault();
//         // dispatch(chatprofileAction(false));
//         // dispatch(mobileChatProfileAction(false))
//     };
//
//     return (
//         <div className={`sidebar-group ${mobileChatProfileSidebar ? "mobile-open" : ""}`}>
//             <div className={chatProfileSidebar ? 'sidebar active' : 'sidebar'}>
//                 {
//
//                 chatProfileList.map((item, i) =>
//
//                 <header>
//                     <span>{item.name}의 정보</span>
//                     <ul className="list-inline" key={i}>
//                         <li className="list-inline-item">
//                             <a href="/#/" onClick={(e) => profileActions(e)}
//                                className="btn btn-light">
//                                 <i className="ti ti-close"></i>
//                             </a>
//                         </li>
//                     </ul>
//                 </header>
//                 )
//
//                 }
//
//                 {true && chatProfileList.map((item, i) =>
//
//                 <div className="sidebar-body" key={i}>
//                     <PerfectScrollbar>
//                         <div className="text-center">
//                             <figure className="avatar avatar-state-danger avatar-xl mb-4">
//                                 <img src={item.profileImageUrl} className="rounded-circle" alt="avatar"/>
//                             </figure>
//                             <h5 className="text-primary mb-1">{item.name}</h5>
//                             <small className="text-muted">계정 생성일: {item.createdAt}</small><br/>
//                             <small className="text-muted">최근 로그인: {item.lastLoginAt}</small>
//                         </div>
//                         <hr/>
//                         <div className="pl-4 pr-4">
//                             <h6>이메일</h6>
//                             <p className="text-muted">{item.username}</p>
//                         </div>
//                         <div className="pl-4 pr-4">
//                             <h6>나의상태</h6>
//                             <p className="text-muted">{item.comments}</p>
//                         </div>
//                         <div className="pl-4 pr-4">
//                             <h6>휴대폰</h6>
//                             <p className="text-muted">{item.phoneNumber}</p>
//                         </div>
//
//
//                     </PerfectScrollbar>
//                 </div>
//                 )
//                 }
//             </div>
//         </div>
//     )
// }
//
// export default ChatProfile
