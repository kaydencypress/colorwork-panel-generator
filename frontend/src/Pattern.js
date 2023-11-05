import React, {Component} from 'react';
import Stitch from './Stitch'
import './Pattern.css'

class Pattern extends Component {
    render(){
        const pattern = this.props.formData.pattern
        const palette = this.props.formData.palette
        const gaugeRatio = this.props.formData.gaugeStitches / this.props.formData.gaugeRows
        return (
             <div>
                 {pattern.map(row => 
                    <div className = 'patternRow'>
                        {row.map(s => <Stitch palette={palette} defaultColor={s} gaugeRatio={gaugeRatio}/>)}
                    </div>)}
            </div>
        );
    }
}

export default Pattern;