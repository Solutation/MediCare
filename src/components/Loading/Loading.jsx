import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

const Loading = ({ messageLoading }) => {
    return (
        <div className={cx('blur')}>
            <div className={cx('blur_overllay')}></div>
            <div className={cx('wrapper')}>
                <div className={cx('loading_icon')}>
                    <FontAwesomeIcon icon={faSpinner} />
                </div>
                <span className={cx('loading_text')}>{messageLoading ? messageLoading : 'Đang tải'}</span>
            </div>
        </div>
    );
};

export default Loading;
