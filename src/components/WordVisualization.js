import React from 'react';

import { OverlayTrigger, Popover, Button } from 'react-bootstrap';


const WordVisualization = ({word, value, valueNormalized}) => {
    const renderToolTip = () => (
        <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            padding: '2px 10px',
            color: 'white',
            borderRadius: 3
        }}>{ Math.round(value * 1000) / 1000 }</div>
    );
    const content = <span style={getBackgroundColorStyleObject(valueNormalized)}>{word}</span>;
    return (
        <OverlayTrigger placement="top" overlay={renderToolTip()}>
            {content}
        </OverlayTrigger>
    );
};


function getBackgroundColorStyleObject(scale)  {
    scale = (0.7 * scale) + .3;
    return {
        backgroundColor: 'rgba(255, 99, 71, ' + scale + ')'
    }
}

export default WordVisualization;