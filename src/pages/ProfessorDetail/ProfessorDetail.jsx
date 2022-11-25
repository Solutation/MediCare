import React from 'react';
import classNames from 'classnames/bind';
import { Navigator } from '~/components/Navigator';
import { ReviewContainer } from './components/ReviewContainer';
import { Button } from '~/components/Button';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './ProfessorDetail.module.scss';
import { faContactBook, faStar } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const ProfessorDetail = () => {
    const { t } = useTranslation('professor');

    const pageItem = [
        { id: 1, name: t('professor'), to: '' },
        { id: 2, name: t('detail'), to: '' }
    ];

    return (
        <>
            <Navigator title={'lâm khương trí'} page={pageItem} bgPrimaryBold />
            <div className={cx('container', 'flex-wrap')}>
                <div className={cx('row', 'mx-auto', 'd-flex')}>
                    <div className={cx('col-7', 'offset-1', 'professor-info')}>
                        <div className={cx('professor-wrapper')}>
                            <h1 className={cx('biography')}>{t('biography')}</h1>
                            <p>
                                Suas iracundia his ea errem ridens nam an veniam equidem. Lorem ipsum dolor sit amet
                                lore ipsum dolor sit amet. Suas iracundia his ea errem ridens nam an veniam equidem.
                                Lorem ipsum dolor sit amet lore ipsum dolor sit amet Suas iracundia his ea errem ridens
                                nam an veniam equidem. Lorem ipsum dolor sit amet lore ipsum dolor sit amet. Suas
                                iracundia his ea errem ridens nam an veniam equidem. Lorem ipsum dolor sit amet lore
                                ipsum dolor sit amet Suas iracundia his ea errem ridens nam an veniam equidem. Lorem
                                ipsum dolor sit amet lore ipsum dolor sit amet. Suas iracundia his ea errem ridens nam
                                an veniam equidem. Lorem ipsum dolor sit amet lore ipsum dolor sit amet
                            </p>
                            <div className={cx('more-info')}>
                                <ul className={cx('insurance-list')}>
                                    <li>
                                        <b>Email:</b> <span>trikhuong@gmail.com</span>
                                    </li>
                                    <li>
                                        <b>{t('phone')}:</b> <span>0123456789</span>
                                    </li>
                                    <li>
                                        <b>{t('score')}:</b> <span>4.5</span>
                                    </li>
                                    <li>
                                        <b>{t('certification')}:</b> <span>Master Of Cardiology </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-3')}>
                        <div className={cx('sidebar-wrapper')}>
                            <img
                                src={require('~/assets/doctor1.jpg')}
                                alt="Anh"
                                className={cx('professor-image')}
                            ></img>
                            <Button
                                className={cx('contact-btn')}
                                primary
                                leftIcon={<FontAwesomeIcon icon={faContactBook} />}
                            >
                                {t('contact')}
                            </Button>
                            <Button className={cx('review-btn')} primary leftIcon={<FontAwesomeIcon icon={faStar} />}>
                                {t('evaluate')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfessorDetail;
