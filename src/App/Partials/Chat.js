import React, {useEffect, useRef, useState} from 'react'
import ChatHeader from "./ChatHeader"
import ChatFooter from "./ChatFooter"
import PerfectScrollbar from "react-perfect-scrollbar"
import {useDispatch, useSelector} from "react-redux"
import myFetch from "../Module/fetchApi";
import fetchApi from "../Module/fetchApi";
import * as config from "../../config/config";
import {chatForm, chatMessageForm, chatFormList} from "../Module/chatForm";
import OpenImageModal from "../Modals/OpenImageModal";
import OpenMessageModal from "../Modals/OpenMessageModal"
/*오른쪽 마우스 눌렸을 때 나오는 메뉴*/
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import {reloadAction} from "../../Store/Actions/reloadAction";
import {messageLengthAction} from "../../Store/Actions/messageLengthAction";
import io from "socket.io-client";
import {lastReadNoAction} from "../../Store/Actions/lastReadNoAction";
import {headCountAction} from "../../Store/Actions/headCountAction";
import {messageAllLengthAction} from "../../Store/Actions/messageAllLengthAction";
import {joinOKAction} from "../../Store/Actions/joinOKAction";
import UploadFileModal from "../Modals/UploadFileModal";
import {lastPageAction} from "../../Store/Actions/lastPageAction";
import {Link} from "react-router-dom";
import OpenCodeModal from "../Modals/OpenCodeModal";

import {tr} from 'date-fns/locale'

import img from "../../assets/img/covengers-logo-transparency.png"


