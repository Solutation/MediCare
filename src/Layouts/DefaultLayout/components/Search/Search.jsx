import React, { useState, useEffect, useRef, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './Search.module.scss';
import classNames from 'classnames/bind';
import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { DiseaseItem } from '~/components/DiseaseItem';
import { useDebounce } from '~/hooks';
const cx = classNames.bind(styles);

const Search = () => {
    const [showResult, setShowResult] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef();

    const debounceValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (searchValue.trim() === '') {
            setSearchResult([]);
            return;
        }

        //call API
        const fetchAPI = () => {
            setLoading(true);
            const result = [
                {
                    id: 1,
                    title: 'Bệnh về mắt',
                    description:
                        'Mắt là một trong những cơ quan cảm giác phát triển nhất trong cơ thể. Ta phụ thuộc vào thị lực để có' +
                        'thể thực hiện hầu hết các hoạt động hàng ngày. Vì vậy, việc duy trì sức khỏe đôi mắt tốt là điều cần' +
                        'được ưu tiên',
                    image: 'waifu.jpg'
                },
                {
                    id: 2,
                    title: 'Bệnh về dạ dày',
                    description:
                        'Mắt là một trong những cơ quan cảm giác phát triển nhất trong cơ thể. Ta phụ thuộc vào thị lực để có' +
                        'thể thực hiện hầu hết các hoạt động hàng ngày. Vì vậy, việc duy trì sức khỏe đôi mắt tốt là điều cần' +
                        'được ưu tiên',
                    image: 'waifu.jpg'
                },
                {
                    id: 3,
                    title: 'Bệnh về tim',
                    description:
                        'Mắt là một trong những cơ quan cảm giác phát triển nhất trong cơ thể. Ta phụ thuộc vào thị lực để có' +
                        'thể thực hiện hầu hết các hoạt động hàng ngày. Vì vậy, việc duy trì sức khỏe đôi mắt tốt là điều cần' +
                        'được ưu tiên',
                    image: 'waifu.jpg'
                }
            ];
            setSearchResult(result);
            setLoading(false);
        };
        fetchAPI();
    }, [debounceValue]);

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
                            <DiseaseItem data={searchResult} />
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
