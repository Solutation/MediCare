import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import styles from './Detail.module.scss';
import { Button } from '~/components/Button';
import Certificate from './Certificate';
import { httpRequest, handleDateRequest, checkFileExtension } from '~/utils';
import { Alert } from '~/components/Alert';
import { uploadImage, getImageUrl } from '~/utils/fileUtils';
import SmileIcon from '~/assets/smile.png';
import SadIcon from '~/assets/sad.png';
import { Loading } from '~/components/Loading';

const cx = classNames.bind(styles);

const Detail = ({ setDetail, consultantId, setCheckUpdate, checkUpdate }) => {
    const [certificate, setCertificate] = useState(false);
    const [initialValues, setInitialValues] = useState();
    const [consultantInfo, setConsultantInfo] = useState();
    const [updateAlert, setUpdateAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [fileUpload, setFileUpload] = useState('');
    const [avatarResult, setAvatarResult] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [categoryItem, setCategoryItem] = useState('');
    const [checkReloadUpdate, setCheckReloadUpdate] = useState(false);
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required(`Họ lót không được để trống`)
            //eslint-disable-next-line
            .matches(/[^-_+=<!@#$%^&*({})>\d]+$/, 'Họ lót không được chứa số và ký tự đặc biệt')
            .min(2, 'Họ lót phải chứa ít nhất 2 ký tự')
            .max(255, 'Họ lót chỉ được chứa tối đa 255 ký tự'),
        birth_day: Yup.string().required('Ngày sinh không được để trống'),
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
            .min(4, 'Địa chỉ phải chứa ít nhất 10 ký tự')
            .max(255, 'Địa chỉ chỉ được chứa tối đa 255 ký tự'),
        phone_number: Yup.string()
            .required('Số điện thoại không được để trống')
            .matches(/^\S*$/, 'Số điện thoại không được chứa ký tự trắng')
            .matches(/[^-_+=<!@#$%^&*({})>]+$/, 'Số điện thoại không được chứa ký tự đặc biệt')
            .matches(/^\d+$/, 'Số điện thoại không được chứa chữ cái')
            //eslint-disable-next-line
            .min(10, 'Số điện thoại phải chứa ít nhất 10 ký tự')
            .max(13, 'Số điện thoại chỉ được chứa tối đa 13 ký tự'),
        descriptions: Yup.string()
            .required(`Tiểu sử không được để trống`)
            //eslint-disable-next-line
            .min(2, 'Tiểu sử phải chứa ít nhất 2 ký tự')
            .max(2000, 'Tiểu sử chỉ được chứa tối đa 2000 ký tự')
    });

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: { consultantInfo, categoryList }
            } = await httpRequest.get(`/admin/consultant/detail/${consultantId}`, { cancelToken: cancelToken.token });
            const dataConsultant = {
                first_name: consultantInfo.first_name,
                last_name: consultantInfo.last_name,
                address: consultantInfo.address,
                phone_number: consultantInfo.phone_number,
                birth_day: handleDateRequest(consultantInfo.birth_day),
                descriptions: consultantInfo.descriptions
            };
            let categoryText = '';
            setInitialValues(dataConsultant);
            setConsultantInfo(consultantInfo);
            setAvatarResult(consultantInfo.avatar);
            categoryList.forEach((category, index) => {
                if (index === 0) categoryText = categoryText + category.name;
                else categoryText = categoryText + ', ' + category.name;
            });
            setCategoryItem(categoryText);
        };
        fetchAPI();
        return () => {
            cancelToken.cancel();
        };
    }, [consultantId, checkReloadUpdate]);

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
            } else urlResult = consultantInfo.avatar;
            const dataToSend = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                birth_day: formData.birth_day,
                phone_number: formData.phone_number,
                address: formData.address,
                descriptions: formData.descriptions,
                avatar: urlResult
            };
            await httpRequest.put(`/admin/consultant/update/${consultantId}`, dataToSend);
            setCheckReloadUpdate(!checkReloadUpdate);
            setLoading(false);
            setFileUpload('');
            setAvatarResult(urlResult);
            setUpdateAlert(true);
            setCheckUpdate(!checkUpdate);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {initialValues && consultantInfo && avatarResult && (
                <div className={cx('blur')}>
                    <div className={cx('blur_overllay')}></div>
                    <div className={cx('wrapper')}>
                        <div className={cx('d-flex', 'flex-column', 'w-100')} style={{ padding: '0.6rem 1.2rem' }}>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                enableReinitialize="true"
                            >
                                <Form>
                                    <div className={cx('row')}>
                                        <div className={cx('col-8')}>
                                            <div className={cx('row')}>
                                                <div className={cx('col-6', 'd-flex', 'flex-column', 'py-2')}>
                                                    <span className={cx('form_label')}>Họ lót</span>
                                                    <Field
                                                        className={cx('form_input')}
                                                        name="first_name"
                                                        autoComplete="new-password"
                                                    />
                                                    <span
                                                        className={cx('error_message')}
                                                        style={{ marginTop: '7.4rem' }}
                                                    >
                                                        <ErrorMessage name="first_name" />
                                                    </span>
                                                </div>
                                                <div className={cx('col-6', 'd-flex', 'flex-column', 'py-2')}>
                                                    <span className={cx('form_label')}>Tên</span>
                                                    <Field
                                                        className={cx('form_input')}
                                                        name="last_name"
                                                        autoComplete="new-password"
                                                    />
                                                    <span
                                                        className={cx('error_message')}
                                                        style={{ marginTop: '7.4rem' }}
                                                    >
                                                        <ErrorMessage name="last_name" />
                                                    </span>
                                                </div>
                                                <div className={cx('col-12', 'd-flex', 'flex-column', 'py-2')}>
                                                    <span className={cx('form_label')}>Ngày sinh</span>
                                                    <Field
                                                        className={cx('form_input_date')}
                                                        name="birth_day"
                                                        type="date"
                                                    />
                                                    <span
                                                        className={cx('error_message')}
                                                        style={{ marginTop: '7.4rem' }}
                                                    >
                                                        <ErrorMessage name="birth_day" />
                                                    </span>
                                                </div>
                                                <div className={cx('col-12', 'd-flex', 'flex-column', 'py-2')}>
                                                    <span className={cx('form_label')}>Số điện thoại</span>
                                                    <Field
                                                        className={cx('form_input')}
                                                        name="phone_number"
                                                        autoComplete="new-password"
                                                    />
                                                    <span
                                                        className={cx('error_message')}
                                                        style={{ marginTop: '7.4rem' }}
                                                    >
                                                        <ErrorMessage name="phone_number" />
                                                    </span>
                                                </div>
                                                <div className={cx('col-12', 'd-flex', 'flex-column', 'py-2')}>
                                                    <span className={cx('form_label')}>Địa chỉ</span>
                                                    <Field
                                                        className={cx('form_input')}
                                                        name="address"
                                                        autoComplete="new-password"
                                                    />
                                                    <span
                                                        className={cx('error_message')}
                                                        style={{ marginTop: '7.4rem' }}
                                                    >
                                                        <ErrorMessage name="address" />
                                                    </span>
                                                </div>
                                                <div className={cx('col-12', 'd-flex', 'flex-column', 'py-2')}>
                                                    <span className={cx('form_label')}>Tiểu sử</span>
                                                    <Field name="descriptions">
                                                        {({ field, form }) => {
                                                            return (
                                                                <>
                                                                    <textarea
                                                                        rows="4"
                                                                        className={cx('form_input_description')}
                                                                        value={field.value}
                                                                        onChange={field.onChange}
                                                                        name="descriptions"
                                                                    ></textarea>
                                                                    <span
                                                                        className={cx('error_message')}
                                                                        style={{ marginTop: '13.6rem' }}
                                                                    >
                                                                        {form.errors.descriptions}
                                                                    </span>
                                                                </>
                                                            );
                                                        }}
                                                    </Field>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={cx(
                                                'col-4',
                                                'd-flex',
                                                'flex-column',
                                                'justify-content-center',
                                                'align-items-center'
                                            )}
                                        >
                                            <img
                                                src={fileUpload === '' ? avatarResult : URL.createObjectURL(fileUpload)}
                                                alt=""
                                                className={cx('avatar')}
                                            />
                                            <label className={cx('btn_choose_image', 'mt-4')} htmlFor="imageChoosen">
                                                Chọn ảnh
                                            </label>
                                            <input
                                                id="imageChoosen"
                                                type="file"
                                                className={cx('d-none')}
                                                onChange={handleFileUpload}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('row', 'align-items-end')}>
                                        <div className={cx('col-8', 'd-flex', 'flex-column', 'py-2')}>
                                            <span className={cx('form_label')}>Chuyên môn</span>
                                            <input
                                                className={cx('form_input', 'inputDisabled')}
                                                style={{ textIndent: '0.6rem' }}
                                                value={categoryItem}
                                                onChange={() => {}}
                                            />
                                        </div>
                                        <div
                                            className={cx('col-4', 'd-flex', 'justify-content-center', 'h-100', 'pb-1')}
                                        >
                                            <Button primary onClick={() => setCertificate(true)} type="button">
                                                Chứng chỉ
                                            </Button>
                                        </div>
                                        <div className={cx('col-8', 'py-2')}>
                                            <div className={cx('d-flex', 'w-100', 'align-items-center')}>
                                                <span className={cx('form_label')}>Email:</span>
                                                <span className={cx('form_text')} style={{ marginLeft: '4rem' }}>
                                                    {consultantInfo.email}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className={cx(
                                                'col-4',
                                                'd-flex',
                                                'text-center',
                                                'justify-content-center',
                                                'align-items-center',
                                                'py-2'
                                            )}
                                        >
                                            <span className={cx('form_label', 'ms-5')}>Điểm TB:</span>
                                            <span className={cx('form_text')}>{consultantInfo.average_score}</span>
                                        </div>
                                        <div className={cx('col-12', 'd-flex', 'flex-column', 'py-2')}>
                                            <div className={cx('d-flex', 'align-items-center')}>
                                                <span className={cx('form_label')}>Trạng thái:</span>
                                                <span className={cx('form_text')} style={{ marginLeft: '4rem' }}>
                                                    {consultantInfo.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx('d-flex', 'w-100', 'justify-content-center', 'py-2')}>
                                        <div>
                                            <Button warning type="submit">
                                                Lưu
                                            </Button>
                                        </div>
                                        <div className={cx('px-5')} onClick={() => setDetail(false)}>
                                            <Button secondary type="button">
                                                Hủy
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                        {certificate && <Certificate setCertificate={setCertificate} consultantId={consultantId} />}
                        {updateAlert && (
                            <Alert
                                iconImage={SmileIcon}
                                content="Cập nhật thông tin chuyên gia thành công!"
                                setAlertPopup={setUpdateAlert}
                            />
                        )}
                        {errorAlert && (
                            <Alert iconImage={SadIcon} content={errorMessage} setAlertPopup={setErrorAlert} />
                        )}
                    </div>
                </div>
            )}
            {loading && <Loading messageLoading="Đang tiến hành cập nhật" />}
        </>
    );
};

export default Detail;
