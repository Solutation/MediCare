import React from 'react';
import classNames from 'classnames/bind';

import { FormSectionLeft } from './components/FormSectionLeft';
import { Signin } from './components/Signin';
import { Register } from './components/Register';
import styles from './LoginRegister.module.scss';
import { SlideProvider } from '~/context/SlideContext';

const cx = classNames.bind(styles);

function LoginRegister({ login }) {
    console.log(login);

    return (
        <SlideProvider>
            <div className={cx('wrapper')}>
                <div className={cx('container', 'form-wrapper')}>
                    <div className={cx('row')}>
                        <FormSectionLeft />
                        {login ? <Signin /> : <Register />}
                    </div>
                </div>
            </div>
        </SlideProvider>
    );
}

export default LoginRegister;
