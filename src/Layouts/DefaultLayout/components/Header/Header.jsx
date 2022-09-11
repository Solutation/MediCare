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
        <nav className={cx('navbar', 'navbar-expand-md', 'wrapper')}>
            <div className={cx('container')}>
                <div className={cx('menu-left')}>
                    <Link to="" className={cx('logo-link')}>
                        <img src={images.logo} alt="Anh" className={cx('logo-image')} />
                    </Link>
                </div>
                <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <FontAwesomeIcon icon={faUser} />
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
                <div className={cx('btn-wrapper')}>
                    <Button primary leftIcon={<FontAwesomeIcon icon={faUser} className={cx('custom-button')} />}>
                        Đăng nhập
                    </Button>
                </div>
            </div>
        </nav>
    );
}

export default Header;
