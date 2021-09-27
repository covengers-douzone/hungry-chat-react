import * as config from "../../config/config";
import React from "react";
import ReactMarkdown from 'react-markdown'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {dark} from 'react-syntax-highlighter/dist/esm/styles/prism'

const chatMessageForm = (chat , index ) => {


    let contents;
    const chatNo = chat.no;
    chat.type === 'TEXT' && (contents = chat.contents)
    chat.type === 'MARKDOWN' && (contents =
        <ReactMarkdown
            children={chat.contents}
            components={{
                code({node, inline, className, children, ...props}) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '')}
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
    const chatMessage = {
        profileImageUrl: chat.Participant && chat.Participant.User.profileImageUrl,
        nickname: chat.Participant && chat.Participant.User.nickname,
        text: contents,
        date: chat.createdAt,
        notReadCount: chat.notReadCount,
        chatNo : chatNo,
        participantNo : (chat.Participant && chat.Participant.no) || chat.participantNo,
        index : index,
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
       chatMessage.type = 'outgoing-message'
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