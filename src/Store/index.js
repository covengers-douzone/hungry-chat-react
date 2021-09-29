import {createStore, combineReducers} from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';

import sidebarReducer from "./Reducers/sidebarReducer"
import mobileSidebarReducer from "./Reducers/mobileSidebarReducer"
import profileSidebarReducer from "./Reducers/profileSidebarReducer"
import mobileProfileSidebarReducer from "./Reducers/mobileProfileSidebarReducer"
import selectedChatReducer from "./Reducers/selectedChatReducer"
import messageLengthReducer from "./Reducers/messageLengthReducer";
import roomNoReducer from "./Reducers/roomNoReducer";
import participantNoReducer from "./Reducers/participantNoReducer";
import userNoReducer from "./Reducers/userNoReducer";
import friendListReducer from "./Reducers/friendListReducer";
import headCountReducer from "./Reducers/headCountReducer";
import reloadReducer from "./Reducers/reloadReducer";
import lastReadNoReducer from "./Reducers/lastReadNoReducer";
import messageAllLengthReducer from "./Reducers/messageAllLengthReducer";
import joinOkReducer from "./Reducers/joinOkReducer";
import joinRoomReducer from "./Reducers/joinRoomReducer";
import roomTypeReducer from "./Reducers/roomTypeReducer";
import profileInfoReducer from "./Reducers/profileInfoReducer";
import mobileChatProfileSidebarReducer from "./Reducers/mobileChatProfileSidebarReducer";
import chatProfileSidebarReducer from "./Reducers/chatProfileSidebarReducer";
import lastPageReducer from "./Reducers/lastPageReducer";
import currentOnlineRoomUsersReducer from "./Reducers/currentOnlineRoomUsersReducer";
import codeBlockReducer from "./Reducers/codeBlockReducer";
import markDownReducer from "./Reducers/markDownReducer";
import sendOkReducer from "./Reducers/sendOkReducer";
import lastReadNoLengthReducer from "./Reducers/lastReadNoLengthReducer";

const reducers = combineReducers({
    selectedSidebar: sidebarReducer,
    selectedGameSidebar: sidebarReducer,
    mobileSidebar: mobileSidebarReducer,
    mobileGameSidebar: mobileSidebarReducer,
    profileSidebar: profileSidebarReducer,
    chatProfileSidebar : chatProfileSidebarReducer,
    mobileProfileSidebar: mobileProfileSidebarReducer,
    mobileChatProfileSidebar : mobileChatProfileSidebarReducer,
    selectedChat: selectedChatReducer,
    messageLength : messageLengthReducer,
    messageAllLength : messageAllLengthReducer,
    roomNo : roomNoReducer,
    roomType : roomTypeReducer,
    participantNo : participantNoReducer,
    userNo : userNoReducer,
    friendList : friendListReducer,
    headCount : headCountReducer,
    reload : reloadReducer,
    joinRoom : joinRoomReducer,
    lastReadNo : lastReadNoReducer,
    joinOk  : joinOkReducer,
    profileInfo : profileInfoReducer,
    lastPage : lastPageReducer,
    currentOnlineRoomUsers : currentOnlineRoomUsersReducer,
    codeBlock : codeBlockReducer,
    markDown : markDownReducer,
    lastReadNoLength : lastReadNoLengthReducer,
    sendOk : sendOkReducer
});

const store = createStore(reducers, composeWithDevTools());

export default store
