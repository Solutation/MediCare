import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './BMICalculator.module.scss';
import images from '~/assets';
import { Button } from '~/components/Button';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { Navigator } from '~/components/Navigator';

const cx = classNames.bind(styles);

function BMICalculator() {
    const { t } = useTranslation('BMICalculator');
    const [show, setShow] = useState(false);
    const handleShow = (e) => {
        e.preventDefault();
        setShow(true);
    };
    const handleClose = () => setShow(false);
    const pageItem = [
        { id: 1, name: t('Công cụ'), to: '' },
        { id: 2, name: 'BMI', to: '' }
    ];
    return (
        <>
            <Navigator title={t('BMICalculator')} page={pageItem} bgPrimaryBold />
            <section className={cx('st-content')}>
                <div className={cx('container')}>
                    <div className={cx('row', 'div-content-BMI')}>
                        <div className={cx('col-7')}>
                            <h1>{t('BMICalculator')}</h1>
                            <p>{t('ContentBMI')}</p>
                        </div>
                    </div>
                    <div className={cx('row', 'pg')}>
                        <div className={cx('col-8')}>
                            <form action="">
                                <div className={cx('col-6')}>
                                    <div className={cx('row')}>
                                        <div className={cx('div-input-year')}>
                                            <label htmlFor="">{t('Years')}</label>
                                            <div className={cx('div-input')}>
                                                <input type="text" placeholder="Mời bạn nhập tuổi của mình" />
                                            </div>
                                            <div className={cx('div-messErr')}>
                                                <p> Lỗi sai cú pháp</p>
                                            </div>
                                        </div>
                                        <div className={cx('div-input-year')}>
                                            <label htmlFor="">{t('Height')}</label>
                                            <div className={cx('div-input')}>
                                                <input type="text" placeholder="Mời bạn nhập chiều cao của mình" />
                                            </div>
                                            <div className={cx('div-messErr')}>
                                                <p> Lỗi sai cú pháp</p>
                                            </div>
                                        </div>
                                        <div className={cx('div-input-year', 'mg-bt')}>
                                            <label htmlFor="">{t('Weight')}</label>
                                            <div className={cx('div-input')}>
                                                <input type="text" placeholder="Mời bạn nhập cân nặng của mình" />
                                            </div>
                                            <div className={cx('div-messErr')}>
                                                <p> Lỗi sai cú pháp</p>
                                            </div>
                                        </div>
                                        <div className={cx('div-button')}>
                                            {/* <button className={cx('btn-tinh')}>Tính ngay</button> */}
                                            <Button primary type="submit" onClick={handleShow}>
                                                {t('Btn-BMI')}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className={cx('col-4')}>
                            <div className={cx('div-img-heart')}>
                                <img src={require('~/assets/bmi_img.jpg')} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Modal show={show} onHide={handleClose} className={cx('modal__caculator')}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className={cx('content')}>
                        <div className={cx('content-BMI')}>
                            <h3>
                                Chỉ số BMI của bạn là : <span>25.1</span>
                            </h3>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default BMICalculator;
