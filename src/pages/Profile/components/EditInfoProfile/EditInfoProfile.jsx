import React, { useState, useEffect, useContext } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames/bind';
import Cookies from 'universal-cookie';

import styles from './EditInfoProfile.module.scss';
import { Button } from '~/components/Button';
import { checkFileExtension, httpRequest } from '~/utils';
import { uploadImage, getImageUrl } from '~/utils/fileUtils';
import { Alert } from '~/components/Alert';
import SmileIcon from '~/assets/smile.png';
import SadIcon from '~/assets/sad.png';
import { ProfileContext } from '~/context/ProfileContext';

const cx = classNames.bind(styles);

const cookies = new Cookies();

const EditInfoProfile = ({ setFlagState }) => {
    const userInfo = cookies.get('userAccess').split(',');
    const [fileUpload, setFileUpload] = useState();
    const [alertPopup, setAlertPopup] = useState(false);
    const [flag, setFlag] = useState(0);
    const [message, setMessage] = useState('');
    const [initialValues, setInitialValues] = useState();
    const { patientInfoProfile, setPatientInfoProfile } = useContext(ProfileContext);

    useEffect(() => {
        setInitialValues(patientInfoProfile);
    }, [patientInfoProfile]);

    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            //eslint-disable-next-line
            .required('Họ lót không được để trống')
            .matches(/[^-_+=<!@#$%^&*({})>\d]+$/, 'Họ lót không được chứa số và ký tự đặc biệt')
            .min(2, 'Họ lót phải chứa ít nhất 2 ký tự')
            .max(255, 'Họ lót chỉ được chứa tối đa 255 ký tự'),
        last_name: Yup.string()
            //eslint-disable-next-line
            .required('Tên không được để trống')
            .matches(/[^-_+=<!@#$%^&*({})>\d]+$/, 'Tên không được chứa số và ký tự đặc biệt')
            .min(2, 'Tên phải chứa ít nhất 2 ký tự')
            .max(255, 'Tên chỉ được chứa tối đa 255 ký tự'),
        address: Yup.string()
            //eslint-disable-next-line
            .required('Địa chỉ không được để trống')
            .matches(/[^-_+=<!@#$%^&*({})>]+$/, 'Địa chỉ không được chứa ký tự đặc biệt')
            .min(4, 'Địa chỉ phải chứa ít nhất 4 ký tự')
            .max(255, 'Địa chỉ chỉ được chứa tối đa 255 ký tự'),
        phone_number: Yup.string()
            .required('Số điện thoại không được để trống')
            .matches(/^\S*$/, 'Số điện thoại không được chứa ký tự trắng')
            .matches(/[^-_+=<!@#$%^&*({})>]+$/, 'Số điện thoại không được chứa ký tự đặc biệt')
            .matches(/^\d+$/, 'Số điện thoại không được chứa chữ cái')
            //eslint-disable-next-line
            .min(10, 'Số điện thoại phải chứa ít nhất 10 ký tự')
            .max(13, 'Số điện thoại chỉ được chứa tối đa 13 ký tự')
    });

    const handleFileUpload = (e) => {
        const files = e.target.files[0];
        if (!checkFileExtension(files.name.split('.')[1])) {
            setMessage('Chỉ được chọn file ảnh dưới định dạng jpg, png hoặc jpeg');
            setFlag(2);
            setAlertPopup(true);
            return;
        } else setFileUpload(files);
    };

    const handleSubmit = async (formData, { setSubmitting }) => {
        setSubmitting(false);
        if (fileUpload) {
            try {
                const imageRef = await uploadImage(fileUpload);
                const url = await getImageUrl(imageRef);
                const dataResult = {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    phone_number: formData.phone_number,
                    address: formData.address,
                    birth_day: formData.birth_day,
                    avatar: url
                };
                const {
                    data: { patientInfo }
                } = await httpRequest.put(`/profile/patient/update/${userInfo[0]}`, dataResult);
                const newUserName = `${patientInfo.first_name} ${patientInfo.last_name}`;
                cookies.set(
                    'userAccess',
                    `${userInfo[0]},${userInfo[1]},${userInfo[2]},${patientInfo.email},${newUserName},${userInfo[5]},${patientInfo.avatar}`
                );
                if (patientInfo) setPatientInfoProfile(patientInfo);
                setMessage('Cập nhật thông tin thành công!');
                setFlag(1);
                setAlertPopup(true);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <>
            {initialValues && (
                <div className={cx('col-10', 'wrapper')}>
                    <div className={cx('px-3', 'h-100')}>
                        <h2 className={cx('text-black', 'fw-bold', 'mt-3')}>Hồ sơ của tôi</h2>
                        <span className={cx('text-black', 'py-2', 'd-block')}>
                            Quản lý thông tin hồ sơ để bảo mật tài khoản
                        </span>
                        <hr />
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize={true}
                        >
                            <Form action="" className={cx('px-2')}>
                                <div className={cx('row')}>
                                    <div
                                        className={cx('col-8', 'd-flex', 'align-items-start')}
                                        style={{ padding: '1.6rem' }}
                                    >
                                        <div className={cx('d-flex', 'flex-column')}>
                                            <span className={cx('form_label')}>Họ lót</span>
                                            <span className={cx('form_label')}>Tên</span>
                                            <span className={cx('form_label')}>Email</span>
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
                                            <div className={cx('form_input_group', 'btnDisabled')}>
                                                <Field
                                                    className={cx('form_input')}
                                                    autoComplete="new-password"
                                                    name="email"
                                                />
                                            </div>
                                            <div className={cx('form_input_group')}>
                                                <Field
                                                    className={cx('form_input')}
                                                    name="birth_day"
                                                    type="date"
                                                    value={patientInfoProfile.birth_day.slice(0, 10)}
                                                />
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
                                            <img
                                                src={
                                                    fileUpload
                                                        ? URL.createObjectURL(fileUpload)
                                                        : patientInfoProfile.avatar
                                                }
                                                alt=""
                                                className={cx('avatar')}
                                            />
                                            <div className={cx('image_label_wrapper')}>
                                                <label htmlFor="imageChoosen" className={cx('btn_choose_image')}>
                                                    Chọn ảnh
                                                </label>
                                            </div>
                                            <input
                                                id="imageChoosen"
                                                type="file"
                                                style={{ display: 'none' }}
                                                onChange={handleFileUpload}
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
            )}
            {alertPopup && flag === 1 && (
                <Alert iconImage={SmileIcon} content={message} setAlertPopup={setAlertPopup} />
            )}
            {alertPopup && flag === 2 && <Alert iconImage={SadIcon} content={message} setAlertPopup={setAlertPopup} />}
        </>
    );
};

export default EditInfoProfile;
