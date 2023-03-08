import React from 'react';

const Circle = ({ width = 32, height = 32, fill = 'white', ...rest }) => {
    return (
        <svg version="1.1" id="circle" x="0px" y="0px" viewBox="0 0 100 100" width={width} height={height} {...rest}>
            <defs>
                <filter id="dropshadow" x="-40%" y="-40%" width="180%" height="180%" filterUnits="userSpaceOnUse">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                    <feOffset dx="5" dy="5" result="offsetblur" />
                    <feOffset dx="-5" dy="-5" result="offsetblur" />
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            <circle
                fill="none"
                stroke="#A937F7"
                strokeWidth="1"
                cx="50"
                cy="50"
                r="44"
                strokeDasharray="360"
                strokeLinecap="round"
                transform="rotate(-90 ) translate(-100 0)"
                className="drop-shadow"
            >
                <animate attributeName="stroke-dashoffset" values="360;0" dur="2s" repeatCount="1"></animate>
            </circle>
        </svg>
    );
};

export default Circle;
