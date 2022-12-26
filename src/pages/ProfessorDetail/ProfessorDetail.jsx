import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faContactBook } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

import { Navigator } from '~/components/Navigator';
import { Button } from '~/components/Button';
import styles from './ProfessorDetail.module.scss';
import { httpRequest } from '~/utils';
import { Alert } from '~/components/Alert';
import SadIcon from '~/assets/sad.png';
import { store } from '~/redux';
import { getConsultantContactId } from '~/redux/action';
import './ProfessorDetail.scss';

const cx = classNames.bind(styles);

const cookies = new Cookies();

const ProfessorDetail = () => {
    const { t } = useTranslation('professor');
    const [consultantInfo, setConsultantInfo] = useState();
    const [alertPopup, setAlertPopup] = useState(false);
    const [searchParams] = useSearchParams();
    const consultantId = searchParams.get('consultantId');
    const userInfo = cookies.get('userAccess');
    const navigate = useNavigate();

    const pageItem = [
        { id: 1, name: t('professor'), to: '/consultant/list' },
        { id: 2, name: t('detail'), to: '' }
    ];

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const { data: consultantInfo } = await httpRequest.get(`/consultant/detail/${consultantId}`);
            setConsultantInfo(consultantInfo);
        };
        fetchAPI();

        return () => {
            cancelToken.cancel();
        };
    }, [consultantId]);

    const handleContactClick = async (consultantId) => {
        if (!userInfo) {
            setAlertPopup(true);
            return;
        }
        store.dispatch(getConsultantContactId(consultantId));
        navigate('/contact');
    };

    return (
        <>
            {consultantInfo && (
                <>
                    <Navigator title={consultantInfo.fullName} page={pageItem} bgPrimaryBold />
                    <div className={cx('row', 'd-flex', 'page-wrapper')}>
                        <div className={cx('col-12', 'col-sm-8', 'col-md-8', 'col-lg-8')}>
                            <h1 className={cx('biography')}>{t('biography')}</h1>
                            <p>{consultantInfo.descriptions}</p>
                            <div className={cx('more-info')}>
                                <ul className={cx('insurance-list')}>
                                    <li>
                                        <b>Email:</b>
                                        <span>{consultantInfo.email}</span>
                                    </li>
                                    <li>
                                        <b>{t('phone')}:</b>
                                        <span>{consultantInfo.phone_number}</span>
                                    </li>
                                    <li>
                                        <b>{t('score')}:</b>
                                        <span>{consultantInfo.average_score}</span>
                                    </li>
                                    <li>
                                        <b>{t('certification')}:</b> <span>{consultantInfo.certificate_name}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={cx('col-12', 'col-sm-4', 'col-md-4', 'col-lg-4')}>
                            <div className={cx('sidebar-wrapper')}>
                                <img src={consultantInfo.avatar} alt="Anh" className={cx('professor-image')}></img>
                                <div className={cx('mt-2')} onClick={() => handleContactClick(consultantInfo.id)}>
                                    <Button
                                        className={cx('contact-btn')}
                                        primary
                                        leftIcon={<FontAwesomeIcon icon={faContactBook} />}
                                    >
                                        {t('contact')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {alertPopup && (
                        <Alert
                            iconImage={SadIcon}
                            content="Bạn phải đăng nhập mới được sử dụng tính năng này"
                            setAlertPopup={setAlertPopup}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default ProfessorDetail;
