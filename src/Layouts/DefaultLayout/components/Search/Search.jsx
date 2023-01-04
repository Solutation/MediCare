import React, { useState, useEffect, useRef, memo } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import { useTranslation } from 'react-i18next';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { DiseaseItem } from '~/components/DiseaseItem';
import { checkSearch } from '~/utils/checkSearch';
import { httpRequest } from '~/utils';

const cx = classNames.bind(styles);

const Search = () => {
    const [showResult, setShowResult] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tippyInstance, setTippyInstance] = useState();
    const inputRef = useRef();
    const { t } = useTranslation('header');

    useEffect(() => {
        if (searchValue.trim() === '') {
            setSearchResult([]);
            return;
        }
        setLoading(true);
        //call API
        setTimeout(() => {
            const fetchAPI = async () => {
                const categoryId = checkSearch(searchValue);
                const {
                    data: { articleData }
                } = await httpRequest.get('/article/search', { params: { categoryId, pageSize: 5, pageNumber: 1 } });
                setSearchResult(articleData);
                setLoading(false);
            };
            fetchAPI();
        }, 3);

        //eslint-disable-next-line
    }, [searchValue]);

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleSearchValue = (e) => {
        setSearchValue(e.target.value);
    };

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    return (
        <>
            <HeadlessTippy
                interactive={true}
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Bệnh</h4>
                            <DiseaseItem
                                data={searchResult}
                                tippyInstance={tippyInstance}
                                setSearchValue={setSearchValue}
                            />
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
                onShow={(instance) => setTippyInstance(instance)}
            >
                <div className={cx('search', 'd-none', 'd-lg-block')}>
                    <input
                        type="text"
                        placeholder={t('searchHeader')}
                        className={cx('search-input')}
                        onChange={(e) => handleSearchValue(e)}
                        onFocus={() => setShowResult(true)}
                        value={searchValue}
                        ref={inputRef}
                    />
                    {searchValue.trim() && !loading && (
                        <button className={cx('clear-icon')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                    {loading && <FontAwesomeIcon className={cx('loading-icon')} icon={faSpinner} />}
                    <button className={cx('search-icon')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </HeadlessTippy>
        </>
    );
};

export default memo(Search);
