// 비동기 통신
import {func} from "prop-types";
import * as config from "../../config/config"

export default function (defaultState, setState) {
    return {
        getOpenChatRoomList : async function (type,token) { // 방 전체 목록을 보여준다.
            try {
                const response = await fetch(`${config.URL}/api/getOpenChatRoomList/${type}`, {
                    method: 'get',
                    credentials: 'include',
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        'Content-Type': 'text/plain',
                        'Accept': 'application/json',
                        Authorization: token
                    },
                });
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                json.data.length > 0 && setState(json.data);
                // setState(json.data);
                return json.data;
            } catch (err) {
                // Access Denied or System Error or Fetch Error(Cors ... )
                console.error("Error From React-Fetch: "+err.message);
            }
        },
        getRoomList: async function (userNo, token) { // 방 목록을 보여준다.
            try {
                const response = await fetch(`${config.URL}/api/roomlist/${userNo}`, {
                    method: 'get',
                    credentials: 'include',
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        'Content-Type': 'text/plain',
                        'Accept': 'application/json',
                        Authorization: token
                    }
                });
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                json.data.results.length > 0 && setState(json.data.results);
                // setState(json.data);
                return json.data;
            } catch (err) {
                // Access Denied or System Error or Fetch Error(Cors ... )
                console.error("Error From React-Fetch: " + err.message);
                throw new Error("DB에서 정보를 로드할 수 없습니다. 혹은 권한이 없습니다.");
            }
        },
        getChatList: async function (roomNo, offset, limit, token) {
            try {
                const response = await fetch(`${config.URL}/api/chatlist/${roomNo}/${offset}/${limit}`, {
                    method: 'get',
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        'Content-Type': 'text/plain',
                        'Accept': 'application/json',
                        Authorization: token
                    }
                });

                if (!response.ok) {
                    return null; // token error
                    //throw new Error(`System Error : ${response.status} ${response.statusText}`);
                }
                const json = await response.json();
                if (json.result !== 'success') { // DB error
                    return json.message;
                }
                json.data.length > 0 && setState([...defaultState, ...json.data]);
                return json.data
            } catch (err) {
                console.error(err);
            }
        },
        getChatSearchList: async function (roomNo, offset, limit, contents, token) {
            try {
                const response = await fetch(`${config.URL}/api/chatlist/${roomNo}/${offset}/${limit}/${contents}`, {
                    method: 'get',
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        'Content-Type': 'text/plain',
                        'Accept': 'application/json',
                        Authorization: token
                    }
                });

                if (!response.ok) {
                    return null; // token error
                    //throw new Error(`System Error : ${response.status} ${response.statusText}`);
                }
                const json = await response.json();
                if (json.result !== 'success') { // DB error
                    return json.message;
                }
                json.data.length > 0 && setState([...defaultState, ...json.data]);
                return json.data
            } catch (err) {
                console.error(err);
            }
        },
        getChatListCount: async function (roomNo, token) {
            try {
                const response = await fetch(`${config.URL}/api/chatlistCount/${roomNo}/`, {
                    method: 'get',
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        'Content-Type': 'text/plain',
                        'Accept': 'application/json',
                        Authorization: token
                    }
                });

                if (!response.ok) {
                    return null; // token error
                    //throw new Error(`System Error : ${response.status} ${response.statusText}`);
                }
                const json = await response.json();
                if (json.result !== 'success') { // DB error
                    return json.message;
                }
                return json.data
            } catch (err) {
                console.error(err);
            }
        },
        getChat: async function (chatNo, token) {
            try {
                const response = await fetch(`${config.URL}/api/getChat/${chatNo}`, {
                    method: 'get',
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        'Content-Type': 'text/plain',
                        'Accept': 'application/json',
                        Authorization: token
                    }
                });

                if (!response.ok) {
                    return null; // token error
                    //throw new Error(`System Error : ${response.status} ${response.statusText}`);
                }
                const json = await response.json();
                if (json.result !== 'success') { // DB error
                    return json.message;
                }
                return json.data;
            } catch (err) {
                console.error(err);
            }
        },
        send: async function (formData) {
            try {
                const response = await fetch(`${config.URL}/api/message/`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                //json.data.length > 0 && setChatList([...chatList, ...json.data]);
            } catch (err) {
                console.error(err);
            }
        },
        updateSendNotReadCount: async function (chatNo, token) {
            try {
                const response = await fetch(`${config.URL}/api/updateSendNotReadCount/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        chatNo,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
            } catch (err) {
                console.error(err);
            }
        },
        createRoom: async function (title, content, headCount, type, password, token) { // 방 생성
            try {
                const response = await fetch(`${config.URL}/api/createRoom/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        title,
                        content,
                        headCount,
                        type,
                        password,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                return json.data
            } catch (err) {
                console.error(err);
            }
        },
        createParticipant: async function (userNo, roomNo, role, token) { // 방 생성
            try {
                const response = await fetch(`${config.URL}/api/createParticipant/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        userNo, roomNo, role

                    }),
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                return json.data;
            } catch (err) {
                console.error(err);
            }
        },
        getStatus: async function (ParticipantNo, token) { // 방 생성
            try {
                const response = await fetch(`${config.URL}/api/getStatus/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        ParticipantNo
                    }),
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
            } catch (err) {
                console.error(err);
            }
        },
        setStatus: async function (ParticipantNo, status, token) { // 방 생성
            try {
                const response = await fetch(`${config.URL}/api/setStatus/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        ParticipantNo,
                        status
                    }),
                });

                // System error(DB, Server etc...)
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();

                // Authentication error, server error, DB error, logic error
                if (json.result !== 'success') {
                    throw json.message;
                }
            } catch (err) {
                console.error(err.message);
                window.location.assign("/")
            }
        },
        getFriendList: async function (userNo, token) { // 방 생성
            try {
                const response = await fetch(`${config.URL}/api/getFriendList/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        userNo
                    }),
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                // json.data.length > 0 && setState(json.data);
                setState(json.data)
                return json.data
            } catch (err) {
                console.error(err);
            }
        },
        getFollowerList: async function (userNo, token) { // 방 생성
            try {
                const response = await fetch(`${config.URL}/api/getFollowerList/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        userNo
                    }),
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                // json.data.length > 0 && setState(json.data);
                setState(json.data);
                return json.data
            } catch (err) {
                console.error(err);
            }
        },
        getHeadCount: async function (participantNo, token) { // 방 생성
            try {
                const response = await fetch(`${config.URL}/api/getHeadCount/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        participantNo
                    }),
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                return json.data
            } catch (err) {
                console.error(err);
            }
        },
        updateRoomNotReadCount: async function (participantNo, roomNo, token) { // 채팅 메시지의 notReadCount를 모두 감소
            try {
                const response = await fetch(`${config.URL}/api/updateRoomNotReadCount/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        participantNo,
                        roomNo,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }

            } catch (err) {
                console.error(err);
            }
        },
        updateLastReadAt: async function (participantNo, token) { // 마지막 읽은 시각을 찾는다
            try {
                const response = await fetch(`${config.URL}/api/updateLastReadAt/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        participantNo
                    }),
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
            } catch (err) {
                console.error(err);
            }
        },
        getLastReadNo: async function (participantNo, token) { // 마지막 읽은 시각을 찾는다
            try {
                const response = await fetch(`${config.URL}/api/getLastReadNo/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        participantNo
                    }),
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                return json.data
            } catch (err) {
                console.error(err);
            }
        },
        getLastReadNoCount: async function (participantNo, token) { // 마지막 읽은 시각을 찾는다
            try {
                const response = await fetch(`${config.URL}/api/getLastReadNoCount/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        participantNo
                    }),
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                return json.data
            } catch (err) {
                console.error(err);
            }
        },
        uploadFile: async function (formData) {
            try {
                const response = await fetch(`${config.URL}/api/uploadFile/`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                return json.data
            } catch (e) {
                console.error(e);
            }
        },
        deleteUnknown: async function (userNo, token) {
            try {

                const response = await fetch(`${config.URL}/api/deleteUnknown/`, {
                    method: 'post',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        userNo
                    }),

                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                return json.data
            } catch (e) {
                console.error(e);
            }
        },
        deleteChatNo: async function (chatNo, token) {
            try {
                const response = await fetch(`${config.URL}/api/deleteChatNo/${chatNo}`, {
                    method: 'post',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        Authorization: token
                    },
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                return json.data
            } catch (e) {
                console.error(e);
            }
        },
        // type 은 join  , exit 만 가능 ,
        updateHeadCount: async function (type,roomNo, token) {
            try {
                const response = await fetch(`${config.URL}/api/updateHeadCount`, {
                    method: 'post',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        type , roomNo
                    }),
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                return json.data
            } catch (e) {
                console.error(e);
            }
        },
        getJoinOk: async function (roomNo,participantNo, token) {
            try {

                const response = await fetch(`${config.URL}/api/getJoinOk/${roomNo}/${participantNo}`, {
                    method: 'get',
                    credentials: 'include',
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        'Content-Type': 'text/plain',
                        'Accept': 'application/json',
                        Authorization: token
                    },
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                return json.data
            } catch (e) {
                console.error(e);
            }
        },
        deleteParticipant: async function (userNo, roomNo , token) {
            try {

                const response = await fetch(`${config.URL}/api/deleteParticipant/`, {
                    method: 'post',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        userNo , roomNo
                    }),
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                return json.data
            } catch (e) {
                console.error(e);
            }
        },
        addParticipant: async function (user ,roomNo, token) {
            try {

                const response = await fetch(`${config.URL}/api/addParticipant/`, {
                    method: 'post',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        user ,roomNo
                    }),
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                return json.data
            } catch (e) {
                console.error(e);
            }
        },
        getParticipantNo: async function (participantNo, token) {
            try {

                const response = await fetch(`${config.URL}/api/getParticipantNo/`, {
                    method: 'get',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.URL}`,
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        participantNo
                    }),
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                return json.data
            } catch (e) {
                console.error(e);
            }
        },


    }
}