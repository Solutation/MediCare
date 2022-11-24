import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '~/components/Button';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

import styles from './CarouselContainer.module.scss';
const cx = classNames.bind(styles);

const CarouselContainer = () => {
    const { t } = useTranslation('article');

    return (
        <>
            <div className={cx('carousel-professor')}>
                <div
                    id="carouselExampleDark"
                    className={cx('carousel', 'carousel-dark', 'slide')}
                    data-bs-ride="carousel"
                >
                    <div className={cx('carousel-indicators')}>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleDark"
                            data-bs-slide-to="0"
                            className={cx('active')}
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleDark"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleDark"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                    </div>
                    <div className={cx('carousel-inner')}>
                        <div className={cx('carousel-item', 'active')} data-bs-interval="10000">
                            <div className={cx('professor-card')}>
                                <div className={cx('professor-image')}>
                                    <img
                                        src={require('~/assets/doctor1.jpg')}
                                        alt="Anh"
                                        className={cx('professor-image')}
                                    ></img>
                                </div>
                                <div className={cx('professor-info')}>
                                    <div className={cx('professor-detail')}>
                                        <div className={cx('about-professor')}>{t('professor')}</div>
                                        <h3>{t('name')}: Ngọc Phan</h3>
                                        <h3>{t('specialist')}: Răng hàm mặt</h3>
                                        <h3>{t('phone')}: 0123456789</h3>
                                    </div>
                                    <Button
                                        primary
                                        rounded
                                        rightIcon={<FontAwesomeIcon icon={faArrowRight} className={cx('px-2')} />}
                                    >
                                        {t('info')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('carousel-item')} data-bs-interval="2000">
                            <div className={cx('professor-card')}>
                                <div className={cx('professor-image')}>
                                    <img
                                        src={require('~/assets/doctor2.jpg')}
                                        alt="Anh"
                                        className={cx('professor-image')}
                                    ></img>
                                </div>
                                <div className={cx('professor-info')}>
                                    <div className={cx('professor-detail')}>
                                        <div className={cx('about-professor')}>{t('professor')}</div>
                                        <h3>{t('name')}: Khương Trí</h3>
                                        <h3>{t('specialist')}: Răng hàm mặt</h3>
                                        <h3>{t('phone')}: 0123454321</h3>
                                    </div>
                                    <Button
                                        primary
                                        rounded
                                        rightIcon={<FontAwesomeIcon icon={faArrowRight} className={cx('px-2')} />}
                                    >
                                        {t('info')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('carousel-item')}>
                            <div className={cx('professor-card')}>
                                <div className={cx('professor-image')}>
                                    <img
                                        src={require('~/assets/doctor3.jpg')}
                                        alt="Anh"
                                        className={cx('professor-image')}
                                    ></img>
                                </div>
                                <div className={cx('professor-info')}>
                                    <div className={cx('professor-detail')}>
                                        <div className={cx('about-professor')}>{t('professor')}</div>
                                        <h3>{t('name')}: Đăng Khoa</h3>
                                        <h3>{t('specialist')}: Răng hàm mặt</h3>
                                        <h3>{t('phone')}: 0123451234</h3>
                                    </div>
                                    <Button
                                        className={cx('btn')}
                                        primary
                                        rounded
                                        rightIcon={<FontAwesomeIcon icon={faArrowRight} className={cx('px-2')} />}
                                    >
                                        {t('info')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        className={cx('carousel-control-prev')}
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide="prev"
                    >
                        <span className={cx('carousel-control-prev-icon')} aria-hidden="true"></span>
                        <span className={cx('visually-hidden')}>Previous</span>
                    </button>
                    <button
                        className={cx('carousel-control-next')}
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide="next"
                    >
                        <span className={cx('carousel-control-next-icon')} aria-hidden="true"></span>
                        <span className={cx('visually-hidden')}>Next</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default CarouselContainer;