const Chat = React.forwardRef((props, scrollRef) => {

        const dispatch = useDispatch();

        let scrOnOff = false


        const {selectedChat} = useSelector(state => state);
        const {roomNo} = useSelector(state => state);
        const {roomType} = useSelector(state => state);
        const {participantNo} = useSelector(state => state);
        const {headCount} = useSelector(state => state)
        const {messageAllLength} = useSelector(state => state)
        const {joinOk} = useSelector(state => state)
        const {lastReadNo} = useSelector(state => state)
        const {lastPage} = useSelector(state => state)
        const {markDown} = useSelector(state => state)
        const {codeBlock} = useSelector(state => state)
        const {lastReadNoLength} = useSelector(state => state)
        const [inputMsg, setInputMsg] = useState('');

        const [scrollEl, setScrollEl] = useState();

        const [chatList, setChatList] = useState([]);

        const messageRef = useRef(null);

        //   const [lastPage, setLastPage] = useState(0)
        const [lp, setLp] = useState(0);
        const [sendOk, setSendOk] = useState(true)

        const [deleteOk, setDeleteOk] = useState(true)

        const [chatNo, setChatNo] = useState(null)

        const [pagingOk, setPagingOk] = useState(0)

        const [searchTerm, setSearchTerm] = useState("");
        const [reRender, setReRender] = useState(false);

        const [image, setImage] = useState(null); // OpemImageModal에 image source 넘겨주기 위함
        const [fileType, setFileType] = useState(null); // OpenImageModal에 file type 넘겨줌

        const [text, setText] = useState(null);
        const [messageType, setMessageType] = useState(null);

        const [scrollSwitch, setScrollSwitch] = useState(false)

        const [language , setLanguage] = useState("null")


        // image 클릭 시 image 크게 보이게 하는 modal
        const [openImageModalOpen, setOpenImageModalOpen] = useState(false);
        const [openCodeModalOpen, setOpenCodeModalOpen] = useState(false);

        const [openMessageModalOpen, setOpenMessageModalOpen] = useState(false);

        // modal에서 사용; modal 닫을 때 실행되는 함수
        const editOpenImageModalToggle = () => {
            // openImageModalOpen : false로 설정
            setOpenImageModalOpen(!openImageModalOpen);
            // image file 없애기
            setImage(null);
        }

        const editOpenMessageModalToggle = () => {
            // openMessageModalOpen : false로 설정
            setOpenMessageModalOpen(!openMessageModalOpen);
            setText(null);
        }

        const inputRef = useRef();

        useEffect(() => {
            //console.log("searchTerm", searchTerm)
            const searchList = async () => {
                console.log("handleSearch", searchTerm)
                const chatlist = await fetchApi(chatList, setChatList).getChatSearchList(selectedChat.id, 0, 100, searchTerm, localStorage.getItem("Authorization"))
                const chats = chatFormList(chatlist, participantNo);
                selectedChat.messages = chats;
                setReRender(!reRender);
                console.log('search?', chats);
            }

            if (searchTerm !== "") {
                searchList();
            } else {
                // searchTerm을 지운 경우 젤 마지막 메세지부터 10개 출력
                if (lastPage === lp) {
                    setLp(lastPage + 1);
                } else {
                    setLp(lastPage);
                }

            }

        }, [searchTerm])


        useEffect(() => {
            if (scrollEl) {
                setTimeout(() => {
                    scrollEl.scrollTop = scrollEl.scrollHeight;
                }, 100)
            }
        }, [sendOk])

        useEffect(() => {
            const socket = io.connect(`${config.SOCKET_IP}:${config.SOCKET_PORT}`, {transports: ['websocket']});

            socket.emit("deleteMessage", ({roomNo, chatNo}), async (response) => {
                if (response.status === 'ok') {
                }
            });

            return (() => {
                socket.disconnect();
            })
        }, [deleteOk])

        useEffect(() => {

            setTimeout(() => {
                console.log("스코롤 사용 가능 ")
                setScrollSwitch(true)
            }, 3000)


            setTimeout(async () => {
                if (lastReadNo && scrollEl) { // 마지막 읽은 메시지가 존재 한다면. 스크롤 위치를 최상단에 위치
                    if (messageRef.current) {
                    }
                } else if (scrollEl) {
                    scrollEl.scrollTop = scrollEl.scrollHeight
                    // console.log("current.clientHeight" , scrollEl.current.clientHeight)
                }
            }, 100)


            setLp(lastPage)
            setPagingOk(0)
        }, [joinOk])

        const handleSubmit = (newValue) => {
            const formData = new FormData();
            formData.append("file", newValue.file);
            formData.append("roomNo", roomNo);
            formData.append("participantNo", participantNo);
            formData.append("headCount", headCount);
            formData.append("text", newValue.text);
            formData.append("markDown", markDown);
            formData.append("codeBlock", codeBlock)
            formData.append("Authorization", localStorage.getItem("Authorization"));
            myFetch(null, null).send(formData);
            console.log(" handleSubmit markDown@@@@@@@@@@@@2", markDown)
            setInputMsg("");
            setSendOk(!sendOk)
        };


        const handleSearch = async (e) => {
            setSearchTerm(e.target.value);
        }

        const handleChange = (newValue) => {
            setInputMsg(newValue);
        };


        useEffect(() => {
            console.log('lp 변경', lp)
            const getChatListUp = async () => {
                //  라스트 페이지 넘버가 0이 아니고 , Limit 보다 적다면  0으로 초기화 시킨다  offset이 -로 넘어가면 페이징 처리가 되지 않기때문 .
                if (scrollEl && scrollSwitch === true) {
                    const chatlist = await fetchApi(chatList, setChatList).getChatList(selectedChat.id, lp, messageAllLength, localStorage.getItem("Authorization"))
                    const chats = chatFormList(chatlist, participantNo);
                    selectedChat.messages = chats;
                    console.log("getChatListUp ", lp)
                    console.log('lp > config.CHAT_LIMIT', chats)
                    setPagingOk(pagingOk + 1)
                }
            }
            getChatListUp()
        }, [lp])


        useEffect(() => {
            console.log('-----paging OK 실행');
            // 페이징 후 스크롤 위치 조정
            if (scrollEl) {
                scrollEl.scrollTop = (scrollRef.current.scrollBottom - scrollRef.current.scrollTop) / pagingOk;
            }
        }, [pagingOk])


        // 오른쪽 마우스 눌렸을 때 나타나는 '메시지 삭제' 핸들러
        const handleMessageDelete = async (e, data) => { // data가 Dom의 형태로 나오기 때문에 밑에 과정을 거친다
            let putChatNo = "";
            for (const key in data) {
                //(data[key] === 'target') ? break : (putChatNo += data[key].toString())
                if (data[key] === 'target') {
                    break;
                } else {
                    putChatNo += data[key].toString();
                }
            }
            const splitData = putChatNo.split(",")
            const lastData = splitData[splitData.length - 1].split("["); // 마지막 데이터는 [ 와 표시가 된다 ,
            const chatNo = Number(splitData[0]) // [1] 에서부터 lastData 이전까지  사용하면된다.
            // const index =  Number(lastData[0])  // [1]은 [object ~~ 값 ]
            // await fetchApi(null, null).deleteChatNo(chatNo, localStorage.getItem("Authorization"))
            // const idx = selectedChat.messages.findIndex(e => e.chatNo === chatNo)
            // selectedChat.messages && (selectedChat.messages.splice (idx , 1));
            setChatNo(chatNo)
            setDeleteOk(!deleteOk)


            // console.log(  data , '번 채팅 선택');
        }

        const handleClickMessage = (message) => {
            // image가 있는 message인 경우


            console.log("message", message)
            if (message.type === "IMG") {
                // image source(이미지 저장 위치: localhost:9999/assets/~~~)
                const imgSource = message.text.props.src
                const fileType = message.text.type;
                // open image modal

                console.log("message.text.type", fileType)

                setImage(imgSource);
                setFileType(fileType);
                setOpenImageModalOpen(true);
            } else if (message.type === "MARKDOWN") {


                let splitResult = message.text.props.children.split('\n');



                let language = splitResult[0].split('```')
                let contents = ""
                // for (let i = 1; i < splitResult.length; i++) {
                //     if (splitResult[i] !== "") {
                //         contents = splitResult[i]
                //         break;
                //     }
                // }
                for(let i = 1; i < splitResult.length -1; i++){
                    contents += splitResult[i] + "\n"
                }

                setLanguage(language[1])
                setLanguage(language[1])
                setText(contents)
                setOpenCodeModalOpen(true);

            } else if (message.type === "outgoing-message" || message.type === "TEXT") {
                if (message.text.length > 15) {
                    const messageText = message.text;
                    const messageType = message.text.type;
                    setText(messageText);
                    setMessageType(messageType);
                    setOpenMessageModalOpen(true);
                }
            }


        }


        const messageTime = (fullTime) => {
            // 현재 시각
            let currentTime = new Date();
            currentTime.setHours(currentTime.getHours() + 9);
            currentTime = currentTime.toISOString().replace('T', ' ').substring(0, 19);
            const currentDate = currentTime.split(' ')[0];
            const [currentHours, currentMinutes, currentSeconds] = currentTime.split(' ')[1].split(':');

            const modifiedTime = fullTime.split(' ');
            const date = modifiedTime[0];
            const [hours, minutes, seconds] = modifiedTime[1].split(':');

            let timeForm = hours + ":" + minutes;

            if (currentDate === date) { // 날짜가 같다면(2021-09-09 === 2021-09-09)
                if (currentHours === hours && currentMinutes === minutes) {

                    timeForm = '방금 전';
                    // 보내기 10분 되기 전까지만 이렇게 표시
                } else if (currentHours === hours && currentMinutes - minutes < 10) {
                    timeForm = (currentMinutes - minutes) + '분 전';
                } else if (currentHours - hours === 1 && minutes - currentMinutes > 50) {
                    timeForm = (currentMinutes - minutes + 60) + '분 전';
                }
            }
            return timeForm;
        }

        const MessagesView = (props) => {
            const {message} = props;

            if (message.type === 'divider') {
                return (
                    <div style={{marginRight: "auto", marginLeft: "auto", width: '100%'}}>
                        <div style={{
                            width: '40%',
                            border: 1,
                            borderLeft: 0,
                            borderRight: 0,
                            marginTop: 10,
                            borderStyle: 'solid',
                            borderBlockColor: '#e1e1e1',
                            float: 'left'
                        }}></div>
                        {/*날짜 관련 divider*/}
                        <div className="message-item messages-divider sticky-top" data-label={message.text}
                             style={{
                                 width: '20%',
                                 marginRight: 0,
                                 textAlign: 'center',
                                 maxWidth: '100%',
                                 float: 'left',
                                 color: '#424242'
                             }}>{message.text}</div>
                        <div style={{
                            width: '40%',
                            border: 1,
                            borderLeft: 0,
                            borderRight: 0,
                            marginTop: 10,
                            borderStyle: 'solid',
                            borderBlockColor: '#e1e1e1',
                            float: 'left'
                        }}></div>
                    </div>

                )
            } else {
                return (

                    <div className={"message-item " + message.type} ref={messageRef}
                         id={message.index} onClick={() => handleClickMessage(message)} style={{marginTop: 1}}>
                        <ContextMenuTrigger id={`contextMenu${message.chatNo}`}>
                            {message.profileImageUrl === "" ? "" : <img src={message.profileImageUrl} style={{
                                height: 20,
                                width: 20,
                                borderRadius: 50,
                                float: "left",
                                marginRight: 7
                            }}/>}
                            <p style={{
                                fontWeight: "bold",
                                color: "#9e9e9e",
                                "margin-bottom": "7px",
                                width: 145
                            }}>{message.nickname}</p>

                            <div className={"message-content " + (message.file ? 'message-file' : null)}
                                 onClick={() => handleClickMessage(message)}>
                                {message.file ? message.file : message.text.length > 20 ? message.text.substring(0, 20) + " ..." : message.text}
                            </div>


                            <ContextMenu id={`contextMenu${message.chatNo}`}>
                                <MenuItem id="Message-Information-item" data={`test`} onClick={handleMessageDelete}>
                                    <button> 메세지 정보</button>
                                </MenuItem>
                                <MenuItem id="Message-Delete-item" data={`${message.chatNo},${message.index}`}
                                          onClick={handleMessageDelete}
                                          disabled={(message.participantNo !== participantNo)}>
                                    <button> 메세지 삭제</button>
                                </MenuItem>
                            </ContextMenu>
                        </ContextMenuTrigger>
                        <div className="message-action">
                            {
                                (roomType === "official") ? "" :
                                    message.type !== 'outgoing-message' ?
                                        <div style={{
                                            float: "left",
                                            marginRight: 5,
                                            backgroundColor: "#1faa00",
                                            color: "white",
                                            width: 20,
                                            height: 20,
                                            textAlign: "center",
                                            justifyContent: "center",
                                            borderRadius: 50
                                        }}>{message.notReadCount}</div>
                                        : <div style={{
                                            float: "right",
                                            marginLeft: 5,
                                            backgroundColor: "#1faa00",
                                            color: "white",
                                            width: 20,
                                            height: 20,
                                            textAlign: "center",
                                            justifyContent: "center",
                                            borderRadius: 50
                                        }}>{message.notReadCount}</div>
                            }
                            {
                                message.type !== 'outgoing-message' ?
                                    <div style={{float: "left"}}>{messageTime(message.date)}</div>
                                    : <div style={{float: "right"}}>{messageTime(message.date)}</div>
                            }
                            {/*{message.type ? <i className="ti-double-check text-info"></i> : null}*/}
                        </div>

                    </div>

                );
            }
        };

        const [isOpen, setMenu] = useState(false);  // 메뉴의 초기값을 false로 설정

        const toggleMenu = () => {
            setMenu(isOpen => !isOpen); // on,off 개념 boolean
        }

        const onScroll = (e) => {
            // console.log('--------------------------------------------')
            // console.log('예전 scrollTop',scrollRef.current.scrollTop)
            // console.log('예전 scrollBottom',scrollRef.current.scrollBottom)


            if (searchTerm === "" && e.target.scrollTop < (e.target.scrollHeight / 20) && (scrollRef.current.scrollTop > e.target.scrollTop)) {
                const newLp = lp - config.CHAT_LIMIT < 0 ? 0 : lp - config.CHAT_LIMIT;
                setLp(newLp)

                // lp 변경 후, pagingOk변경되면서(useEffect-pagingOk 참고), 페이징 스크롤 위치 조정됨
                //console.log('scrollll',scrollEl.scrollTop, scrollRef.current.scrollBottom - scrollRef.current.scrollTop)
            }
            scrollRef.current.scrollTop = e.target.scrollTop;
            scrollRef.current.scrollBottom = e.target.scrollHeight;
        }

        return (
            <div className="chat">
                {
                    selectedChat.name
                        ?
                        <React.Fragment>
                            <h3>현재 총 인원 : {selectedChat.headcount}  </h3>
                            <ChatHeader history={props.history} selectedChat={selectedChat}/>
                            <PerfectScrollbar
                                onUpdateSize={(ref) => {
                                    ref.updateScroll();
                                }}
                                containerRef={ref => setScrollEl(ref)} //onYReachStart={handleScrollStart}
                                onScroll={onScroll}
                                ref={scrollRef}
                            >
                                <pre>
                                <div className="chat-body">
                                    <div className="messages">
                                        {
                                            selectedChat.messages
                                                ?
                                                (selectedChat.messages.filter((message) => {
                                                    return message
                                                }).map((message, i) => {
                                                    return <MessagesView message={message} key={i}/>
                                                }))
                                                :
                                                null

                                        }
                                    </div>
                                </div>
                                    </pre>
                            </PerfectScrollbar>
                            <div>
                                <div onClick={toggleMenu}>
                                    <i className="ti ti-search">채팅검색</i>
                                </div>

                                <input
                                    type="text"
                                    className={isOpen ? "show-menu" : "hide-menu"}
                                    placeholder="채팅검색"
                                    ref={inputRef}
                                    onChange={handleSearch}
                                />

                            </div>
                            <ChatFooter onSubmit={handleSubmit} onChange={handleChange} inputMsg={inputMsg}
                                        setInputMsg={setInputMsg}
                            />

                        </React.Fragment>
                        :
                        <div className="chat-body no-message">
                            <div className="no-message-container">
                                <img src={img} style={{width: 150, height: 150, opacity: 0.3}}/>
                                {/*<i className="fa fa-comments-o"></i>*/}
                                <p>COVENGERS</p>
                            </div>
                        </div>
                }
                <OpenImageModal modal={openImageModalOpen} setModal={setOpenImageModalOpen}
                                toggle={editOpenImageModalToggle} image={image} fileType={fileType}/>
                <OpenCodeModal modal={openCodeModalOpen} setModal={setOpenCodeModalOpen} text={text}
                               language={language}/>
                <OpenMessageModal modal={openMessageModalOpen} setModal={setOpenMessageModalOpen}
                                  toggle={editOpenMessageModalToggle} text={text} fileType={messageType}/>
            </div>
        )
    }
)

export default Chat