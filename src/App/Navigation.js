import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ReactComponent as Logo} from '../assets/img/logo.svg'
import {Tooltip} from 'reactstrap'
import {sidebarAction} from '../Store/Actions/sidebarAction'
import EditProfileModal from './Modals/EditProfileModal'
import SettingsModal from "./Modals/SettingsModal"
import GameModal from "./Modals/GameModal"
import {mobileSidebarAction} from "../Store/Actions/mobileSidebarAction"
import roleStyle from "./Module/roleStyle";
import fetchApi from "./Module/fetchApi";
import music from "../assets/music/어벤져스 오프닝ost.mp3";
import img from "../assets/img/covengers-logo-white.png"

function Navigation() {

    const {selectedSidebar} = useSelector(state => state);

    const dispatch = useDispatch();
    const [roomList, setRoomList] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const editModalToggle = () => {
        if (localStorage.getItem("role") !== "ROLE_UNKNOWN") {
            setEditModalOpen(!editModalOpen)
        }

    };

    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const [gameModalOpen, setGameModalOpen] = useState(false);

    const settingsModalToggle = () => {
        if (localStorage.getItem("role") !== "ROLE_UNKNOWN") {
            setSettingsModalOpen(!settingsModalOpen)
        }
    };

    const gameModalToggle = () => {
        // if (localStorage.getItem("role") !== "ROLE_UNKNOWN") {
        //     setGameModalOpen(!gameModalOpen)
        // }
        setGameModalOpen(!gameModalOpen)
    };



    let opacity = roleStyle().opacity()


    //이게  < 가 틀리면 > 로 간다
    // ((1 === 1) && (opacity = {opacity : 0.1} )|| (opacity = {opacity : 1.0}))
    // ㅍ
    //  const value =  ((1 === 1) && (opacity = {opacity : 0.1} ))


    const navigationItems = [
        {
            name: 'Chats',
            icon: <i className="ti ti-comment-alt"/>
        },
        {
            name: 'Friends',
            icon: <i className="ti ti-user" style={opacity}></i>,
            notify_badge: true
        },
        {
            name: 'Open-chat',
            icon: <i className="ti ti-themify-favicon"></i>,
        },

    ];

    const handlePageExit = async () => {
        if (localStorage.getItem("role") === "ROLE_UNKNOWN") {

            // 룸 정보를 다 불러오고
            const myRoomList = (await fetchApi(roomList, setRoomList).getRoomList(localStorage.getItem("userNo").toString(), localStorage.getItem("Authorization"))).results;


            // 룸 마다 헤드카운터 - 1  감소 후
            myRoomList.map(async (e, i) => {
                await fetchApi(null, null).updateHeadCount("exit", (myRoomList[i].no).toString(), localStorage.getItem("Authorization"))
            })

            // db에 날린다.
            await fetchApi(null, null).deleteUnknown(localStorage.getItem("userNo").toString(), localStorage.getItem("Authorization"))

        }
        window.location.href = "/"

        localStorage.clear();


    }
    const NavigationItemView = (props) => {

        const {item, tooltipName} = props;

        const [tooltipOpen, setTooltipOpen] = useState(false);

        const toggle = () => setTooltipOpen(!tooltipOpen);
        // req.body.type

        const linkDispatch = (e, name) => {
            e.preventDefault();
            if (localStorage.getItem("role") === "ROLE_UNKNOWN" && (name === "Chats" || name === "Open-chat" || name === "Game")) {
                dispatch(sidebarAction(name));
                dispatch(mobileSidebarAction(true))
            } else if (localStorage.getItem("role") !== "ROLE_UNKNOWN") {
                dispatch(sidebarAction(name));
                dispatch(mobileSidebarAction(true))
            } else {
            }


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


    const audio = new Audio(music)
    const [playing, setPlaying] = useState(true);

    useEffect(()=>{
        // playing ? audio.play() : audio.pause()
        playing && audio.play()
    },[playing])

    const musicStart = () => {
        setPlaying(!playing);
        audio.pause()
    }

    return (
        <nav className="navigation">
            <EditProfileModal modal={editModalOpen} toggle={editModalToggle}/>
            <SettingsModal modal={settingsModalOpen} toggle={settingsModalToggle}/>
            <GameModal modal={gameModalOpen} toggle={gameModalToggle}/>
            <div className="nav-group">
                <ul>
                    <li>
                        <a href={"/chat/" + localStorage.getItem("userNo")} className="logo">
                            <img src={img} style={{width:70, height:70}}/>
                            {/*<Logo/>*/}
                        </a>
                    </li>
                    {
                        navigationItems.map((item, i) => <NavigationItemView key={i} item={item}
                                                                             tooltipName={"Tooltip-" + i}/>)
                    }

                    <li >
                        <li>
                            <a onClick={gameModalToggle}>
                                <i className="ti ti-game" style={opacity}></i>
                            </a>
                        </li>
                    </li>
                    <li >
                        <li>
                            <a id="music" onClick={musicStart}>
                                <i className="ti ti-music" style={opacity}></i>
                            </a>
                        </li>
                    </li>
                    <li className="brackets">
                        <li>
                            <a onClick={settingsModalToggle}>
                                <i className="ti ti-settings" style={opacity}></i>
                            </a>
                        </li>
                    </li>
                    <li>
                        <a onClick={handlePageExit}>
                            <i className="ti ti-power-off"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navigation
