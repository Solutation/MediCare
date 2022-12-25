import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Cookies from 'universal-cookie';

import { Button } from '~/components/Button';
import styles from './AdminLogin.module.scss';
import { httpRequest } from '~/utils';

const cx = classNames.bind(styles);

const cookies = new Cookies();

const AdminLogin = ({ setLoginAlert }) => {
    const [initialValues, setInitialValues] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const emailRef = useRef(),
        passwordRef = useRef();

    const validationSchema = Yup.object().shape({
        email: Yup.string().required(`Email không được để trống`),
        pass_word: Yup.string().required('Mật khẩu không được để trống')
    });

    useEffect(() => {
        const initialValues = {
            email: '',
            pass_word: ''
        };
        setInitialValues(initialValues);
    }, []);

    const handleSubmit = async (formData) => {
        try {
            const dataToSend = {
                email: formData.email,
                pass_word: formData.pass_word
            };
            const {
                data: { adminInfo }
            } = await httpRequest.post('/admin/login', dataToSend);
            cookies.set('adminAccess', `${adminInfo.adminId},${adminInfo.email}`);
            setLoginAlert(true);
        } catch ({
            response: {
                data: { message }
            }
        }) {
            setErrorMessage(message);
        }
    };

    return (
        <>
            {initialValues && (
                <>
                    <div className={cx('admin_bg')}></div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize="true"
                    >
                        <Form>
                            <div className={cx('form-wrapper')}>
                                <div className={cx('form-group')}>
                                    <div className={cx('login')}>Admin Portal</div>
                                    <div className={cx('description')}>Email</div>
                                    <Field
                                        className={cx('form-control', 'form-input')}
                                        name="email"
                                        autoComplete="new-password"
                                        onInput={() => setErrorMessage('')}
                                    />
                                    <span className={cx('error_message')}>
                                        <ErrorMessage name="email" />
                                    </span>
                                    <span className={cx('error_message')} ref={emailRef}>
                                        {errorMessage}
                                    </span>
                                    <div style={{ marginTop: '3rem' }} className={cx('description')}>
                                        Password
                                    </div>
                                    <Field
                                        className={cx('form-control', 'form-input')}
                                        name="pass_word"
                                        type="password"
                                        autoComplete="new-password"
                                        onInput={() => setErrorMessage('')}
                                    />
                                    <span className={cx('error_message')}>
                                        <ErrorMessage name="pass_word" />
                                    </span>
                                    <span className={cx('error_message')} ref={passwordRef}>
                                        {errorMessage}
                                    </span>
                                    <Button className={cx('login-btn')} primary type="submit">
                                        Đăng nhập
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    </Formik>
                </>
            )}
        </>
    );
};

export default AdminLogin;
