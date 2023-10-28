import React, {Component} from 'react';

class Stitch extends Component {
    render(){
        return (
            <div style={{
                backgroundColor: this.props.color,
                width: '20px',
                height: '15px',
                border: '1px solid black'
            }}>
            </div>
        )
    }
}

export default Stitch;