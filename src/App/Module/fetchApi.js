// 비동기 통신
import {func} from "prop-types";
import * as config from "../../config/config"
export default function (defaultState , setState) {
    const PORT = config.FETCH_API_PORT;
    const domain = config.FETCH_API_IP;
    return {
        getRoomList: async function (userNo, token) { // 방 목록을 보여준다.
            try {
                const response = await fetch(`${domain}:${PORT}/api/roomlist/${userNo}`, {
                    method: 'get',
                    credentials: 'include',
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
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                const json = await response.json();
                if (json.result !== 'success') {

                    throw json.message;
                }
                json.data.length > 0 && setState([...defaultState, ...json.data]);
                return json.data;
            } catch (err) {
                // Access Denied or System Error or Fetch Error(Cors ... )
                console.error("Error From React-Fetch: "+err.message);
            }
        },
        getChatList: async function (roomNo,token) {
            try {
                const response = await fetch(`${domain}:${PORT}/api/chatlist/${roomNo}`, {
                    method: 'get',
                    headers: {
                        "Access-Control-Allow-Headers":"Content-Type",
                        "Access-Control-Allow-Origin":`${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
                        "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
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
        send: async function (roomNo,participantNo, headCount ,contents, token) {
            try {
                const response = await fetch(`${domain}:${PORT}/api/message/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers":"Content-Type",
                        "Access-Control-Allow-Origin":`${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
                        "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        roomNo,
                        participantNo,
                        headCount,
                        contents
                    }),
                });

                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                if (json.result !== 'success') {
                    throw json.message;
                }
                console.log(json)
                //json.data.length > 0 && setChatList([...chatList, ...json.data]);
            } catch (err) {
                console.error(err);
            }
        },
        updateSendNotReadCount: async function (chatNo , token) {
            try {
                const response = await fetch(`${domain}:${PORT}/api/updateSendNotReadCount/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers":"Content-Type",
                        "Access-Control-Allow-Origin":`${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
                        "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
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
                console.log(json)
            } catch (err) {
                console.error(err);
            }
        },
        create: async function (title , UserNo, token) { // 방 생성
            try {
                const response = await fetch(`${domain}:${PORT}/api/create/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers":"Content-Type",
                        "Access-Control-Allow-Origin":`${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
                        "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        title,
                        UserNo
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
        getStatus: async function (ParticipantNo, token) { // 방 생성
            try {
                const response = await fetch(`${domain}:${PORT}/api/getStatus/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers":"Content-Type",
                        "Access-Control-Allow-Origin":`${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
                        "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
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
        setStatus: async function (ParticipantNo,status,token) { // 방 생성
            try {
                const response = await fetch(`${domain}:${PORT}/api/setStatus/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers":"Content-Type",
                        "Access-Control-Allow-Origin":`${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
                        "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
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
        getFriendList: async function (UserNo , FriendNo, token) { // 방 생성
            try {
                const response = await fetch(`${domain}:${PORT}/api/getFriendList/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers":"Content-Type",
                        "Access-Control-Allow-Origin":`${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
                        "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
                        Authorization: token
                    },
                    body: JSON.stringify({
                        UserNo
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
        getHeadCount: async function (participantNo , token) { // 방 생성
            try {
                const response = await fetch(`${domain}:${PORT}/api/getHeadCount/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers":"Content-Type",
                        "Access-Control-Allow-Origin":`${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
                        "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
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



        joinRoom: async function (ParticipantNo) { // 채팅 메시지의 notReadCount를 모두 감소
            try {
                const response = await fetch(`${domain}:${PORT}/api/joinRoom/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
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
        exitRoom: async function (ParticipantNo) { // 채팅 메시지의 notReadCount를 모두 감소
            try {
                const response = await fetch(`${domain}:${PORT}/api/exitRoom/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
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
        getLastReadAt: async function (ParticipantNo,roomNo,) { // 마지막 읽은 시각을 찾는다
            try {
                const response = await fetch(`${domain}:${PORT}/api/getFriendList/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
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
    }
}