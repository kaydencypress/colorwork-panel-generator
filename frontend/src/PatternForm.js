import React, {useState} from 'react';
import Pattern from './Pattern';
import './PatternForm.css';
import axios from 'axios';

const PatternForm = () => {
    const [formData, setFormData] = useState({
        image: null,
        fileName: null,
        pattern: null,
        palette: null,
        numColors: 6,
        gaugeStitches: 20,
        gaugeRows: 26,
        width: 10,
        contrast: 1.0
    });

    const convertBase64 = (file) => {
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
    };

    const handleChange = async (evt) =>{
        if (evt.target.type === 'file'){
            const file = evt.target.files[0]
            {if (file) {
                const base64 = await convertBase64(file)
                setFormData({...formData, image: base64, fileName: evt.target.files[0].name});
            }}
        }
        else {
            setFormData({...formData, [evt.target.name]: evt.target.value});
        }
    };

    const handleSubmit = async (evt) => {
    evt.preventDefault();
        let request = {
            host: "f81ipduqi3.execute-api.us-east-1.amazonaws.com",
            method: "POST",
            url: "https://f81ipduqi3.execute-api.us-east-1.amazonaws.com/default/colorwork_pattern",
            data: formData,
            body: JSON.stringify(formData),
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
            let response = await axios(request);
            console.log(response['data']);
            setFormData({...formData, pattern: response['data']['pattern'], palette: response['data']['palette']});
        } catch {
            console.log("Error retrieving results");
        }
    };

    return (
        formData.pattern
        ? <Pattern formData={formData}/>
        : <form onSubmit={handleSubmit}>
            <label htmlFor='image' className = 'file-selector' type='file'>
                Upload Image
            </label>
            <input
                id='image'
                name='image'
                type='file'
                onChange={handleChange}
                accept=".jpg, .jpeg, .png"
                required
            />
            {formData.fileName ? <p>{formData.fileName}</p> : <p>No image selected</p>}
            <br/>
            <label htmlFor='numColors'>Number of Colors</label>
            <input
                name='numColors'
                type='number'
                min='2'
                max='8'
                value={formData.numColors}
                onChange={handleChange}
                required
            />
            <br/>
            <label htmlFor='gaugeStitches'>4" Gauge: Stitches</label>
            <input
                name='gaugeStitches'
                type='number'
                min='4'
                max='50'
                value={formData.gaugeStitches}
                onChange={handleChange}
                required
            />
            <label htmlFor='rows'>4" Gauge: Rows</label>
            <input
                name='rows'
                type='number'
                min='4'
                max='50'
                value={formData.gaugeRows}
                onChange={handleChange}
                required
            />
            <br/>
            <label htmlFor='width'>Pattern Width (Inches)</label>
            <input
                name='width'
                type='number'
                min='1'
                max='50'
                value={formData.width}
                onChange={handleChange}
                required
            />
            <br/>
            <label htmlFor='contrast'>Contrast Scaling</label>
            <input
                name='contrast'
                type='number'
                min='1.0'
                max='5.0'
                step='0.1'
                value={formData.contrast}
                onChange={handleChange}
            />
            <br/>
            <input type='submit' name='submit' value='Submit'/>
        </form>
    )
}

export default PatternForm;