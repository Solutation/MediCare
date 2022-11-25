import React from 'react';
import classNames from 'classnames/bind';

import styles from './Comment.module.scss';
import Charlotte from '~/assets/charlotte.jpg';

const cx = classNames.bind(styles);

const Comment = () => {
    return (
        <>
            <div>
                <h2 className={cx('view_more_comment_text')}>Xem thêm bình luận</h2>
                <div className={cx('d-flex', 'align-items-center', 'mt-3', 'mb-3')}>
                    <img src={Charlotte} alt="" className={cx('avatar')} />
                    <div
                        className={cx('d-flex', 'flex-column', 'h-100', 'comment_content_wrapper', 'mt-3', 'flex-wrap')}
                    >
                        <span className={cx('text-black', 'fw-bold', 'fs-4')}>Lâm Khương Trí</span>
                        <p className={cx('comment_content')}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ducimus omnis facere, ullam
                            non laudantium consectetur! In dolores magnam corporis!
                        </p>
                    </div>
                </div>
                <div className={cx('d-flex', 'align-items-center', 'mt-3', 'mb-3')}>
                    <img src={Charlotte} alt="" className={cx('avatar')} />
                    <div
                        className={cx('d-flex', 'flex-column', 'h-100', 'comment_content_wrapper', 'mt-3', 'flex-wrap')}
                    >
                        <span className={cx('text-black', 'fw-bold', 'fs-4')}>Lâm Khương Trí</span>
                        <p className={cx('comment_content')}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ducimus omnis facere, ullam
                            non laudantium consectetur! In dolores magnam corporis!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Comment;
