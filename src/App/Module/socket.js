import io from "socket.io-client";
import * as config from "../../config/config";

 const socket = io(`${config.SOCKET_IP}:${config.SOCKET_PORT}`, {
        transports: ['websocket']
    })

export default  function () {
    return socket
}

