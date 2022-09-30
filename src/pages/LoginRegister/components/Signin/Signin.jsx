import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Signin.module.scss';
import { Button } from '~/components/Button';
import { SlideContext } from '~/context/SlideContext';

const cx = classNames.bind(styles);

function Signin() {
    const { slide } = useContext(SlideContext);

    return (
        <form action="" className={cx('form_wrapper', 'col-6', { slideUp: slide === true })}>
            <h1 className={cx('form-title', 'display-4', 'fw-bold')}>Login</h1>
            <div className={cx('form_inner_wrapper')}>
                <div className={cx('form-group', 'py-2', 'mt-5')}>
                    <label htmlFor="email" className={cx('form-label', 'py-2', 'text-muted', 'fs-3')}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={cx('form-control', 'py-3', 'fs-3', 'form-input')}
                        placeholder="Nhập email của bạn"
                    />
                </div>
                <div className={cx('form-group', 'py-2')}>
                    <label htmlFor="password" className={cx('form-label', 'py-2', 'text-muted', 'fs-3')}>
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        id="password"
                        className={cx('form-control', 'py-3', 'fs-3', 'form-input')}
                        placeholder="Nhập mật khẩu của bạn"
                    />
                </div>
                <div className={cx('d-flex', 'password-save-wrapper', 'py-4', 'justify-content-between')}>
                    <div className={cx('d-flex', 'align-items-center')}>
                        <input type="checkbox" className={cx('form-check')} />
                        <label htmlFor="" className={cx('ms-2', 'text-muted', 'fs-3')}>
                            Lưu mật khẩu
                        </label>
                    </div>
                    <Link to="" className={cx('form-forget-password', 'fs-3')}>
                        Quên mật khẩu?
                    </Link>
                </div>

                <Button rounded warning className={cx('custom-btn', 'fs-3')}>
                    Đăng nhập
                </Button>
                <p className={cx('py-3', 'text-center')}>
                    Chưa có tài khoản?
                    <Link to="/register" className={cx('form-text-register', 'ms-2')}>
                        Đăng ký
                    </Link>
                </p>
            </div>
        </form>
    );
}

export default Signin;
