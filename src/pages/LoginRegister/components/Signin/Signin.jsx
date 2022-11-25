import React, { useContext, useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from './Signin.module.scss';
import { Button } from '~/components/Button';
import { SlideContext } from '~/context/SlideContext';
import { httpRequest } from '~/utils';
import { Alert } from '~/components/Alert';
import SmileIcon from '~/assets/smile.png';

const cx = classNames.bind(styles);
const cookies = new Cookies();

const initialValues = {
    email: '',
    pass_word: ''
};

const Signin = () => {
    const { slide } = useContext(SlideContext);
    const [role, setRole] = useState('Bệnh nhân');
    const [alertPopup, setAlertPopup] = useState(false);
    const emailRef = useRef('');
    const passwordRef = useRef('');

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email không được để trống'),
        pass_word: Yup.string().required('Mật khẩu không được để trống')
    });

    useEffect(() => {
        const verifiedEmail = cookies.get('email');
        if (verifiedEmail === 'verified') {
            alert('Xác nhận email thành công!');
            cookies.set('email', 'no-verified');
        }
    }, []);

    const handleLoginSubmit = async (formData) => {
        if (role === 'Bệnh nhân') {
            try {
                const {
                    data: { userId, userContactId, chatToken, email, userName, role, avatar }
                } = await httpRequest.post('/auth/patient/login', formData);
                //prettier-ignore
                cookies.set('userAccess', `${userId},${userContactId},${chatToken},${email},${userName},${role},${avatar}`);
                setAlertPopup(true);
            } catch ({ response }) {
                emailRef.current.textContent = response.data.message;
                passwordRef.current.textContent = response.data.message;
            }
        }
        if (role === 'Chuyên gia') {
            try {
                const {
                    data: { userId, userContactId, chatToken, email, userName, role, avatar }
                } = await httpRequest.post('/auth/consultant/login', formData);
                //prettier-ignore
                cookies.set('userAccess', `${userId},${userContactId},${chatToken},${email},${userName},${role},${avatar}`);
                setAlertPopup(true);
            } catch ({ response }) {
                emailRef.current.textContent = response.data.message;
                passwordRef.current.textContent = response.data.message;
            }
        }
    };

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLoginSubmit}>
                <Form className={cx('form_wrapper', 'col-6', { slideUp: slide === true })}>
                    <h1 className={cx('form-title', 'display-4', 'fw-bold')}>Login</h1>
                    <div className={cx('form_inner_wrapper')}>
                        <div className={cx('form-group', 'py-2', 'mt-5')}>
                            <label htmlFor="email" className={cx('form-label', 'py-2', 'text-muted', 'fs-3')}>
                                Email
                            </label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                className={cx('form-control', 'py-3', 'fs-3', 'form-input')}
                                placeholder="Nhập email của bạn"
                                onInput={() => (emailRef.current.textContent = '')}
                            />
                            <span className={cx('error_message')}>
                                <ErrorMessage name="email" />
                            </span>
                            <span className={cx('error_message')} ref={emailRef}></span>
                        </div>
                        <div className={cx('form-group', 'py-3')}>
                            <label htmlFor="pass_word" className={cx('form-label', 'py-2', 'text-muted', 'fs-3')}>
                                Mật khẩu
                            </label>
                            <Field
                                type="password"
                                id="pass_word"
                                name="pass_word"
                                className={cx('form-control', 'py-3', 'fs-3', 'form-input')}
                                placeholder="Nhập mật khẩu của bạn"
                                onInput={() => (passwordRef.current.textContent = '')}
                            />
                            <span className={cx('error_message')}>
                                <ErrorMessage name="pass_word" />
                            </span>
                            <span
                                style={{ position: 'absolute', color: 'red', fontSize: '1.45rem' }}
                                ref={passwordRef}
                            ></span>
                        </div>
                        <div className={cx('d-flex', 'password-save-wrapper', 'py-4', 'justify-content-between')}>
                            <div className={cx('d-flex', 'align-items-center')}>
                                <div className={cx('d-flex', 'align-items-center')}>
                                    <input
                                        type="radio"
                                        name="userRole"
                                        value="Bệnh nhân"
                                        onChange={(e) => setRole(e.target.value)}
                                        checked={role === 'Bệnh nhân' ? true : false}
                                    />
                                    <label className={cx('ms-2')} style={{ fontSize: '1.7rem' }}>
                                        Bệnh nhân
                                    </label>
                                </div>
                                <div className={cx('d-flex', 'align-items-center', 'px-4')}>
                                    <input
                                        type="radio"
                                        name="userRole"
                                        value="Chuyên gia"
                                        onChange={(e) => setRole(e.target.value)}
                                        checked={role === 'Chuyên gia' ? true : false}
                                    />
                                    <label className={cx('ms-2')} style={{ fontSize: '1.7rem' }}>
                                        Chuyên gia
                                    </label>
                                </div>
                            </div>
                            <Link to="" className={cx('form-forget-password', 'fs-3')}>
                                Quên mật khẩu?
                            </Link>
                        </div>
                        <Button rounded warning className={cx('custom-btn', 'fs-3')} type="submit">
                            Đăng nhập
                        </Button>
                        <p className={cx('py-3', 'text-center')}>
                            Chưa có tài khoản?
                            <Link to="/register" className={cx('form-text-register', 'ms-2')}>
                                Đăng ký
                            </Link>
                        </p>
                    </div>
                </Form>
            </Formik>
            {alertPopup && <Alert iconImage={SmileIcon} content="Đăng nhập thành công!" to="/" />}
        </>
    );
};

export default Signin;
