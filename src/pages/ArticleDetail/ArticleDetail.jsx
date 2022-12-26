import React from 'react';
import classNames from 'classnames/bind';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { CarouselContainer } from './components/CarouselContainer';
import { SidebarContainer } from './components/SidebarContainer';
import { Navigator } from '~/components/Navigator';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { httpRequest, handleDateResponse } from '~/utils';

import styles from './ArticleDetail.module.scss';
import './ArticleDetail.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const ArticleDetail = () => {
    const { t } = useTranslation('article');
    const [article, setArticle] = useState();
    const [articleRelated, setArticleRelated] = useState();
    const [consultantRelated, setConsultantRelated] = useState();
    const [pageItem, setPageItem] = useState([]);
    const [searchParams] = useSearchParams();
    const articleId = searchParams.get('articleId');

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: { article, articleRelated, consultantRelated }
            } = await httpRequest.get(`/article/detail/${articleId}`, { cancelToken: cancelToken.token });
            setArticle(article);
            setArticleRelated(articleRelated);
            setConsultantRelated(consultantRelated);
        };
        fetchAPI();

        return () => {
            cancelToken.cancel();
        };
    }, [articleId]);

    useEffect(() => {
        if (article) {
            const pageItem = [
                { id: 1, name: t('category'), to: `/categories` },
                { id: 2, name: article[0].category_name, to: `/article?categoryId=${article[0].category_id}` },
                { id: 3, name: article[0].title, to: '' }
            ];
            setPageItem(pageItem);
        }
    }, [article, t]);

    return (
        <>
            {article && articleRelated && consultantRelated && (
                <>
                    <Navigator title={t('news')} page={pageItem} bgPrimaryBold />
                    <div className={cx('page-wrapper', 'flex-wrap')}>
                        <div className={cx('row', 'd-flex')}>
                            <div className={cx('col-lg-8', 'article-content')}>
                                <div className={cx('leftside-wrapper')}>
                                    <div className={cx('article-wrapper')}>
                                        <h1 className={cx('article-title')}>{article[0].title}</h1>
                                        <div className={cx('article-time')}>
                                            <FontAwesomeIcon icon={faClock} className={cx('date-icon')} />
                                            {handleDateResponse(article[0].created_date)}
                                        </div>
                                        <img
                                            src={article[0].image_article}
                                            alt="Anh"
                                            className={cx('article-image')}
                                        ></img>
                                        <div className={cx('content')}>{article[0].content}</div>
                                        <div
                                            className={cx('author')}
                                        >{`${article[0].first_name} ${article[0].last_name}`}</div>
                                    </div>
                                    <CarouselContainer consultantRelated={consultantRelated} />
                                </div>
                            </div>
                            <div className={cx('col-lg-4', 'side-content')}>
                                <SidebarContainer articleRelated={articleRelated} article={article} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ArticleDetail;
