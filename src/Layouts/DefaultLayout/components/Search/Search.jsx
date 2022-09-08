import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Search() {
    return (
        <>
            <div className={cx('search')}>
                <input type="text" placeholder="Search" className={cx('search-input')} />
                <button className={cx('clear-icon')}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
                <button className={cx('search-icon')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </>
    );
}

export default Search;
