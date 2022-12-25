import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import styles from './Detail.module.scss';
import { Button } from '~/components/Button';
import { httpRequest } from '~/utils';
import { Alert } from '~/components/Alert';
import SmileIcon from '~/assets/smile.png';

const cx = classNames.bind(styles);

const Detail = ({ setDetailArticle, articleId, checkUpdate, setCheckUpdate }) => {
    const [categoryList, setCategoryList] = useState();
    const [articleInfo, setArticleInfo] = useState();
    const [initialValues, setInitialValues] = useState();
    const [categorySelected, setCategorySelected] = useState();
    const [updateAlert, setUpdateAlert] = useState(false);

    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required(`Tiêu đề không được để trống`)
            //eslint-disable-next-line
            .matches(/[^-_+=<@#$%^&*({})>]+$/, 'Tiêu đề không được chứa ký tự đặc biệt')
            .min(2, 'Tiêu đề phải chứa ít nhất 2 ký tự')
            .max(2000, 'Tiêu đề chỉ được chứa tối đa 2000 ký tự')
    });

    useEffect(() => {
        if (articleInfo) {
            const initialValues = {
                title: articleInfo.title
            };
            setInitialValues(initialValues);
        }
    }, [articleInfo]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: { categoryList }
            } = await httpRequest.get(`/admin/category/list/all`, { cancelToken: cancelToken.token });
            setCategoryList(categoryList);
        };
        fetchAPI();
        return () => {
            cancelToken.cancel();
        };
    }, []);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: { articleInfo }
            } = await httpRequest.get(`/admin/article/${articleId}`, { cancelToken: cancelToken.token });
            setArticleInfo(articleInfo);
        };
        fetchAPI();
        return () => {
            cancelToken.cancel();
        };
    }, [articleId]);

    useEffect(() => {
        if (categoryList && articleInfo) {
            const categoryArticle = categoryList.find(
                (categoryItem) => categoryItem.name === articleInfo.category_name
            );
            setCategorySelected(categoryArticle.id);
        }
    }, [categoryList, articleInfo]);

    const handleSubmit = async (formData) => {
        const dataToSend = {
            categoryId: categorySelected,
            title: formData.title
        };
        await httpRequest.put(`/admin/article/update/${articleId}`, dataToSend);
        setUpdateAlert(true);
        setCheckUpdate(!checkUpdate);
    };

    return (
        <>
            {articleInfo && initialValues && categorySelected && (
                <div className={cx('blur')}>
                    <div className={cx('blur_overllay')}></div>
                    <div className={cx('wrapper')}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            enableReinitialize="true"
                        >
                            <Form>
                                <div className={cx('p-2')}>
                                    <div className={cx('row')}>
                                        <div className={cx('col-8')}>
                                            <div className={cx('w-100', 'd-flex', 'flex-column', 'py-2')}>
                                                <span className={cx('form_label')}>Tiêu đề</span>
                                                <Field
                                                    className={cx('form_input')}
                                                    name="title"
                                                    autoComplete="new-password"
                                                />
                                                <span className={cx('error_message')} style={{ marginTop: '7.4rem' }}>
                                                    <ErrorMessage name="title" />
                                                </span>
                                            </div>
                                            <div
                                                className={cx('w-100', 'd-flex', 'flex-column', 'content_wrapper')}
                                                style={{ marginTop: '2rem' }}
                                            >
                                                <img
                                                    src={articleInfo.image_article}
                                                    alt=""
                                                    className={cx('article_image')}
                                                />
                                                <p className={cx('article_content')}>{articleInfo.content}</p>
                                            </div>
                                        </div>
                                        <div
                                            className={cx(
                                                'col-4',
                                                'd-flex',
                                                'flex-column',
                                                'justify-content-between',
                                                'h-100'
                                            )}
                                        >
                                            <div className={cx('d-flex', 'flex-column', 'py-2')}>
                                                <span className={cx('form_label')}>Tác giả</span>
                                                <input
                                                    className={cx('form_input', 'inputDisabled')}
                                                    value={`${articleInfo.first_name} ${articleInfo.last_name}`}
                                                    onChange={() => {}}
                                                />
                                                <div className={cx('d-flex', 'flex-column', 'py-2')}>
                                                    <span className={cx('form_label')}>Chuyên mục</span>
                                                    <select
                                                        name=""
                                                        id=""
                                                        className={cx('form_option')}
                                                        value={categorySelected}
                                                        onChange={(e) => setCategorySelected(e.target.value)}
                                                    >
                                                        {categoryList.map((categoryItem) => (
                                                            <option
                                                                value={categoryItem.id}
                                                                className={cx('form_option_item')}
                                                                key={categoryItem.id}
                                                            >
                                                                {categoryItem.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className={cx('d-flex', 'align-items-center', 'w-100')}>
                                                    <span className={cx('form_label')}>Trạng thái:</span>
                                                    <span className={cx('form_text')}>Đã phê duyệt</span>
                                                </div>
                                                <div className={cx('d-flex', 'align-items-center', 'w-100')}>
                                                    <span className={cx('form_label')}>Ngày:</span>
                                                    <span className={cx('form_text')}>20/11/2022</span>
                                                </div>
                                            </div>
                                            <div className={cx('d-flex', 'w-100', 'justify-content-center', 'mt-5')}>
                                                <div style={{ marginRight: '3rem' }}>
                                                    <Button warning type="submit">
                                                        Lưu
                                                    </Button>
                                                </div>
                                                <div onClick={() => setDetailArticle(false)}>
                                                    <Button secondary type="button">
                                                        Hủy
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                    {updateAlert && (
                        <Alert
                            iconImage={SmileIcon}
                            content="Cập nhật thông tin bài viết thành công"
                            setAlertPopup={setUpdateAlert}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default Detail;
