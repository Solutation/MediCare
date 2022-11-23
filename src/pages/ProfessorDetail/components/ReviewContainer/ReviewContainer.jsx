import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import styles from './ReviewContainer.module.scss';
const cx = classNames.bind(styles);

const ReviewContainer = () => {
    const { t } = useTranslation('professor');

    return (
        <>
            <div className={cx('review-wrapper', 'flex-wrap')}>
                <div className={cx('separate', 'mx-auto')}></div>
                <div className={cx('review')}>
                    <h2>{t('reviews')}</h2>
                </div>
                <div className={cx('review-list')}>
                    <div className={cx('review-item')}>
                        <h3 className={cx('reviewer-name')}>Hoàng Dũng</h3>
                        <p className={cx('review-content')}>
                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
                            of classical Latin Successful revision Surgery After a Bad Reconstruction Successful
                            revision Suas iracundia his ea errem ridens nam an veniam equidem. Lorem ipsum dolor sit
                            amet lore ipsum dolor sit amet
                        </p>
                        <div className={cx('review-info', 'd-flex')}>
                            <div className={cx('review-score')}>
                                <FontAwesomeIcon icon={faStar} className={cx('px-1', 'star')} />
                                <FontAwesomeIcon icon={faStar} className={cx('px-1', 'star')} />
                                <FontAwesomeIcon icon={faStar} className={cx('px-1', 'star')} />
                                <FontAwesomeIcon icon={faStar} className={cx('px-1', 'star')} />
                                <FontAwesomeIcon icon={faStarHalfStroke} className={cx('px-1', 'star')} />
                            </div>
                            <div className={cx('border')}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewContainer;
