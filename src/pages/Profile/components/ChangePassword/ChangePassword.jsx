import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import Cookies from 'universal-cookie';

import styles from './ChangePassword.module.scss';
import { Button } from '~/components/Button';
import { httpRequest } from '~/utils';
import { Alert } from '~/components/Alert';
import SmileIcon from '~/assets/smile.png';
import SadIcon from '~/assets/sad.png';

const cx = classNames.bind(styles);

const cookies = new Cookies();

const ChangePassword = () => {
    const userInfo = cookies.get('userAccess').split(',');
    const [initialValues, setInitialValues] = useState();
    const [errorVerifyMessage, setErrorVerifyMessage] = useState('');
    const [hideVerify, setHideVerify] = useState(true);
    const [alertPopup, setAlertPopup] = useState(false);
    const [responseMessage, setResponseMessage] = useState();
    const [flagPassword, setFlagPassword] = useState(0);
    const verifyRef = useRef();

    useEffect(() => {
        const data = {
            old_password: '',
            new_password: '',
            verify_password: ''
        };
        setInitialValues(data);
    }, []);

    const validationSchema = Yup.object().shape({
        old_password: Yup.string().required('Vui lòng nhập mật khẩu cũ'),
        new_password: Yup.string()
            .required('Vui lòng nhập mật khẩu mới')
            .matches(/^\S*$/, 'Mật khẩu không được chứa ký tự trắng')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/,
                'Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ in hoa, 1 chữ số và 1 ký tự đặc biệt'
            )
            .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự')
            .max(255, 'Mật khẩu chỉ được chứa tối đa 255 ký tự')
    });

    const handleSubmit = async (formData, { setSubmitting }) => {
        setSubmitting(false);
        const dataReset = {
            old_password: '',
            new_password: '',
            verify_password: ''
        };
        const { old_password, new_password, verify_password } = formData;
        if (verify_password === '') {
            setErrorVerifyMessage('Vui lòng xác nhận mật khẩu của bạn');
            setHideVerify(false);
            return;
        }
        if (verify_password !== new_password) {
            setErrorVerifyMessage('Xác nhận mật khẩu sai, vui lòng nhập lại');
            setHideVerify(false);
            return;
        }
        let dataResult = {
            old_password,
            new_password
        };
        try {
            if (userInfo[5] === 'Bệnh nhân') {
                const {
                    data: { message }
                } = await httpRequest.put(`/profile/patient/password/update/${userInfo[0]}`, dataResult);
                setResponseMessage(message);
            } else {
                const {
                    data: { message }
                } = await httpRequest.put(`/profile/consultant/password/update/${userInfo[0]}`, dataResult);
                setResponseMessage(message);
            }
            setInitialValues(dataReset);
            setFlagPassword(1);
            setAlertPopup(true);
        } catch ({ response }) {
            setResponseMessage(response.data.message);
            setFlagPassword(2);
            setAlertPopup(true);
        }
    };

    return (
        <>
            {initialValues && (
                <div className={cx('col-10', 'wrapper')}>
                    <div className={cx('px-3', 'h-100')}>
                        <h2 className={cx('text-black', 'fw-bold', 'mt-3')}>Đổi mật khẩu</h2>
                        <span className={cx('text-black', 'py-2', 'd-block')}>
                            Đổi mật khẩu để bảo mật tài khoản của bạn
                        </span>
                        <hr />
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize="true"
                        >
                            <Form action="" className={cx('px-2')}>
                                <div className={cx('row')}>
                                    <div
                                        className={cx('col-8', 'd-flex', 'align-items-start')}
                                        style={{ padding: '1.6rem' }}
                                    >
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
                                                <span className={cx('error_message')} style={{ marginTop: '3.6rem' }}>
                                                    <ErrorMessage name="old_password" />
                                                </span>
                                                <span
                                                    className={cx('error_message')}
                                                    style={{ marginTop: '3.8rem' }}
                                                ></span>
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
                                                    onInput={() => setHideVerify(true)}
                                                />
                                                <span className={cx('error_message')} style={{ marginTop: '3.8rem' }}>
                                                    <ErrorMessage name="verify_password" />
                                                </span>
                                                <span
                                                    className={cx('error_message', { hide: hideVerify })}
                                                    style={{ marginTop: '3.8rem' }}
                                                    ref={verifyRef}
                                                >
                                                    {errorVerifyMessage}
                                                </span>
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
                    {alertPopup && flagPassword === 1 && (
                        <Alert iconImage={SmileIcon} content={responseMessage} setAlertPopup={setAlertPopup} />
                    )}
                    {alertPopup && flagPassword === 2 && (
                        <Alert iconImage={SadIcon} content={responseMessage} setAlertPopup={setAlertPopup} />
                    )}
                </div>
            )}
        </>
    );
};

export default ChangePassword;
