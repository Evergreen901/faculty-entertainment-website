import React from 'react';

const ArrowButtonIcon = ({ width = 24, height = 24, fill = '', ...rest }) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 28 28"
            focusable="false"
            role="presentation"
            fill={'none'}
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            <defs>
                <linearGradient id="linear-gradient" y1="1" x2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0" stopColor="blue" />
                    <stop offset="1" stopColor="#FFFFFF" />
                </linearGradient>
            </defs>
            <g id="Group_5805" data-name="Group 5805" transform="translate(-267.981 -1532)">
                <g id="Group_5604" data-name="Group 5604" transform="translate(-1009.519 -499.281)">
                    <path
                        id="Ellipse_1"
                        data-name="Ellipse 1"
                        d="M14,1A13,13,0,0,0,4.808,23.192,13,13,0,0,0,23.192,4.808,12.915,12.915,0,0,0,14,1m0-1A14,14,0,1,1,0,14,14,14,0,0,1,14,0Z"
                        transform="translate(1277.5 2031.281)"
                        fill={fill ? fill : '#FFFFFF'}
                    />
                    <path
                        id="Path_1"
                        data-name="Path 1"
                        d="M1146.352,728.483l-.707-.707,3.743-3.743-3.743-3.743.707-.707,4.1,4.1a.5.5,0,0,1,0,.707Z"
                        transform="translate(144.453 1321.248)"
                        fill={fill ? fill : '#FFFFFF'}
                    />
                </g>
            </g>
        </svg>
    );
};

export default ArrowButtonIcon;
