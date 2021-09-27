import React, { PureComponent } from "react";
import background from "../../../assets/img/game/game-background.jpg"

class Box extends PureComponent {
    render() {

        const width = this.props.width;
        const height = this.props.height
        return (
            <div style={{ zIndex : -1,  position: "absolute", width: width, height: height,  backgroundImage: `url(${background})`, left: 0, top: 0 }} />
        );
    }
}

export { Box };