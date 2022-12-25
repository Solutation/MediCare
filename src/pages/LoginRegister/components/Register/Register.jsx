import React, { useEffect, useContext, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import styles from './Register.module.scss';
import { Button } from '~/components/Button';
import { SlideContext } from '~/context/SlideContext';
import { httpRequest } from '~/utils';
import { Alert } from '~/components/Alert';
import SmileIcon from '~/assets/smile.png';

const cx = classNames.bind(styles);

const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    pass_word: '',
    address: '',
    birth_day: '',
    phone_number: ''
};

const Register = () => {
    const { slide, setSlide } = useContext(SlideContext);
    const [dataResponse, setDataResponse] = useState();
    const [alertPopup, setAlertPopup] = useState(false);
    const emailRef = useRef('');
    const { t } = useTranslation('register');

    useEffect(() => {
        setSlide(true);
        // eslint-disable-next-line
    }, [slide]);

    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required(`${t('first_name')} ${t('not_empty')}`)
            .matches(/^\S*$/, 'Họ lót không được chứa ký tự trắng')
            //eslint-disable-next-line
            .matches(/[^-_+=<!@#$%^&*({})>\d]+$/, 'Họ lót không được chứa số và ký tự đặc biệt')
            .min(2, 'Họ lót phải chứa ít nhất 2 ký tự')
            .max(255, 'Họ lót chỉ được chứa tối đa 255 ký tự'),
        last_name: Yup.string()
            .required('Tên không được để trống')
            //eslint-disable-next-line
            .matches(/[^-_+=<!@#$%^&*({})>\d]+$/, 'Tên không được chứa số và ký tự đặc biệt')
            .min(2, 'Tên phải chứa ít nhất 2 ký tự')
            .max(255, 'Tên chỉ được chứa tối đa 255 ký tự'),
        email: Yup.string()
            .required('Email không được để trống')
            .matches(/^\S*$/, 'Email không được chứa ký tự trắng')
            //eslint-disable-next-line
            .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email không hợp lệ')
            .max(255, 'Email chỉ được chứa tối đa 255 ký tự'),
        pass_word: Yup.string()
            .required('Mật khẩu không được để trống')
            .matches(/^\S*$/, 'Mật khẩu không được chứa ký tự trắng')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/,
                'Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ in hoa, 1 chữ số và 1 ký tự đặc biệt'
            )
            .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự')
            .max(255, 'Mật khẩu chỉ được chứa tối đa 255 ký tự'),
        address: Yup.string()
            .required('Địa chỉ không được để trống')
            //eslint-disable-next-line
            .matches(/[^-_+=<!@#$%^&*({})>]+$/, 'Địa chỉ không được chứa ký tự đặc biệt')
            .min(4, 'Địa chỉ phải chứa ít nhất 4 ký tự')
            .max(255, 'Địa chỉ chỉ được chứa tối đa 255 ký tự'),
        birth_day: Yup.string().required('Ngày sinh không được để trống'),
        phone_number: Yup.string()
            .required('Số điện thoại không được để trống')
            .matches(/^\S*$/, 'Số điện thoại không được chứa ký tự trắng')
            .matches(/[^-_+=<!@#$%^&*({})>]+$/, 'Số điện thoại không được chứa ký tự đặc biệt')
            .matches(/^\d+$/, 'Số điện thoại không được chứa chữ cái')
            //eslint-disable-next-line
            .min(10, 'Số điện thoại phải chứa ít nhất 10 ký tự')
            .max(13, 'Số điện thoại chỉ được chứa tối đa 13 ký tự')
    });

    const handleRegisterSubmit = async (formData) => {
        try {
            const { data } = await httpRequest.post('/signup', formData);
            setDataResponse(data.message);
            setAlertPopup(true);
        } catch ({ response }) {
            emailRef.current.textContent = response.data.message;
        }
    };

    return (
        <>
            <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={handleRegisterSubmit}>
                <Form action="" className={cx('form_wrapper', 'col-6')}>
                    <h1 className={cx('form-title', 'display-4', 'fw-bold')}>Register</h1>
                    <div className={cx('row', 'form_inner_wrapper')}>
                        <div className={cx('form-group', 'col-6', 'mg-top')}>
                            <label htmlFor="first_name" className={cx('form-label', 'text-muted', 'ps-2', 'fs-3')}>
                                Họ lót
                            </label>
                            <Field
                                type="text"
                                id="first_name"
                                name="first_name"
                                className={cx('form-control', 'fs-3', 'form-input')}
                                placeholder="Nhập họ lót của bạn"
                                autoComplete="new-password"
                            />
                            <span className={cx('error_message')}>
                                <ErrorMessage name="first_name" />
                            </span>
                        </div>
                        <div className={cx('form-group', 'col-6', 'mg-top')}>
                            <label htmlFor="last_name" className={cx('form-label', 'text-muted', 'ps-2', 'fs-3')}>
                                Tên
                            </label>
                            <Field
                                type="text"
                                id="last_name"
                                name="last_name"
                                className={cx('form-control', 'fs-3', 'form-input')}
                                placeholder="Nhập tên của bạn"
                                autoComplete="new-password"
                            />
                            <span className={cx('error_message')}>
                                <ErrorMessage name="last_name" />
                            </span>
                        </div>
                        <div className={cx('form-group', 'col-12', 'py-2', 'mg-top')}>
                            <label htmlFor="email" className={cx('form-label', 'text-muted', 'ps-2', 'fs-3')}>
                                Email
                            </label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                className={cx('form-control', 'fs-3', 'form-input')}
                                placeholder="Nhập email của bạn"
                                autoComplete="new-password"
                                onInput={() => (emailRef.current.textContent = '')}
                            />
                            <span className={cx('error_message')}>
                                <ErrorMessage name="email" />
                            </span>
                            <span className={cx('error_message')} ref={emailRef}></span>
                        </div>
                        <div className={cx('form-group', 'col-12', 'py-2', 'mg-top')}>
                            <label htmlFor="pass_word" className={cx('form-label', 'text-muted', 'ps-2', 'fs-3')}>
                                Mật khẩu
                            </label>
                            <Field
                                type="password"
                                id="pass_word"
                                name="pass_word"
                                className={cx('form-control', 'fs-3', 'form-input')}
                                placeholder="Nhập mật khẩu của bạn"
                                autoComplete="new-password"
                            />
                            <span className={cx('error_message')}>
                                <ErrorMessage name="pass_word" />
                            </span>
                        </div>
                        <div className={cx('form-group', 'col-12', 'py-2', 'mg-top')}>
                            <label htmlFor="address" className={cx('form-label', 'text-muted', 'ps-2', 'fs-3')}>
                                Địa chỉ
                            </label>
                            <Field
                                type="text"
                                id="address"
                                name="address"
                                className={cx('form-control', 'fs-3', 'form-input')}
                                placeholder="Nhập địa chỉ của bạn"
                                autoComplete="new-password"
                            />
                            <span className={cx('error_message')}>
                                <ErrorMessage name="address" />
                            </span>
                        </div>
                        <div className={cx('form-group', 'col-6', 'py-2', 'mg-top')}>
                            <label
                                htmlFor="birth_day"
                                className={cx('form-label', 'pt-2', 'text-muted', 'ps-2', 'fs-3')}
                            >
                                Ngày sinh
                            </label>
                            <Field
                                type="date"
                                id="birth_day"
                                name="birth_day"
                                className={cx('form-control', 'fs-3', 'form-input-date', 'text-muted')}
                                placeholder="Nhập ngày sinh của bạn"
                                autoComplete="new-password"
                            />
                            <span className={cx('error_message')}>
                                <ErrorMessage name="birth_day" />
                            </span>
                        </div>
                        <div className={cx('form-group', 'col-6', 'py-2', 'mg-top')}>
                            <label
                                htmlFor="phone_number"
                                className={cx('form-label', 'pt-2', 'text-muted', 'ps-2', 'fs-3')}
                            >
                                Số điện thoại
                            </label>
                            <Field
                                type="text"
                                id="phone_number"
                                name="phone_number"
                                className={cx('form-control', 'fs-3', 'form-input', 'text-muted')}
                                placeholder="Nhập số điện thoại của bạn"
                                autoComplete="new-password"
                            />
                            <span className={cx('error_message')}>
                                <ErrorMessage name="phone_number" />
                            </span>
                        </div>
                        <Button rounded warning className={cx('custom-btn', 'fs-3', 'mt-5')} type="submit">
                            Đăng ký
                        </Button>
                        <p className={cx('py-3', 'text-center')}>
                            Đã có tài khoản?
                            <Link to="/login" className={cx('form-text-register', 'ms-2')}>
                                Đăng nhập
                            </Link>
                        </p>
                    </div>
                </Form>
            </Formik>
            {alertPopup && <Alert iconImage={SmileIcon} content={dataResponse} to="/login" />}
        </>
    );
};

export default Register;
