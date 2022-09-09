import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { DiseaseItem } from '~/components/DiseaseItem';

const cx = classNames.bind(styles);

function Search() {
    const [showResult, setShowResult] = useState(false);
    const [searchValue, setSearchValue] = useState();
    const [searchResult, setSearchResult] = useState();

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleSearchValue = (e) => {
        let searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

    return (
        <>
            <HeadlessTippy
                interactive={true}
                visible
                render={(attrs) => (
                    <div className={cx('search-result')}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Bệnh</h4>
                            <DiseaseItem />
                            <DiseaseItem />
                            <DiseaseItem />
                            <DiseaseItem />
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        type="text"
                        placeholder="Search"
                        className={cx('search-input')}
                        onChange={(e) => handleSearchValue(e)}
                    />
                    <button className={cx('clear-icon')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                    <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                    <button className={cx('search-icon')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        </>
    );
}

export default Search;
