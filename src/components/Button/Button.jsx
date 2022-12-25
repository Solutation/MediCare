import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    primary = false,
    secondary = false,
    warning = false,
    danger = false,
    outline = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    medium = false,
    serviceBtn = false,
    margin = false,
    padding = false,
    className,
    children,
    leftIcon,
    rightIcon,
    style,
    onClick,
    type,
    ...passProps
}) {
    let Comp = 'button';
    const props = {
        onClick,
        type,
        ...passProps
    };
    if (to) {
        props.to = to;
        Comp = Link;
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
        warning,
        danger,
        outline,
        rounded,
        disabled,
        small,
        margin,
        padding,
        large,
        medium,
        serviceBtn
    });

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('left-icon')}>{leftIcon}</span>}
            <span className={cx('content')}>{children}</span>
            {rightIcon && <span className={cx('right-icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default React.memo(Button);
