import * as config from "../../config/config";

export default function (token) {
    const PORT = config.FETCH_API_PORT;
    const domain = config.FETCH_API_IP;
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": `${config.FETCH_API_IP}:${config.FETCH_API_PORT}`,
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        Authorization: token
    }

    const checkSystemError = (response) => {
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
    }

    const checkJsonError = (json) => {
        if (json.result !== 'success') {
            throw json.message;
        }
    }

    const fetchAction = async (namespace, method, body) => {
        try {
            const response = await fetch(`${domain}:${PORT}/api/${namespace}/`, {
                method: method,
                headers: headers,
                body: body,
            });

            checkSystemError(response);

            const json = await response.json();
            checkJsonError(json);

            return json.data
        } catch (err) {
            console.error(err);
        }
    }

    return {
        joinRoom: async function (participantNo,roomNo) { // 마지막 읽은 시각을 찾는다
            const body = JSON.stringify({
                                participantNo, roomNo
                        });
            return await fetchAction('joinRoom','post', body);
        },
        leftRoom: async function (participantNo) {
            const body = JSON.stringify({
                                participantNo
                            });
            return await fetchAction('leftRoom','post', body);
        },
        receiveChat: async function (chatNo) {
            const body = JSON.stringify({
                chatNo
            });
            return await fetchAction('receiveChat','post', body);
        }
    }
}