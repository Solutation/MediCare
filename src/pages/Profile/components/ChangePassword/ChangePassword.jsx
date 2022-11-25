import React from 'react';
import classNames from 'classnames/bind';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

import styles from './ChangePassword.module.scss';
import { Button } from '~/components/Button';

const cx = classNames.bind(styles);

const initialState = {
    new_password: ''
};

const ChangePassword = () => {
    const validationSchema = Yup.object().shape({
        new_password: Yup.string()
            .required('Mật khẩu không được để trống')
            .matches(/^\S*$/, 'Mật khẩu không được chứa ký tự trắng')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/,
                'Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ in hoa, 1 chữ số và 1 ký tự đặc biệt'
            )
            .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự')
            .max(255, 'Mật khẩu chỉ được chứa tối đa 255 ký tự')
    });

    const handleSubmit = (formData, { setSubmitting }) => {
        setSubmitting(false);
    };

    return (
        <div className={cx('col-10', 'wrapper')}>
            <div className={cx('px-3', 'h-100')}>
                <h2 className={cx('text-black', 'fw-bold', 'mt-3')}>Đổi mật khẩu</h2>
                <span className={cx('text-black', 'py-2', 'd-block')}>Đổi mật khẩu để bảo mật tài khoản của bạn</span>
                <hr />
                <Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    <Form action="" className={cx('px-2')}>
                        <div className={cx('row')}>
                            <div className={cx('col-8', 'd-flex', 'align-items-start')} style={{ padding: '1.6rem' }}>
                                <div className={cx('d-flex', 'flex-column')}>
                                    <span className={cx('form_label')}>Mật khẩu cũ</span>
                                    <span className={cx('form_label')}>Mật khẩu mới</span>
                                    <span className={cx('form_label')}>Xác nhận mật khẩu mới</span>
                                </div>
                                <div className={cx('d-flex', 'flex-column', 'px-5')} style={{ width: '60%' }}>
                                    <div className={cx('form_input_group')}>
                                        <Field
                                            className={cx('form_input')}
                                            type="password"
                                            name="old_password"
                                            placeholder=""
                                            autoComplete="new-password"
                                        />
                                        <span className={cx('error_message')} style={{ marginTop: '3.8rem' }}></span>
                                    </div>
                                    <div className={cx('form_input_group')}>
                                        <Field
                                            className={cx('form_input')}
                                            type="password"
                                            name="new_password"
                                            placeholder=""
                                            autoComplete="new-password"
                                        />
                                        <span className={cx('error_message')} style={{ marginTop: '3.8rem' }}>
                                            <ErrorMessage name="new_password" />
                                        </span>
                                    </div>
                                    <div className={cx('form_input_group')}>
                                        <Field
                                            className={cx('form_input')}
                                            type="password"
                                            name="verify_password"
                                            placeholder=""
                                            autoComplete="new-password"
                                        />
                                        <span className={cx('error_message')} style={{ marginTop: '3.8rem' }}></span>
                                    </div>
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

export default ChangePassword;
