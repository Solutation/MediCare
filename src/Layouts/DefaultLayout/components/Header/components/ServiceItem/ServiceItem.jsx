import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import styles from './ServiceItem.module.scss';
import { Button } from '~/components/Button';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ToolsIcon from '~/assets/tools.png';
import HospitalIcon from '~/assets/login-hospital.png';
import ToolIcon1 from '~/assets/tool1.jpg';
import ToolIcon2 from '~/assets/tool2.jpg';
import ToolIcon3 from '~/assets/tool3.jpg';
import ToolIcon4 from '~/assets/tool4.jpg';
import ToolIcon5 from '~/assets/tool5.jpg';
import ToolIcon6 from '~/assets/tool6.jpg';

const cx = classNames.bind(styles);

const ServiceItem = ({ setPopupService, setServicePrimary, hideService, setHideService }) => {
    const { t } = useTranslation('header');
    const [serviceList, setServiceList] = useState([]);
    const popupRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const serviceList = [
            { id: 1, name: `${t('toolItemName1')}`, image: ToolIcon1, type: 'ovulation' },
            { id: 2, name: `${t('toolItemName2')}`, image: ToolIcon2, type: 'ovulation' },
            { id: 3, name: `${t('toolItemName3')}`, image: ToolIcon3, type: 'bmr' },
            { id: 4, name: `${t('toolItemName4')}`, image: ToolIcon4, type: 'bmr' },
            { id: 5, name: `${t('toolItemName5')}`, image: ToolIcon5, type: 'bmr' },
            { id: 6, name: `${t('toolItemName6')}`, image: ToolIcon6, type: 'bmr' }
        ];
        setServiceList(serviceList);
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setServicePrimary(false);
                setPopupService(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        //eslint-disable-next-line
    }, [popupRef]);

    const handleToolClick = () => {
        setHideService(true);
        setServicePrimary(false);
    };

    return (
        <div className={cx('wrapper', { hide: hideService })} ref={popupRef}>
            <div className={cx('wrapper_inner')}>
                <div className={cx('row')} style={{ height: '100%' }}>
                    <div className={cx('col-4', 'left_section')}>
                        <div className={cx('d-flex', 'flex-column', 'px-5')} style={{ position: 'relative' }}>
                            <h2 className={cx('service_title')}>{t('service')}</h2>
                            <div className={cx('d-flex', 'align-items-center', 'py-4', 'service_item_wrapper', 'mb-5')}>
                                <img src={ToolsIcon} alt="" className={cx('service_image')} />
                                <span className={cx('service_text', 'primary')}>{t('healthy_tool')}</span>
                            </div>
                            <div className={cx('d-flex', 'align-items-center', 'py-4', 'service_item_wrapper')}>
                                <img src={HospitalIcon} alt="" className={cx('service_image')} />
                                <span className={cx('service_text')}>{t('findingHospital')}</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-8', 'px-2')}>
                        <h2 className={cx('right_section_title')}>{t('toolItemTitle')}</h2>
                        <div className={cx('d-flex', 'flex-column', 'px-3', 'align-items-center')}>
                            <div className={cx('d-flex', 'w-100', 'align-items-center', 'flex-wrap', 'mt-5')}>
                                {serviceList.length >= 1 &&
                                    serviceList.map((serviceItem) => (
                                        <div className={cx('col-4', 'py-3', 'mb-5')} key={serviceItem.id}>
                                            <img src={serviceItem.image} alt="" className={cx('tool_image')} />
                                            <span
                                                className={cx('tool_text')}
                                                onClick={() => {
                                                    navigate(`/tools/calculator?type=${serviceItem.type}`);
                                                    setHideService(true);
                                                    setServicePrimary(false);
                                                }}
                                            >
                                                {serviceItem.name}
                                            </span>
                                        </div>
                                    ))}
                                <div onClick={handleToolClick}>
                                    <Button
                                        rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
                                        outline
                                        rounded
                                        to="/tools"
                                    >
                                        Xem tất cả công cụ
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceItem;
