import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { Navigator } from '~/components/Navigator';
import { httpRequest } from '~/utils';
import { getTotalPageList } from '~/utils/PaginationUtils';

import styles from './Categories.module.scss';

const cx = classNames.bind(styles);

const Categories = () => {
    const { t } = useTranslation('categories');
    const [categoryList, setCategoryList] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const pageItem = [{ id: 1, name: t('categories'), to: '' }];
    const navigate = useNavigate();

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            try {
                const {
                    data: {
                        data: { categoryList },
                        totalPages
                    }
                } = await httpRequest.get(
                    '/category/list',
                    { params: { pageSize: 8, pageNumber } },
                    {
                        cancelToken: cancelToken.token
                    }
                );
                setCategoryList(categoryList);
                setTotalPages(getTotalPageList(totalPages));
            } catch (err) {
                console.log(err);
            }
        };
        fetchAPI();
        return () => {
            cancelToken.cancel();
        };
    }, [pageNumber]);

    const handleClickPagination = (pageIndex) => {
        setPageNumber(pageIndex);
    };

    const handlePrevious = () => {
        setPageNumber((prevPageNumber) => prevPageNumber - 1);
    };

    const handleNext = () => {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
    };

    return (
        <>
            {categoryList && totalPages && (
                <>
                    <Navigator title={t('categories')} page={pageItem} bgPrimaryBold />
                    <div className={cx('categories-wrapper')}>
                        <div className={cx('categories-header')}>
                            <h3 className={cx('header', 'text-center')}>{t('title')}</h3>
                        </div>
                        <div className={cx('row')}>
                            <div className={cx('categories-wrapper', 'd-flex', 'flex-wrap')}>
                                {categoryList.map((categoryItem) => (
                                    <div className={cx('col-3', 'category-item')} key={categoryItem.id}>
                                        <div
                                            onClick={() => navigate(`/article?categoryId=${categoryItem.id}`)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className={cx('category-wrapper')}>
                                                <img
                                                    src={categoryItem.image}
                                                    alt="Anh"
                                                    className={cx('category-img')}
                                                ></img>
                                                <h3 className={cx('category-content')}>{categoryItem.name}</h3>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className={cx('d-flex', 'justify-content-end', 'w-100', 'me-4')}>
                                    <div className={cx('btn_pagination_wrapper', 'h-100')}>
                                        <button
                                            type="button"
                                            className={cx('btn_pagination', { btnDisabled: pageNumber === 1 })}
                                            onClick={handlePrevious}
                                        >
                                            Previous
                                        </button>
                                        {totalPages.map((pageIndex, index) => (
                                            <button
                                                type="button"
                                                className={cx('btn_pagination', {
                                                    paginationFocus: pageIndex === pageNumber
                                                })}
                                                key={index}
                                                onClick={() => handleClickPagination(pageIndex)}
                                            >
                                                {pageIndex}
                                            </button>
                                        ))}
                                        <button
                                            type="button"
                                            className={cx('btn_pagination', {
                                                btnDisabled: pageNumber === totalPages.length
                                            })}
                                            onClick={handleNext}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Categories;
