import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

function setPageSize(cssPageSize) {
    const style = document.createElement('style');
    style.innerHTML = `@page {size: ${cssPageSize}}`;
    style.id = 'page-orientation';
    document.head.appendChild(style);
}

function PrintButton({ orientation = 'portrait' }) {
    // Set orientation of page being printed
    useEffect(() => {
        setPageSize(orientation);
        return () => {
            const child = document.getElementById('page-orientation');
            child.parentNode.removeChild(child);
        };
    }, [orientation]);

    return (
        <button onClick={() => {window.print()}}><FontAwesomeIcon icon={icon({name: 'download'})} /></button>
    );
}

export default PrintButton;