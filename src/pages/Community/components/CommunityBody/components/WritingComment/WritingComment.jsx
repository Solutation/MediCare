import React from 'react';
import classNames from 'classnames/bind';

import styles from './WritingComment.module.scss';
import Charlotte from '~/assets/charlotte.jpg';

const cx = classNames.bind(styles);

const WritingComment = () => {
    return (
        <div className={cx('d-flex', 'align-items-center', 'mt-3')}>
            <img src={Charlotte} alt="" className={cx('avatar')} />
            <div className={cx('w-100')}>
                <textarea rows="2" placeholder="Viết bình luận" className={cx('sending_input')}></textarea>
            </div>
        </div>
    );
};

export default WritingComment;
