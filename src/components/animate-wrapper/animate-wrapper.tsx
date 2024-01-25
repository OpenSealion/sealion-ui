import React, {
    FC, ReactNode, useEffect, useRef
} from 'react';
import classNames from 'classnames';
import styles from './style/index.less';

export interface AnimateWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    scaleUP?: boolean;
    className?: string;
    intersectionRatio?: number;
    style?: React.CSSProperties;
    delay?: number;
    children?: ReactNode;
}

const AnimateWrapper: FC<AnimateWrapperProps> = ({
    scaleUP = false,
    intersectionRatio = 0.5,
    children,
    className,
    style,
    delay = 0,
    ...rest
}) => {
    const ref = useRef(null);

    useEffect(() => {
        const io = new IntersectionObserver(
            entries => {
                entries.forEach(i => {
                    if (i.intersectionRatio > intersectionRatio) {
                        i.target.classList.add('appear-animation');
                        if (scaleUP) {
                            i.target.classList.add('scale-up-animation');
                        }
                    }
                    if (i.intersectionRatio === 0) {
                        i.target.classList.remove('appear-animation');
                        i.target.classList.remove('scale-up-animation');
                    }
                });
            },
            {
                root: null,
                rootMargin: '0%',
                threshold: [0, 0.5, 1],
            }
        );
        io.observe(ref.current);

        return () => {
            if (ref.current) {
                io.unobserve(ref.current);
            }
            io.disconnect();
        };
    }, []);
    return (
        <div
            className={classNames(styles.animateWrapper, className)}
            ref={ref}
            style={{ ...style, animationDelay: `${delay}s` }}
            {...rest}
        >
            {children}
        </div>
    );
};

export default AnimateWrapper;
