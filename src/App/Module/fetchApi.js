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
                        "Access-Control-Allow-Origin": "http://localhost:9999",
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
                console.error("Error From React-Fetch: " + err.message);
            }
        },
        getChatList: async function (roomNo) { // 채팅 메시지 리스트를 불러온다
            try {
                const response = await fetch(`${domain}:${PORT}/api/chatlist/${roomNo}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'applcation/json'
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
                return json.data
            } catch (err) {
                console.error(err);
            }
        },
        send: async function (roomNo, participantNo, contents) { // 메세지를 보낸다
            try {
                const response = await fetch(`${domain}:${PORT}/api/message/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        roomNo,
                        participantNo,
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
        create: async function (title, UserNo) { // 방 생성
            try {
                const response = await fetch(`${domain}:${PORT}/api/create/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
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
        getStatus: async function (ParticipantNo) { // 방 접속중인지 확인
            try {
                const response = await fetch(`${domain}:${PORT}/api/getStatus/`, {
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
        setStatus: async function (ParticipantNo, status) { // 방 접속 상태를 설정
            try {
                const response = await fetch(`${domain}:${PORT}/api/setStatus/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        ParticipantNo,
                        status
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
        getFriendList: async function (UserNo) {
            try {
                const response = await fetch(`${domain}:${PORT}/api/getFriendList/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
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