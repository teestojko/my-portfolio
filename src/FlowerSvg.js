import React from 'react';

const FlowerSvg = () => (
    <div className="svg-container">
        <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        >
        <defs>
            {/* 花びら用グラデーション */}
            <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
                offset="0%"
                style={{ stopColor: "rgb(255, 234, 130)", stopOpacity: 1 }}
            />
            <stop
                offset="100%"
                style={{ stopColor: "rgb(255,165,0)", stopOpacity: 1 }}
            />
            </linearGradient>

            {/* 種の部分用グラデーション */}
            <radialGradient id="seedGrad" cx="50%" cy="50%" r="50%">
            <stop
                offset="0%"
                style={{ stopColor: "rgb(240, 133, 56)", stopOpacity: 1 }}
            />
            <stop
                offset="100%"
                style={{ stopColor: "rgb(209, 135, 83)", stopOpacity: 1 }}
            />
            </radialGradient>

            {/* 茎用グラデーション */}
            <linearGradient id="stemGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
                offset="0%"
                style={{ stopColor: "rgb(54, 219, 54)", stopOpacity: 1 }}
            />
            <stop
                offset="100%"
                style={{ stopColor: "rgb(19, 122, 19)", stopOpacity: 1 }}
            />
            </linearGradient>
        </defs>

        {/* 茎 */}
        <rect
            x="48"
            y="60"
            width="4"
            height="50"
            fill="url(#stemGrad)"
            rx="2"
        />

        {/* 花びら */}
        <g transform="translate(50,50)">
            {Array.from({ length: 24 }).map((_, i) => (
            <path
                key={i}
                d="M0,-30 Q5,-15 0,0 Q-5,-15 0,-30"
                fill="url(#petalGrad)"
                transform={`rotate(${i * 15})`}
            />
            ))}
        </g>

        {/* 種の部分 */}
        <circle cx="50" cy="50" r="10" fill="url(#seedGrad)" />
        </svg>
    </div>
);

export default FlowerSvg;
