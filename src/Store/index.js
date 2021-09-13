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
import chatProfileSidebarReducer from "./Reducers/chatProfileSidebarReducer";
import mobileChatProfileSidebarReducer from "./Reducers/mobileChatProfileSidebarReducer";
import chatInfoReducer from "./Reducers/chatInfoReducer";


const reducers = combineReducers({
    selectedSidebar: sidebarReducer,
    mobileSidebar: mobileSidebarReducer,
    profileSidebar: profileSidebarReducer,
    mobileProfileSidebar: mobileProfileSidebarReducer,
    selectedChat: selectedChatReducer,
    messageLength : messageLengthReducer,
    messageAllLength : messageAllLengthReducer,
    roomNo : roomNoReducer,
    participantNo : participantNoReducer,
    userNo : userNoReducer,
    friendList : friendListReducer,
    headCount : headCountReducer,
    reload : reloadReducer,
    joinRoom : joinRoomReducer,
    lastReadNo : lastReadNoReducer,
    joinOk  : joinOkReducer,
    chatProfileSidebar:chatProfileSidebarReducer,
    mobileChatProfileSidebar: mobileChatProfileSidebarReducer,
    chatInfo : chatInfoReducer
});

const store = createStore(reducers, composeWithDevTools());

export default store
