import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import { Navigator } from '~/components/Navigator';
import { httpRequest, handleDateResponse } from '~/utils';
import { getTotalPageList } from '~/utils/PaginationUtils';

import styles from './ArticleList.module.scss';

const cx = classNames.bind(styles);

const ArticleList = () => {
    const { t } = useTranslation('articlelist');
    const [category, setCategory] = useState();
    const [article, setArticle] = useState();
    const [totalPagesResult, setTotalPagesResult] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [searchParams] = useSearchParams();
    const [pageItem, setPateItem] = useState();
    const categoryId = searchParams.get('categoryId');
    const navigate = useNavigate();

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: {
                    data: { categoryInfo, articleList },
                    totalPages
                }
            } = await httpRequest.get(
                '/article/list',
                {
                    params: { categoryId, pageSize: 6, pageNumber }
                },
                { cancelToken: cancelToken.token }
            );
            const pageItem = [
                { id: 1, name: t('category'), to: '/categories' },
                { id: 2, name: categoryInfo.name, to: '' }
            ];
            setPateItem(pageItem);
            setCategory(categoryInfo);
            setArticle(articleList);
            setTotalPagesResult(getTotalPageList(totalPages));
        };
        fetchAPI();

        return () => {
            cancelToken.cancel();
        };
        //eslint-disable-next-line
    }, [pageNumber, categoryId]);

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
            {category && article && totalPagesResult && pageItem && (
                <>
                    <Navigator title={t('news')} page={pageItem} bgPrimaryBold />
                    <div className={cx('wrapper')}>
                        <div className={cx('header', 'd-flex', 'justify-content-center')}>
                            <img src={category.image} alt="Anh" className={cx('category-img')}></img>
                            <h3 className={cx('category')}>{category.name}</h3>
                        </div>
                        <div className={cx('separate', 'mx-auto')}></div>
                        <div className={cx('description', 'text-center')}>{category.descriptions}</div>
                        <div className={cx('row')}>
                            <div className={cx('list-wrapper', 'd-flex', 'flex-wrap')}>
                                {article.map((articleItem) => {
                                    return (
                                        <div className={cx('col-4', 'list-item')} key={articleItem.id}>
                                            <div
                                                style={{ cursor: 'pointer', height: '100%' }}
                                                onClick={() => navigate(`/news?articleId=${articleItem.id}`)}
                                            >
                                                <div className={cx('article-wrapper')}>
                                                    <img
                                                        src={articleItem.image_article}
                                                        alt="Anh"
                                                        className={cx('article-img')}
                                                    ></img>
                                                    <div className={cx('article-content')}>
                                                        <h3 className={cx('article-title')}>{articleItem.title}</h3>
                                                        <div className={cx('article-description')}>
                                                            {articleItem.content}
                                                        </div>
                                                        <div className={cx('article-datetime')}>
                                                            <FontAwesomeIcon
                                                                icon={faClock}
                                                                className={cx('date-icon')}
                                                            />
                                                            <span className={cx('px-3')}>
                                                                {handleDateResponse(articleItem.created_date)}
                                                            </span>
                                                        </div>
                                                        <div className={cx('more', 'd-flex')}>
                                                            <div className={cx('more-detail')}>Xem thêm</div>
                                                            <FontAwesomeIcon
                                                                icon={faChevronRight}
                                                                className={cx('arrow-icon')}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div className={cx('d-flex', 'justify-content-end', 'w-100', 'me-4')}>
                                    <div className={cx('btn_pagination_wrapper', 'h-100')}>
                                        <button
                                            type="button"
                                            className={cx('btn_pagination', { btnDisabled: pageNumber === 1 })}
                                            onClick={handlePrevious}
                                        >
                                            Previous
                                        </button>
                                        {totalPagesResult.map((pageIndex, index) => (
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
                                                btnDisabled: pageNumber === totalPagesResult.length
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

export default ArticleList;
