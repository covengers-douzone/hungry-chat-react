// 비동기 통신
import {func} from "prop-types";
import * as config from "../../config/config"

export default function (defaultState, setState) {
    const PORT = config.FETCH_API_PORT;
    const domain = config.FETCH_API_IP;
    return {
        getOpenChatRoomList : async function (token) { // 방 전체 목록을 보여준다.
            try {
                const response = await fetch(`${config.URL}/api/getOpenChatRoomList`, {
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
                json.data.length > 0 && setState(json.data);
                // setState(json.data);
                return json.data;
            } catch (err) {
                // Access Denied or System Error or Fetch Error(Cors ... )
                console.error("Error From React-Fetch: " + err.message);
            }
        },
        getChatList: async function (roomNo, offset, limit, token) {
            try {
                const response = await fetch(`${domain}:${PORT}/api/chatlist/${roomNo}/${offset}/${limit}`, {
                    method: 'get',
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
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
                const response = await fetch(`${domain}:${PORT}/api/chatlistCount/${roomNo}/`, {
                    method: 'get',
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
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
                const response = await fetch(`${domain}:${PORT}/api/getChat/${chatNo}`, {
                    method: 'get',
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
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
                const response = await fetch(`${domain}:${PORT}/api/message/`, {
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
                const response = await fetch(`${domain}:${PORT}/api/updateSendNotReadCount/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
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
                const response = await fetch(`${domain}:${PORT}/api/getStatus/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
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
                const response = await fetch(`${domain}:${PORT}/api/setStatus/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
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
                console.error(err);
            }
        },
        getFriendList: async function (userNo, token) { // 방 생성
            try {
                const response = await fetch(`${domain}:${PORT}/api/getFriendList/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${domain}:${PORT}`,
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
                json.data.length > 0 && setState(json.data);
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
                        "Access-Control-Allow-Origin": `${URL}`,
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
                json.data.length > 0 && setState(json.data);
                return json.data
            } catch (err) {
                console.error(err);
            }
        },
        getHeadCount: async function (participantNo, token) { // 방 생성
            try {
                const response = await fetch(`${domain}:${PORT}/api/getHeadCount/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
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
                const response = await fetch(`${domain}:${PORT}/api/updateRoomNotReadCount/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
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
                const response = await fetch(`${domain}:${PORT}/api/updateLastReadAt/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
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
                const response = await fetch(`${domain}:${PORT}/api/getLastReadNo/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
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
                const response = await fetch(`${domain}:${PORT}/api/getLastReadNoCount/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": `${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
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
                const response = await fetch(`${domain}:${PORT}/api/uploadFile/`, {
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
        deleteChatNo: async function (chatNo, token) {
            try {

                const response = await fetch(`${domain}:${PORT}/api/deleteChatNo/${chatNo}`, {
                    method: 'post',
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
        }
    }
}