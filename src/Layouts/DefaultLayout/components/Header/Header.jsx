import React, { useState, useEffect, memo } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import { useTranslation } from 'react-i18next';

import images from '~/assets';
import styles from './Header.module.scss';
import { Search } from '../Search';
import { Button } from '~/components/Button';
import { faEllipsisVertical, faUser } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { ServiceItem } from '~/components/ServiceItem';
import { LanguageItem } from './components/LanguageItem';
import { UserItem } from './components/UserItem';
import Chibi from '~/assets/chibi.jpg';

const cx = classNames.bind(styles);

const Header = () => {
    const { t } = useTranslation('header');

    return (
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
                <div id="navbarCollapse" className={cx('collapse', 'navbar-collapse')}>
                    <ul className={cx('navbar-nav', 'ml-auto', 'menu-right')}>
                        <div className={cx('separate')}></div>
                        <li className={cx('nav-item')}>
                            <Tippy
                                interactive
                                delay={[300, 0]}
                                content={
                                    <PopperWrapper className={cx('custom-service-popper')}>
                                        <ServiceItem />
                                    </PopperWrapper>
                                }
                                trigger="mouseenter"
                            >
                                <Link to="/" className={cx('nav-link')}>
                                    {t('service')}
                                </Link>
                            </Tippy>
                        </li>
                        <li className={cx('nav-item')}>
                            <Link to="/" className={cx('nav-link')}>
                                {t('category')}
                            </Link>
                        </li>
                        <li className={cx('nav-item')}>
                            <Link to="/" className={cx('nav-link')}>
                                {t('healthy_tool')}
                            </Link>
                        </li>
                        <li className={cx('nav-item')}>
                            <Link to="/" className={cx('nav-link')}>
                                {t('consultant')}
                            </Link>
                        </li>
                    </ul>
                </div>

                <Button to="/login" primary leftIcon={<FontAwesomeIcon icon={faUser} />} className={cx('fs-3')}>
                    {t('login')}
                </Button>
                {/* <HeadlessTippy
                    interactive
                    render={(attrs) => (
                        <div className={cx('user_option_wrapper')} {...attrs}>
                            <PopperWrapper className={cx('user_popper')}>
                                <UserItem />
                            </PopperWrapper>
                        </div>
                    )}
                    trigger="click"
                >
                    <div className={cx('px-2', 'avatar_wrapper')}>
                        <img src={Chibi} alt="" className={cx('rounded-circle', 'avatar')} />
                    </div>
                </HeadlessTippy> */}
                <HeadlessTippy
                    interactive
                    render={(attrs) => (
                        <div className={cx('language_tippy_wrapper')} {...attrs}>
                            <PopperWrapper className={cx('language_popper')}>
                                <LanguageItem />
                            </PopperWrapper>
                        </div>
                    )}
                    delay={[0, 200]}
                    trigger="mouseenter"
                >
                    <div className={cx('p-4')}>
                        <FontAwesomeIcon icon={faEllipsisVertical} className={cx('language_option_icon')} />
                    </div>
                </HeadlessTippy>
            </div>
        </nav>
    );
};

export default memo(Header);
