import React, {Component} from "react";

class Pattern extends Component {
    render(){
        return (
            <img src={"data:image/jpeg;base64, " + this.props.img} alt="Resulting knitting pattern produced from user-supplied image"/>
        );
    }
}

export default Pattern;