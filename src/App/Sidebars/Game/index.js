
import React, { PureComponent } from "react";
import { GameEngine } from "react-game-engine";
import { Box } from "./Box";
import { System } from "./System"
import { Player } from "./Player"
import {CopperCoin} from "./CopperCoin";
class SimpleGame extends PureComponent {

    render() {
        const userNo  = localStorage.getItem("userNo")
        const userName = localStorage.getItem("name")
        const userColor = "green"

        return (
            <GameEngine
                systems={[System]}
                entities={{
                    //-- Notice that each entity has a unique id (required)
                    //-- and a renderer property (optional). If no renderer
                    //-- is supplied with the entity - it won't get displayed.
                     box1: { x: 200,  y: 200, renderer: <Box />},
                    player: { x: 200,  y: 200, userColor : userColor , userName : userName, renderer: <Player />},
                }}>

            </GameEngine>
        );
    }
}
export default SimpleGame

