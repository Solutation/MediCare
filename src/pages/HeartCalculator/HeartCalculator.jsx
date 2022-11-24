import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './HeartCalculator.module.scss';
import { Button } from '~/components/Button';
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { Navigator } from '~/components/Navigator';

const cx = classNames.bind(styles);
function HeartCalculator() {
    const { t } = useTranslation('HeartCalculator');
    const [show, setShow] = useState(false);
    const handleShow = (e) => {
        e.preventDefault();
        setShow(true);
    };
    const handleClose = () => setShow(false);
    const pageItem = [
        { id: 1, name: t('Công cụ'), to: '' },
        { id: 2, name: 'Đo nhịp tim', to: '' }
    ];
    return (
        <>
            <Navigator title={t('HeartCalculator')} page={pageItem} bgPrimaryBold />
            <section className={cx('st-content')}>
                <div className={cx('container')}>
                    <div className={cx('row', 'div-content-BMI')}>
                        <div className={cx('col-12')}>
                            <h1>{t('HeartCalculator')}</h1>
                            <p>{t('ContentHeart')}</p>
                        </div>
                    </div>
                    <div className={cx('row', 'pg')}>
                        <div className={cx('col-8')}>
                            <form action="">
                                <div className={cx('col-6')}>
                                    <div className={cx('row')}>
                                        <div className={cx('div-input-year')}>
                                            <label htmlFor="">{t('Date')}</label>
                                            <div className="div-input">
                                                <input type="date" />
                                            </div>
                                            <div className={cx('div-messErr')}>
                                                <p> Lỗi sai cú pháp</p>
                                            </div>
                                        </div>
                                        <div className={cx('div-input-year')}>
                                            <label htmlFor="">{t('HeartResting')}</label>
                                            <div className="div-input">
                                                <input type="text" placeholder="mời bạn nhập nhịp tim của mình" />
                                            </div>
                                            <div className={cx('div-messErr')}>
                                                <p> Lỗi sai cú pháp</p>
                                            </div>
                                        </div>
                                        <div className={cx('div-button')}>
                                            {/* <button className={cx('btn-tinh')}>Tính ngay</button> */}
                                            <Button primary onClick={handleShow}>
                                                {t('Btn-Heart')}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className={cx('col-4')}>
                            <div className={cx('div-img-heart')}>
                                <img src={require('~/assets/heart_img.png')} alt="" />
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
export default HeartCalculator;
