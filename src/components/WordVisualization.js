import React from 'react';

import { OverlayTrigger, Popover, Button } from 'react-bootstrap';


const WordVisualization = ({word, value, valueNormalized}) => {
    const popover = (
        <Popover id="wordResultPopover" title={word}>
            { Math.round(value * 1000000) / 1000000 }
        </Popover>
    )
    const content =
        <span className="word-result" style={getBackgroundColorStyleObject(valueNormalized)}>
            {word}
        </span>;
    return (
        <OverlayTrigger placement="top" overlay={popover}>
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