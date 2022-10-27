import React from 'react';
import classNames from 'classnames/bind';
import { Button } from '~/components/Button';
import { ReviewContainer } from '../ReviewContainer';

import styles from './ProfessorContainer.module.scss';
const cx = classNames.bind(styles);

const ProfessorContainer = () => {
    return (
        <>
            <section id="article">
                <div className={cx('container', 'flex-wrap')}>
                    <div className={cx('row', 'mx-auto', 'd-flex')}>
                        <div className={cx('col-7', 'offset-1', 'professor-info')}>
                            <div className={cx('professor-wrapper')}>
                                <h1 className={cx('biography')}>Tiểu Sử</h1>
                                <p>
                                    Suas iracundia his ea errem ridens nam an veniam equidem. Lorem ipsum dolor sit amet
                                    lore ipsum dolor sit amet. Suas iracundia his ea errem ridens nam an veniam equidem.
                                    Lorem ipsum dolor sit amet lore ipsum dolor sit amet Suas iracundia his ea errem
                                    ridens nam an veniam equidem. Lorem ipsum dolor sit amet lore ipsum dolor sit amet.
                                    Suas iracundia his ea errem ridens nam an veniam equidem. Lorem ipsum dolor sit amet
                                    lore ipsum dolor sit amet Suas iracundia his ea errem ridens nam an veniam equidem.
                                    Lorem ipsum dolor sit amet lore ipsum dolor sit amet. Suas iracundia his ea errem
                                    ridens nam an veniam equidem. Lorem ipsum dolor sit amet lore ipsum dolor sit amet
                                </p>
                                <div className={cx('more-info')}>
                                    <ul className={cx('insurance-list')}>
                                        <li>
                                            <b>Kinh nghiệm:</b> <span>9 năm</span>
                                        </li>
                                        <li>
                                            <b>Quê quán:</b> <span>Hà Nội</span>
                                        </li>
                                        <li>
                                            <b>Kí hợp đồng:</b> <span>2010</span>
                                        </li>
                                        <li>
                                            <b>Tình trạng công việc:</b> <span>Tự do</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-3', 'sidebar')}>
                            <div className={cx('sidebar-wrapper')}>
                                <img
                                    src={require('../../../../assets/doctor1.jpg')}
                                    alt="Anh"
                                    className={cx('professor-image')}
                                ></img>

                                <Button className={cx('contact-btn')} primary>
                                    Liên hệ tư vấn
                                </Button>
                                <Button className={cx('review-btn')} primary>
                                    Đánh giá
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ReviewContainer></ReviewContainer>
        </>
    );
};

export default ProfessorContainer;
