import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';

import images from '~/assets';
import styles from './Header.module.scss';
import { Search } from '../Search';
import { Button } from '~/components/Button';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { ServiceItem } from '~/components/ServiceItem';

const cx = classNames.bind(styles);

function Header() {
    return (
        <nav className={cx('navbar', 'navbar-expand-md', 'wrapper')}>
            <div className={cx('container', 'd-flex')}>
                <div className={cx('menu-left')}>
                    <Link to="" className={cx('logo-link')}>
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
                                content={
                                    <PopperWrapper>
                                        <ServiceItem />
                                        <ServiceItem />
                                        <ServiceItem />
                                        <ServiceItem />
                                    </PopperWrapper>
                                }
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
                                Thông tin bác sĩ
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
