import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import images from '~/assets';
import styles from './Header.module.scss';
import { Search } from '../Search';
import { Button } from '~/components/Button';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Header() {
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
            <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span class="navbar-toggler-icon red"></span>
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
            <Button secondary leftIcon={<FontAwesomeIcon icon={faUser} />}>
                Đăng nhập
            </Button>
        </nav>
    );
}

export default Header;
