import React, {useState} from 'react';
import {Form, redirect} from 'react-router-dom';
import './PatternForm.css';
import axios from 'axios';

const useFormData = async ({request,params}) => {
    const formData = await request.formData();
    let apiRequest = {
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
    console.log(apiRequest)
    try{
        return await axios.request(apiRequest);
    } catch {
        console.log("Error retrieving results");
        return redirect('error')
    }
};

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

const getDisplayFilename = (filename,maxLength=50) => {
    if (filename.length > maxLength) {
        return `${filename.slice(0,maxLength-12)}...${filename.slice(-9)}`
    }
    return filename
}

const PatternForm = () => {
    const [formData, setFormData] = useState({
        image: null,
        fileName: null,
        pattern: null,
        palette: null,
        numColors: 10,
        gaugeStitches: 20,
        gaugeRows: 26,
        width: 12
    });

    const handleChange = async (evt) =>{
        if (evt.target.type === 'file'){
            const file = evt.target.files[0]
            if (file) {
                const base64 = await convertBase64(file)
                setFormData({...formData, image: base64, fileName: evt.target.files[0].name});
            }
        }
        else {
            setFormData({...formData, [evt.target.name]: evt.target.value});
        }
    };

    return (
        <div className='form-container'>
            <h1>Create a Knitting Pattern from an Image</h1>
            <Form method='post' action='pattern/new'>
                <div className='file-upload-container'>
                    <div>
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
                    </div>
                    <div className='file-name-container'>
                        <p className='file-name'>
                            {formData.fileName ? getDisplayFilename(formData.fileName) : 'No image selected'}
                        </p>
                    </div>
                </div>
                <input
                    name='imgBase64'
                    type='hidden'
                    value={formData && formData.image}
                />
                <br/>
                <label htmlFor='numColors'>Number of Colors</label>
                <input
                    name='numColors'
                    type='number'
                    min='2'
                    max='20'
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
                    name='gaugeRows'
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
                <input type='submit' name='submit' value='Submit'/>
            </Form>

        </div>
    );
}

export default PatternForm;
export { useFormData };