import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { useTranslation } from 'react-i18next';
import { handleDateResponse } from '~/utils';

import styles from './SidebarContainer.module.scss';
const cx = classNames.bind(styles);

const SidebarContainer = ({ article, articleRelated }) => {
    const { t } = useTranslation('article');
    const navigate = useNavigate();

    return (
        <>
            <div className={cx('news-list', 'd-block')}>
                <div className={cx('block-heading')}>
                    <h3 className={cx('primary', 'mt-2', 'sidebar-title', 'text-capitalize')}>{t('related-news')}</h3>
                </div>
                {articleRelated.map((articleRelatedItem) => (
                    <div className={cx('news-wrapper')}>
                        <div
                            className={cx('news', 'd-flex')}
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigate(`/news?articleId=${articleRelatedItem.id}`)}
                        >
                            <div className={cx('image-wrapper')}>
                                <img
                                    src={articleRelatedItem.image_article}
                                    alt="Anh"
                                    className={cx('news-image')}
                                ></img>
                            </div>
                            <div className={cx('news-info', 'flex-wrap')}>
                                <div className={cx('news-title')}>{articleRelatedItem.title}</div>
                                <div className={cx('news-datetime')}>
                                    <FontAwesomeIcon icon={faClock} className={cx('disease-date-icon')} />
                                    <span className={cx('px-3')}>
                                        {handleDateResponse(articleRelatedItem.created_date)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx('tags', 'd-block')}>
                <div className={cx('block-heading')}>
                    <h3 className={cx('primary', 'mt-4', 'sidebar-title', 'text-capitalize')}>{t('tags')}</h3>
                </div>
                <ul className={cx('tag-list')}>
                    <li>
                        <div
                            className={cx('tag_item')}
                            onClick={() => navigate(`/article?categoryId=${article[0].category_id}`)}
                        >
                            {article[0].category_name}
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default SidebarContainer;
