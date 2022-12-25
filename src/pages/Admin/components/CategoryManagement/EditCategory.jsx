import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import styles from './EditCategory.module.scss';
import { Button } from '~/components/Button';
import { httpRequest, checkFileExtension } from '~/utils';
import { Alert } from '~/components/Alert';
import SmileIcon from '~/assets/smile.png';
import SadIcon from '~/assets/sad.png';
import { uploadImage, getImageUrl } from '~/utils/fileUtils';
import { Loading } from '~/components/Loading';

const cx = classNames.bind(styles);

const EditCategory = ({ setEditCategory, checkUpdate, setCheckUpdate, categoryId }) => {
    const [fileUpload, setFileUpload] = useState('');
    const [imageCategory, setImageCategory] = useState();
    const [categoryInfo, setCategoryInfo] = useState();
    const [initialValues, setInitialValues] = useState();
    const [updateAlert, setUpdateAlert] = useState(false);
    const [errorAlert, setErrorAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        category_name: Yup.string()
            .required(`Tên chuyên mục không được để trống`)
            //eslint-disable-next-line
            .matches(/[^-_+=<!@#$%^&*({})>\d]+$/, 'Tên chuyên mục không được chứa số và ký tự đặc biệt')
            .min(2, 'Tên chuyên mục phải chứa ít nhất 2 ký tự')
            .max(255, 'Tên chuyên mục chỉ được chứa tối đa 255 ký tự'),
        descriptions: Yup.string()
            .required(`Mô tả không được để trống`)
            //eslint-disable-next-line
            .min(2, 'Mô tả phải chứa ít nhất 2 ký tự')
            .max(2000, 'Mô tả chỉ được chứa tối đa 2000 ký tự')
    });

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: { categoryInfo }
            } = await httpRequest.get(`/admin/category/${categoryId}`);
            setCategoryInfo(categoryInfo);
            setImageCategory(categoryInfo.image);
        };
        fetchAPI();
        return () => {
            cancelToken.cancel();
        };
    }, [categoryId]);

    useEffect(() => {
        if (categoryInfo) {
            const initialValues = {
                category_name: categoryInfo.name,
                descriptions: categoryInfo.descriptions
            };
            setInitialValues(initialValues);
        }
    }, [categoryInfo]);

    const handleFileUpload = (e) => {
        const files = e.target.files[0];
        if (!checkFileExtension(files.name.split('.')[1])) {
            setErrorAlert(true);
            return;
        } else {
            setFileUpload(files);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            setLoading(true);
            let urlResult = '';
            if (fileUpload !== '') {
                const imageRef = await uploadImage(fileUpload);
                urlResult = await getImageUrl(imageRef);
            } else urlResult = imageCategory;
            const dataToSend = {
                categoryName: formData.category_name,
                descriptions: formData.descriptions,
                image: urlResult
            };
            const {
                data: { categoryInfo }
            } = await httpRequest.put(`/admin/category/update/${categoryId}`, dataToSend);
            const intialValuesResult = {
                category_name: categoryInfo.name,
                descriptions: categoryInfo.descriptions
            };
            setLoading(false);
            setInitialValues(intialValuesResult);
            setFileUpload('');
            setImageCategory(categoryInfo.image);
            setUpdateAlert(true);
            setCheckUpdate(!checkUpdate);
        } catch (err) {}
    };

    return (
        <>
            {categoryInfo && initialValues && (
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
                                        <div className={cx('col-7')}>
                                            <div className={cx('row')}>
                                                <div className={cx('col-12', 'd-flex', 'flex-column', 'py-2')}>
                                                    <span className={cx('form_label')}>Tên chuyên mục</span>
                                                    <Field
                                                        className={cx('form_input')}
                                                        name="category_name"
                                                        autoComplete="new-password"
                                                    />
                                                    <span
                                                        className={cx('error_message')}
                                                        style={{ marginTop: '7.4rem' }}
                                                    >
                                                        <ErrorMessage name="category_name" />
                                                    </span>
                                                </div>
                                                <div className={cx('col-12', 'd-flex', 'flex-column', 'py-2')}>
                                                    <span className={cx('form_label')}>Mô tả</span>
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
                                                'col-5',
                                                'd-flex',
                                                'flex-column',
                                                'justify-content-center',
                                                'align-items-center',
                                                'mt-4'
                                            )}
                                        >
                                            <img
                                                src={
                                                    fileUpload === '' ? imageCategory : URL.createObjectURL(fileUpload)
                                                }
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
                                    <div className={cx('d-flex', 'w-100', 'justify-content-center', 'mt-5', 'pb-2')}>
                                        <div>
                                            <Button warning type="submit">
                                                Lưu
                                            </Button>
                                        </div>
                                        <div className={cx('px-5')} onClick={() => setEditCategory(false)}>
                                            <Button secondary type="button">
                                                Hủy
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                    {updateAlert && (
                        <Alert
                            iconImage={SmileIcon}
                            content="Cập nhật chuyên mục thành công"
                            setAlertPopup={setUpdateAlert}
                        />
                    )}
                    {errorAlert && (
                        <Alert
                            iconImage={SadIcon}
                            content="Chỉ được chọn file ảnh dưới định dạng jpg, png hoặc jpeg"
                            setAlertPopup={setErrorAlert}
                        />
                    )}
                    {loading && <Loading messageLoading="Đang cập nhật chuyên mục" />}
                </div>
            )}
        </>
    );
};

export default EditCategory;
