import React from 'react';
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
            <footer className={cx('site-footer')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-md-3')}>
                            <h6>{t('MedicalCare')}</h6>
                            <p className={cx('text-justify')}>
                                <i>{t('MedicalCare')}</i> {t('Slogan')}
                            </p>
                        </div>
                        <div className={cx('col-xs-6 col-md-3', 'mg-l')}>
                            <h6>{t('Services')}</h6>
                            <ul className={cx('footer-links')}>
                                <li>
                                    <Link to="">{t('ContactClient')}</Link>
                                </li>
                                <li>
                                    <Link to="">{t('FindHospitals')}</Link>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('col-xs-6 col-md-3', 'mg-l-1')}>
                            <ul className={cx('footer-links')}>
                                <li>
                                    <Link to="">{t('Posts')}</Link>
                                </li>
                                <li>
                                    <Link to="">{t('Public')}</Link>
                                </li>
                            </ul>
                        </div>
                        <div className={cx('col-xs-6 col-md-3', 'mll')}>
                            <h6>{t('Experts')}</h6>
                            <ul className={cx('footer-links')}>
                                <li>
                                    <Link to="">{t('RateExperts')}</Link>
                                </li>
                                <li>
                                    <Link to="">{t('InfoExperts')}</Link>
                                </li>
                            </ul>
                        </div>

                        <div className={cx('col-md-2', 'pll')}>
                            <h6>{t('Social')}</h6>
                            <ul className={cx('social-icons')}>
                                <li>
                                    <Link className="facebook" to="">
                                        <FontAwesomeIcon icon={faFacebook} className={cx('color-icon')} />
                                    </Link>
                                </li>
                                <li>
                                    <Link className="twitter" to="">
                                        <FontAwesomeIcon icon={faTwitter} className={cx('color-icon')} />
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dribbble" to="">
                                        <FontAwesomeIcon icon={faInstagram} className={cx('color-icon')} />
                                    </Link>
                                </li>
                                <li>
                                    <Link className="linkedin" to="">
                                        <FontAwesomeIcon icon={faLinkedin} className={cx('color-icon')} />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className={cx('container')}>
                    <div className={cx('row', 'copyright')}>
                        <p className={cx('copyright-text')}>Copyright © 2022 All team Medical Care</p>
                    </div>
                </div>
            </footer>
        </>
    );
};
export default Footer;
