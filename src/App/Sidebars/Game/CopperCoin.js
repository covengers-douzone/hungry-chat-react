import React, {PureComponent} from "react";
import coinImage from "../../../assets/img/game/coin/coppercoin.png"

class CopperCoin extends PureComponent {
    render() {
        const size = Math.trunc(Math.max(this.props.width, this.props.height) * 0.075);
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

export {CopperCoin};