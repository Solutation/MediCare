import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './DiseaseItem.module.scss';

const cx = classNames.bind(styles);

const DiseaseItem = ({ data }) => {
    return (
        <>
            {data.length > 0 &&
                data.map((info) => (
                    <Link to="" className={cx('wrapper')} key={info.id}>
                        <img
                            src={require(`src/assets/${info.image}`)}
                            className={cx('disease-image')}
                            alt="Anh"
                        />
                        <div className={cx('disease-info')}>
                            <h4 className={cx('disease-name')}>
                                <span className={cx('disease-title')}>{info.title}</span>
                            </h4>
                            <span className={cx('disease-description')}>
                                {info.description.slice(0, 70) + '..'}
                            </span>
                        </div>
                    </Link>
                ))}
        </>
    );
};

export default DiseaseItem;
