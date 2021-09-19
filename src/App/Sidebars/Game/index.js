import React, {useEffect, useRef, useState} from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import io from "socket.io-client";
import * as config from "../../../config/config";
const socket = io.connect(`${config.SOCKET_IP}:${config.SOCKET_GAME_PORT}`, {transports: ['websocket']});

const game = {
    width: "100%",
    height: "100%",
    type: Phaser.AUTO,
    scene: {
        init: function() {
            this.cameras.main.setBackgroundColor('#24252A')
            if(socket.isConnected){
                socket.emit("join" , ("test"))
            }

        },
        create: function() {
            this.helloWorld = this.add.image(
                1,
                1,
                "User", {
                    font: "40px Arial",
                    fill: "#ffffff",
                    images : "../../../assets/img/game/73014-OE8255-20.jpg"
                }
            );




            this.helloWorld.setOrigin(0.5);
        },
        update: function() {
            // this.helloWorld.angle += 1;
        }
    }
}

const test = (padding) => {



    return (
        <IonPhaser game={game} />
    )
}

export default test;