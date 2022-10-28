import React from 'react';
import classNames from 'classnames/bind';

import styles from './FormSectionLeft.module.scss';

const cx = classNames.bind(styles);

const FormSectionLeft = () => {
    return (
        <div className={cx('section_wrapper', 'col-6')}>
            <div className={cx('section_inner_wrapper')}>
                <h1 className={cx('text-white', 'fw-bold', 'py-3', 'display-3', 'title')}>Medicare Portal</h1>
                <div className={cx('service-list', 'd-flex', 'flex-column', 'text-white')}>
                    <div className={cx('d-flex', 'align-items-center', 'justify-content-start', 'py-3')}>
                        <img src={require('~/assets/login-contact.png')} alt="Anh" />
                        <span className={cx('service-name', 'fs-2', 'ps-4')}>Liên hệ tư vấn</span>
                    </div>
                    <div className={cx('d-flex', 'align-items-center', 'justify-content-start', 'py-3')}>
                        <img src={require('~/assets/login-hospital.png')} alt="Anh" />
                        <span className={cx('service-name', 'fs-2', 'ps-4')}>Tìm bệnh viện</span>
                    </div>
                    <div className={cx('d-flex', 'align-items-center', 'justify-content-start', 'py-3')}>
                        <img src={require('~/assets/login-news.png')} alt="Anh" />
                        <span className={cx('service-name', 'fs-2', 'ps-4')}>Xem thông tin bệnh</span>
                    </div>
                    <div className={cx('d-flex', 'align-items-center', 'justify-content-start', 'py-3')}>
                        <img src={require('~/assets/login-community.png')} alt="Anh" />
                        <span className={cx('service-name', 'fs-2', 'ps-4')}>Cộng đồng</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormSectionLeft;
