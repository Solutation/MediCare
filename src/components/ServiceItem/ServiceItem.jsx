import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ServiceItem.module.scss';

const cx = classNames.bind(styles);

const serviceItem = [
    { id: 1, image: `${require('~/assets/call.png')}`, name: 'Liên hệ tư vấn', to: '/contact' },
    {
        id: 2,
        image: `${require('~/assets/hospital.png')}`,
        name: 'Tìm bệnh viện',
        separate: true,
        to: ''
    },
    {
        id: 3,
        image: `${require('~/assets/news.png')}`,
        name: 'Xem tin tức bệnh',
        separate: true,
        to: ''
    },
    {
        id: 4,
        image: `${require('~/assets/community.png')}`,
        name: 'Cộng đồng',
        separate: true,
        to: '/community'
    }
];

const ServiceItem = ({ className }) => {
    return (
        <>
            {serviceItem.map((info) =>
                info.separate ? (
                    <Link to={info.to} key={info.id} className={cx('wrapper', 'separate', { [className]: className })}>
                        <img src={info.image} alt="" />
                        <span className={cx('service-info')}>{info.name}</span>
                    </Link>
                ) : (
                    <Link to={info.to} key={info.id} className={cx('wrapper', { [className]: className })}>
                        <img src={info.image} alt="" />
                        <span className={cx('service-info')}>{info.name}</span>
                    </Link>
                )
            )}
        </>
    );
};

export default ServiceItem;
