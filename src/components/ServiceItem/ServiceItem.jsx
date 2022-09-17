import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ServiceItem.module.scss';

const cx = classNames.bind(styles);

function ServiceItem({ data, className }) {
    return (
        <>
            {data &&
                data.map((info) =>
                    info.separate ? (
                        <Link to="" key={info.id} className={cx('wrapper', 'separate', { [className]: className })}>
                            <img src={info.image} alt="" />
                            <span className={cx('service-info')}>{info.name}</span>
                        </Link>
                    ) : (
                        <Link to="" key={info.id} className={cx('wrapper', { [className]: className })}>
                            <img src={info.image} alt="" />
                            <span className={cx('service-info')}>{info.name}</span>
                        </Link>
                    ),
                )}
        </>
    );
}

export default ServiceItem;
