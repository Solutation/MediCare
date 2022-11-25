import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import styles from './UpdateUser.module.scss';
import CharlotteIcon from '~/assets/charlotte.jpg';
import { Button } from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const UpdateUser = ({ setUpdateUser }) => {
    const [initialValues, setInitialValues] = useState();

    useEffect(() => {
        //fetch API
        const initalValues = {
            first_name: 'Khuong',
            last_name: 'Tri',
            email: 'tri@gmail.com',
            username: 'khuongtri91',
            pass_word: 'tri123',
            address: '23 Lê Duẩn',
            phone_number: '12091239012',
            birth_day: '13/02/2000'
        };
        setInitialValues(initalValues);
    }, []);

    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required('Họ lót không được để trống')
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
        username: Yup.string()
            .required('Tên đăng nhập không được để trống')
            .matches(/^\S*$/, 'Tên đăng nhập không được chứa ký tự trắng')
            .min(2, 'Tên đăng nhập phải chứa ít nhất 2 ký tự')
            .max(255, 'Tên đăng nhập chỉ được chứa tối đa 255 ký tự'),
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
            .min(10, 'Địa chỉ phải chứa ít nhất 10 ký tự')
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

    const handleSubmit = (formData, { setSubmitting }) => {
        setSubmitting(false);
    };

    return (
        <>
            {initialValues && (
                <div className={cx('overllay')}>
                    <div className={cx('overllay_inner')}></div>
                    <div className={cx('wrapper')}>
                        <div className={cx('p-2', 'd-flex', 'flex-column')}>
                            <div className={cx('d-flex', 'justify-content-between', 'py-2', 'mt-2')}>
                                <h2 className={cx('fw-bold', 'ms-3')}>Sửa người dùng</h2>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    className={cx('close_icon')}
                                    onClick={() => setUpdateUser(false)}
                                />
                            </div>
                            <hr />
                            <div className={cx('form_wrapper')}>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    <Form action="" className={cx('px-3')}>
                                        <div className={cx('row')}>
                                            <div
                                                className={cx('col-8', 'd-flex', 'align-items-start')}
                                                style={{ padding: '0 1.6rem' }}
                                            >
                                                <div className={cx('d-flex', 'flex-column')} style={{ width: '16%' }}>
                                                    <span className={cx('form_label')}>Họ lót</span>
                                                    <span className={cx('form_label')}>Tên</span>
                                                    <span className={cx('form_label')}>Email</span>
                                                    <span className={cx('form_label')}>Tên đăng nhập</span>
                                                    <span className={cx('form_label')}>Mật khẩu</span>
                                                    <span className={cx('form_label')}>Địa chỉ</span>
                                                    <span className={cx('form_label')}>Số điện thoại</span>
                                                    <span className={cx('form_label')}>Ngày sinh</span>
                                                </div>
                                                <div
                                                    className={cx('d-flex', 'flex-column', 'px-5')}
                                                    style={{ width: '70%' }}
                                                >
                                                    <div className={cx('form_input_group')}>
                                                        <Field
                                                            className={cx('form_input')}
                                                            type="text"
                                                            name="first_name"
                                                            placeholder=""
                                                            autoComplete="new-password"
                                                        />
                                                        <span
                                                            className={cx('error_message')}
                                                            style={{ marginTop: '3.6rem' }}
                                                        >
                                                            <ErrorMessage name="first_name" />
                                                        </span>
                                                    </div>
                                                    <div className={cx('form_input_group')}>
                                                        <Field
                                                            className={cx('form_input')}
                                                            name="last_name"
                                                            autoComplete="new-password"
                                                        />
                                                        <span
                                                            className={cx('error_message')}
                                                            style={{ marginTop: '3.6rem' }}
                                                        >
                                                            <ErrorMessage name="last_name" />
                                                        </span>
                                                    </div>
                                                    <div className={cx('form_input_group')}>
                                                        <Field
                                                            className={cx('form_input')}
                                                            name="email"
                                                            autoComplete="new-password"
                                                        />
                                                        <span
                                                            className={cx('error_message')}
                                                            style={{ marginTop: '3.6rem' }}
                                                        >
                                                            <ErrorMessage name="email" />
                                                        </span>
                                                    </div>
                                                    <div className={cx('form_input_group')}>
                                                        <Field
                                                            className={cx('form_input')}
                                                            name="username"
                                                            autoComplete="new-password"
                                                        />
                                                        <span
                                                            className={cx('error_message')}
                                                            style={{ marginTop: '3.6rem' }}
                                                        >
                                                            <ErrorMessage name="username" />
                                                        </span>
                                                    </div>
                                                    <div className={cx('form_input_group')}>
                                                        <Field
                                                            type="password"
                                                            className={cx('form_input')}
                                                            name="pass_word"
                                                            autoComplete="new-password"
                                                        />
                                                        <span
                                                            className={cx('error_message')}
                                                            style={{ marginTop: '3.6rem' }}
                                                        >
                                                            <ErrorMessage name="pass_word" />
                                                        </span>
                                                    </div>
                                                    <div className={cx('form_input_group')}>
                                                        <Field
                                                            className={cx('form_input')}
                                                            name="address"
                                                            autoComplete="new-password"
                                                        />
                                                        <span
                                                            className={cx('error_message')}
                                                            style={{ marginTop: '3.6rem' }}
                                                        >
                                                            <ErrorMessage name="address" />
                                                        </span>
                                                    </div>
                                                    <div className={cx('form_input_group')}>
                                                        <Field
                                                            className={cx('form_input')}
                                                            name="phone_number"
                                                            autoComplete="new-password"
                                                        />
                                                        <span
                                                            className={cx('error_message')}
                                                            style={{ marginTop: '3.6rem' }}
                                                        >
                                                            <ErrorMessage name="phone_number" />
                                                        </span>
                                                    </div>
                                                    <div className={cx('form_input_group')}>
                                                        <Field
                                                            className={cx('form_input_date')}
                                                            name="birth_day"
                                                            type="date"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('col-4', 'right_section')}>
                                                <div
                                                    className={cx(
                                                        'd-flex',
                                                        'justify-content-center',
                                                        'align-items-center',
                                                        'w-100',
                                                        'h-100',
                                                        'flex-column',
                                                        'px-2'
                                                    )}
                                                >
                                                    <img src={CharlotteIcon} alt="" className={cx('avatar')} />
                                                    <div className={cx('image_label_wrapper')}>
                                                        <label
                                                            htmlFor="imageChoosen"
                                                            className={cx('btn_choose_image')}
                                                        >
                                                            Chọn ảnh
                                                        </label>
                                                    </div>
                                                    <Field
                                                        id="imageChoosen"
                                                        type="file"
                                                        style={{ display: 'none' }}
                                                        name="avatar"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            style={{ padding: '2rem 0.6rem', width: '10%' }}
                                            className={cx('d-inline-block')}
                                        >
                                            <Button primary type="submit">
                                                Lưu
                                            </Button>
                                        </div>
                                        <div
                                            style={{ padding: '2rem 0.6rem', width: '10%' }}
                                            className={cx('d-inline-block', 'ms-4')}
                                        >
                                            <Button secondary type="submit">
                                                Huỷ bỏ
                                            </Button>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateUser;
