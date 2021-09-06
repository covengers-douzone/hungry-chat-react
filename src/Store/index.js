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
    lastReadNo : lastReadNoReducer,
    joinOk  : joinOkReducer
});

const store = createStore(reducers, composeWithDevTools());

export default store
