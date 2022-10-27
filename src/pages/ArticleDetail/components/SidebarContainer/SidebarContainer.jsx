import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import styles from './SidebarContainer.module.scss';
const cx = classNames.bind(styles);

const SidebarContainer = () => {
    return (
        <>
            <div className={cx('news-list', 'd-block')}>
                <div className={cx('block-heading')}>
                    <h3 className={cx('primary', 'mt-2', 'sidebar-title')}>Tin Tức Liên Quan</h3>
                </div>
                <div className={cx('news-wrapper')}>
                    <Link to="" className={cx('news', 'd-flex')}>
                        <img src={require('../../../../assets/news.jpg')} alt="Anh" className={cx('news-image')}></img>
                        <div className={cx('news-info', 'flex-wrap')}>
                            <div className={cx('news-title')}>
                                <h3>Thực đơn hàng ngày cho 1 tháng đầy đủ dinh dưỡng</h3>
                            </div>
                            <div className={cx('news-datetime')}>
                                <FontAwesomeIcon icon={faClock} className={cx('disease-date-icon')} />
                                <span className={cx('px-3')}>August 8, 2022</span>
                            </div>
                        </div>
                    </Link>
                    <Link to="" className={cx('news', 'd-flex')}>
                        <img src={require('../../../../assets/news.jpg')} alt="Anh" className={cx('news-image')}></img>
                        <div className={cx('news-info', 'flex-wrap')}>
                            <div className={cx('news-title')}>
                                <h3>Thực đơn hàng ngày cho 1 tháng đầy đủ dinh dưỡng</h3>
                            </div>
                            <div className={cx('news-datetime')}>
                                <FontAwesomeIcon icon={faClock} className={cx('disease-date-icon')} />
                                <span className={cx('px-3')}>August 8, 2022</span>
                            </div>
                        </div>
                    </Link>
                    <Link to="" className={cx('news', 'd-flex')}>
                        <img src={require('../../../../assets/news.jpg')} alt="Anh" className={cx('news-image')}></img>
                        <div className={cx('news-info', 'flex-wrap')}>
                            <div className={cx('news-title')}>
                                <h3>Thực đơn hàng ngày cho 1 tháng đầy đủ dinh dưỡng</h3>
                            </div>
                            <div className={cx('news-datetime')}>
                                <FontAwesomeIcon icon={faClock} className={cx('disease-date-icon')} />
                                <span className={cx('px-3')}>August 8, 2022</span>
                            </div>
                        </div>
                    </Link>
                    <Link to="" className={cx('news', 'd-flex')}>
                        <img src={require('../../../../assets/news.jpg')} alt="Anh" className={cx('news-image')}></img>
                        <div className={cx('news-info', 'flex-wrap')}>
                            <div className={cx('news-title')}>
                                <h3>Thực đơn hàng ngày cho 1 tháng đầy đủ dinh dưỡng</h3>
                            </div>
                            <div className={cx('news-datetime')}>
                                <FontAwesomeIcon icon={faClock} className={cx('disease-date-icon')} />
                                <span className={cx('px-3')}>August 8, 2022</span>
                            </div>
                        </div>
                    </Link>
                    <Link to="" className={cx('news', 'd-flex')}>
                        <img src={require('../../../../assets/news.jpg')} alt="Anh" className={cx('news-image')}></img>
                        <div className={cx('news-info', 'flex-wrap')}>
                            <div className={cx('news-title')}>
                                <h3>Thực đơn hàng ngày cho 1 tháng đầy đủ dinh dưỡng</h3>
                            </div>
                            <div className={cx('news-datetime')}>
                                <FontAwesomeIcon icon={faClock} className={cx('disease-date-icon')} />
                                <span className={cx('px-3')}>August 8, 2022</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className={cx('tags', 'd-block')}>
                <div className={cx('block-heading')}>
                    <h3 className={cx('primary', 'mt-4', 'sidebar-title')}>Nhãn</h3>
                </div>
                <ul className={cx('tag-list')}>
                    <li>
                        <a href="#">Sinh lý (5)</a>
                    </li>
                    <li>
                        <a href="#">Xương khớp (8)</a>
                    </li>
                    <li>
                        <a href="#">Răng hàm mặt (2)</a>
                    </li>
                    <li>
                        <a href="#">Thị giác (2)</a>
                    </li>
                    <li>
                        <a href="#">Ung thư (6)</a>
                    </li>
                    <li>
                        <a href="#">Hô hấp (3)</a>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default SidebarContainer;
