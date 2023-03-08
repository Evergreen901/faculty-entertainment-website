import React from 'react';

const Check = ({ width = 32, height = 32, fill = 'white', ...rest }) => {
    return (
        <svg version="1.1" viewBox="0 0 24 24" width={width} height={height} {...rest}>
            <polyline fill="none" stroke={fill} stroke-width="2" points="2 14 9 20 22 4" />
        </svg>
    );
};

export default Check;
