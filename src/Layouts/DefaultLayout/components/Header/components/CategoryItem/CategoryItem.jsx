import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import styles from './CategoryItem.module.scss';
import { Button } from '~/components/Button';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CategoryImage1 from '~/assets/categoryItem1.jpg';
import CategoryImage2 from '~/assets/categoryItem2.jpg';
import CategoryImage3 from '~/assets/CategoryItem3.png';
import CategoryImage4 from '~/assets/disease1.jpg';
import { httpRequest } from '~/utils';

const cx = classNames.bind(styles);

const CategoryItem = ({ setPopupCategory, setCategoryPrimary, setHideCategory, hideCategory }) => {
    const { t } = useTranslation('header');
    const popupRef = useRef();
    const [categoryList, setCategoryList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setCategoryPrimary(false);
                setPopupCategory(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        //eslint-disable-next-line
    }, [popupRef]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            try {
                const {
                    data: { categoryList }
                } = await httpRequest.get('/category/header/list', { cancelToken: cancelToken.token });
                setCategoryList(categoryList);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAPI();

        return () => {
            cancelToken.cancel();
        };
    }, []);

    const handleCategoryClick = (categoryId) => {
        navigate(`/article?categoryId=${categoryId}`);
        setCategoryPrimary(false);
        setHideCategory(true);
    };

    return (
        <div className={cx('wrapper', { hide: hideCategory })} ref={popupRef}>
            <div className={cx('wrapper_inner')}>
                <div className={cx('row')}>
                    <div className={cx('col-4', 'left_section')}>
                        <div className={cx('d-flex', 'flex-column', 'px-4')} style={{ position: 'relative' }}>
                            <h2 className={cx('category_title')}>{t('categoryPopupTitle')}</h2>
                            {categoryList.length >= 1 &&
                                categoryList.map((categoryItem) => (
                                    <div
                                        className={cx('d-flex', 'align-items-center', 'py-3', 'category_item_wrapper')}
                                        key={categoryItem.id}
                                    >
                                        <img src={categoryItem.image} alt="" className={cx('category_image')} />
                                        <span
                                            className={cx('category_text')}
                                            onClick={() => handleCategoryClick(categoryItem.id)}
                                        >
                                            {categoryItem.name}
                                        </span>
                                    </div>
                                ))}
                            <div className={cx('py-1', 'mt-3')}>
                                <Button
                                    rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
                                    outline
                                    rounded
                                    to="/categories"
                                    onClick={() => {
                                        setHideCategory(true);
                                        setCategoryPrimary(false);
                                    }}
                                >
                                    {t('categoryPopupBtn')}
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-8', 'px-2')}>
                        <div className={cx('d-flex', 'flex-column', 'px-3')}>
                            <h2 className={cx('right_section_title')}>{t('categoryFeatureTitle')}</h2>
                            <div className={cx('d-flex', 'align-items-center', 'py-2', 'image_wrapper')}>
                                <img src={CategoryImage1} alt="" className={cx('category_item_image')} />
                                <img src={CategoryImage2} alt="" className={cx('category_item_image')} />
                                <img src={CategoryImage3} alt="" className={cx('category_item_image1')} />
                                <img src={CategoryImage4} alt="" className={cx('category_item_image1')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryItem;
