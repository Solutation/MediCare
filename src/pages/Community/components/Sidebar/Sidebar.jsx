import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EyesIcon from '~/assets/eyes.png';
import HeartIcon from '~/assets/heart.png';
import MentalIcon from '~/assets/mental-health.png';
import SportIcon from '~/assets/fitness.png';
import TeethIcon from '~/assets/teeth.png';
import CancerIcon from '~/assets/cancer.png';
import ListIcon from '~/assets/list.png';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchApi = () => {
            const data = [
                { id: 1, name: 'Tất cả chuyên mục', icon: ListIcon },
                { id: 2, name: 'Mắt', icon: EyesIcon },
                { id: 3, name: 'Tim', icon: HeartIcon },
                { id: 4, name: 'Tâm lý - Tâm thần', icon: MentalIcon },
                { id: 5, name: 'Thể dục thể thao', icon: SportIcon },
                { id: 6, name: 'Sức khỏe răng miệng', icon: TeethIcon },
                { id: 7, name: 'Ung thư', icon: CancerIcon }
            ];
            setCategory(data);
        };
        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('d-flex', 'align-items-center', 'w-100', 'title_wrapper')}>
                <FontAwesomeIcon icon={faNewspaper} className={cx('title_icon')} />
                <span className={cx('title_text')}>Chuyên mục</span>
            </div>
            {category.length >= 1 &&
                category.map((categoryItem) => (
                    <div
                        className={cx('d-flex', 'align-items-center', 'w-100', 'py-4', 'category_wrapper')}
                        key={categoryItem.id}
                    >
                        <img src={categoryItem.icon} alt="" className={cx('px-2')} />
                        <span className={cx('text-black', 'fs-4', 'fw-bold', 'px-4')}>{categoryItem.name}</span>
                    </div>
                ))}
        </div>
    );
};

export default Sidebar;
