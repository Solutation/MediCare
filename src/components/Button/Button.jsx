import React from 'react';
import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    secondary = false,
    outline = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    medium = false,
    serviceBtn = false,
    className,
    children,
    leftIcon,
    rightIcon,
    style,
    onClick,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };
    if (to) {
        props.to = to;
        Comp = 'Link';
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] == 'function') {
                delete props[key];
            }
        });
    }

    const classes = cx('wrapper', {
        [className]: className,
        style,
        primary,
        secondary,
        outline,
        rounded,
        disabled,
        small,
        large,
        medium,
        serviceBtn,
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('left-icon')}>{leftIcon}</span>}
            <span className={cx('content')}>{children}</span>
            {rightIcon && <span className={cx('right-icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
