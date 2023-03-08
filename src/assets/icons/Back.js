import React from 'react';

const Back = ({ width = 32, height = 32, fill = 'white', ...rest }) => {
    return (
        <svg version="1.1" viewBox="0 0 512 512" width={width} height={height} {...rest}>
            <polyline
                points="112 160 48 224 112 288"
                style={{
                    fill: 'none',
                    stroke: fill,
                    strokeLinecap: 'round',
                    strokeLineJoin: 'round',
                    strokeWidth: '32px',
                }}
            />
            <path
                d="M64,224H358c58.76,0,106,49.33,106,108v20"
                style={{
                    fill: 'none',
                    stroke: fill,
                    strokeLinecap: 'round',
                    strokeLineJoin: 'round',
                    strokeWidth: '32px',
                }}
            />
        </svg>
    );
};

export default Back;
