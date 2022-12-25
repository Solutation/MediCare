import React, { memo } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Footer.module.scss';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Footer = () => {
    const { t } = useTranslation('Footer');
    return (
        <>
            <footer className={cx('footer-wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('row', 'd-flex')}>
                        <div className={cx('col-md-8', 'details-wrapper')}>
                            <div className={cx('footer-title')}>{t('MedicalCare')}</div>
                            <div className={cx('description')}>{t('Slogan')}</div>
                        </div>
                        <div className={cx('col-md-4', 'details-wrapper')}>
                            <div className={cx('footer-title')}>{t('Social')}</div>
                            <ul className={cx('social-icons')}>
                                <li>
                                    <Link to="">
                                        <FontAwesomeIcon icon={faFacebook} className={cx('color-icon')} />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="">
                                        <FontAwesomeIcon icon={faTwitter} className={cx('color-icon')} />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="">
                                        <FontAwesomeIcon icon={faInstagram} className={cx('color-icon')} />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="">
                                        <FontAwesomeIcon icon={faLinkedin} className={cx('color-icon')} />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <div className={cx('copyright')}>Copyright © 2022 All team Medical Care</div>
                </div>
            </footer>
        </>
    );
};
export default memo(Footer);
