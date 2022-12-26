import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

import styles from './PDDCalculator.module.scss';
import { Navigator } from '~/components/Navigator';
import { Button } from '~/components/Button';
import { httpRequest } from '~/utils';
import { Alert } from '~/components/Alert';
import mother from '~/assets/mother.png';
import birth from '~/assets/birth.jpg';

const cx = classNames.bind(styles);

const PDDCalculator = () => {
    const { t } = useTranslation('pdd');
    const [dataResponse, setDataResponse] = useState();
    const [alertPopup, setAlertPopup] = useState(false);
    const [initialValues, setInitialValues] = useState();

    const validationSchema = Yup.object().shape({
        conceptionDate: Yup.date().required('Ngày thụ thai không được để trống')
    });

    useEffect(() => {
        const initialState = {
            conceptionDate: ''
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
        { id: 2, name: t('pdd'), to: '' }
    ];

    return (
        <>
            {initialValues && (
                <>
                    <Navigator title={t('pdd')} page={pageItem} bgPrimaryBold />
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
                                        <h3 className={cx('description')}>{t('date')}</h3>
                                        <Field
                                            type="date"
                                            id="conceptionDate"
                                            name="conceptionDate"
                                            className={cx('form-control', 'form-input')}
                                        />
                                        <span className={cx('error_message')}>
                                            <ErrorMessage name="conceptionDate" />
                                        </span>
                                    </div>
                                    <Button primary className={cx('custom-btn')} type="submit">
                                        {t('result')}
                                    </Button>
                                </Form>
                            </Formik>
                            <div className={cx('d-none', 'd-md-block', 'col-md-4')}>
                                <img src={birth} alt="Anh" className={cx('tool-img')}></img>
                            </div>
                        </div>
                    </div>
                    {alertPopup && <Alert iconImage={mother} content={dataResponse} setAlertPopup={setAlertPopup} />}
                </>
            )}
        </>
    );
};

export default PDDCalculator;
