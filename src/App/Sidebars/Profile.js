import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import PerfectScrollbar from "react-perfect-scrollbar"
import {profileAction} from "../../Store/Actions/profileAction"
import {mobileProfileAction} from "../../Store/Actions/mobileProfileAction"
import WomenAvatar5 from "../../assets/img/women_avatar5.jpg"
import WomenAvatar1 from "../../assets/img/women_avatar1.jpg"
import WomenAvatar3 from "../../assets/img/women_avatar3.jpg"
import WomenAvatar4 from "../../assets/img/women_avatar4.jpg"

function Profile() {

    const dispatch = useDispatch();

    const {profileSidebar, mobileProfileSidebar} = useSelector(state => state);

    const profileActions = (e) => {
        e.preventDefault();
        dispatch(profileAction(false));
        dispatch(mobileProfileAction(false))
    };

    return (
        <div className={`sidebar-group ${mobileProfileSidebar ? "mobile-open" : ""}`}>
            <div className={profileSidebar ? 'sidebar active' : 'sidebar'}>
                <header>
                    <span>About</span>
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
                        <div className="text-center">
                            <figure className="avatar avatar-state-danger avatar-xl mb-4">
                                <img src={WomenAvatar5} className="rounded-circle" alt="avatar"/>
                            </figure>
                            <h5 className="text-primary mb-1">Frans Hanscombe</h5>
                            <small className="text-muted">Last seen: Today</small>
                        </div>
                        <hr/>
                        <div className="pl-4 pr-4">
                            <h6>About</h6>
                            <p className="text-muted">I love reading, traveling and discovering new things.
                                You need to be happy in life.</p>
                        </div>
                        <div className="pl-4 pr-4">
                            <h6>Phone</h6>
                            <p className="text-muted">(555) 555 55 55</p>
                        </div>
                        <hr/>
                        <div className="pl-4 pr-4">
                            <h6>Media</h6>
                            <PerfectScrollbar>
                                <div className="files">
                                    <ul className="list-inline">
                                        <li className="list-inline-item">
                                            <a href="/#/">
                                                <figure className="avatar avatar-lg">
                                                    <span className="avatar-title bg-warning">
                                                        <i className="fa fa-file-pdf-o"></i>
                                                    </span>
                                                </figure>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="/#/">
                                                <figure className="avatar avatar-lg">
                                                    <img src={WomenAvatar1} alt="avatar"/>
                                                </figure>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="/#/">
                                                <figure className="avatar avatar-lg">
                                                    <img src={WomenAvatar3} alt="avatar"/>
                                                </figure>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="/#/">
                                                <figure className="avatar avatar-lg">
                                                    <img src={WomenAvatar4} alt="avatar"/>
                                                </figure>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="/#/">
                                                <figure className="avatar avatar-lg">
                                                    <span className="avatar-title bg-success">
                                                        <i className="fa fa-file-excel-o"></i>
                                                    </span>
                                                </figure>
                                            </a>
                                        </li>
                                        <li className="list-inline-item">
                                            <a href="/#/">
                                                <figure className="avatar avatar-lg">
                                                    <span className="avatar-title bg-info">
                                                        <i className="fa fa-file-text-o"></i>
                                                    </span>
                                                </figure>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </PerfectScrollbar>
                        </div>
                        <hr/>
                        <div className="pl-4 pr-4">
                            <h6>City</h6>
                            <p className="text-muted">Germany / Berlin</p>
                        </div>
                        <hr/>
                        <div className="pl-4 pr-4">
                            <h6>Website</h6>
                            <p>
                                <a href="/#/">www.franshanscombe.com</a>
                            </p>
                        </div>
                        <hr/>
                        <div className="pl-4 pr-4">
                            <h6>Social Links</h6>
                            <ul className="list-inline social-links">
                                <li className="list-inline-item">
                                    <a href="/#/" className="btn btn-sm btn-floating btn-facebook">
                                        <i className="fa fa-facebook"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="/#/" className="btn btn-sm btn-floating btn-twitter">
                                        <i className="fa fa-twitter"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="/#/" className="btn btn-sm btn-floating btn-dribbble">
                                        <i className="fa fa-dribbble"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="/#/" className="btn btn-sm btn-floating btn-whatsapp">
                                        <i className="fa fa-whatsapp"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="/#/" className="btn btn-sm btn-floating btn-linkedin">
                                        <i className="fa fa-linkedin"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="/#/" className="btn btn-sm btn-floating btn-google">
                                        <i className="fa fa-google"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="/#/" className="btn btn-sm btn-floating btn-behance">
                                        <i className="fa fa-behance"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="/#/" className="btn btn-sm btn-floating btn-instagram">
                                        <i className="fa fa-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <hr/>
                        <div className="pl-4 pr-4">
                            <div className="form-group">
                                <div className="form-item custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="customSwitch11"/>
                                    <label className="custom-control-label" htmlFor="customSwitch11">Block</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-item custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" defaultChecked
                                           id="customSwitch12"/>
                                    <label className="custom-control-label" htmlFor="customSwitch12">Mute</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-item custom-control custom-switch">
                                    <input type="checkbox" className="custom-control-input" id="customSwitch13"/>
                                    <label className="custom-control-label" htmlFor="customSwitch13">Get
                                        notification</label>
                                </div>
                            </div>
                        </div>
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    )
}

export default Profile
