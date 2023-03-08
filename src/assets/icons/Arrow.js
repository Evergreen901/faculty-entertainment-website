import React from 'react';

const Arrow = ({ width = 32, height = 32, fill = 'white', ...rest }) => {
    return (
        <svg version="1.1" viewBox="0 0 10.966 6.543" width={width} height={height} {...rest}>
            <path
                d="M8359.137,725l4.952,4.953-4.952,4.953"
                transform="translate(-724.47 8365.149) rotate(-90)"
                fill="none"
                stroke={fill}
                strokeWidth="1.5"
            />
        </svg>
    );
};

export default Arrow;
