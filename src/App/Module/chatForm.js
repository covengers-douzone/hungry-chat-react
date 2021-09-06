import * as config from "../../config/config";
import React from "react";

const chatMessageForm = (chat) => {

    let contents;
    console.log("chat", chat,chat.no)
    const chatNo = chat.no;
    chat.type === 'TEXT' && (contents = chat.contents)
    chat.type === 'IMG' && (contents = <img
                                              style={{
                                                height: "100px"
                                              }}
                                              src={config.URL + chat.contents.split('public')[1]}
                                              className="form-control"
                                              alt="avatar"
                                        />)

    const chatMessage = {
        text: contents,
        date: chat.createdAt,
        notReadCount: chat.notReadCount,
        chatNo : chatNo,
        participantNo : (chat.Participant && chat.Participant.no) || chat.participantNo
    }
    return chatMessage;
}

const chatForm = (chat,participantNo) => {
   const chatMessage = chatMessageForm(chat);

   if (chat.Participant.no !== Number(participantNo)) {
       return chatMessage;
   } else {
       chatMessage.type = 'outgoing-message'
       return chatMessage;
   }
}

export {chatMessageForm,chatForm};