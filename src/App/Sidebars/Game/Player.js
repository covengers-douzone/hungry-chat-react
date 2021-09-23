import React, { PureComponent } from "react";


class Player extends PureComponent {
    render() {
        const size = 30; // 박스 상자
        const userTextSize = 25 // 유저 네임 div 크기
        const userChatSize = userTextSize + 25 // 유저 네임 div 크기
        const x = this.props.x - size / 2;
        const y = this.props.y - size / 2;
        const userColor = this.props.userColor;
        const userName = this.props.userName;
        return (

            <div>

                <div style={
                    { position: "absolute", width: size + userTextSize, height: size + userTextSize , left: x - userTextSize / 2 , top: y - userTextSize } }>


                    <label>
                        <b> {userName} </b>
                    </label>
                </div>
                <div style={
                    { position: "absolute", width: size, height: size, backgroundColor: userColor, left: x, top: y } } >
                </div>
            </div>



        );
    }
}
export { Player };