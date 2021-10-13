import * as config from "../../config/config";
import React from "react";
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import ReactPlayer from "react-player";
import { saveAs } from 'file-saver';
import Files from 'react-files'
import remarkGfm from 'remark-gfm'

const clickVideo = (e) => {
    e.preventDefault();
    console.log("EEEE: ", e);
}

const chatMessageForm = (chat , index ) => {
    let contents;
    let match
    const chatNo = chat.no;
    chat.type === 'TEXT' && (contents = chat.contents)
    chat.type === 'MARKDOWN' && (contents =
        <ReactMarkdown
            children={chat.contents}
            id={chatNo}
            components={{
                code({node, inline, className, children, ...props}) {
                    match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '').substr(0,100)+"\n...... 전체 코드 보기" }
                            style={dark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        />
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    )
                }
            }}

        />)
    chat.type === 'IMG' && (contents = <img
                                              style={{
                                                height: "100px"
                                              }}
                                              src={config.URL + chat.contents.split('public')[1]}
                                              className="form-control"
                                              alt="avatar"
                                        />)
    // chat.type === 'VIDEO' && (contents = <video
    //                                         style={{
    //                                           height: "100px"
    //                                         }}
    //                                         src={config.URL + chat.contents.split('public')[1]}
    //                                         className="form-control"
    //                                         alt="avatar"
    //                                   />)

    chat.type === 'VIDEO' && (contents = <ReactPlayer
                                                    
                                                      className='react-player'
                                                      url={config.URL + chat.contents.split('public')[1]}
                                                      
                                                      width='100%'
                                                      height='100%'
                                                      
                                                      controls={true}
                                                      light={true}
                                                      onClick={clickVideo}
                                                    />)

    const downloadFile = () => {
            const file_name = chat.contents.split('public')[1].split('--');
            saveAs(config.URL + chat.contents.split('public')[1], file_name[1]) // Put your image url here.
        }

    chat.type === "APPLICATION" && (contents = <div style={{alignItems: 'center',display: 'flex', border: '1px', borderColor: '#e1e1e1', borderStyle: 'solid', backgroundColor: 'white', borderRadius: '5px', minHeight: '50px', minWidth: '250px'}}>
        <div style={{display: 'inline-block', marginLeft: '10px', marginRight: '10px'}}>
            <div style={{paddingRight: '5px',paddingLeft: '5px', paddingTop: '1px', paddingBottom: '1px',border: '1px', borderColor: '#e1e1e1', borderRadius: '10px', backgroundColor: '#e1e1e1'}}>
                <i className="ti ti-download" onClick={() => downloadFile()}></i>
            </div>
        </div>
        <div style={{margin: '5px',display: 'flex', justifyContent: 'center'}}>
            <div style={{display: 'inline-block', marginRight: '10px'}}>
                {chat.contents.split('public')[1].split('--')[1]}
            </div>
        </div>
    </div>)

    // chat.type === 'APPLICATION' && (contents = <Files
    //           className='files-dropzone'
    //           accepts={['image/png', '.pdf', 'audio/*']}
    //           multiple
    //           maxFiles={3}
    //           maxFileSize={10000000}
    //           minFileSize={0}
    //           clickable
    //         >)
                                                    
    const chatMessage = {
        profileImageUrl: chat.Participant && chat.Participant.User.profileImageUrl,
        nickname: chat.Participant && chat.Participant.User.nickname,
        text: contents,
        date: chat.createdAt,
        notReadCount: chat.notReadCount,
        chatNo : chatNo,
        participantNo : (chat.Participant && chat.Participant.no) || chat.participantNo,
        index : index,
        type : chat.type,
        chatMessage : chat.contents
    }
    return chatMessage;
}

const chatForm = (chat,participantNo,i) => {
    const chatMessage = chatMessageForm(chat , i);
    if (chat.Participant.no !== Number(participantNo)) {
        return chatMessage;
    } else {
       // 내가 보낸 메세지
       chatMessage.profileImageUrl=""
       chatMessage.nickname=""
       chatMessage.outgoing = 'outgoing-message'
       return chatMessage;
    }
}

const chatFormList = (chatlist,participantNo) => {
    let currentDate;

    return chatlist.flatMap((chat, i) => {
        let divider;
        if(!currentDate || currentDate !== chat.createdAt.split(' ')[0]){
            currentDate = chat.createdAt.split(' ')[0];

            const [year,month,date] = currentDate.split('-');
            const dateForm = year + '년 ' + month + '월 ' + date + '일';

            divider = {
                type: 'divider',
                text: dateForm
            }
        }

        if(divider){
            return [divider, chatForm(chat, participantNo, i)];
        } else {
            return chatForm(chat, participantNo, i);
        }
    });
}

export {chatMessageForm,chatForm,chatFormList};