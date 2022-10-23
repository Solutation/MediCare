import React, { useState, useRef } from 'react';
import classNames from 'classnames/bind';

import styles from './LanguageItem.module.scss';
import VietNamIcon from '~/assets/vietnamColor.png';
import UKIcon from '~/assets/ukColor.png';
import i18next from 'i18next';

const cx = classNames.bind(styles);

const languagesList = [
    {
        code: 'vi',
        icon: VietNamIcon,
        description: 'Tiếng Việt'
    },
    {
        code: 'en',
        icon: UKIcon,
        description: 'Tiếng Anh'
    }
];

const LanguageItem = () => {
    const languageRef = useRef();
    const [languageCode, setLanguageCode] = useState('vi');

    const handleChangeLanguage = (languageItem) => {
        i18next.changeLanguage(languageItem.code);
        setLanguageCode(languageItem.code);
    };

    return (
        <div className={cx('wrapper')} ref={languageRef}>
            <p className={cx('language_header-text')}>Ngôn ngữ</p>
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
