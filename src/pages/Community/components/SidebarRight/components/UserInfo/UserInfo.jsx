import React from 'react';
import classNames from 'classnames/bind';

import styles from './UserInfo.module.scss';
import UserAvatar from '~/assets/user1.jpg';
import { Button } from '~/components/Button';

const cx = classNames.bind(styles);

const UserInfo = () => {
    return (
        <div className={cx('user_wrapper')}>
            <div className={cx('d-flex', 'flex-column', 'user_inner')}>
                <div className={cx('d-flex', 'align-items-center')}>
                    <img src={UserAvatar} alt="" className={cx('avatar')} />
                    <div className={cx('d-flex', 'flex-column', 'h-100', 'mt-5')}>
                        <span className={cx('text-black', 'fw-bold', 'mb-2')} style={{ fontSize: '1.6rem' }}>
                            Lâm Khương Trí
                        </span>
                        <span className={cx('text-muted')}>khuongtri91@gmail.com</span>
                    </div>
                </div>
                <div className={cx('d-flex', 'align-items-center', 'p-4', 'ms-3', 'justify-content-around', 'mt-1')}>
                    <div className={cx('d-flex', 'flex-column', 'analysis_wrapper', 'text-center')}>
                        <span className={cx('number', 'text-black', 'mb-1', 'fw-bold')}>300</span>
                        <span className={cx('action_text')}>Bài đăng</span>
                    </div>
                    <div
                        className={cx('d-flex', 'flex-column', 'analysis_wrapper', 'text-center')}
                        style={{ border: 'unset', paddingRight: 'unset' }}
                    >
                        <span className={cx('number', 'text-black', 'mb-1', 'fw-bold')}>1200</span>
                        <span className={cx('action_text')}>Lượt thích</span>
                    </div>
                </div>
                <div className={cx('mx-auto', 'mt-4')}>
                    <Button primary rounded>
                        Xem bài viết
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
