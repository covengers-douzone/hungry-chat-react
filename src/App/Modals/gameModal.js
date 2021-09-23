import React, {PureComponent} from 'react'
import { GameEngine } from "react-game-engine";
import {Box} from "../Sidebars/Game/Box";
import {MoveBox} from "../Sidebars/Game/MoveBox";
import {Player} from "../Sidebars/Game/Player";
import {Modal, ModalBody, ModalHeader, TabContent, TabPane } from 'reactstrap';

class GameModal extends PureComponent {
    render() {
        const userNo  = localStorage.getItem("userNo")
        const userName = localStorage.getItem("name")
        const userColor = "green"

    return (
        <Modal  style={{minWidth:'1000px', minHeight: '500px'}} isOpen={this.props.modal} toggle={this.props.toggle} centered   >
            <ModalHeader toggle={this.props.toggle}   >
                <i className="ti ti-game"></i> 게임
            </ModalHeader>
            <ModalBody style={{minWidth:'1000px', minHeight: '500px'}}  >
                <TabContent>
                    <TabPane>
                <GameEngine
                style={{  backgroundColor: "white" }}
                    systems={[MoveBox]}
                    entities={{
                        //-- Notice that each entity has a unique id (required)
                        //-- and a renderer property (optional). If no renderer
                        //-- is supplied with the entity - it won't get displayed.
                        box1: { x: 200,  y: 200, renderer: <Box />},
                        player: { x: 200,  y: 200, userColor : userColor , userName : userName, renderer: <Player />},


                    }}>
                </GameEngine>
                </TabPane>
            </TabContent>
            </ModalBody>
        </Modal>
        
    )
}
}
export default GameModal
