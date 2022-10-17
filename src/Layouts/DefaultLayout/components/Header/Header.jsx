import React, { useEffect, memo } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';

import images from '~/assets';
import styles from './Header.module.scss';
import { Search } from '../Search';
import { Button } from '~/components/Button';
import { faEllipsisVertical, faUser } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { ServiceItem } from '~/components/ServiceItem';

const cx = classNames.bind(styles);

const Header = () => {
    const serviceItem = [
        { id: 1, image: `${require('~/assets/call.png')}`, name: 'Liên hệ tư vấn', to: '/contact' },
        {
            id: 2,
            image: `${require('~/assets/hospital.png')}`,
            name: 'Tìm bệnh viện',
            separate: true,
            to: ''
        },
        {
            id: 3,
            image: `${require('~/assets/news.png')}`,
            name: 'Xem tin tức bệnh',
            separate: true,
            to: ''
        },
        {
            id: 4,
            image: `${require('~/assets/community.png')}`,
            name: 'Cộng đồng',
            separate: true,
            to: ''
        }
    ];

    return (
        <nav className={cx('navbar', 'navbar-expand-md', 'wrapper')}>
            <div className={cx('container', 'd-flex')}>
                <div className={cx('menu-left')}>
                    <Link to="/" className={cx('logo-link')}>
                        <img src={images.logo} alt="Anh" className={cx('logo-image')} />
                    </Link>
                </div>
                <button
                    className={cx('navbar-toggler')}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                >
                    <span className={cx('navbar-toggler-icon')}></span>
                </button>
                <Search />
                <div id="navbarCollapse" className={cx('collapse', 'navbar-collapse')}>
                    <ul className={cx('navbar-nav', 'ml-auto', 'menu-right')}>
                        <div className={cx('separate')}></div>
                        <li className={cx('nav-item')}>
                            <Tippy
                                interactive
                                delay={[300, 0]}
                                content={
                                    <PopperWrapper className={cx('custom-service-popper')}>
                                        <ServiceItem data={serviceItem} />
                                    </PopperWrapper>
                                }
                                trigger="mouseenter"
                            >
                                <a href="" className={cx('nav-link')}>
                                    Dịch vụ
                                </a>
                            </Tippy>
                        </li>
                        <li className={cx('nav-item')}>
                            <a href="" className={cx('nav-link')}>
                                Chuyên mục
                            </a>
                        </li>
                        <li className={cx('nav-item')}>
                            <a href="" className={cx('nav-link')}>
                                Công cụ kiểm tra
                            </a>
                        </li>
                        <li className={cx('nav-item')}>
                            <a href="" className={cx('nav-link')}>
                                Chuyên gia
                            </a>
                        </li>
                    </ul>
                </div>

                <Button to="/login" primary leftIcon={<FontAwesomeIcon icon={faUser} />} className={cx('fs-3')}>
                    Đăng nhập
                </Button>
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </div>
        </nav>
    );
};

export default memo(Header);
