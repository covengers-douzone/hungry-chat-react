import React, {useEffect, useRef, useState} from 'react'
import ChatHeader from "./ChatHeader"
import ChatFooter from "./ChatFooter"
import PerfectScrollbar from "react-perfect-scrollbar"
import {useSelector} from "react-redux"
import myFetch from "../Module/fetchApi";


function Chat() {
    const {selectedChat} = useSelector(state => state);
    const {roomNo} = useSelector(state => state);
    const {participantNo} = useSelector(state => state);
    const {headCount} = useSelector(state => state)

    const [inputMsg, setInputMsg] = useState('');
    const [scrollEl, setScrollEl] = useState();

    const scrollRef = useRef(null);

    const handleSubmit = (newValue) => {

        const formData = new FormData();
        formData.append("file", newValue.file);
        formData.append("roomNo", roomNo);
        formData.append("participantNo", participantNo);
        formData.append("headCount", headCount);
        formData.append("text", newValue.text);
        formData.append("Authorization", localStorage.getItem("Authorization"));

        myFetch(null,null).send(formData);
        console.log("send insert")
        setInputMsg("");
    };

    const handleChange = (newValue) => {
        setInputMsg(newValue);

    };

    const handleScrollStart = (e) => {

        console.log("처음쪽 스크롤")

    }
    const handleScrollEnd = (e) => {
        console.log("마지막 쪽 스크롤"
        )
    }

    const handleInputMsg = (msg) => {
        setInputMsg(msg);
        console.log(msg);
    }

    // const handleScroll = (e) => {
    //     //  console.log("handleScroll" , e.scrollTop * 350)
    //      // e.scrollTop = e.scrollTop * 100
    //
    // }



    useEffect(() => {
        if (scrollEl) {
            setTimeout(() => {
                scrollEl.scrollTop = scrollEl.scrollHeight;
            }, 100)
        }
    });

    const MessagesView = (props) => {
        const {message} = props;

        if (message.type === 'divider') {
            return <div className="message-item messages-divider sticky-top" data-label={message.text}></div>
        } else {
            return (
                <div className={"message-item " + message.type}>
                    <div className={"message-content " + (message.file ? 'message-file' : null)}>
                        {message.file ? message.file : message.text}
                    </div>
                    <div className="message-action">
                        {message.date}
                        {message.type ? <i className="ti-double-check text-info"></i> : null}
                    </div>
                    <div>
                        {message.date}
                    </div>
                    <div >
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
                        <PerfectScrollbar containerRef={ref => setScrollEl(ref)}  onYReachEnd ={handleScrollEnd} onYReachStart = {handleScrollStart}
                                           ref = {scrollRef}
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
                        <ChatFooter onSubmit={handleSubmit} onChange={handleChange} inputMsg={inputMsg} handleInputMsg={handleInputMsg}/>
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
}

export default Chat