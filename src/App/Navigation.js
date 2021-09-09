import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ReactComponent as Logo} from '../assets/img/logo.svg'
import {Tooltip} from 'reactstrap'
import {sidebarAction} from '../Store/Actions/sidebarAction'
import EditProfileModal from './Modals/EditProfileModal'
import SettingsModal from "./Modals/SettingsModal"
import {mobileSidebarAction} from "../Store/Actions/mobileSidebarAction"

function Navigation() {

    const {selectedSidebar} = useSelector(state => state);

    const dispatch = useDispatch();

    const [editModalOpen, setEditModalOpen] = useState(false);

    const editModalToggle = () => setEditModalOpen(!editModalOpen);

    const [settingsModalOpen, setSettingsModalOpen] = useState(false);

    const settingsModalToggle = () => setSettingsModalOpen(!settingsModalOpen);

    let opacity;

    (1 === 1) ? opacity = {opacity : 0.1} : opacity = {opacity : 1.0}


        //이게  < 가 틀리면 > 로 간다
    // ((1 === 1) && (opacity = {opacity : 0.1} )|| (opacity = {opacity : 1.0}))
    // ㅍ
     //  const value =  ((1 === 1) && (opacity = {opacity : 0.1} ))



    const navigationItems = [
        {
            name: 'Chats',
            icon: <i className="ti ti-comment-alt" style={opacity} />
        },
        {
            name: 'Friends',
            icon: <i className="ti ti-user"></i>,
            notify_badge: true
        },
        {
            name: 'Favorites',
            icon: <i className="ti ti-star"></i>,
        },
        {
            name: 'Open-chat',
            icon: <i className="ti ti-themify-favicon"></i>,
        }
    ];

    const NavigationItemView = (props) => {

        const {item, tooltipName} = props;

        const [tooltipOpen, setTooltipOpen] = useState(false);

        const toggle = () => setTooltipOpen(!tooltipOpen);

        const linkDispatch = (e, name) => {
            e.preventDefault();
            dispatch(sidebarAction(name));
            dispatch(mobileSidebarAction(true))
        };

        return (
            <li>
                <a onClick={e => linkDispatch(e, item.name)} href={item.name}
                   className={`${item.notify_badge ? 'notify_badge' : ''} ${selectedSidebar === item.name ? 'active' : ''}`}
                   id={tooltipName}>
                    {item.icon}
                </a>
                <Tooltip
                    placement="right"
                    isOpen={tooltipOpen}
                    target={tooltipName}
                    toggle={toggle}>
                    {item.name}
                </Tooltip>
            </li>
        )
    };

    return (
        <nav className="navigation">
            <EditProfileModal modal={editModalOpen} toggle={editModalToggle}/>
            <SettingsModal modal={settingsModalOpen} toggle={settingsModalToggle}/>
            <div className="nav-group">
                <ul>
                    <li>
                        <a href={"/"+ localStorage.getItem("userNo")} className="logo">
                            <Logo/>
                        </a>
                    </li>
                    {
                        navigationItems.map((item, i) => <NavigationItemView key={i} item={item}
                                                                             tooltipName={"Tooltip-" + i}/>)
                    }
                    <li className="brackets">
                        <a href="/#/" onClick={editModalToggle}>
                            <i className="ti ti-pencil"></i>
                        </a>
                    </li>
                    <li>
                        <a onClick={settingsModalToggle}>
                                <i className="ti ti-settings"></i>
                        </a>
                    </li>
                    <li>
                        <a href="/" onClick={() => {
                            localStorage.clear();
                        }}>
                            <i className="ti ti-power-off"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation
