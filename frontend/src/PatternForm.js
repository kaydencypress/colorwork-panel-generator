import React, {Component} from 'react';
import axios from 'axios';

class PatternForm extends Component {
    constructor(props){
        super(props);
        this.state={
            image:null,
            num_colors:8,
            gauge:{
                stitches:20,
                rows:26
            },
            width:12,
            contrast_scaling:1.0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.convertBase64 = this.convertBase64.bind(this);
    }

    convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            resolve(fileReader.result);
          }
          fileReader.onerror = (error) => {
            reject(error);
          }
        })
      }
    
    handleChange = async (evt) =>{
        if (evt.target.type === 'file'){
            const file = evt.target.files[0]
            const base64 = await this.convertBase64(file)
            this.setState({[evt.target.name]: base64})
        }
        else if (evt.target.name === 'stitches' || evt.target.name === 'rows') {
            let gauge = this.state.gauge
            gauge[evt.target.name] = evt.target.value
            this.setState({[gauge]: gauge})
        }
        else if (evt.target.type === 'number') {
            this.setState({[evt.target.name]: parseFloat(evt.target.value)})
        }
        else {
            this.setState({[evt.target.name]: evt.target.value})
        }
    }

    handleSubmit = async (evt) => {
        evt.preventDefault();
        let request = {
            host: "f81ipduqi3.execute-api.us-east-1.amazonaws.com",
            method: "POST",
            url: "https://f81ipduqi3.execute-api.us-east-1.amazonaws.com/default/colorwork_pattern",
            data: this.state,
            body: JSON.stringify(this.state),
            path: "/default/colorwork_pattern",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type,Access-Control-Allow-Headers,Access-Control-Allow-Methods,Access-Control-Allow-Origin',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*'
            }
        }
        console.log(request)
        try{
            let response = await axios(request)
            console.log(response)
        } catch {
            console.log("Error retrieving results")
        } 
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    name='image'
                    type='file'
                    onChange={this.handleChange}
                />
                <br/>
                <label htmlFor='num_colors'>Number of Colors</label>
                <input
                    name='num_colors'
                    type='number'
                    min='2'
                    max='8'
                    value={this.state.num_colors}
                    onChange={this.handleChange}
                />
                <br/>
                <span>Gauge (4"x4"):</span>
                <label htmlFor='stitches'>Stitches</label>
                <input
                    name='stitches'
                    type='number'
                    min='4'
                    max='50'
                    value={this.state.gauge.stitches}
                    onChange={this.handleChange}
                />
                <label htmlFor='rows'>Rows</label>
                <input
                    name='rows'
                    type='number'
                    min='4'
                    max='50'
                    value={this.state.gauge.rows}
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
                <label htmlFor='contrast_scaling'>Contrast Scaling</label>
                <input
                    name='contrast_scaling'
                    type='number'
                    min='1'
                    max='5'
                    step='0.1'
                    value={this.state.contrast_scaling}
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