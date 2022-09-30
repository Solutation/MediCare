import React from 'react';
import classNames from 'classnames/bind';

import styles from './ConsultantsChannel.module.scss';

const cx = classNames.bind(styles);

const ConsultantsChannel = ({ children, error = false, loading, type }) => {
    if (error) {
        return type === 'team' ? (
            <div className={cx('channel_wrapper')}>
                <p className={cx('message')}>Lỗi kết nối, làm ơn đợi một lúc và thử lại sau</p>
            </div>
        ) : null;
    }
    if (loading) {
        return (
            <div className={cx('channel_wrapper')}>
                <p className={cx('message')}>{type === 'team' ? 'Kênh' : 'Tin nhắn'} đang tải...</p>
            </div>
        );
    }

    return (
        <div className={cx('channel_wrapper')}>
            <div className={cx('channel_header')}>
                <p className={cx('channel_title')}>
                    {type === 'team' ? 'Danh sách kênh' : 'Tin nhắn trực tiếp'}
                </p>
            </div>
            {children}
        </div>
    );
};

export default ConsultantsChannel;
