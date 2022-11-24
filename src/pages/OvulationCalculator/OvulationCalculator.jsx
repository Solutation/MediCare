import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Navigator } from '~/components/Navigator';
import { Button } from '~/components/Button';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import styles from './OvulationCalculator.module.scss';

const cx = classNames.bind(styles);

const OvulationCalculator = () => {
    const { t } = useTranslation('ovulation');

    const pageItem = [
        { id: 1, name: t('tool'), to: '' },
        { id: 2, name: t('ovulation'), to: '' }
    ];

    const [show, setShow] = useState(false);

    const handleShow = (e) => {
        e.preventDefault();
        setShow(true);
    };

    const handleClose = () => setShow(false);

    return (
        <>
            <Navigator title={t('ovulation')} page={pageItem} bgPrimaryBold />
            <div className={cx('container', 'flex-wrap')}>
                <div className={cx('row', 'mx-auto', 'd-flex')}>
                    <div className={cx('tool-wrapper', 'col-7', 'offset-1')}>
                        <div className={cx('introduction')}>
                            Ngày rụng trứng chính là thời gian dễ thụ thai nhất bởi vì giai đoạn này tinh trùng có thể
                            gặp trứng nếu quan hệ tình dục. Theo dõi chu kỳ kinh nguyệt của bạn, xác định những ngày dễ
                            thụ thai nhất để tăng cơ hội thụ thai hoặc áp dụng biện pháp tránh thai.
                        </div>
                        <h3 className={cx('description')}>{t('recent')}</h3>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            className={cx('form-control', 'form-input', 'text-muted')}
                        />
                        <h3 className={cx('description')}>{t('length')}</h3>
                        <input
                            type="cycle-length"
                            id="cycle-length"
                            name="cycle-length"
                            className={cx('form-control', 'form-input')}
                            placeholder={t('cycle-length')}
                        />
                        <Button primary type="submit" onClick={handleShow}>
                            {t('result')}
                        </Button>
                    </div>
                    <div className={cx('col-3')}>
                        <div className={cx('sidebar-wrapper')}>
                            <img src={require('~/assets/ovulationimg.png')} alt="Anh" className={cx('tool-img')}></img>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} className={cx('modal-caculator')}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className={cx('content')}>
                        <div className={cx('content-BMR')}>
                            <h3>
                                {t('output')} : <span>123</span>
                            </h3>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default OvulationCalculator;
