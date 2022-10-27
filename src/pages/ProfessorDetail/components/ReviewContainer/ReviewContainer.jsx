import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';

import styles from './ReviewContainer.module.scss';
const cx = classNames.bind(styles);

const ReviewContainer = () => {
    return (
        <>
            <section id="review-details">
                <div className={cx('container', 'flex-wrap')}>
                    <div className={cx('row', 'mx-auto')}>
                        <div className={cx('col-10', 'review-wrapper')}>
                            <div className={cx('separate', 'mx-auto')}></div>
                            <div className={cx('review')}>
                                <h2>ĐÁNH GIÁ TỪ KHÁCH HÀNG</h2>
                            </div>
                            <div className={cx('review-list')}>
                                <div className={cx('review-item')}>
                                    <h3 className={cx('review-title')}>
                                        Successful revision Surgery After a Bad Reconstruction
                                    </h3>
                                    <p className={cx('review-content')}>
                                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
                                        in a piece of classical Latin Successful revision Surgery After a Bad
                                        Reconstruction Successful revision Suas iracundia his ea errem ridens nam an
                                        veniam equidem. Lorem ipsum dolor sit amet lore ipsum dolor sit amet
                                    </p>
                                    <div className={cx('review-info', 'd-flex')}>
                                        <div className={cx('review-score')}>
                                            <FontAwesomeIcon icon={faStar} className={cx('px-1', 'star')} />
                                            <FontAwesomeIcon icon={faStar} className={cx('px-1', 'star')} />
                                            <FontAwesomeIcon icon={faStar} className={cx('px-1', 'star')} />
                                            <FontAwesomeIcon icon={faStar} className={cx('px-1', 'star')} />
                                            <FontAwesomeIcon icon={faStarHalfStroke} className={cx('px-1', 'star')} />
                                        </div>
                                        <div className={cx('reviewer', 'primary', 'px-3')}>Hoàng Dũng</div>
                                        <div className={cx('border')}></div>
                                    </div>
                                </div>
                                <div className={cx('review-item')}>
                                    <h3 className={cx('review-title')}>
                                        Successful revision Surgery After a Bad Reconstruction
                                    </h3>
                                    <p className={cx('review-content')}>
                                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
                                        in a piece of classical Latin Successful revision Surgery After a Bad
                                        Reconstruction Successful revision Suas iracundia his ea errem ridens nam an
                                        veniam equidem. Lorem ipsum dolor sit amet lore ipsum dolor sit amet
                                    </p>
                                    <div className={cx('review-info', 'd-flex')}>
                                        <div className={cx('review-score')}>
                                            <FontAwesomeIcon icon={faStar} className={cx('px-1', 'star')} />
                                            <FontAwesomeIcon icon={faStar} className={cx('px-1', 'star')} />
                                            <FontAwesomeIcon icon={faStar} className={cx('px-1', 'star')} />
                                            <FontAwesomeIcon icon={faStar} className={cx('px-1', 'star')} />
                                            <FontAwesomeIcon icon={faStarHalfStroke} className={cx('px-1', 'star')} />
                                        </div>
                                        <div className={cx('reviewer', 'primary', 'px-3')}>Hoàng Dũng</div>
                                        <div className={cx('border')}></div>
                                    </div>
                                </div>
                                <div className={cx('review-item')}>
                                    <h3 className={cx('review-title')}>
                                        Successful revision Surgery After a Bad Reconstruction
                                    </h3>
                                    <p className={cx('review-content')}>
                                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
                                        in a piece of classical Latin Successful revision Surgery After a Bad
                                        Reconstruction Successful revision Suas iracundia his ea errem ridens nam an
                                        veniam equidem. Lorem ipsum dolor sit amet lore ipsum dolor sit ametttttttt
                                    </p>
                                    <div className={cx('review-info', 'd-flex')}>
                                        <div className={cx('review-score')}>
                                            <FontAwesomeIcon icon={faStar} className={cx('px-1', 'star')} />
                                            <FontAwesomeIcon icon={faStar} className={cx('px-1', 'star')} />
                                            <FontAwesomeIcon icon={faStar} className={cx('px-1', 'star')} />
                                            <FontAwesomeIcon icon={faStar} className={cx('px-1', 'star')} />
                                            <FontAwesomeIcon icon={faStarHalfStroke} className={cx('px-1', 'star')} />
                                        </div>
                                        <div className={cx('reviewer', 'primary', 'px-3')}>Hoàng Dũng</div>
                                        <div className={cx('border')}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ReviewContainer;
