import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import PerfectScrollbar from "react-perfect-scrollbar"
import * as config from "../../config/config";
import fetchApi from "../Module/fetchApi";
import { followAction } from '../../Store/Actions/followAction'
import { mobilefollowAction } from '../../Store/Actions/mobilefollowAction'

function FollowerProfile() {

    const dispatch = useDispatch();

    const userNo = Number(localStorage.getItem("userNo"));
    const userFollowerList = [];
    const {reload} = useSelector(state => state);
    const [followerList, setFollowerList] = useState([]);
    
    useEffect( ()=>{
        try{
            fetchApi(followerList,setFollowerList).getFollowerList(userNo, localStorage.getItem("Authorization"))
        }catch (err){
            console.log(err);
        }
    }, [reload]);
    followerList.map((follower, i) => {
        userFollowerList.push({
            no: follower.no,
            name: follower.name,
            email: follower.email,
            comments: follower.comments,
            phoneNumber: follower.phoneNumber,
            avatar: <figure className="avatar">
                <img src={follower.profileImageUrl} className="rounded-circle" alt="avatar"/>
            </figure>
        })
    });
    console.log(followerList);

    const {profileSidebar, mobileProfileSidebar} = useSelector(state => state);

    const profileActions = (e) => {
        e.preventDefault();
        dispatch(followAction(false));
        dispatch(mobilefollowAction(false))
    };
    
    return (
        <div className={`sidebar-group ${mobileProfileSidebar ? "mobile-open" : ""}`}>
            <div className={profileSidebar ? 'sidebar active' : 'sidebar'}>
                {true &&
                followerList.map((item, i) => 
                
                <header>
                    <span>{item.name}의 정보</span>
                    <ul className="list-inline" key={i}>
                        <li className="list-inline-item">
                            <a href="/#/" onClick={(e) => profileActions(e)}
                               className="btn btn-light">
                                <i className="ti ti-close"></i>
                            </a>
                        </li>
                    </ul>
                </header>
                )
                }

                {true && followerList.map((item, i) => 
                
                <div className="sidebar-body" key={i}>
                    <PerfectScrollbar>
                        <div className="text-center">
                            <figure className="avatar avatar-state-danger avatar-xl mb-4">
                                <img src={item.profileImageUrl} className="rounded-circle" alt="avatar"/>
                            </figure>
                            <h5 className="text-primary mb-1">{item.name}</h5>
                            <small className="text-muted">계정 생성일: {item.createdAt}</small><br/>
                            <small className="text-muted">최근 로그인: {item.lastLoginAt}</small>
                        </div>
                        <hr/>
                        <div className="pl-4 pr-4">
                            <h6>이메일</h6>
                            <p className="text-muted">{item.username}</p>
                        </div>
                        <div className="pl-4 pr-4">
                            <h6>나의상태</h6>
                            <p className="text-muted">{item.comments}</p>
                        </div>
                        <div className="pl-4 pr-4">
                            <h6>휴대폰</h6>
                            <p className="text-muted">{item.phoneNumber}</p>
                        </div>
                      
                       
                    </PerfectScrollbar>
                </div>
                )
                }
            </div>
        </div>
    )
}

export default FollowerProfile
