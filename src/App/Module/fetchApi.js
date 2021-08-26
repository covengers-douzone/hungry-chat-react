// 비동기 통신
export default function (defaultState , setState) {
    const PORT = 9999;
    const domain = `http://localhost:`;
    const URL = domain+PORT;
    return {
        getRoomList: async function (userNo, token) {
            try {
                const response = await fetch(`${URL}/api/roomlist/${userNo}`, {
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
                console.error("Error From React-Fetch: "+err.message);
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
        send: async function (roomNo,contents) {
            try {
                const response = await fetch(`${domain}:${PORT}/api/message/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        roomNo,
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
        create: async function (title) { // 방 생성
            try {
                const response = await fetch(`${domain}:${PORT}/api/create/`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        title,
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