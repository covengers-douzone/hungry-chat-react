// 비동기 통신

export default function (defaultState , setState) {
    const PORT = 9999;
    return {
        getRoomList: async function () {
            try {
                const response = await fetch(`http://localhost:${PORT}/api/roomlist?userNo=${1}`, {
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
                const response = await fetch(`http://localhost:${PORT}/api/chatlist/${roomNo}`, {
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
            } catch (err) {
                console.error(err);
            }
        },
        send: async function (roomNo,contents) {
            try {
                const response = await fetch(`http://localhost:${PORT}/api/message/`, {
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
        }
    }
}