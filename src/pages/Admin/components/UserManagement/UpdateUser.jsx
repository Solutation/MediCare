import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './UpdateUser.module.scss';
import { checkFileExtension } from '~/utils';
import { Button } from '~/components/Button';
import { uploadImage, getImageUrl } from '~/utils/fileUtils';
import { Alert } from '~/components/Alert';
import SmileIcon from '~/assets/smile.png';
import SadIcon from '~/assets/sad.png';
import { httpRequest, handleDateRequest } from '~/utils';

const cx = classNames.bind(styles);

const UpdateUser = ({ setUpdateUser, patientId, setCheckUpdate, checkUpdate, setLoading }) => {
    const [initialValues, setInitialValues] = useState();
    const [patientInfo, setPatientInfo] = useState();
    const [updateAlert, setUpdateAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [fileUpload, setFileUpload] = useState('');
    const [avatarResult, setAvatarResult] = useState();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: { patientInfo }
            } = await httpRequest.get(`/admin/patient/${patientId}`, { cancelToken: cancelToken.token });
            const dataPatient = {
                first_name: patientInfo.first_name,
                last_name: patientInfo.last_name,
                address: patientInfo.address,
                phone_number: patientInfo.phone_number,
                birth_day: handleDateRequest(patientInfo.birth_day)
            };
            setInitialValues(dataPatient);
            setPatientInfo(patientInfo);
            setAvatarResult(patientInfo.avatar);
        };
        fetchAPI();
        return () => {
            cancelToken.cancel();
        };
    }, [patientId]);

    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required('Họ lót không được để trống')
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

    const handleFileUpload = (e) => {
        const files = e.target.files[0];
        if (!checkFileExtension(files.name.split('.')[1])) {
            setErrorMessage('Chỉ được chọn file ảnh dưới định dạng jpg, png hoặc jpeg');
            setErrorAlert(true);
            return;
        } else {
            setFileUpload(files);
        }
    };

    const handleSubmit = async (formData, { setSubmitting }) => {
        try {
            setLoading(true);
            let urlResult = '';
            if (fileUpload !== '') {
                const imageRef = await uploadImage(fileUpload);
                urlResult = await getImageUrl(imageRef);
            } else urlResult = patientInfo.avatar;
            const dataToSend = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                birth_day: formData.birth_day,
                phone_number: formData.phone_number,
                address: formData.address,
                avatar: urlResult
            };
            const { data } = await httpRequest.put(`/admin/patient/update/${patientId}`, dataToSend);
            const dataPatient = {
                first_name: data.patientInfo.first_name,
                last_name: data.patientInfo.last_name,
                address: data.patientInfo.address,
                phone_number: data.patientInfo.phone_number,
                birth_day: handleDateRequest(data.patientInfo.birth_day)
            };
            setPatientInfo(patientInfo);
            setLoading(false);
            setFileUpload('');
            setAvatarResult(urlResult);
            setInitialValues(dataPatient);
            setCheckUpdate(!checkUpdate);
            setUpdateAlert(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {initialValues && patientInfo && avatarResult && (
                <div className={cx('overllay')}>
                    <div className={cx('overllay_inner')}></div>
                    <div className={cx('wrapper')}>
                        <div className={cx('p-2', 'd-flex', 'flex-column')}>
                            <div className={cx('d-flex', 'justify-content-between', 'py-2', 'mt-2')}>
                                <h2 className={cx('fw-bold', 'ms-3')}>Sửa bệnh nhân</h2>
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
                                    enableReinitialize="true"
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
                                                    <span className={cx('form_label')}>Ngày sinh</span>
                                                    <span className={cx('form_label')}>Số điện thoại</span>
                                                    <span className={cx('form_label')}>Địa chỉ</span>
                                                    <span className={cx('form_label')}>Email</span>
                                                    <span className={cx('form_label')}>Trạng thái</span>
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
                                                            className={cx('form_input_date')}
                                                            name="birth_day"
                                                            type="date"
                                                        />
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
                                                        <span className={cx('form_text')}>{patientInfo.email}</span>
                                                    </div>
                                                    <div className={cx('form_input_group')}>
                                                        <span className={cx('form_text')}>{patientInfo.status}</span>
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
                                                            fileUpload === ''
                                                                ? avatarResult
                                                                : URL.createObjectURL(fileUpload)
                                                        }
                                                        alt=""
                                                        className={cx('avatar')}
                                                    />
                                                    <div className={cx('image_label_wrapper')}>
                                                        <label
                                                            htmlFor="imageChoosen"
                                                            className={cx('btn_choose_image')}
                                                        >
                                                            Chọn ảnh
                                                        </label>
                                                    </div>
                                                    <input
                                                        id="imageChoosen"
                                                        type="file"
                                                        style={{ display: 'none' }}
                                                        name="avatar"
                                                        onChange={handleFileUpload}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('w-100', 'text-center')}>
                                            <div
                                                style={{ padding: '2rem 0.6rem', width: '10%', marginRight: '5rem' }}
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
                                                <Button
                                                    secondary
                                                    type="button"
                                                    onClick={() => {
                                                        setUpdateUser(false);
                                                    }}
                                                >
                                                    Huỷ bỏ
                                                </Button>
                                            </div>
                                        </div>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {updateAlert && (
                <Alert
                    iconImage={SmileIcon}
                    content="Cập nhật thông tin bệnh nhân thành công!"
                    setAlertPopup={setUpdateAlert}
                />
            )}
            {errorAlert && <Alert iconImage={SadIcon} content={errorMessage} setAlertPopup={setErrorAlert} />}
        </>
    );
};

export default UpdateUser;
