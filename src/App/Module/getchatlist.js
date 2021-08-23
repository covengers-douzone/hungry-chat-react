// 비동기 통신

export default {
    getRoomList: async function () {
        try {
            const response = await fetch(`http://localhost:8888/api/roomlist?userNo=${1}`, {
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

            json.data.length > 0 && setChatList([...chatList, ...json.data]);
        } catch (err) {
            console.error(err);
        }
    },
    getChatList: async function (roomNo) {
        try {
            const response = await fetch(`http://localhost:8888/api/chatlist?roomNo=${roomNo}`, {
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

            //json.data.length > 0 && setChatList([...chatList, ...json.data]);
        } catch (err) {
            console.error(err);
        }
    }
}