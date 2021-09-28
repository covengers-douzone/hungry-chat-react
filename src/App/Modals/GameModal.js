import React, {PureComponent, useEffect} from 'react'
import { GameEngine } from "react-game-engine";
import {Box} from "../Sidebars/Game/Box";
import {MoveBox} from "../Sidebars/Game/MoveBox";
import {Player} from "../Sidebars/Game/Player";
import {Modal, ModalBody, ModalHeader, TabContent, TabPane } from 'reactstrap';
import {CopperCoin} from "../Sidebars/Game/CopperCoin";
import {SilverCoin} from "../Sidebars/Game/SilverCoin";
import {GoldCoin} from "../Sidebars/Game/GoldCoin";


class GameModal extends PureComponent {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();



     //   this.myRef.current.scrollWidth = 0
    }


    componentDidMount(){

    }

    componentWillUnmount(){
        console.log("componentWillUnmount")
    }
    componentDidUpdate(prevProps){
        if (this.props.modal !== prevProps.modal) {


            console.log(   this.myRef.current)


        }
    }

    scrollUpdate () {

    }

    render() {
        const userNo  = localStorage.getItem("userNo")
        const userName = localStorage.getItem("name")
        const userColor = "green"
        const element = document.getElementById('root');
        const width = window.outerWidth
        const height = element.clientHeight

        console.log("height" , height)
        console.log("width" , width)
        return (

        <Modal ref = {this.myRef}  style={{  minWidth:`${width}px`, minHeight: `${height}px` , margin: '0', top :'0' , bottom :'0',
            padding: '0' }} isOpen={this.props.modal} toggle={this.props.toggle} centered   >

            <ModalBody style={{minWidth:`${width}px`, minHeight: `${height}px` , margin: '0', top :'0' , bottom :'0',position: "fixed",
                padding: '0'}}  >


                <GameEngine
                style={{ }}
                    systems={[MoveBox]}
                    entities={{
                        //-- Notice that each entity has a unique id (required)
                        //-- and a renderer property (optional). If no renderer
                        //-- is supplied with the entity - it won't get displayed.
                        box1: {width : width , height : height ,  renderer: <Box />},
                        player: { x: 200,  y: 200, userColor : userColor , userName : userName, renderer: <Player />},

                        copperCoin: { x: 50,  y: 50 , renderer: <CopperCoin />},
                        silverCoin: { x: 50,  y: 100 , renderer: <SilverCoin />},
                        goldCoin: { x: 50,  y: 150 , renderer: <GoldCoin />},

                    }}>
                </GameEngine>

            </ModalBody>
        </Modal>

    )
}
}
export default GameModal
