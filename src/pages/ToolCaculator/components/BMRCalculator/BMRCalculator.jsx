import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import styles from './BMRCalculator.module.scss';
import { Navigator } from '~/components/Navigator';
import { Button } from '~/components/Button';
import { httpRequest } from '~/utils';
import { Alert } from '~/components/Alert';
import calories from '~/assets/calories.png';
import bmr from '~/assets/bmrimg.png';

const cx = classNames.bind(styles);

const BMRCalculator = ({ setFlag }) => {
    const { t } = useTranslation('bmr');
    const [dataResponse, setDataResponse] = useState();
    const [alertPopup, setAlertPopup] = useState(false);
    const [initialValues, setInitialValues] = useState();
    const [sex, setSex] = useState('Nam');

    const validationSchema = Yup.object().shape({
        age: Yup.number()
            .required('Tuổi không được để trống')
            .typeError('Tuổi phải là chữ số')
            .integer('Tuổi phải là số nguyên dương')
            .min(1, 'Tuổi phải lớn hơn hoặc bằng 1')
            .max(300, 'Số tuổi lớn nhất không được vượt quá 300'),
        weight: Yup.number()
            .required('Cân nặng không được để trống')
            .typeError('Cân nặng phải là chữ số')
            .min(0.1, 'Cân nặng phải lớn hơn hoặc bằng 0.1kg')
            .max(1000, 'Cân nặng không được vượt quá 1000kg'),
        height: Yup.number()
            .required('Chiều cao không được để trống')
            .typeError('Chiều cao phải là chữ số')
            .min(100, 'Chiều cao phải lớn hơn hoặc bằng 100 (cm)')
            .max(800, 'Chiều cao lớn nhất không được vượt quá 800 (cm)')
    });

    useEffect(() => {
        const initialState = {
            age: '',
            weight: '',
            height: ''
        };
        setInitialValues(initialState);
    }, []);

    const pageItem = [
        { id: 1, name: t('tools'), to: '/tools' },
        { id: 2, name: t('tool-bmr'), to: '' }
    ];

    const handleSubmit = async (formData) => {
        try {
            const dataResult = {
                weight: formData.weight,
                height: formData.height,
                age: formData.age,
                sex
            };
            const { data } = await httpRequest.post('/tool/bmr', dataResult);
            setDataResponse(data.message);
            setAlertPopup(true);
        } catch (err) {}
    };

    return (
        <>
            {initialValues && (
                <>
                    <Navigator title={t('tool-bmr')} page={pageItem} bgPrimaryBold />
                    <div className={cx('page-wrapper', 'flex-wrap')}>
                        <div className={cx('row', 'mx-auto', 'd-flex')}>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                <Form className={cx('col-12', 'col-md-8')}>
                                    <div className={cx('introduction')}>{t('description')}</div>
                                    <div className={cx('form-group')}>
                                        <h3 className={cx('description')}>{t('age')}</h3>
                                        <Field
                                            id="age"
                                            name="age"
                                            className={cx('form-control', 'form-input')}
                                            placeholder={t('input-age')}
                                        />
                                        <span className={cx('error_message')}>
                                            <ErrorMessage name="age" />
                                        </span>
                                        <h3 className={cx('description')}>{t('height')}</h3>
                                        <Field
                                            id="height"
                                            name="height"
                                            className={cx('form-control', 'form-input')}
                                            placeholder={t('input-height')}
                                        />
                                        <span className={cx('error_message')}>
                                            <ErrorMessage name="height" />
                                        </span>
                                        <h3 className={cx('description')}>{t('weight')}</h3>
                                        <Field
                                            id="weight"
                                            name="weight"
                                            className={cx('form-control', 'form-input')}
                                            placeholder={t('input-weight')}
                                        />
                                        <span className={cx('error_message')}>
                                            <ErrorMessage name="weight" />
                                        </span>
                                        <h3 className={cx('description')}>{t('gender')}</h3>
                                        <div className={cx('radio-wrapper')}>
                                            <input
                                                className={cx('radio')}
                                                type="radio"
                                                name="gt"
                                                value="Nam"
                                                id="male"
                                                checked={sex === 'Nam' ? true : false}
                                                onChange={(e) => setSex(e.target.value)}
                                            />
                                            <label className={cx('male')}>{t('male')}</label>
                                            <input
                                                className={cx('radio')}
                                                type="radio"
                                                name="gt"
                                                value="Nữ"
                                                id="female"
                                                checked={sex === 'Nữ' ? true : false}
                                                onChange={(e) => setSex(e.target.value)}
                                            />
                                            <label>{t('female')}</label>
                                        </div>
                                    </div>
                                    <Button className={cx('custom-btn')} primary type="submit">
                                        {t('result')}
                                    </Button>
                                </Form>
                            </Formik>
                            <div className={cx('d-none', 'd-md-block', 'col-md-4')}>
                                <img src={bmr} alt="Anh" className={cx('tool-img')}></img>
                            </div>
                        </div>
                    </div>
                    {alertPopup && <Alert iconImage={calories} content={dataResponse} setAlertPopup={setAlertPopup} />}
                </>
            )}
        </>
    );
};

export default BMRCalculator;
