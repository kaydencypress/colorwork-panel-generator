import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Form } from 'react-router-dom';

function  BackButton() {
    return (
        <Form action='/'>
            <button> <FontAwesomeIcon icon={icon({name: 'arrow-left'})}/> </button>
        </Form>
    );
}

export default BackButton;