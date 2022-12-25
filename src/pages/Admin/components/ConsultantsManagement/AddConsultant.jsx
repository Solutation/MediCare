import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import axios from 'axios';

import styles from './AddConsultant.module.scss';
import { Button } from '~/components/Button';
import { handleDateResponse, httpRequest, checkFileExtension } from '~/utils';
import { uploadImage, getImageUrl } from '~/utils/fileUtils';
import { Alert } from '~/components/Alert';
import SmileIcon from '~/assets/smile.png';
import { Loading } from '~/components/Loading';
import SadIcon from '~/assets/sad.png';

const cx = classNames.bind(styles);

const Certificate = ({ setCertificateList, certificateList }) => {
    const handleCertificateDelete = (certificateIndex) => {
        const firstArray = certificateList.slice(0, certificateIndex);
        const secondArray = certificateList.slice(certificateIndex + 1);
        const resultArray = [...firstArray, ...secondArray];
        setCertificateList(resultArray);
    };

    return (
        <>
            {certificateList.length >= 1 &&
                certificateList.map((certificateItem, index) => (
                    <div key={certificateItem.id} className={cx('d-flex', 'w-100', 'mt-4', 'align-items-center')}>
                        <div style={{ width: '90%' }}>
                            <input
                                className={cx('form_input', 'inputDisabled')}
                                autoComplete="new-password"
                                value={certificateItem.certificate_type}
                                onChange={() => {}}
                            />
                        </div>
                        <div style={{ width: '33%', marginLeft: '1.5rem' }}>
                            <input
                                className={cx('form_input', 'inputDisabled')}
                                autoComplete="new-password"
                                value={handleDateResponse(certificateItem.date_granted)}
                                onChange={() => {}}
                            />
                        </div>
                        <div
                            style={{ width: '10%', marginLeft: '1rem' }}
                            onClick={() => handleCertificateDelete(index)}
                        >
                            <Button danger small>
                                Xóa
                            </Button>
                        </div>
                    </div>
                ))}
        </>
    );
};

