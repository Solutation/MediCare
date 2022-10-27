import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '~/components/Button';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import styles from './CarouselContainer.module.scss';
const cx = classNames.bind(styles);

const CarouselContainer = () => {
    return (
        <>
            <section id="carousel">
                <div className={cx('carousel-professor')}>
                    <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button
                                type="button"
                                data-bs-target="#carouselExampleDark"
                                data-bs-slide-to="0"
                                class="active"
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
                        <div class="carousel-inner">
                            <div class="carousel-item active" data-bs-interval="10000">
                                <div className={cx('professor-card')}>
                                    <div className={cx('professor-image')}>
                                        <img
                                            src={require('../../../../assets/doctor1.jpg')}
                                            alt="Anh"
                                            className={cx('professor-image')}
                                        ></img>
                                    </div>
                                    <div className={cx('professor-info')}>
                                        <div className={cx('professor-detail')}>
                                            <div className={cx('about-professor')}>Chuyên Gia Liên Quan</div>
                                            <h3>Họ Tên: Ngọc Phan</h3>
                                            <h3>Chuyên khoa: Răng hàm mặt</h3>
                                            <h3>SĐT: 0123456789</h3>
                                        </div>
                                        <Button
                                            primary
                                            rounded
                                            rightIcon={<FontAwesomeIcon icon={faArrowRight} className={cx('px-2')} />}
                                        >
                                            Xem thông tin
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item" data-bs-interval="2000">
                                <div className={cx('professor-card')}>
                                    <div className={cx('professor-image')}>
                                        <img
                                            src={require('../../../../assets/doctor2.jpg')}
                                            alt="Anh"
                                            className={cx('professor-image')}
                                        ></img>
                                    </div>
                                    <div className={cx('professor-info')}>
                                        <div className={cx('professor-detail')}>
                                            <div className={cx('about-professor')}>Chuyên Gia Liên Quan</div>
                                            <h3>Họ Tên: Khương Trí</h3>
                                            <h3>Chuyên khoa: Sản phụ</h3>
                                            <h3>SĐT: 0987654321</h3>
                                        </div>
                                        <Button
                                            primary
                                            rounded
                                            rightIcon={<FontAwesomeIcon icon={faArrowRight} className={cx('px-2')} />}
                                        >
                                            Xem thông tin
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div class="carousel-item">
                                <div className={cx('professor-card')}>
                                    <div className={cx('professor-image')}>
                                        <img
                                            src={require('../../../../assets/doctor3.jpg')}
                                            alt="Anh"
                                            className={cx('professor-image')}
                                        ></img>
                                    </div>
                                    <div className={cx('professor-info')}>
                                        <div className={cx('professor-detail')}>
                                            <div className={cx('about-professor')}>Chuyên Gia Liên Quan</div>
                                            <h3>Họ Tên: Đăng Khoa</h3>
                                            <h3>Chuyên khoa: Xương khớp</h3>
                                            <h3>SĐT: 0987123456</h3>
                                        </div>
                                        <Button
                                            className={cx('btn')}
                                            primary
                                            rounded
                                            rightIcon={<FontAwesomeIcon icon={faArrowRight} className={cx('px-2')} />}
                                        >
                                            Xem thông tin
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            class="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleDark"
                            data-bs-slide="prev"
                        >
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button
                            class="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleDark"
                            data-bs-slide="next"
                        >
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CarouselContainer;
