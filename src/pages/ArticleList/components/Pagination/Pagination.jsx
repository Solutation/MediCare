import React from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';

import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

const Pagination = () => {
    const { t } = useTranslation('articlelist');

    return (
        <>
            <nav aria-label="page navigation example">
                <ul className={cx('pagination', 'page', 'pagination-lg')}>
                    <li className={cx('page-item', 'disabled')}>
                        <a className={cx('page-link')} href="#" tabIndex="-1" aria-disabled="true">
                            {t('previous')}
                        </a>
                    </li>
                    <li className={cx('page-item', 'active')} aria-current="page">
                        <a className={cx('page-link')} href="#">
                            1
                        </a>
                    </li>
                    <li className={cx('page-item')}>
                        <a className={cx('page-link')} href="#">
                            2
                        </a>
                    </li>
                    <li className={cx('page-item')}>
                        <a className={cx('page-link')} href="#">
                            3
                        </a>
                    </li>
                    <li className={cx('page-item')}>
                        <a className={cx('page-link')} href="#">
                            {t('next')}
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Pagination;
