import React, { useContext, memo, useCallback } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import styles from './CustomChannelList.module.scss';
import { CustomChannelPreview } from '../CustomChannelPreview';
import { ChannelSearchContext } from '~/context/ChannelSearchContext';

const cx = classNames.bind(styles);

const ChannelSearch = () => {
    const { channelSearchValue, setChannelSearchValue } = useContext(ChannelSearchContext);

    const handleSearch = (e) => {
        setChannelSearchValue(e.target.value);
    };

    const handleClear = () => {
        setChannelSearchValue('');
    };

    return (
        <div className={cx('search_wrapper')}>
            <button className={cx('search-icon')}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input
                type="text"
                placeholder="Tìm kiếm"
                className={cx('search_input')}
                onInput={handleSearch}
                value={channelSearchValue}
            />
            {channelSearchValue.trim() && (
                <button className={cx('clear-icon')} onClick={handleClear}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            )}
        </div>
    );
};

const LoadingText = () => (
    <div className={cx('d-flex', 'justify-content-between', 'align-items-center', 'text-white', 'px-2')}>
        <span>Đang tải kênh ...</span>
        <FontAwesomeIcon className={cx('loading-icon')} icon={faSpinner} />
    </div>
);

const CustomChannelList = ({ loading, children }) => {
    const PreCustomChannelPreview = useCallback(() => {
        return <CustomChannelPreview />;
    }, []);

    return (
        <div className={cx('channel_list_wrapper')}>
            <h1 className={cx('text-white', 'fs-1', 'pt-5', 'text-center', 'fw-bold')}>Medicare Contact</h1>
            <ChannelSearch />
            <div className={cx('list_separate')}></div>
            {loading ? <LoadingText /> : <PreCustomChannelPreview />}
        </div>
    );
};

export default memo(CustomChannelList);
