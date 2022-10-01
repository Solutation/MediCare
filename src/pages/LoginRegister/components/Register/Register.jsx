import React, { useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Register.module.scss';
import { Button } from '~/components/Button';
import { SlideContext } from '~/context/SlideContext';

const cx = classNames.bind(styles);

function Register() {
    const { slide, setSlide } = useContext(SlideContext);

    useEffect(() => {
        setSlide(true);
    }, [slide]);

    return (
        <form action="" className={cx('form_wrapper', 'col-6')}>
            <h1 className={cx('form-title', 'display-4', 'fw-bold')}>Register</h1>
            <div className={cx('row', 'form_inner_wrapper')}>
                <div className={cx('form-group', 'col-6')}>
                    <label htmlFor="firstName" className={cx('form-label', 'text-muted', 'ps-2', 'fs-3')}>
                        Họ lót
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        className={cx('form-control', 'fs-3', 'form-input')}
                        placeholder="Nhập họ lót của bạn"
                    />
                </div>
                <div className={cx('form-group', 'col-6')}>
                    <label htmlFor="name" className={cx('form-label', 'text-muted', 'ps-2', 'fs-3')}>
                        Tên
                    </label>
                    <input
                        type="text"
                        id="name"
                        className={cx('form-control', 'fs-3', 'form-input')}
                        placeholder="Nhập tên của bạn"
                    />
                </div>
                <div className={cx('form-group', 'col-6', 'py-2')}>
                    <label htmlFor="firstName" className={cx('form-label', 'pt-2', 'text-muted', 'ps-2', 'fs-3')}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={cx('form-control', 'fs-3', 'form-input')}
                        placeholder="Nhập email của bạn"
                    />
                </div>
                <div className={cx('form-group', 'col-6', 'py-2')}>
                    <label htmlFor="password" className={cx('form-label', 'pt-2', 'text-muted', 'ps-2', 'fs-3')}>
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        id="password"
                        className={cx('form-control', 'fs-3', 'form-input')}
                        placeholder="Nhập mật khẩu của bạn"
                    />
                </div>
                <div className={cx('form-group', 'col-12', 'py-2')}>
                    <label htmlFor="address" className={cx('form-label', 'pt-2', 'text-muted', 'ps-2', 'fs-3')}>
                        Địa chỉ
                    </label>
                    <input
                        type="text"
                        id="address"
                        className={cx('form-control', 'fs-3', 'form-input')}
                        placeholder="Nhập địa chỉ của bạn"
                    />
                </div>
                <div className={cx('form-group', 'col-6', 'py-2')}>
                    <label htmlFor="date" className={cx('form-label', 'pt-2', 'text-muted', 'ps-2', 'fs-3')}>
                        Ngày sinh
                    </label>
                    <input
                        type="date"
                        id="date"
                        className={cx('form-control', 'fs-3', 'form-input-date', 'text-muted')}
                        placeholder="Nhập ngày sinh của bạn"
                    />
                </div>
                <div className={cx('form-group', 'col-6', 'py-2')}>
                    <label for="formFile" className={cx('form-label', 'pt-2', 'text-muted', 'ps-2', 'fs-3')}>
                        Ảnh
                    </label>
                    <input className={cx('form-control', 'fs-3', 'form-input', 'me-4')} type="file" id="formFile" />
                </div>
                <Button rounded warning className={cx('custom-btn', 'fs-3', 'mt-5')}>
                    Đăng ký
                </Button>
                <p className={cx('py-3', 'text-center')}>
                    Đã có tài khoản?
                    <Link to="/login" className={cx('form-text-register', 'ms-2')}>
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </form>
    );
}

export default Register;
