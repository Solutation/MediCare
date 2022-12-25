import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import styles from './OvulationCalculator.module.scss';
import { Navigator } from '~/components/Navigator';
import { Button } from '~/components/Button';
import { httpRequest } from '~/utils';
import { Alert } from '~/components/Alert';
import calendar from '~/assets/calendar.png';
import ovulation from '~/assets/ovulationimg.png';

const cx = classNames.bind(styles);

const OvulationCalculator = () => {
    const { t } = useTranslation('ovulation');
    const [dataResponse, setDataResponse] = useState();
    const [alertPopup, setAlertPopup] = useState(false);
    const [initialValues, setInitialValues] = useState();

    const validationSchema = Yup.object().shape({
        dayCycle: Yup.number()
            .required('Độ dài chu kỳ kinh nguyệt không được để trống')
            .typeError('Độ dài chu kỳ kinh nguyệt phải là chữ số')
            .integer('Độ dài chu kỳ kinh nguyệt phải là số nguyên dương')
            .min(15, 'Độ dài chu kỳ kinh nguyệt phải lớn hơn hoặc bằng 15 ngày')
            .max(60, 'Độ dài chu kỳ kinh nguyệt không được vượt quá 30 ngày')
    });

    useEffect(() => {
        const initialState = {
            dayCycle: ''
        };
        setInitialValues(initialState);
    }, []);

    const handleSubmit = async (formData) => {
        try {
            const { data } = await httpRequest.post('/tool/ovulation', formData);

            const initialState = {
                dayCycle: ''
            };
            setInitialValues(initialState);
            setDataResponse(data.message);
            setAlertPopup(true);
        } catch (err) {}
    };

    const pageItem = [
        { id: 1, name: t('tool'), to: '/tools' },
        { id: 2, name: t('ovulation'), to: '' }
    ];

    return (
        <>
            {initialValues && (
                <>
                    <Navigator title={t('ovulation')} page={pageItem} bgPrimaryBold />
                    <div className={cx('page-wrapper', 'flex-wrap')}>
                        <div className={cx('row', 'mx-auto', 'd-flex')}>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                enableReinitialize={true}
                            >
                                <Form action="" className={cx('col-12', 'col-md-8')}>
                                    <div className={cx('introduction')}>{t('description')}</div>
                                    <div className={cx('form-group')}>
                                        <h3 className={cx('description')}>{t('length')}</h3>
                                        <Field
                                            type="text"
                                            id="dayCycle"
                                            name="dayCycle"
                                            className={cx('form-control', 'form-input')}
                                            placeholder={t('cycle_length')}
                                        />
                                        <span className={cx('error_message')}>
                                            <ErrorMessage name="dayCycle" />
                                        </span>
                                    </div>
                                    <Button primary className={cx('custom-btn')} type="submit">
                                        {t('result')}
                                    </Button>
                                </Form>
                            </Formik>
                            <div className={cx('d-none', 'd-md-block', 'col-md-4')}>
                                <img src={ovulation} alt="Anh" className={cx('tool-img')}></img>
                            </div>
                        </div>
                    </div>
                    {alertPopup && <Alert iconImage={calendar} content={dataResponse} setAlertPopup={setAlertPopup} />}
                </>
            )}
        </>
    );
};

export default OvulationCalculator;
