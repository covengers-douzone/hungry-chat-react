import React, {useEffect, useRef, useState} from 'react'
import ChatHeader from "./ChatHeader"
import ChatFooter from "./ChatFooter"
import PerfectScrollbar from "react-perfect-scrollbar"
import {useDispatch, useSelector} from "react-redux"
import myFetch from "../Module/fetchApi";
import fetchApi from "../Module/fetchApi";
import * as config from "../../config/config";
import {chatForm, chatMessageForm} from "../Module/chatForm";
/*오른쪽 마우스 눌렸을 때 나오는 메뉴*/
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import {reloadAction} from "../../Store/Actions/reloadAction";
import {messageLengthAction} from "../../Store/Actions/messageLengthAction";
import io from "socket.io-client";
import {lastReadNoAction} from "../../Store/Actions/lastReadNoAction";
import {headCountAction} from "../../Store/Actions/headCountAction";
import {messageAllLengthAction} from "../../Store/Actions/messageAllLengthAction";
import {joinOKAction} from "../../Store/Actions/joinOKAction";


const Chat = React.forwardRef((props, scrollRef) => {

    const dispatch = useDispatch

    const socket = io.connect(`${config.SOCKET_IP}:${config.SOCKET_PORT}`, {transports: ['websocket']});

    const {selectedChat} = useSelector(state => state);
    const {roomNo} = useSelector(state => state);
    const {participantNo} = useSelector(state => state);
    const {headCount} = useSelector(state => state)
    const {messageAllLength} = useSelector(state => state)
    const {joinOk} = useSelector(state => state)
    const {lastReadNo} = useSelector(state => state)

    const [inputMsg, setInputMsg] = useState('');

    const [scrollEl, setScrollEl] = useState();

    const [chatList, setChatList] = useState([]);

    const messageRef = useRef(null);

    const [lastPage, setLastPage] = useState(0)

    const [sendOk, setSendOk] = useState(true)

    const [deleteOk, setDeleteOk] = useState(true)

    const [chatNo , setChatNo] = useState(null)

    const [testOk, setTestOk] = useState(0)

    const [searchTerm, setSearchTerm] = useState("");

    const inputRef = useRef();

    useEffect(() => {
        if (scrollEl) {
            setTimeout(() => {
                scrollEl.scrollTop = scrollEl.scrollHeight;
            }, 100)
        }
    }, [sendOk])

    useEffect(() => {


        socket.emit("deleteMessage", ({roomNo , chatNo}) , async (response) => {
            if (response.status === 'ok') {
            }
        })


    }, [deleteOk])

    useEffect(() => {
        if (lastReadNo && scrollEl) { // 마지막 읽은 메시지가 존재 한다면. 스크롤 위치를 최상단에 위친
            scrollEl.scrollTop = scrollEl.scrollTop + 10
        } else if (scrollEl) {
            scrollEl.scrollTop = scrollEl.scrollHeight
        }

        setTestOk(0)
        setLastPage(messageAllLength.count - config.CHAT_LIMIT)
    }, [joinOk])

    const handleSubmit = (newValue) => {
        const formData = new FormData();
        formData.append("file", newValue.file);
        formData.append("roomNo", roomNo);
        formData.append("participantNo", participantNo);
        formData.append("headCount", headCount);
        formData.append("text", newValue.text);
        formData.append("Authorization", localStorage.getItem("Authorization"));
        myFetch(null, null).send(formData);
        setInputMsg("");
        setSendOk(!sendOk)
    };


    const handleInputMsg = (msg) => {
        setInputMsg(msg);
    }

    const handleChange = (newValue) => {
        setInputMsg(newValue);
    };


    useEffect(() => {
        const getChatListUp = async () => {
            //  라스트 페이지 넘버가 0이 아니고 , Limit 보다 적다면  0으로 초기화 시킨다  offset이 -로 넘어가면 페이징 처리가 되지 않기때문 .

            if (lastPage && lastPage >= 0) {
                if (lastPage < config.CHAT_LIMIT) {
                    const chatlist = await fetchApi(chatList, setChatList).getChatList(selectedChat.id, 0, messageAllLength.count, localStorage.getItem("Authorization"))
                    const chats = chatlist.map((chat,i) => chatForm(chat,participantNo,i));
                    selectedChat.messages = chats;
                } else {
                    const chatlist = await fetchApi(chatList, setChatList).getChatList(selectedChat.id, lastPage, messageAllLength.count, localStorage.getItem("Authorization"))
                    const chats = chatlist.map((chat,i) => chatForm(chat,participantNo,i));
                    selectedChat.messages = chats;
                }

            }

        }
        getChatListUp()
    }, [lastPage])


    // 스코롤을 위로 이동시 발동하는 핸들러
    const handlePaging = async (a) => {
        // if (scrollRef && lastPage >= 0 ){
        //     console.log("handlePaging")
        //     setLastPage(lastPage - config.CHAT_LIMIT)
        // }

    }

    // 스크롤이 맨 위에 위치 했을때 실행되는 핸들러
    const handleScrollStart = async (e) => {


        // 맨위가 아닌 , 스코롤이 존재하며 , 페이지가 완료가 되지 않았을때 실행
        if (scrollRef && lastPage >= 0 && (scrollEl.scrollTop === 0) ){
            setTimeout(() => {
                setTestOk(testOk + 1)
               // scrollEl.scrollTop = scrollEl.scrollTop
                setLastPage(lastPage - config.CHAT_LIMIT)
            }, 1000)
        } else {

        }
    }


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
        const chatNo =  Number(splitData[0]) // [1] 에서부터 lastData 이전까지  사용하면된다.
        // const index =  Number(lastData[0])  // [1]은 [object ~~ 값 ]
        // await fetchApi(null, null).deleteChatNo(chatNo, localStorage.getItem("Authorization"))
        // const idx = selectedChat.messages.findIndex(e => e.chatNo === chatNo)
        // selectedChat.messages && (selectedChat.messages.splice (idx , 1));
        setChatNo(chatNo)
        setDeleteOk(!deleteOk)


        // console.log(  data , '번 채팅 선택');
    }
    const MessagesView = (props) => {
        const {message} = props;

        if (message.type === 'divider') {
            return <div className="message-item messages-divider sticky-top" data-label={message.text}></div>
        } else {
            return (

                <div className={"message-item " + message.type} ref={messageRef}>
                    <ContextMenuTrigger id={`contextMenu${message.chatNo}`}>
                        <div className={"message-content " + (message.file ? 'message-file' : null)}>
                            {message.file ? message.file : message.text}
                        </div>

                        <ContextMenu id={`contextMenu${message.chatNo}`}>
                            <MenuItem id="Message-Information-item" data={`test`} onClick={handleMessageDelete}>
                                <button> 메세지 정보</button>
                            </MenuItem>
                            <MenuItem id="Message-Delete-item" data={`${message.chatNo},${message.index}` }   onClick={handleMessageDelete}
                                      disabled={(message.participantNo !== participantNo)}>
                                <button> 메세지 삭제</button>
                            </MenuItem>

                        </ContextMenu>
                    </ContextMenuTrigger>
                    <div className="message-action">
                        {message.date}
                        {message.type ? <i className="ti-double-check text-info"></i> : null}
                    </div>
                    <div>
                        {message.chatNo}
                        <br/>
                        {message.notReadCount}
                        <br/>
                            {message.index}
                    </div>
                    <div>
                        {message.participantNo}
                    </div>

                </div>);
        }
    };

    const [isOpen, setMenu] = useState(false);  // 메뉴의 초기값을 false로 설정
  
    const toggleMenu = () => {
          setMenu(isOpen => !isOpen); // on,off 개념 boolean
      }

    return (
        <div className="chat">
            {
                selectedChat.name
                    ?
                    <React.Fragment>
                        <ChatHeader selectedChat={selectedChat}/>
                        <PerfectScrollbar
                            onUpdateSize={(ref) => {
                                ref.updateScroll();
                            }}
                            containerRef={ref => setScrollEl(ref)} onYReachStart={handleScrollStart}
                            onScrollUp={handlePaging}
                            ref={scrollRef}

                        >
                            <div className="chat-body">
                                <div className="messages">
                                    {
                                        selectedChat.messages
                                            ?
                                            (selectedChat.messages.filter((message) => {
                                                if(searchTerm == ""){
                                                    return message
                                                } else if( message.text?.toLowerCase().includes(searchTerm.toLowerCase())){
                                                    return message
                                                }
                                            }).map((message, i) => {
                                                return <MessagesView message={message} key={i}/>
                                            }))
                                            :
                                            null
                                            
                                    }
                                </div>
                            </div>
                        </PerfectScrollbar>
                        <div>
                        <div onClick = {toggleMenu}>
                            <i className="ti ti-search">채팅검색</i>    
                        </div>                        
                        
                        <input 
                        type="text" 
                        className={isOpen ? "show-menu" : "hide-menu"}
                        placeholder="채팅검색" 
                        ref={inputRef}
                        onChange={e => {
                        setSearchTerm(e.target.value)
                        }}
                        />
                        
                        </div>
                        <ChatFooter onSubmit={handleSubmit} onChange={handleChange} inputMsg={inputMsg}
                                    handleInputMsg={handleInputMsg}/>
                        
                    </React.Fragment>
                    :
                    <div className="chat-body no-message">
                        <div className="no-message-container">
                            <i className="fa fa-comments-o"></i>
                            <p>메시지를 읽을 대화 선택</p>
                        </div>
                    </div>
            }
        </div>
    )
})

export default Chat