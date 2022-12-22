import React from 'react';
import classNames from 'classnames/bind';

import { Button } from '~/components/Button';
import styles from './AdminLogin.module.scss';

const cx = classNames.bind(styles);

const AdminLogin = () => {
    return (
        <>
            <div className={cx('admin_bg')}></div>
            <div className={cx('form-wrapper')}>
                <div className={cx('form-group')}>
                    <div className={cx('login')}>Login As Admin</div>
                    <div className={cx('description')}>Account</div>
                    <input className={cx('form-control', 'form-input')}></input>
                    <div className={cx('description')}>Password</div>
                    <input className={cx('form-control', 'form-input')}></input>
                    <Button className={cx('login-btn')} primary rounded type="submit">
                        Login
                    </Button>
                </div>
            </div>
        </>
    );
};

export default AdminLogin;
