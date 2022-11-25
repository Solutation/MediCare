import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames/bind';

import styles from './EditInfoProfile.module.scss';
import CharlotteIcon from '~/assets/charlotte.jpg';
import { Button } from '~/components/Button';
import { checkFileExtension } from '~/utils';
import { uploadImage, getImageUrl } from '~/utils/fileUtils';

const cx = classNames.bind(styles);

const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    address: '',
    birth_day: '',
    phone_number: ''
};

const EditInfoProfile = () => {
    const [fileUpload, setFileUpload] = useState();
    const [fileUrl, setFileUrl] = useState();

    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .matches(/^\S*$/, 'Họ lót không được chứa ký tự trắng')
            //eslint-disable-next-line
            .matches(/[^-_+=<!@#$%^&*({})>\d]+$/, 'Họ lót không được chứa số và ký tự đặc biệt')
            .min(2, 'Họ lót phải chứa ít nhất 2 ký tự')
            .max(255, 'Họ lót chỉ được chứa tối đa 255 ký tự'),
        last_name: Yup.string()
            //eslint-disable-next-line
            .matches(/[^-_+=<!@#$%^&*({})>\d]+$/, 'Tên không được chứa số và ký tự đặc biệt')
            .min(2, 'Tên phải chứa ít nhất 2 ký tự')
            .max(255, 'Tên chỉ được chứa tối đa 255 ký tự'),
        email: Yup.string()
            .matches(/^\S*$/, 'Email không được chứa ký tự trắng')
            //eslint-disable-next-line
            .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email không hợp lệ')
            .max(255, 'Email chỉ được chứa tối đa 255 ký tự'),
        username: Yup.string()
            .matches(/^\S*$/, 'Tên đăng nhập không được chứa ký tự trắng')
            .min(2, 'Tên đăng nhập phải chứa ít nhất 2 ký tự')
            .max(255, 'Tên đăng nhập chỉ được chứa tối đa 255 ký tự'),
        address: Yup.string()
            //eslint-disable-next-line
            .matches(/[^-_+=<!@#$%^&*({})>]+$/, 'Địa chỉ không được chứa ký tự đặc biệt')
            .min(10, 'Địa chỉ phải chứa ít nhất 10 ký tự')
            .max(255, 'Địa chỉ chỉ được chứa tối đa 255 ký tự'),
        phone_number: Yup.string()
            .matches(/^\S*$/, 'Số điện thoại không được chứa ký tự trắng')
            .matches(/[^-_+=<!@#$%^&*({})>]+$/, 'Số điện thoại không được chứa ký tự đặc biệt')
            .matches(/^\d+$/, 'Số điện thoại không được chứa chữ cái')
            //eslint-disable-next-line
            .min(10, 'Số điện thoại phải chứa ít nhất 10 ký tự')
            .max(13, 'Số điện thoại chỉ được chứa tối đa 13 ký tự')
    });

    const handleSubmit = async (formData, { setSubmitting }) => {
        setSubmitting(false);
        if (fileUpload) {
            try {
                const imageRef = await uploadImage(fileUpload);
                const url = await getImageUrl(imageRef);
                setFileUrl(url);
                alert('Image upload successfully!');
            } catch (err) {
                alert('Image upload fail!');
                console.log(err);
            }
        }
    };

    return (
        <div className={cx('col-10', 'wrapper')}>
            <div className={cx('px-3', 'h-100')}>
                <h2 className={cx('text-black', 'fw-bold', 'mt-3')}>Hồ sơ của tôi</h2>
                <span className={cx('text-black', 'py-2', 'd-block')}>
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                </span>
                <hr />
                <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form action="" className={cx('px-2')}>
                        <div className={cx('row')}>
                            <div className={cx('col-8', 'd-flex', 'align-items-start')} style={{ padding: '1.6rem' }}>
                                <div className={cx('d-flex', 'flex-column')}>
                                    <span className={cx('form_label')}>Họ lót</span>
                                    <span className={cx('form_label')}>Tên</span>
                                    <span className={cx('form_label')}>Email</span>
                                    <span className={cx('form_label')}>Tên đăng nhập</span>
                                    <span className={cx('form_label')}>Ngày sinh</span>
                                    <span className={cx('form_label')}>Địa chỉ</span>
                                    <span className={cx('form_label')}>Số điện thoại</span>
                                </div>
                                <div className={cx('d-flex', 'flex-column', 'px-5')} style={{ width: '60%' }}>
                                    <div className={cx('form_input_group')}>
                                        <Field
                                            className={cx('form_input')}
                                            type="text"
                                            name="first_name"
                                            placeholder=""
                                            value="Khương"
                                            autoComplete="new-password"
                                        />
                                        <span className={cx('error_message')} style={{ marginTop: '3.6rem' }}>
                                            <ErrorMessage name="first_name" />
                                        </span>
                                    </div>
                                    <div className={cx('form_input_group')}>
                                        <Field
                                            className={cx('form_input')}
                                            name="last_name"
                                            autoComplete="new-password"
                                        />
                                        <span className={cx('error_message')} style={{ marginTop: '3.6rem' }}>
                                            <ErrorMessage name="last_name" />
                                        </span>
                                    </div>
                                    <div className={cx('form_input_group')}>
                                        <Field className={cx('form_input')} name="email" autoComplete="new-password" />
                                        <span className={cx('error_message')} style={{ marginTop: '3.6rem' }}>
                                            <ErrorMessage name="email" />
                                        </span>
                                    </div>
                                    <div className={cx('form_input_group')}>
                                        <Field
                                            className={cx('form_input')}
                                            name="username"
                                            autoComplete="new-password"
                                        />
                                        <span className={cx('error_message')} style={{ marginTop: '3.6rem' }}>
                                            <ErrorMessage name="username" />
                                        </span>
                                    </div>
                                    <div className={cx('form_input_group')}>
                                        <Field className={cx('form_input')} name="birth_day" type="date" />
                                    </div>
                                    <div className={cx('form_input_group')}>
                                        <Field
                                            className={cx('form_input')}
                                            name="address"
                                            autoComplete="new-password"
                                        />
                                        <span className={cx('error_message')} style={{ marginTop: '3.6rem' }}>
                                            <ErrorMessage name="address" />
                                        </span>
                                    </div>
                                    <div className={cx('form_input_group')}>
                                        <Field
                                            className={cx('form_input')}
                                            name="phone_number"
                                            autoComplete="new-password"
                                        />
                                        <span className={cx('error_message')} style={{ marginTop: '3.6rem' }}>
                                            <ErrorMessage name="phone_number" />
                                        </span>
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
                                    <img src={fileUrl ? fileUrl : CharlotteIcon} alt="" className={cx('avatar')} />
                                    <div className={cx('image_label_wrapper')}>
                                        <label htmlFor="imageChoosen" className={cx('btn_choose_image')}>
                                            Chọn ảnh
                                        </label>
                                    </div>
                                    <input
                                        id="imageChoosen"
                                        type="file"
                                        style={{ display: 'none' }}
                                        name="avatar"
                                        onChange={(e) => setFileUpload(e.target.files[0])}
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{ padding: '0 0.6rem', width: '10%' }}>
                            <Button primary type="submit">
                                Lưu
                            </Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default EditInfoProfile;
