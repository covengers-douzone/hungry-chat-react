import React, {PureComponent} from "react";
import coinImage from "../../../assets/img/game/coin/goldcoin.png"

class GoldCoin extends PureComponent {
    render() {
        const size = 100; // 박스 상자
        const x = this.props.x - size / 2;
        const y = this.props.y - size / 2;
        return (
                <img style={

                    {zIndex : 1, position: "absolute", width: size, height: size, left: x, top: y}}
                 src = {coinImage}
                >
                </img >
        );
    }
}

export {GoldCoin};