import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Navigator } from '~/components/Navigator';
import { Button } from '~/components/Button';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import styles from './BMRCalculator.module.scss';

const cx = classNames.bind(styles);

const BMRCalculator = () => {
    const { t } = useTranslation('bmr');

    const pageItem = [
        { id: 1, name: t('tools'), to: '' },
        { id: 2, name: t('tool-bmr'), to: '' }
    ];

    const [show, setShow] = useState(false);

    const handleShow = (e) => {
        e.preventDefault();
        setShow(true);
    };

    const handleClose = () => setShow(false);
    return (
        <>
            <Navigator title={t('tool-bmr')} page={pageItem} bgPrimaryBold />
            <div className={cx('container', 'flex-wrap')}>
                <div className={cx('row', 'mx-auto', 'd-flex')}>
                    <div className={cx('tool-wrapper', 'col-7', 'offset-1')}>
                        <div className={cx('introduction')}>
                            Chỉ số BMR (Basal Metabolic Rate) là tỷ lệ trao đổi chất cơ bản trong cơ thể con người. Chỉ
                            số này cho biết mức năng lượng tối thiểu mà cơ thể cần, để thực hiện các chức năng cơ bản
                            nhằm đảm bảo duy trì sự sống của cơ thể, khi bạn ở trạng thái nghỉ ngơi.
                        </div>
                        <h3 className={cx('description')}>{t('age')}</h3>
                        <input
                            type="age"
                            name="age"
                            className={cx('form-control', 'form-input')}
                            placeholder={t('input-age')}
                        />
                        <h3 className={cx('description')}>{t('height')}</h3>
                        <input
                            type="height"
                            name="height"
                            className={cx('form-control', 'form-input')}
                            placeholder={t('input-height')}
                        />
                        <h3 className={cx('description')}>{t('weight')}</h3>
                        <input
                            type="weight"
                            name="weight"
                            className={cx('form-control', 'form-input')}
                            placeholder={t('input-weight')}
                        />
                        <Button primary type="submit" onClick={handleShow}>
                            {t('result')}
                        </Button>
                    </div>
                    <div className={cx('col-3')}>
                        <div className={cx('sidebar-wrapper')}>
                            <img src={require('~/assets/bmrimg.png')} alt="Anh" className={cx('tool-img')}></img>
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

export default BMRCalculator;
