import React, { useState, useEffect, memo, useLayoutEffect } from 'react';
import classNames from 'classnames/bind';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import { useTranslation } from 'react-i18next';

import images from '~/assets';
import styles from './Header.module.scss';
import { Search } from '../Search';
import { Button } from '~/components/Button';
import { faEllipsisVertical, faUser } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { LanguageItem } from './components/LanguageItem';
import { UserItem } from './components/UserItem';
import { Alert } from '~/components/Alert';
import SadIcon from '~/assets/sad.png';
import { CategoryItem } from './components/CategoryItem';
import { ServiceItem } from './components/ServiceItem';

const cx = classNames.bind(styles);

const cookies = new Cookies();

const Header = () => {
    const { t } = useTranslation('header');
    const [checkLogin, setCheckLogin] = useState(false);
    const [hide, setHide] = useState(false);
    const [alertPopup, setAlertPopup] = useState(false);
    const [popupCategory, setPopupCategory] = useState(false);
    const [popupService, setPopupService] = useState(false);
    const [categoryPrimary, setCategoryPrimary] = useState(false);
    const [servicePrimary, setServicePrimary] = useState(false);
    const [tippyInstance, setTippyInstance] = useState();
    const [tippyUserItemInstance, setTippyUserItemInstance] = useState();
    const [hideCategory, setHideCategory] = useState(false);
    const [hideService, setHideService] = useState(false);
    const [userInfo, setUserInfo] = useState();
    const userInfoAccess = cookies.get('userAccess');

    useLayoutEffect(() => {
        cookies.set('languageCode', 'vi');
    }, []);

    useLayoutEffect(() => {
        if (userInfoAccess) {
            setUserInfo(userInfoAccess.split(','));
            setCheckLogin(true);
        }
    }, [userInfoAccess]);

    useEffect(() => {
        if (userInfoAccess) {
            if (userInfoAccess.split(',')[5] !== 'Bệnh nhân') setHide(true);
        } else setHide(false);
    }, [userInfoAccess]);

    const handleContactClick = () => {
        if (!userInfoAccess) setAlertPopup(true);
    };

    const handleCommunityClick = () => {
        if (!userInfoAccess) setAlertPopup(true);
    };

    const handleCategoryPopup = () => {
        setPopupCategory(true);
        setHideCategory(false);
        setCategoryPrimary(true);
    };

    const handleServicePopup = () => {
        setPopupService(true);
        setHideService(false);
        setServicePrimary(true);
    };

    return (
        <>
            <nav className={cx('navbar', 'navbar-expand-md', 'wrapper')}>
                <div className={cx('container', 'd-flex')}>
                    <div className={cx('menu-left')}>
                        <Link to="/" className={cx('logo-link')}>
                            <img src={images.logo} alt="Anh" className={cx('logo-image')} />
                        </Link>
                    </div>
                    <button
                        className={cx('navbar-toggler')}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                    >
                        <span className={cx('navbar-toggler-icon')}></span>
                    </button>
                    <Search />
                    <div id="navbarCollapse" className={cx('collapse', 'navbar-collapse')} style={{ flexGrow: '0.5' }}>
                        <ul className={cx('navbar-nav', 'ml-auto', 'menu-right')}>
                            <div className={cx('separate')}></div>
                            <li
                                className={cx('nav-item', 'category_option', { primary: categoryPrimary })}
                                onClick={handleCategoryPopup}
                            >
                                {t('category')}
                            </li>
                            <li className={cx('nav-item')}>
                                <Link to="/consultant/list" className={cx('nav-link')}>
                                    {t('consultant')}
                                </Link>
                            </li>
                            <li className={cx('nav-item')}>
                                <Link
                                    to={userInfo ? '/contact' : ''}
                                    className={cx('nav-link')}
                                    onClick={handleContactClick}
                                >
                                    {t('contact')}
                                </Link>
                            </li>
                            <li className={cx('nav-item', { hide })}>
                                <Link
                                    to={userInfoAccess ? '/community' : ''}
                                    className={cx('nav-link')}
                                    onClick={handleCommunityClick}
                                >
                                    {t('community')}
                                </Link>
                            </li>
                            <li
                                className={cx('nav-item', 'category_option', { primary: servicePrimary })}
                                onClick={handleServicePopup}
                            >
                                {t('service')}
                            </li>
                        </ul>
                    </div>

                    {!checkLogin && (
                        <Button
                            to="/login"
                            primary
                            small
                            leftIcon={<FontAwesomeIcon icon={faUser} />}
                            className={cx('fs-3')}
                        >
                            {t('login')}
                        </Button>
                    )}
                    {checkLogin && (
                        <HeadlessTippy
                            interactive
                            render={(attrs) => (
                                <div className={cx('user_option_wrapper')} {...attrs}>
                                    <PopperWrapper className={cx('user_popper')}>
                                        <UserItem
                                            setCheckLogin={setCheckLogin}
                                            tippyUserItemInstance={tippyUserItemInstance}
                                        />
                                    </PopperWrapper>
                                </div>
                            )}
                            onShow={(instance) => setTippyUserItemInstance(instance)}
                            trigger="click"
                        >
                            <div className={cx('px-2', 'avatar_wrapper')}>
                                <img src={userInfo[6]} alt="" className={cx('rounded-circle', 'avatar')} />
                            </div>
                        </HeadlessTippy>
                    )}
                    {!checkLogin && (
                        <HeadlessTippy
                            interactive
                            render={(attrs) => (
                                <div className={cx('language_tippy_wrapper')} {...attrs}>
                                    <PopperWrapper className={cx('language_popper')}>
                                        <LanguageItem tippyInstance={tippyInstance} />
                                    </PopperWrapper>
                                </div>
                            )}
                            delay={[0, 200]}
                            trigger="mouseenter"
                            onShow={(instance) => setTippyInstance(instance)}
                        >
                            <div className={cx('p-4')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} className={cx('language_option_icon')} />
                            </div>
                        </HeadlessTippy>
                    )}
                </div>
            </nav>
            {alertPopup && (
                <Alert
                    iconImage={SadIcon}
                    content="Bạn phải đăng nhập mới được sử dụng tính năng này"
                    setAlertPopup={setAlertPopup}
                />
            )}
            {popupCategory && (
                <CategoryItem
                    setPopupCategory={setPopupCategory}
                    setCategoryPrimary={setCategoryPrimary}
                    setHideCategory={setHideCategory}
                    hideCategory={hideCategory}
                />
            )}
            {popupService && (
                <ServiceItem
                    setPopupService={setPopupService}
                    setServicePrimary={setServicePrimary}
                    hideService={hideService}
                    setHideService={setHideService}
                />
            )}
        </>
    );
};

export default memo(Header);
