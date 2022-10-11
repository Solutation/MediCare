import React, { useState, useEffect } from 'react';
import { getChannel, useChatContext } from 'stream-chat-react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './ChannelSearch.module.scss';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const ChannelSearch = () => {
    const [searchValue, setSearchValue] = useState();
    const [loading, setLoading] = useState(false);

    const getChannel = async (inputValue) => {
        try {
            setLoading(true);
            //TODO: fetch API
            setLoading(false);
        } catch (error) {
            setSearchValue('');
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setSearchValue(event.target.value);
        getChannel(event.target.value);
    };

    return (
        <div className={cx('wrapper')}>
            <button className={cx('search-icon')}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input
                type="text"
                placeholder="Tìm kiếm"
                className={cx('search_input')}
                onChange={handleSearch}
                value={searchValue}
            />
            {loading && <FontAwesomeIcon className={cx('loading-icon')} icon={faSpinner} />}
        </div>
    );
};

export default ChannelSearch;
