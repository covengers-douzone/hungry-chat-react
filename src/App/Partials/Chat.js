import React, {useEffect, useState} from 'react'
import ChatHeader from "./ChatHeader"
import ChatFooter from "./ChatFooter"
import PerfectScrollbar from "react-perfect-scrollbar"
import {useSelector} from "react-redux"
import myFetch from "../Module/fetchApi";
import io from "socket.io-client"
import fetchApi from "../Module/fetchApi";
function Chat() {

    const socket = io.connect("http://192.168.254.8:9999", {transports: ['websocket']});

    const {selectedChat} = useSelector(state => state);
    const {messageLength} = useSelector(state => state);
    const {roomNo} = useSelector(state => state);
    const {participantNo} = useSelector(state => state);

    const [inputMsg, setInputMsg] = useState('');

    const [scrollEl, setScrollEl] = useState();




    const handleSubmit = (newValue) => {
        myFetch(null,null).send(roomNo,participantNo,newValue.text , );
       setInputMsg("");
    };

    const handleChange = (newValue) => {
        setInputMsg(newValue);

    };



    useEffect(() => {
        if (scrollEl) {
            setTimeout(() => {
                scrollEl.scrollTop = scrollEl.scrollHeight;
            }, 100)
        }
    });

    const MessagesView = (props) => {
        //console.log("MessagesView")
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
                        <PerfectScrollbar containerRef={ref => setScrollEl(ref)}>
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
}

export default Chat