const CategoryItem = ({ checkedList, setCheckedList, setCategorySelected, categoryListAll }) => {
    useEffect(() => {
        if (categoryListAll) {
            const data = [];
            categoryListAll.forEach((categoryItem) => {
                data.push({ id: categoryItem.id, checked: false, name: categoryItem.name });
            });
            setCheckedList(data);
        }
        // eslint-disable-next-line
    }, [categoryListAll]);

    const handleSelected = (position) => {
        const updateCheckList = [];
        checkedList.forEach((checkListItem, index) => {
            if (index === position) {
                checkListItem.checked = !checkListItem.checked;
            }
            updateCheckList.push(checkListItem);
        });
        setCheckedList(updateCheckList);
    };

    useEffect(() => {
        let dataSelected = '';
        let flag = 0;
        if (checkedList) {
            checkedList.forEach((checkListItem, index) => {
                if (checkListItem.checked) {
                    if (flag === 0) dataSelected = dataSelected + checkListItem.name;
                    else dataSelected = dataSelected + `, ${checkListItem.name}`;
                    flag++;
                }
            });
            setCategorySelected(dataSelected);
        }
        //eslint-disable-next-line
    }, [checkedList]);

    return (
        <>
            {categoryListAll && checkedList && (
                <div className={cx('category_wrapper')}>
                    {categoryListAll.map((categoryItem, index) => (
                        <div className={cx('d-flex', 'align-items-center', 'px-2')} key={categoryItem.id}>
                            <input
                                type="checkbox"
                                className={cx('category_select')}
                                value={categoryItem.name}
                                checked={checkedList[index].checked}
                                onChange={() => handleSelected(index)}
                            />
                            <span className={cx('category_text')}>{categoryItem.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

let avatar =
    'https://firebasestorage.googleapis.com/v0/b/medicare-d0b4b.appspot.com/o/image-ui%2Fmeme.jpga5621623-6aed-4839-af80-4222272ef2e2?alt=media&token=f47c2dca-62a6-4c36-9a68-2ba55bf5b519';

const AddConsultant = ({ setAdd, checkUpdate, setCheckUpdate }) => {
    const [checkedList, setCheckedList] = useState();
    const [categorySelected, setCategorySelected] = useState('');
    const [initialValues, setInitialValues] = useState();
    const [certificateList, setCertificateList] = useState([]);
    const [certificateType, setCertificateType] = useState('');
    const [categoryListAll, setCategoryListAll] = useState();
    const [hideCategory, setHideCategory] = useState(true);
    const [loading, setLoading] = useState(false);
    const [fileUpload, setFileUpload] = useState('');
    const [certificateDateGranted, setCertificateDateGranted] = useState('');
    const [hideType, setHideType] = useState(true);
    const [hideDate, setHideDate] = useState(true);
    const [imageAlert, setImageAlert] = useState(false);
    const [addConsultantAlert, setAddConsultantAlert] = useState(false);
    const [addMessage, setAddMessage] = useState('');
    const dateRef = useRef();

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
            .min(4, 'Địa chỉ phải chứa ít nhất 4 ký tự')
            .max(255, 'Địa chỉ chỉ được chứa tối đa 255 ký tự'),
        descriptions: Yup.string()
            .required('Tiểu sử không được để trống')
            //eslint-disable-next-line
            .min(4, 'Tiểu sử phải chứa ít nhất 4 ký tự')
            .max(1000, 'Tiểu sử chỉ được chứa tối đa 1000 ký tự'),
        phone_number: Yup.string()
            .required('Số điện thoại không được để trống')
            .matches(/^\S*$/, 'Số điện thoại không được chứa ký tự trắng')
            .matches(/[^-_+=<!@#$%^&*({})>]+$/, 'Số điện thoại không được chứa ký tự đặc biệt')
            .matches(/^\d+$/, 'Số điện thoại không được chứa chữ cái')
            //eslint-disable-next-line
            .min(10, 'Số điện thoại phải chứa ít nhất 10 ký tự')
            .max(13, 'Số điện thoại chỉ được chứa tối đa 13 ký tự'),
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
            .max(255, 'Mật khẩu chỉ được chứa tối đa 255 ký tự')
    });

    useEffect(() => {
        const initialValues = {
            first_name: '',
            last_name: '',
            birth_day: '',
            phone_number: '',
            address: '',
            email: '',
            descriptions: '',
            pass_word: ''
        };
        setInitialValues(initialValues);
    }, []);

    useEffect(() => {
        setHideCategory(true);
    }, [checkedList]);

    useEffect(() => {
        if (addConsultantAlert) {
            setAdd(false);
            setCheckUpdate(!checkUpdate);
        }
        //eslint-disable-next-line
    }, [addConsultantAlert]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: { categoryList }
            } = await httpRequest.get(`/admin/category/list/all`, { cancelToken: cancelToken.token });
            setCategoryListAll(categoryList);
        };
        fetchAPI();
        return () => {
            cancelToken.cancel();
        };
    }, []);

    const handleCertificateSubmit = () => {
        if (certificateType.trim() === '' || !certificateDateGranted) {
            if (certificateType.trim() === '') setHideType(false);
            if (!certificateDateGranted) setHideDate(false);
            return;
        }
        const data = {
            id: certificateList.length + 1,
            certificate_type: certificateType,
            date_granted: certificateDateGranted
        };
        setCertificateList((prev) => [...prev, data]);
        setCertificateType('');
        setCertificateDateGranted('');
        setHideType(true);
        setHideDate(true);
    };

    const handleChangeAvatar = (e) => {
        const files = e.target.files[0];
        if (!checkFileExtension(files.name.split('.')[1])) {
            setImageAlert(true);
            return;
        } else {
            setFileUpload(files);
        }
    };

    const handleAddClick = () => {
        const checkSelected = checkedList.some((item) => item.checked === true);
        if (certificateList.length < 1 || !checkSelected) {
            if (certificateList.length < 1) {
                setHideDate(false);
                setHideType(false);
            }
            if (!checkSelected) setHideCategory(false);
            return;
        }
    };

    const handleAddSubmit = async (formData) => {
        if (certificateList.length < 1 || !checkedList) {
            if (certificateList.length < 1) {
                setHideDate(false);
                setHideType(false);
            }
            if (!checkedList) setHideCategory(false);
            return;
        }
        try {
            setLoading(true);
            let urlResult = '';
            const checkedListResult = checkedList.filter((checkItem) => checkItem.checked === true);
            if (fileUpload !== '') {
                const imageRef = await uploadImage(fileUpload);
                urlResult = await getImageUrl(imageRef);
            } else urlResult = avatar;
            const dataToSend = {
                email: formData.email,
                first_name: formData.first_name,
                last_name: formData.last_name,
                pass_word: formData.pass_word,
                phone_number: formData.phone_number,
                address: formData.address,
                birth_day: formData.birth_day,
                descriptions: formData.descriptions,
                avatar: urlResult,
                checkedList: checkedListResult,
                certificateList
            };
            const {
                data: { message }
            } = await httpRequest.post(`/admin/consultant/add`, dataToSend);
            setLoading(false);
            setAddConsultantAlert(true);
            setAddMessage(message);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {categoryListAll && initialValues && (
                <div className={cx('blur')}>
                    <div className={cx('blur_overllay')}></div>
                    <div className={cx('wrapper')}>
                        <div className={cx('d-flex', 'flex-column', 'w-100')} style={{ padding: '0.6rem 1.2rem' }}>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleAddSubmit}
                                enableReinitialize="true"
                            >
                                <Form>
                                    <div className={cx('row')}>
                                        <div className={cx('col-8')}>
                                            <div className={cx('row')}>
                                                <div className={cx('col-12', 'd-flex', 'flex-column', 'py-2')}>
                                                    <span className={cx('form_label')}>Email</span>
                                                    <Field
                                                        className={cx('form_input')}
                                                        name="email"
                                                        autoComplete="new-password"
                                                    />
                                                    <span
                                                        className={cx('error_message')}
                                                        style={{ marginTop: '7.4rem' }}
                                                    >
                                                        <ErrorMessage name="email" />
                                                    </span>
                                                </div>
                                                <div className={cx('col-12', 'd-flex', 'flex-column', 'py-2')}>
                                                    <span className={cx('form_label')}>Mật khẩu</span>
                                                    <Field
                                                        className={cx('form_input')}
                                                        name="pass_word"
                                                        autoComplete="new-password"
                                                        type="password"
                                                    />
                                                    <span
                                                        className={cx('error_message')}
                                                        style={{ marginTop: '7.4rem' }}
                                                    >
                                                        <ErrorMessage name="pass_word" />
                                                    </span>
                                                </div>
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
                                                                </>
                                                            );
                                                        }}
                                                    </Field>
                                                    <span
                                                        className={cx('error_message')}
                                                        style={{ marginTop: '13.6rem' }}
                                                    >
                                                        <ErrorMessage name="descriptions" />
                                                    </span>
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
                                                src={fileUpload === '' ? avatar : URL.createObjectURL(fileUpload)}
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
                                                onChange={handleChangeAvatar}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('row', 'align-items-end')}>
                                        <div className={cx('col-8', 'd-flex', 'flex-column', 'py-2')}>
                                            <span className={cx('form_label')}>Chuyên môn</span>
                                            <HeadlessTippy
                                                interactive="true"
                                                render={(attrs) => (
                                                    <CategoryItem
                                                        checkedList={checkedList}
                                                        setCheckedList={setCheckedList}
                                                        setCategorySelected={setCategorySelected}
                                                        categoryListAll={categoryListAll}
                                                    />
                                                )}
                                                trigger="click"
                                                placement="bottom-start"
                                            >
                                                <div
                                                    className={cx(
                                                        'd-flex',
                                                        'justify-content-between',
                                                        'w-100',
                                                        'align-items-center',
                                                        'py-2'
                                                    )}
                                                    style={{
                                                        cursor: 'pointer',
                                                        border: '1px solid var(--color-black)'
                                                    }}
                                                >
                                                    <span className={cx('px-1')} style={{ fontSize: '1.6rem' }}>
                                                        {categorySelected === '' ? 'Chọn chuyên môn' : categorySelected}
                                                    </span>
                                                    <FontAwesomeIcon
                                                        icon={faChevronDown}
                                                        className={cx('arrow_down_icon')}
                                                    />
                                                </div>
                                            </HeadlessTippy>
                                            <span
                                                className={cx('error_message', { hide: hideCategory })}
                                                style={{ marginTop: '7.4rem' }}
                                            >
                                                Chuyên môn không được để trống
                                            </span>
                                        </div>

                                        <div className={cx('col-8', 'd-flex', 'flex-column', 'py-2')}>
                                            <span className={cx('form_label')}>Loại chứng chỉ</span>
                                            <input
                                                className={cx('form_input')}
                                                autoComplete="new-password"
                                                value={certificateType}
                                                onChange={(e) => setCertificateType(e.target.value)}
                                                onInput={() => setHideType(true)}
                                            />
                                            <span
                                                className={cx('error_message', { hide: hideType })}
                                                style={{ marginTop: '7.4rem' }}
                                            >
                                                Loại chứng chỉ không được để trống
                                            </span>
                                        </div>
                                        <div className={cx('col-3', 'd-flex', 'flex-column', 'py-2')}>
                                            <span className={cx('form_label')}>Ngày cấp</span>
                                            <input
                                                className={cx('form_input_date')}
                                                autoComplete="new-password"
                                                type="date"
                                                ref={dateRef}
                                                value={certificateDateGranted}
                                                onChange={(e) => setCertificateDateGranted(e.target.value)}
                                                onInput={() => setHideDate(true)}
                                            />
                                            <span
                                                className={cx('error_message', { hide: hideDate })}
                                                style={{ marginTop: '7.4rem' }}
                                            >
                                                Ngày cấp không được để trống
                                            </span>
                                        </div>
                                        <div className={cx('py-2', 'w-100')}>
                                            <Certificate
                                                certificateList={certificateList}
                                                setCertificateList={setCertificateList}
                                            />
                                        </div>
                                        <div className={cx('col-2', 'mt-4')} onClick={handleCertificateSubmit}>
                                            <Button
                                                outline
                                                small
                                                leftIcon={<FontAwesomeIcon icon={faPlus} />}
                                                type="button"
                                            >
                                                Thêm chứng chỉ
                                            </Button>
                                        </div>
                                    </div>
                                    <div className={cx('d-flex', 'w-100', 'justify-content-center', 'py-4', 'mt-2')}>
                                        <Button warning type="submit" onClick={handleAddClick}>
                                            Thêm
                                        </Button>
                                        <div className={cx('px-5')} onClick={() => setAdd(false)}>
                                            <Button secondary>Hủy</Button>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            )}
            {imageAlert && (
                <Alert
                    iconImage={SadIcon}
                    content="Chỉ được chọn file ảnh dưới định dạng jpg, png hoặc jpeg"
                    setAlertPopup={setImageAlert}
                />
            )}
            {addConsultantAlert && (
                <Alert iconImage={SmileIcon} content={addMessage} setAlertPopup={setAddConsultantAlert} />
            )}
            {loading && <Loading messageLoading="Đang tiến hành thêm chuyên gia" />}
        </>
    );
};

export default AddConsultant;
