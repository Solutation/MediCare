import React, { memo } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import styles from './Alert.module.scss';

const cx = classNames.bind(styles);

const Alert = ({ iconFont, iconImage, content, to, colorIcon, setAlertPopup }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (to) navigate(to);
        else setAlertPopup(false);
    };

    return (
        <div className={cx('blur')}>
            <div className={cx('blur_overllay')}></div>
            <div className={cx('wrapper')}>
                {iconFont && (
                    <span className={cx('icon')} style={{ color: colorIcon }}>
                        {iconFont}
                    </span>
                )}
                {iconImage && <img className={cx('icon')} src={iconImage} alt="" />}
                <span className={cx('content')}>{content ? content : 'Chưa có nội dung'}</span>
                <button className={cx('alert_btn')} onClick={handleClick}>
                    OK
                </button>
            </div>
        </div>
    );
};

export default memo(Alert);
