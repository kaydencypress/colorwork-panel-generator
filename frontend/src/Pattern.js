import React, {Component} from 'react';
import Stitch from './Stitch'
import './Pattern.css'

class Pattern extends Component {
    render(){
        const pattern = this.props.pattern
        return (
            <div>
                {pattern.map(row => 
                    <div className = 'patternRow'>
                        {row.map(s => <Stitch color={`rgb(${s[0]},${s[1]},${s[2]})`}/>)}
                    </div>)}
            </div>
        );
    }
}

export default Pattern;