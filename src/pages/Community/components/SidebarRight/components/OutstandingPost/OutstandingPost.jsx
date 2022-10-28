import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './OutstandingPost.module.scss';
import User2Icon from '~/assets/user2.jpg';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

const OutstandingPost = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('')} style={{ padding: '1.4rem' }}>
                <h2 className={cx('section_title')}>Bài viết nổi bật</h2>
                <div className={cx('d-flex', 'align-items-center', 'mb-4')}>
                    <img src={User2Icon} alt="" className={cx('avatar')} />
                    <div className={cx('d-flex', 'flex-column', 'h-100')} style={{ marginTop: '0.6rem' }}>
                        <div className={cx('d-flex', 'justify-content-between')}>
                            <span className={cx('text-black', 'fw-bold')} style={{ fontSize: '1.6rem' }}>
                                Lâm Khương Trí
                            </span>
                            <div>
                                <span className={cx('like_count_text')}>3000</span>
                                <FontAwesomeIcon icon={faThumbsUp} className={cx('like_icon')} />
                            </div>
                        </div>
                        <p className={cx('post_content')}>Lorem ipsum dolor, sit amet consectetur...</p>
                    </div>
                </div>
                <div className={cx('d-flex', 'align-items-center', 'mb-4')}>
                    <img src={User2Icon} alt="" className={cx('avatar')} />
                    <div className={cx('d-flex', 'flex-column', 'h-100')} style={{ marginTop: '0.6rem' }}>
                        <div className={cx('d-flex', 'justify-content-between')}>
                            <span className={cx('text-black', 'fw-bold')} style={{ fontSize: '1.6rem' }}>
                                Lâm Khương Trí
                            </span>
                            <div>
                                <span className={cx('like_count_text')}>3000</span>
                                <FontAwesomeIcon icon={faThumbsUp} className={cx('like_icon')} />
                            </div>
                        </div>
                        <p className={cx('post_content')}>Lorem ipsum dolor, sit amet consectetur...</p>
                    </div>
                </div>
                <div className={cx('d-flex', 'align-items-center', 'mb-4')}>
                    <img src={User2Icon} alt="" className={cx('avatar')} />
                    <div className={cx('d-flex', 'flex-column', 'h-100')} style={{ marginTop: '0.6rem' }}>
                        <div className={cx('d-flex', 'justify-content-between')}>
                            <span className={cx('text-black', 'fw-bold')} style={{ fontSize: '1.6rem' }}>
                                Lâm Khương Trí
                            </span>
                            <div>
                                <span className={cx('like_count_text')}>3000</span>
                                <FontAwesomeIcon icon={faThumbsUp} className={cx('like_icon')} />
                            </div>
                        </div>
                        <p className={cx('post_content')}>Lorem ipsum dolor, sit amet consectetur...</p>
                    </div>
                </div>
                <div className={cx('d-flex', 'align-items-center', 'mb-4')}>
                    <img src={User2Icon} alt="" className={cx('avatar')} />
                    <div className={cx('d-flex', 'flex-column', 'h-100')} style={{ marginTop: '0.6rem' }}>
                        <div className={cx('d-flex', 'justify-content-between')}>
                            <span className={cx('text-black', 'fw-bold')} style={{ fontSize: '1.6rem' }}>
                                Lâm Khương Trí
                            </span>
                            <div>
                                <span className={cx('like_count_text')}>3000</span>
                                <FontAwesomeIcon icon={faThumbsUp} className={cx('like_icon')} />
                            </div>
                        </div>
                        <p className={cx('post_content')}>Lorem ipsum dolor, sit amet consectetur...</p>
                    </div>
                </div>
                <div className={cx('d-flex', 'align-items-center', 'mb-4')}>
                    <img src={User2Icon} alt="" className={cx('avatar')} />
                    <div className={cx('d-flex', 'flex-column', 'h-100')} style={{ marginTop: '0.6rem' }}>
                        <div className={cx('d-flex', 'justify-content-between')}>
                            <span className={cx('text-black', 'fw-bold')} style={{ fontSize: '1.6rem' }}>
                                Lâm Khương Trí
                            </span>
                            <div>
                                <span className={cx('like_count_text')}>3000</span>
                                <FontAwesomeIcon icon={faThumbsUp} className={cx('like_icon')} />
                            </div>
                        </div>
                        <p className={cx('post_content')}>Lorem ipsum dolor, sit amet consectetur...</p>
                    </div>
                </div>
                <div className={cx('d-flex', 'align-items-center', 'mb-4')}>
                    <img src={User2Icon} alt="" className={cx('avatar')} />
                    <div className={cx('d-flex', 'flex-column', 'h-100')} style={{ marginTop: '0.6rem' }}>
                        <div className={cx('d-flex', 'justify-content-between')}>
                            <span className={cx('text-black', 'fw-bold')} style={{ fontSize: '1.6rem' }}>
                                Lâm Khương Trí
                            </span>
                            <div>
                                <span className={cx('like_count_text')}>3000</span>
                                <FontAwesomeIcon icon={faThumbsUp} className={cx('like_icon')} />
                            </div>
                        </div>
                        <p className={cx('post_content')}>Lorem ipsum dolor, sit amet consectetur...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OutstandingPost;
