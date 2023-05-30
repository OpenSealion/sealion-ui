import React from 'react';
import classNames from 'classnames';
import StepItem, { StepItemProps } from './step-item';

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    current?: number;
    direction?: 'horizontal' | 'vertical';
    initial?: number;
    labelPlacement?: 'horizontal' | 'vertical';
    size?: 'default' | 'small';
    status?: 'wait' | 'process' | 'finish' | 'error';
    progressDot?: boolean;
    style?: React.CSSProperties;
    dashed?: boolean;
    onChange?: (current: number) => void;
    items?: Array<StepItemProps>;
}

export const StepsContext = React.createContext({
    latestIndex: 0,
    currentIndex: 0,
    initial: 0,
    size: 'default',
    status: 'process',
    labelPlacement: 'horizontal',
    direction: 'horizontal',
    progressDot: false,
    onChange: (current: number) => null,
});

const Steps: React.FC<StepsProps> = (props) => {
    const {
        className,
        current = 0,
        direction = 'horizontal',
        initial = 0,
        labelPlacement = 'horizontal',
        size = 'default',
        status = 'process',
        progressDot = false,
        style,
        dashed = false,
        onChange,
        items = []
    } = props;
    const mergedClassName = classNames('seal-step', `seal-step-direction-${direction}`, `seal-step-dash-${dashed}`, className);
    const stepsContext = React.useMemo(() => {
        return {
            latestIndex: 0,
            currentIndex: current,
            initial,
            size,
            status,
            labelPlacement,
            direction,
            progressDot,
            onChange,
        };
    }, [current, initial, size, status, direction, labelPlacement, progressDot, onChange]);

    return (
        <div className={mergedClassName} style={style}>
            <StepsContext.Provider value={stepsContext}>
                {items.map((item, index) => {
                    return <StepItem {...item} index={initial + index} key={item.title + index} />;
                })}
            </StepsContext.Provider>
        </div>
    );
};

export default Steps;
