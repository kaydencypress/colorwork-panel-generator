import React, {Component} from 'react';
import Stitch from './Stitch'
import './Pattern.css'

class Pattern extends Component {
    render(){
        const pattern = this.props.pattern
        return (
            //TODO: return a Pixel component for each pixel in list
            <div>
                {pattern.map(row => 
                    <div className = 'patternRow'>
                        {row.map(s => <Stitch color={`rgb(${s[0]},${s[1]},${s[2]})`}/>)}
                    </div>)}
            </div>
            //<img src={"data:image/jpeg;base64, " + this.props.img} alt="Resulting knitting pattern produced from user-supplied image"/>
        );
    }
}

export default Pattern;