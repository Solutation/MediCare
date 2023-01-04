import React from 'react';
import classNames from 'classnames/bind';
import { Button } from '~/components/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import './CarouselContainer.scss';
import styles from './CarouselContainer.module.scss';
const cx = classNames.bind(styles);

const CarouselContainer = ({ consultantRelated }) => {
    const { t } = useTranslation('article');
    const navigate = useNavigate();

    return (
        <>
            <div className={cx('carousel-professor')}>
                <div id="carouselExampleDark" className={cx('carousel', 'carousel-dark', 'slide')} data-bs-ride="true">
                    <div className={cx('carousel-indicators')}>
                        {consultantRelated.map((consultant, index) => (
                            <button
                                type="button"
                                data-bs-target="#carouselExampleDark"
                                data-bs-slide-to={index}
                                className={cx('active')}
                                aria-label={`Slide ${index + 1}`}
                                key={consultant.id}
                            ></button>
                        ))}
                    </div>
                    <div className={cx('carousel-inner')}>
                        {consultantRelated.map((consultant, index) =>
                            index === 0 ? (
                                <div
                                    className={cx('carousel-item', 'active')}
                                    data-bs-interval="10000"
                                    key={consultant.id}
                                >
                                    <div className={cx('professor-card')}>
                                        <div className={cx('professor-image')}>
                                            <img
                                                src={consultant.avatar}
                                                alt="Anh"
                                                className={cx('professor-image')}
                                            ></img>
                                        </div>
                                        <div className={cx('professor-info')}>
                                            <div className={cx('professor-detail')}>
                                                <div className={cx('about-professor')}>{t('professor')}</div>
                                                <h3 className={cx('professor-content')}>
                                                    {t('name')}: {`${consultant.first_name} ${consultant.last_name}`}
                                                </h3>
                                                <h3 className={cx('professor-content')}>
                                                    {t('specialist')}: {consultant.category_name}
                                                </h3>
                                                <h3 className={cx('professor-content')}>
                                                    {t('phone')}: {consultant.phone_number}
                                                </h3>
                                            </div>
                                            <Button
                                                className={cx('btn-custom')}
                                                primary
                                                rounded
                                                onClick={() => navigate(`/consultant?consultantId=${consultant.id}`)}
                                            >
                                                {t('info')}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className={cx('carousel-item')} data-bs-interval="10000" key={consultant.id}>
                                    <div className={cx('professor-card')}>
                                        <div className={cx('professor-image')}>
                                            <img
                                                src={consultant.avatar}
                                                alt="Anh"
                                                className={cx('professor-image')}
                                            ></img>
                                        </div>
                                        <div className={cx('professor-info')}>
                                            <div className={cx('professor-detail')}>
                                                <div className={cx('about-professor')}>{t('professor')}</div>
                                                <h3 className={cx('professor-content')}>
                                                    {t('name')}: {`${consultant.first_name} ${consultant.last_name}`}
                                                </h3>
                                                <h3 className={cx('professor-content')}>
                                                    {t('specialist')}: {consultant.category_name}
                                                </h3>
                                                <h3 className={cx('professor-content')}>
                                                    {t('phone')}: {consultant.phone_number}
                                                </h3>
                                            </div>
                                            <Button
                                                className={cx('btn-custom')}
                                                primary
                                                rounded
                                                onClick={() => navigate(`/consultant?consultantId=${consultant.id}`)}
                                            >
                                                {t('info')}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>

                    <button
                        className={cx('carousel-control-prev')}
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide="prev"
                    >
                        <span className={cx('carousel-control-prev-icon')} aria-hidden="true"></span>
                        <span className={cx('visually-hidden')}>Previous</span>
                    </button>
                    <button
                        className={cx('carousel-control-next')}
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide="next"
                    >
                        <span className={cx('carousel-control-next-icon')} aria-hidden="true"></span>
                        <span className={cx('visually-hidden')}>Next</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default CarouselContainer;
