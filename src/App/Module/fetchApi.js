// 비동기 통신
import {func} from "prop-types";

export default function (defaultState , setState) {
    const PORT = 9999;
    const domain = `http://localhost`;
    return {
        ipAddress : {
            PORT,
            domain,
        },
        getRoomList: async function (userNo,token) {
            try {
                const response = await fetch(`${domain}:${PORT}/api/roomlist/${userNo}`, {
                    method: 'get',
                    credentials: 'include',
                    headers: {
                        "Access-Control-Allow-Headers":"Content-Type",
                        "Access-Control-Allow-Origin":"http://localhost:9999",
                        "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
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
                        "Access-Control-Allow-Origin":"http://localhost:9999",
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
        send: async function (roomNo,participantNo,contents, token) {
            try {
                const response = await fetch(`${domain}:${PORT}/api/message/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers":"Content-Type",
                        "Access-Control-Allow-Origin":"http://localhost:9999",
                        "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
                        Authorization: token
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
        create: async function (title , UserNo, token) { // 방 생성
            try {
                const response = await fetch(`${domain}:${PORT}/api/create/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers":"Content-Type",
                        "Access-Control-Allow-Origin":"http://localhost:9999",
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
                        "Access-Control-Allow-Origin":"http://localhost:9999",
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
                        "Access-Control-Allow-Origin":"http://localhost:9999",
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
        getUserList: async function (UserNo , FriendNo, token) { // 방 생성
            try {
                const response = await fetch(`${domain}:${PORT}/api/setStatus/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        "Access-Control-Allow-Headers":"Content-Type",
                        "Access-Control-Allow-Origin":"http://localhost:9999",
                        "Access-Control-Allow-Methods":"OPTIONS,POST,GET",
                        Authorization: token
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