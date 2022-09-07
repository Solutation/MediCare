import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import images from '~/assets';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    useEffect(() => {
        console.log(images);
    }, []);

    return (
        <nav className={cx('navbar', 'navbar-expand-sm', 'wrapper')}>
            <div className="container">
                <Link to="" className={cx('brand-link')}>
                    HealthyCare
                </Link>
                <Link to="" className={cx('logo-link')}>
                    <img src={images.logo} alt="Anh" className={cx('logo-image')} />
                </Link>
                <button class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div id="navbarCollapse" class="collapse navbar-collapse">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a href="" class="nav-link">
                                Chuyên mục
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link">
                                Công cụ kiểm tra
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link">
                                Liên lạc tư vấn
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link">
                                Tìm bệnh viện
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link">
                                Thông tin bác sĩ
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="" class="nav-link">
                                Cộng đồng
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
