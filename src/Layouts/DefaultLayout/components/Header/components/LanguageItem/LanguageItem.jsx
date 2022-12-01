import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';

import styles from './LanguageItem.module.scss';
import VietNamIcon from '~/assets/vietnamColor.png';
import UKIcon from '~/assets/ukColor.png';
import i18next from 'i18next';

const cx = classNames.bind(styles);

const cookies = new Cookies();

const LanguageItem = ({ tippyInstance }) => {
    const { t } = useTranslation('header');
    const languageRef = useRef();
    const [check, setCheck] = useState(false);
    const languageCode = cookies.get('languageCode');

    const languagesList = [
        {
            code: 'vi',
            icon: VietNamIcon,
            description: t('vietnamese')
        },
        {
            code: 'en',
            icon: UKIcon,
            description: t('english')
        }
    ];

    const handleChangeLanguage = (languageItem) => {
        cookies.set('languageCode', languageItem.code);
        i18next.changeLanguage(languageItem.code);
        setCheck(!check);
        tippyInstance.hide();
    };

    return (
        <div className={cx('wrapper')} ref={languageRef}>
            <p className={cx('language_header-text')}>{t('language')}</p>
            <div className={cx('separate')}></div>
            <div className={cx('d-flex', 'flex-column', 'language_body')}>
                {languagesList.map((languageItem) => (
                    <button
                        className={cx(
                            'd-flex',
                            'w-100',
                            'justify-content-start',
                            'align-items-center',
                            'language_item',
                            { disabled: languageCode === languageItem.code }
                        )}
                        onClick={() => handleChangeLanguage(languageItem)}
                        key={languageItem.code}
                    >
                        <img src={languageItem.icon} alt="" className={cx('locale_icon')} />
                        <span className={cx('locale_text')}>{languageItem.description}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageItem;
