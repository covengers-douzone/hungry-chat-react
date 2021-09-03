import React, {useEffect, useRef, useState} from 'react'
import ChatHeader from "./ChatHeader"
import ChatFooter from "./ChatFooter"
import PerfectScrollbar from "react-perfect-scrollbar"
import {useDispatch, useSelector} from "react-redux"
import myFetch from "../Module/fetchApi";
import fetchApi from "../Module/fetchApi";
import * as config from "../../config/config";


const Chat = React.forwardRef((props, scrollRef) => {

    const dispatch = useDispatch

    const {selectedChat} = useSelector(state => state);
    const {roomNo} = useSelector(state => state);
    const {participantNo} = useSelector(state => state);
    const {headCount} = useSelector(state => state)
    const {messageAllLength} = useSelector(state => state)
    const {joinOk} = useSelector(state =>state)

    const [inputMsg, setInputMsg] = useState('');

    const [scrollEl, setScrollEl] = useState();

    const [chatList, setChatList] = useState([]);

    const messageRef = useRef(null);

    const [lastPage, setLastPage] = useState(0)

    const [sendOk , setSendOk] = useState(true)


    useEffect(() => {

        if (messageAllLength.count < config.CHAT_LIMIT || messageAllLength >= 0) {
            setLastPage(0)
        } else {
            setLastPage(messageAllLength.count - config.CHAT_LIMIT)
        }
    }, [joinOk])


    const handleSubmit = (newValue) => {

        myFetch(null, null).send(roomNo, participantNo, headCount, newValue.text, localStorage.getItem("Authorization"));
        setInputMsg("");
        setSendOk(!sendOk)
    };



    const chatForm = (chat) => {
        if (chat.Participant.no !== Number(participantNo)) {
            return ({
                text: chat.contents,
                date: chat.createdAt,
                notReadCount: chat.notReadCount,
            })
        } else {
            return ({
                text: chat.contents,
                date: chat.createdAt,
                notReadCount: chat.notReadCount,
                type: 'outgoing-message'
            })
        }
    }


    const handleChange = (newValue) => {
        setInputMsg(newValue);
    };

    useEffect(() => {
        if (scrollEl) {
            setTimeout(() => {
                console.log("sendOk")
                scrollEl.scrollTop = scrollEl.scrollHeight;
            }, 100)
        }
    } , [sendOk])

    useEffect(() => {
        const getChatListUp = async () => {
            //  라스트 페이지 넘버가 0이 아니고 , Limit 보다 적다면  0으로 초기화 시킨다  offset이 -로 넘어가면 페이징 처리가 되지 않기때문 .

            if (lastPage && lastPage >= 0) {
                if(lastPage < config.CHAT_LIMIT){
                    const chatlist = await fetchApi(chatList, setChatList).getChatList(selectedChat.id, 0 , messageAllLength.count, localStorage.getItem("Authorization"))
                    const chats = chatlist.map(chatForm);
                    selectedChat.messages = chats;
                }else{
                    const chatlist = await fetchApi(chatList, setChatList).getChatList(selectedChat.id, lastPage , messageAllLength.count, localStorage.getItem("Authorization"))
                    const chats = chatlist.map(chatForm);
                    selectedChat.messages = chats;
                }

            }

        }
        getChatListUp()
    }, [lastPage])


    const handleScrollStart = async (e) => {

        if (scrollRef) {
            setTimeout(() => {
                console.log(lastPage)
                scrollEl.scrollTop = scrollEl.scrollTop + 10
                setLastPage(lastPage - config.CHAT_LIMIT)
            }, 500)
        }
    }
    const handleScrollEnd = (e) => {


    }


    // useEffect(() => {
    //     if (messageRef && messageRef.current && scrollEl) {
    //         console.log("messageRef", messageRef.current.clientHeight)
    //         scrollEl.scrollTop = messageRef.current.clientHeight * 10
    //     }
    // }, [lastReadNo]);


    const MessagesView = (props) => {
        const {message} = props;

        if (message.type === 'divider') {
            return <div className="message-item messages-divider sticky-top" data-label={message.text}></div>
        } else {
            return (
                <div className={"message-item " + message.type} ref={messageRef}>
                    <div className={"message-content " + (message.file ? 'message-file' : null)}>
                        {message.file ? message.file : message.text}
                    </div>
                    <div className="message-action">
                        {message.date}
                        {message.type ? <i className="ti-double-check text-info"></i> : null}
                    </div>
                    <div>
                        {message.notReadCount}
                    </div>
                </div>);
        }
    };

    return (
        <div className="chat">
            {
                selectedChat.name
                    ?
                    <React.Fragment>
                        <ChatHeader selectedChat={selectedChat}/>
                        <PerfectScrollbar
                            containerRef={ref => setScrollEl(ref)}
                                          onYReachEnd={handleScrollEnd} onYReachStart={handleScrollStart}
                                          ref={scrollRef}

                        >
                            <div className="chat-body">
                                <div className="messages">
                                    {
                                        selectedChat.messages
                                            ?
                                            selectedChat.messages.map((message, i) => {
                                                return <MessagesView message={message} key={i}/>
                                            })
                                            :
                                            null
                                    }
                                </div>
                            </div>
                        </PerfectScrollbar>
                        <ChatFooter onSubmit={handleSubmit} onChange={handleChange} inputMsg={inputMsg}/>
                    </React.Fragment>
                    :
                    <div className="chat-body no-message">
                        <div className="no-message-container">
                            <i className="fa fa-comments-o"></i>
                            <p>Select a chat to read messages</p>
                        </div>
                    </div>
            }
        </div>
    )
})

export default Chat
