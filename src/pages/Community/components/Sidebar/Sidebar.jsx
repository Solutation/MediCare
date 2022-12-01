import React, { useState, useEffect, useRef, useContext } from 'react';
import classNames from 'classnames/bind';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import { httpRequest } from '~/utils';
import { CommunityContext } from '~/context/CommunityContext';

import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

const Sidebar = () => {
    const [category, setCategory] = useState([]);
    const { categoryId, setCategoryId } = useContext(CommunityContext);
    const sidebarRef = useRef();

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchApi = async () => {
            const {
                data: { categoryList }
            } = await httpRequest.get('/category/list/all', { cancelToken: cancelToken.token });
            setCategory(categoryList);
        };
        fetchApi();

        return () => {
            cancelToken.cancel();
        };
    }, []);

    const handleCategoryClick = (categoryId) => {
        setCategoryId(categoryId);
    };

    return (
        <div className={cx('wrapper')} ref={sidebarRef}>
            <div className={cx('d-flex', 'align-items-center', 'w-100', 'title_wrapper')}>
                <FontAwesomeIcon icon={faNewspaper} className={cx('title_icon')} />
                <span className={cx('title_text')}>Chuyên mục</span>
            </div>
            {category.length >= 1 &&
                category.map((categoryItem) => (
                    <div
                        className={cx('d-flex', 'align-items-center', 'w-100', 'py-3', 'category_wrapper', {
                            bgGray: categoryId === categoryItem.id
                        })}
                        key={categoryItem.id}
                        onClick={() => handleCategoryClick(categoryItem.id)}
                    >
                        <img src={categoryItem.image} alt="" className={cx('px-2', 'category_image')} />
                        <span className={cx('text-black', 'fs-4', 'fw-bold', 'px-4')}>{categoryItem.name}</span>
                    </div>
                ))}
        </div>
    );
};

export default Sidebar;
