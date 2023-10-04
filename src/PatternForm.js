import React, {Component} from 'react';

class PatternForm extends Component {
    constructor(props){
        super(props);
        this.state={
            img:null,
            numColors:2,
            gaugeStitches:20,
            gaugeRows:26,
            width:8,
            height:6
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt){
        if (evt.target.type === 'file'){
            this.setState({[evt.target.name]: evt.target.files[0]})
        }
        else if (evt.target.type === 'number') {
            this.setState({[evt.target.name]: parseInt(evt.target.value)})
        }
        else {
            this.setState({[evt.target.name]: evt.target.value})
        }
    }

    handleSubmit(evt){
        evt.preventDefault();
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    name='img'
                    type='file'
                    onChange={this.handleChange}
                />
                <br/>
                <label htmlFor='numColors'>Number of Colors</label>
                <input
                    name='numColors'
                    type='number'
                    min='2'
                    max='8'
                    value={this.state.numColors}
                    onChange={this.handleChange}
                />
                <br/>
                <span>Gauge (4"x4"):</span>
                <label htmlFor='gaugeStitches'>Stitches</label>
                <input
                    name='gaugeStitches'
                    type='number'
                    min='4'
                    max='50'
                    value={this.state.gaugeStitches}
                    onChange={this.handleChange}
                />
                <label htmlFor='gaugeRows'>Rows</label>
                <input
                    name='gaugeRows'
                    type='number'
                    min='4'
                    max='50'
                    value={this.state.gaugeRows}
                    onChange={this.handleChange}
                />
                <br/>
                <label htmlFor='width'>Pattern Width</label>
                <input
                    name='width'
                    type='number'
                    min='1'
                    max='50'
                    value={this.state.width}
                    onChange={this.handleChange}
                />
                <span>"</span>
                <br/>
                <button>Submit</button>
            </form>
        );
    }
}

export default PatternForm;