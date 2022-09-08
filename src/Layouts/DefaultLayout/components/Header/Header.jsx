import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import images from '~/assets';
import styles from './Header.module.scss';
import { Search } from '../Search';

const cx = classNames.bind(styles);

function Header() {
    useEffect(() => {
        console.log(images);
    }, []);

    return (
        <nav className={cx('navbar', 'navbar-expand-sm', 'wrapper')}>
            <div className={cx('menu-left')}>
                <Link to="" className={cx('logo-link')}>
                    <img src={images.logo} alt="Anh" className={cx('logo-image')} />
                </Link>
                <Link to="" className={cx('brand-link')}>
                    HealthyCare
                </Link>
            </div>
            <button
                className={cx('navbar-toggler')}
                data-toggle="collapse"
                data-target="#navbarCollapse"
            >
                <span className={cx('navbar-toggler-icon')}></span>
            </button>
            <Search />
            <div id="navbarCollapse" className={cx('collapse', 'navbar-collapse')}>
                <ul className={cx('navbar-nav', 'ml-auto', 'menu-right')}>
                    <div className={cx('separate')}></div>
                    <li className={cx('nav-item')}>
                        <a href="" className={cx('nav-link')}>
                            Chuyên mục
                        </a>
                    </li>
                    <li className={cx('nav-item')}>
                        <a href="" className={cx('nav-link')}>
                            Dịch vụ
                        </a>
                    </li>
                    <li className={cx('nav-item')}>
                        <a href="" className={cx('nav-link')}>
                            Tìm bệnh viện
                        </a>
                    </li>
                    <li className={cx('nav-item')}>
                        <a href="" className={cx('nav-link')}>
                            Thông tin bác sĩ
                        </a>
                    </li>
                    <li className={cx('nav-item')}>
                        <a href="" className={cx('nav-link')}>
                            Cộng đồng
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;
