import React from 'react';
import classNames from 'classnames/bind';
import { Navigator } from '~/components/Navigator';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import born from '~/assets/newborn.png';
import bmi from '~/assets/bmi.png';
import bmr from '~/assets/bmr.png';
import ovulation from '~/assets/ovulation.png';
import heartrate from '~/assets/heartrate.png';
import menopause from '~/assets/menopause.png';
import vaccination from '~/assets/vaccination.png';
import covid from '~/assets/covid.png';
import breastcancer from '~/assets/breastcancer.png';

import styles from './ToolCategories.module.scss';
import './ToolCategories.scss';

const cx = classNames.bind(styles);

const ToolCategories = () => {
    const { t } = useTranslation('tools');
    const navigate = useNavigate();

    const pageItem = [{ id: 1, name: t('tool'), to: '' }];

    const result = [
        {
            id: 1,
            image: bmi,
            type: 'bmi',
            name: t('bmi')
        },
        {
            id: 2,
            image: bmr,
            type: 'bmr',
            name: t('bmr')
        },
        {
            id: 3,
            image: ovulation,
            type: 'ovulation',
            name: t('ovulation')
        },
        {
            id: 4,
            image: heartrate,
            type: 'bmr',
            name: t('heartrate')
        },
        {
            id: 5,
            image: born,
            type: 'pdd',
            name: t('born')
        },
        {
            id: 6,
            image: vaccination,
            type: 'bmr',
            name: t('vaccination')
        },
        {
            id: 7,
            image: covid,
            type: 'bmr',
            name: t('covid')
        },
        {
            id: 8,
            image: menopause,
            type: 'ovulation',
            name: t('menopause')
        },
        {
            id: 9,
            image: breastcancer,
            type: 'ovulation',
            name: t('breastcancer')
        }
    ];

    return (
        <>
            <>
                <Navigator title={t('health-tool')} page={pageItem} bgPrimaryBold />
                <h3 className={cx('header', 'text-center')}>{t('title')}</h3>
                <div className={cx('tools-wrapper')}>
                    <div className={cx('row', 'd-flex', 'flex-wrap')}>
                        {result.map((item) => (
                            <div className={cx('col-sm-6', 'col-md-6', 'col-lg-4', 'tool-item')} key={item.id}>
                                <div
                                    className={cx('tool-wrapper')}
                                    onClick={() => navigate(`/tools/calculator?type=${item.type}`)}
                                >
                                    <img src={item.image} alt="Anh" className={cx('tool-img')}></img>
                                    <div className={cx('content-wrapper')}>
                                        <h3 className={cx('tool-content')}>{item.name}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        </>
    );
};

export default ToolCategories;
