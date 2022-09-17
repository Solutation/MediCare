import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Signin.module.scss';
import { Button } from '~/components/Button';

const cx = classNames.bind(styles);

function Signin() {
    return (
        <form action="" className={cx('wrapper')}>
            <h1 className={cx('form-title', 'display-4', 'fw-bold', '')}>Login</h1>
            <div className={cx('form-group', 'py-2', 'mt-5')}>
                <label htmlFor="email" className={cx('form-label', 'py-2', 'text-muted')}>
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className={cx('form-control', 'py-2', 'fs-4', 'form-input')}
                    placeholder="Nhập email của bạn"
                />
            </div>
            <div className={cx('form-group', 'py-2')}>
                <label htmlFor="password" className={cx('form-label', 'py-2', 'text-muted')}>
                    Mật khẩu
                </label>
                <input
                    type="password"
                    id="password"
                    className={cx('form-control', 'py-2', 'fs-4', 'form-input')}
                    placeholder="Nhập mật khẩu của bạn"
                />
            </div>
            <div className={cx('d-flex', 'password-save-wrapper', 'py-4', 'justify-content-between')}>
                <div className={cx('d-flex', 'align-items-center')}>
                    <input type="checkbox" className={cx('form-check')} />
                    <label htmlFor="" className={cx('ms-2', 'text-muted')}>
                        Lưu mật khẩu
                    </label>
                </div>
                <Link to="" className={cx('form-forget-password')}>
                    Quên mật khẩu?
                </Link>
            </div>

            <Button rounded warning className={cx('custom-btn')}>
                Đăng nhập
            </Button>
        </form>
    );
}

export default Signin;
