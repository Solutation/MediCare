import React, { memo } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faChevronRight, faHouseMedical } from '@fortawesome/free-solid-svg-icons';
import './Navigator.scss';

import styles from './Navigator.module.scss';

const cx = classNames.bind(styles);

const Navigator = ({ title, page, bgPrimaryBold = false, className, ...passProps }) => {
    const classes = cx('wrapper', {
        [className]: className,
        wrapper: true,
        bgPrimaryBold
    });

    const prop = {
        ...passProps
    };

    const pageList = page ? page : [];

    return (
        <section className={classes} {...prop}>
            <div className={cx('d-sm-block', 'item-wrapper', 'text-center')}>
                <h1 className={cx('title', 'text-uppercase')}>{title ? title : 'Chưa có title'}</h1>
                <div className={cx('navigator-wrapper')}>
                    <Link to="/">
                        <FontAwesomeIcon icon={faHouseMedical} className={cx('home-icon')} />
                    </Link>
                    <FontAwesomeIcon icon={faChevronRight} className={cx('arrow-icon')} />
                    {pageList.length >= 1 &&
                        pageList.map((pageItem, index) => (
                            <div
                                className={cx('d-flex', 'align-items-center', 'justify-content-center')}
                                key={pageItem.id}
                            >
                                <Link
                                    to={pageItem.to}
                                    className={cx('navigator-item', 'text-capitalize', {
                                        white: index === pageList.length - 1,
                                        cursor_default: index === pageList.length - 1
                                    })}
                                >
                                    {pageItem.name}
                                </Link>
                                {index !== pageList.length - 1 && (
                                    <FontAwesomeIcon icon={faChevronRight} className={cx('white', 'arrow-icon')} />
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default memo(Navigator);
