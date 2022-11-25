import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import styles from './HeaderAdmin.module.scss';
import images from '~/assets';
import { Button } from '~/components/Button';

const cx = classNames.bind(styles);

const HeaderAdmin = () => {
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
                <Button primary leftIcon={<FontAwesomeIcon icon={faGear} />} className={cx('fs-3')}>
                    Admin
                </Button>
            </div>
        </nav>
    );
};

export default HeaderAdmin;
