import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './ServiceItem.module.scss';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ServiceItem() {
    return (
        <Link to="" className={cx('wrapper')}>
            <FontAwesomeIcon icon="fa-solid fa-phone" />
            <span className={cx('service-info')}>Liên hệ tư vấn</span>
        </Link>
    );
}

export default ServiceItem;
