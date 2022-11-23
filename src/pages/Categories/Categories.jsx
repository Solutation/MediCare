import React from 'react';
import classNames from 'classnames/bind';
import { Navigator } from '~/components/Navigator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { CategoriesContainer } from './components/CategoriesContainer';
import { useTranslation } from 'react-i18next';

import styles from './Categories.module.scss';

const cx = classNames.bind(styles);

const Categories = () => {
    const { t } = useTranslation('categories');

    const pageItem = [{ id: 1, name: t('categories'), to: '' }];

    return (
        <>
            <Navigator title={t('categories')} page={pageItem} bgPrimaryBold />
            <div className={cx('categories-wrapper')}>
                <div className={cx('categories-header')}>
                    <h3 className={cx('header', 'text-center')}>{t('title')}</h3>
                    <div className={cx('search-wrapper')}>
                        <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                        <input
                            className={cx('categories-search', 'form-control')}
                            type="search"
                            placeholder={t('search')}
                            aria-label="Search"
                        ></input>
                    </div>
                </div>
                <CategoriesContainer></CategoriesContainer>
            </div>
        </>
    );
};

export default Categories;
