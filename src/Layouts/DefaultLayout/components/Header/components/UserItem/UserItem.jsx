import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

import styles from './UserItem.module.scss';
import './override-library.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faRightFromBracket, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import VietNamColorIcon from '~/assets/vietnamColor.png';
import UKColorIcon from '~/assets/ukColor.png';

const cx = classNames.bind(styles);

const cookies = new Cookies();

const UserItem = ({ setCheckLogin, tippyUserItemInstance }) => {
    const { t } = useTranslation('header');
    const [separate, setSeparate] = useState(false);
    const [check, setCheck] = useState(false);
    const languageCode = cookies.get('languageCode');
    const userInfo = cookies.get('userAccess').split(',');
    const navigate = useNavigate();

    const handleChangeLanguage = (languageCode) => {
        cookies.set('languageCode', languageCode);
        i18next.changeLanguage(languageCode);
        tippyUserItemInstance.hide();
        setCheck(!check);
    };

    const handleLogout = () => {
        cookies.remove('userAccess');
        setCheckLogin(false);
        navigate('/');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('d-flex', 'flex-column', 'header_wrapper')}>
                <div className={cx('d-flex', 'align-items-center', 'justify-content-start', 'w-100')}>
                    <img src={userInfo[6]} alt="" className={cx('avatar')} />
                    <div className={cx('d-flex', 'flex-column', 'px-4')}>
                        <p className={cx('text-black', 'fw-bold', 'mb-1')}>{userInfo[4]}</p>
                        <span className={cx('text-muted', 'fs-4')}>{userInfo[3]}</span>
                    </div>
                </div>
                <div className={cx('description_wrapper')}>
                    <FontAwesomeIcon icon={faStethoscope} className={cx('description_icon')} />
                    <span className={cx('description_text')}>{userInfo[5]}</span>
                </div>
            </div>
            <div className={cx('d-flex', 'flex-column', 'body_wrapper')}>
                <Link
                    className={cx('d-flex', 'align-items-center', 'justify-content-start', 'body_item_profile')}
                    to="/profile"
                    onClick={() => tippyUserItemInstance.hide()}
                >
                    <FontAwesomeIcon icon={faUser} className={cx('option_icon')} />
                    <span className={cx('option_text')} style={{ marginLeft: '0.2rem' }}>
                        {t('profile')}
                    </span>
                </Link>

                <div className={cx('accordion', 'accordion-flush', 'accordion_wrapper')} id="accordionLanguage">
                    <div className={cx('body_separate')}></div>
                    <div className={cx('accordion-item')} style={{ padding: '0.8rem 0' }}>
                        <h2 className={cx('accordion-header')} id="flush-headingOne">
                            <button
                                className={cx('accordion-button', 'collapsed')}
                                data-bs-toggle="collapse"
                                data-bs-target="#flush-collapseOne"
                                aria-expanded="false"
                                onClick={() => setSeparate(!separate)}
                            >
                                <FontAwesomeIcon icon={faGlobe} className={cx('option_icon')} />
                                <span className={cx('option_text')}>{t('language')}</span>
                            </button>
                            {separate && <div className={cx('language_separate')}></div>}
                        </h2>
                        <div
                            id="flush-collapseOne"
                            className={cx('accordion-collapse', 'collapse')}
                            aria-labelledby="flush-headingOne"
                            data-bs-parent="#accordionFlushExample"
                        >
                            <div className={cx('accordion-body')}>
                                <button
                                    className={cx(
                                        'd-flex',
                                        'align-items-center',
                                        'justify-content-start',
                                        'language_wrapper',
                                        'mt-3',
                                        { disabled: languageCode === 'vi' }
                                    )}
                                    onClick={() => handleChangeLanguage('vi')}
                                >
                                    <img src={VietNamColorIcon} alt="" className={cx('language_icon')} />
                                    <span className={cx('text-black', 'fw-bold', 'fs-4', 'language_text')}>
                                        {t('vietnamese')}
                                    </span>
                                </button>
                                {separate && <div className={cx('language_separate', 'mt-4')}></div>}
                                <button
                                    className={cx(
                                        'd-flex',
                                        'align-items-center',
                                        'justify-content-start',
                                        'language_wrapper',
                                        { disabled: languageCode === 'en' }
                                    )}
                                    style={{ padding: '0', marginTop: '2.8rem' }}
                                    onClick={() => handleChangeLanguage('en')}
                                >
                                    <img
                                        src={UKColorIcon}
                                        alt=""
                                        className={cx('language_icon')}
                                        style={{ position: 'relative', top: '0.4rem' }}
                                    />
                                    <span
                                        className={cx('text-black', 'fw-bold', 'fs-4', 'language_text')}
                                        style={{ position: 'relative', top: '0.4rem' }}
                                    >
                                        {t('english')}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={cx('footer_wrapper', 'd-flex', 'justify-content-center', 'align-items-center')}
                onClick={handleLogout}
            >
                <div className={cx('footer_inner')}>
                    <FontAwesomeIcon icon={faRightFromBracket} className={cx('logout_icon')} />
                    <span className={cx('logout-text')}>{t('logout')}</span>
                </div>
            </div>
        </div>
    );
};

export default UserItem;
