import React, {PureComponent} from "react";
import coinImage from "../../../assets/img/game/coin/coppercoin.png"


class Player extends PureComponent {
    render() {
        const size = Math.trunc(Math.max(this.props.width, this.props.height) * 0.010);
        const userTextSize = 25 // 유저 네임 div 크기
        const userChatSize = userTextSize + 25 // 유저 네임 div 크기
        const x = this.props.x - size / 2;
        const y = this.props.y - size / 2;
        const userColor = this.props.userColor;
        const userName = this.props.userName;




        return (

            <div>

                <div style={
                    {
                        position: "absolute",
                        width: size + userTextSize,
                        height: size + userTextSize,
                        left: x - userTextSize / 2,
                        top: y - userTextSize
                    }}>
                    <label>
                        <b> {userName} </b>
                    </label>
                </div>
                <div style={
                    {position: "absolute", width: size, height: size, backgroundColor: userColor, left: x, top: y}}>
                </div>
            </div>


        );
    }
}

export {Player};