import React from 'react';
import classNames from 'classnames';
import IconFont from '../icon/icon';

export interface IProgress {
    strokeWidth?: number,
    strokeColor?: string,
    width?: 200,
    percent?: number,
    type?: 'bar' | 'circle';
    status?: 'info' | 'success' | 'warning' | 'error';
    showInfo?: boolean,
    finishIcon?: React.ReactNode,
    className?: string,
    style?: React.CSSProperties
}

const CircleProgress: React.FC<IProgress> = (props) => {
    const {
        strokeWidth = 10,
        width = 150,
        percent = 30,
        status = 'info',
        className,
        showInfo = true,
        strokeColor,
        style,
        children
    } = props;
    const diameter = width;
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (diameter - strokeWidth) / 2;
    // Enclose cicle in a circumscribing square
    const viewBox = `0 0 ${diameter} ${diameter}`;
    // Arc length at 100% coverage is the circle circumference
    const dashArray = radius * Math.PI * 2;
    // Scale 100% coverage overlay with the actual percent
    const dashOffset = dashArray - (dashArray * percent) / 100;
    const circleClass = classNames(
        className,
        'seal-progress-circle-progress',
        {
            [`seal-progress-circle-${status}`]: !!status,
        }
    );
    return (
        <svg
            width={diameter}
            height={diameter}
            viewBox={viewBox}
        >
            <circle
                className="seal-progress-circle-background"
                cx={diameter / 2}
                cy={diameter / 2}
                r={radius}
                strokeWidth={`${strokeWidth}px`}
            />
            <circle
                className={circleClass}
                cx={diameter / 2}
                cy={diameter / 2}
                r={radius}
                fill={strokeColor}
                strokeWidth={`${strokeWidth}px`}
                // Start progress marker at 12 O'Clock
                transform={`rotate(-90 ${diameter / 2} ${diameter / 2})`}
                style={{
                    strokeDasharray: dashArray,
                    strokeDashoffset: dashOffset
                }}
            />
            {showInfo && (
                <text
                    className="seal-progress-circle-num"
                    x="50%"
                    y="50%"
                    dy=".3em"
                    textAnchor="middle"
                >
                    {`${percent}%`}
                </text>
            )}
        </svg>
    );
};

const Progress: React.FC<IProgress> = (props) => {
    const {
        strokeColor,
        percent = 10,
        strokeWidth = 6,
        status = 'info',
        type = 'bar',
        showInfo = true,
        className,
        style,
    } = props;
    const themeClasses = classNames(
        className,
        'seal-progress',
        {
            [`seal-progress-${status}`]: !!status,
        }
    );
    return type === 'bar' ? (
        <div style={{ display: 'flex', alignItems: 'center', ...style }}>
            <div className="seal-progress-container" style={{ height: `${strokeWidth}px` }}>
                <div className={themeClasses} style={{ width: `${percent}%`, background: strokeColor }} />
            </div>
            {showInfo && percent === 100 && <IconFont icon="icon-CheckCircleFilled" style={{ color: '#00B365' }} />}
            {showInfo && percent !== 100 && (
                <span className="seal-progress-num">
                    {percent}
                    %
                </span>
            )}
        </div>
    ) : (
        <CircleProgress {...props} />
    );
};

export default Progress;
