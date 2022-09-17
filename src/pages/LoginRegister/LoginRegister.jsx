import React from 'react';
import classNames from 'classnames/bind';

import { FormSectionLeft } from './component/FormSectionLeft';
import { Signin } from './component/Signin';
import { Register } from './component/Register';
import styles from './LoginRegister.module.scss';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('form-wrapper', 'd-flex')}>
                    <FormSectionLeft />
                    <Signin />
                </div>
            </div>
        </div>
    );
}

export default Login;
