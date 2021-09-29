
import io from "socket.io-client";
import * as config from "../../../config/config";

const element = document.getElementById('root');
const width = window.outerWidth
const height = element.clientHeight

const socket = io.connect(`${config.SOCKET_IP}:${config.SOCKET_GAME_PORT}`, {transports: ['websocket']});

const users = [{

}]






const System = (entities, {input}) => {
    const {payload} = input.find(x => x.name === "onMouseDown") || {};

    // if (payload) {
    //     const player = entities["player"];
    //     player.x = payload.pageX;
    //     player.y = payload.pageY;
    // }



    return entities;
};
const AttackBox = (entities, {input}) => {
    const {payload: playerKeyEvent} = input.find(x => x.name === "onKeyPress") || {};
    const {payload: playerMouseEvent} = input.find(x => x.name === "onMouseDown") || {};

    if (playerKeyEvent) {

        if (playerKeyEvent.key === (" ")) {
            console.log("공격!!")
        }
        if (playerKeyEvent.key === ("w" || "W")) {
            console.log("위")
        }
        if (playerKeyEvent.key === ("a" || "A")) {
            console.log("왼쪽")
        }
        if (playerKeyEvent.key === ("s" || "S")) {
            console.log("밑")
        }
        if (playerKeyEvent.key === ("d" || "D")) {
            console.log("오른쪽")
        }
    }
    if (playerMouseEvent) {
        console.log("공격!!")
    }

    return entities;
};
const ChatMoving = (entities, {input}) => {


    return entities;
};

export {System, AttackBox, ChatMoving};