import React from 'react';
import classNames from 'classnames/bind';

import { FormSectionLeft } from './components/FormSectionLeft';
import { Signin } from './components/Signin';
import { Register } from './components/Register';
import styles from './LoginRegister.module.scss';
import { SlideProvider } from '~/context/SlideContext';
import { ValidatorProvider } from '~/context/ValidatorContext';

const cx = classNames.bind(styles);

const LoginRegister = ({ login }) => {
    return (
        <SlideProvider>
            <ValidatorProvider>
                <div className={cx('wrapper')}>
                    <div className={cx('container', 'form-wrapper')}>
                        <div className={cx('row')}>
                            <FormSectionLeft />
                            {login ? <Signin /> : <Register />}
                        </div>
                    </div>
                </div>
            </ValidatorProvider>
        </SlideProvider>
    );
};

export default LoginRegister;
