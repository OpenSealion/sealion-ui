import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom'

const Transition: React.FC<CSSTransitionProps> = ({
    wrapped = false,
    children,
    classNames,
    timeout,
    animation,
    unmountOnExit = true,
    appear = true,
    ...rest
}) => {
    return (
        <CSSTransition
            timeout={timeout}
            classNames={classNames || animation}
            appear={appear}
            unmountOnExit={unmountOnExit}
            {...rest}
        >
            {
                wrapped ? (
                    <div>{children}</div>
                ) : children
            }
        </CSSTransition>
    );
};

export default Transition;
