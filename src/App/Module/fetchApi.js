// 비동기 통신

import {func} from "prop-types";

export default function (defaultState , setState) {
    const PORT = 9999;
    const domain = `http://192.168.254.8`;
    return {
        ipAddress : {
            PORT,
            domain,
        },
        getRoomList: async function (userNo) {
            try {
                const response = await fetch(`${domain}:${PORT}/api/roomlist/${userNo}`, {
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
                return json.data;
            } catch (err) {
                console.error(err);
            }
        },
        getChatList: async function (roomNo) {
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
        send: async function (roomNo,participantNo,contents) {
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
        create: async function (title , UserNo) { // 방 생성
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
        getStatus: async function (ParticipantNo) { // 방 생성
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
        setStatus: async function (ParticipantNo,status) { // 방 생성
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
        getUserList: async function (UserNo , FriendNo) { // 방 생성
            try {
                const response = await fetch(`${domain}:${PORT}/api/setStatus/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        UserNo,
                        FriendNo
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