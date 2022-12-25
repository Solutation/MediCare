import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import styles from './BMICalculator.module.scss';
import { Navigator } from '~/components/Navigator';
import { Button } from '~/components/Button';
import { httpRequest } from '~/utils';
import { Alert } from '~/components/Alert';
import bmiicon from '~/assets/bmiicon.png';
import bmi from '~/assets/bmiimg.jpg';

const cx = classNames.bind(styles);

const BMICalculator = ({ setFlag }) => {
    const { t } = useTranslation('bmi');
    const [dataResponse, setDataResponse] = useState();
    const [alertPopup, setAlertPopup] = useState(false);
    const [initialValues, setInitialValues] = useState();

    const validationSchema = Yup.object().shape({
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
            weight: '',
            height: ''
        };
        setInitialValues(initialState);
    }, []);

    const pageItem = [
        { id: 1, name: t('tools'), to: '/tools' },
        { id: 2, name: t('tool-bmi'), to: '' }
    ];

    const handleSubmit = async (formData) => {
        try {
            const dataResult = {
                weight: formData.weight,
                height: formData.height
            };
            const { data } = await httpRequest.post('/tool/bmi', dataResult);
            setDataResponse(data.message);
            setAlertPopup(true);
        } catch (err) {}
    };

    return (
        <>
            {initialValues && (
                <>
                    <Navigator title={t('tool-bmi')} page={pageItem} bgPrimaryBold />
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
                                    </div>
                                    <Button className={cx('custom-btn')} primary type="submit">
                                        {t('result')}
                                    </Button>
                                </Form>
                            </Formik>
                            <div className={cx('d-none', 'd-md-block', 'col-md-4')}>
                                <img src={bmi} alt="Anh" className={cx('tool-img')}></img>
                            </div>
                        </div>
                    </div>
                    {alertPopup && <Alert iconImage={bmiicon} content={dataResponse} setAlertPopup={setAlertPopup} />}
                </>
            )}
        </>
    );
};

export default BMICalculator;
