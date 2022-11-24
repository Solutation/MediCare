import React from 'react';
import classNames from 'classnames/bind';
import { Navigator } from '~/components/Navigator';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from './components/Pagination';

import styles from './ArticleList.module.scss';

const cx = classNames.bind(styles);

const ArticleList = () => {
    const { t } = useTranslation('articlelist');

    const pageItem = [
        { id: 1, name: t('category'), to: '' },
        { id: 2, name: t('news'), to: '' }
    ];

    return (
        <>
            <Navigator title={t('news')} page={pageItem} bgPrimaryBold />
            <div className={cx('wrapper')}>
                <div className={cx('header', 'd-flex', 'justify-content-center')}>
                    <img src={require('~/assets/category1.png')} alt="Anh" className={cx('category-img')}></img>
                    <h3 className={cx('category')}>Sức khỏe răng miệng</h3>
                </div>
                <div className={cx('separate', 'mx-auto')}></div>
                <div className={cx('description', 'text-center')}>
                    Khoang miệng chúng ta chứa đầy vi khuẩn và chúng thường vô hại. Việc không chăm sóc răng miệng đúng
                    cách có thể khiến vi khuẩn tăng sinh mất kiểm soát, dẫn đến các bệnh về răng miệng. Hãy tìm hiểu
                    cách cải thiện sức khỏe răng miệng và bảo vệ bản thân chống lại các bệnh khác ngay bây giờ.
                </div>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('list-wrapper', 'd-flex', 'flex-wrap')}>
                            <div className={cx('col-4', 'list-item')}>
                                <Link to="">
                                    <div className={cx('article-wrapper')}>
                                        <img
                                            src={require('~/assets/article1.jpg')}
                                            alt="Anh"
                                            className={cx('article-img')}
                                        ></img>
                                        <div className={cx('article-content')}>
                                            <h3 className={cx('article-title')}>Các bác sĩ giải thích về cuồng dâm</h3>
                                            <div className={cx('article-description')}>
                                                TTO - Nhiều người nghĩ rằng cuồng dâm là do suy đồi đạo đức nhưng đây là
                                                biểu hiện của bệnh rối loạn tâm thần hoặc do gene. Bên cạnh đó, có thể
                                                do tác dụng phụ của một số loại thuốc, sử dụng chất hoặc là biểu hiện
                                                của bệnh lý sa sút trí tuệ.
                                            </div>
                                            <div className={cx('article-datetime')}>
                                                <FontAwesomeIcon icon={faClock} className={cx('date-icon')} />
                                                <span className={cx('px-3')}>August 8, 2022</span>
                                            </div>
                                            <div className={cx('more', 'd-flex')}>
                                                <div className={cx('more-detail')}>Xem thêm</div>
                                                <FontAwesomeIcon icon={faChevronRight} className={cx('arrow-icon')} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={cx('col-4', 'list-item')}>
                                <Link to="">
                                    <div className={cx('article-wrapper')}>
                                        <img
                                            src={require('~/assets/article1.jpg')}
                                            alt="Anh"
                                            className={cx('article-img')}
                                        ></img>
                                        <div className={cx('article-content')}>
                                            <h3 className={cx('article-title')}>Các bác sĩ giải thích về cuồng dâm</h3>
                                            <div className={cx('article-description')}>
                                                TTO - Nhiều người nghĩ rằng cuồng dâm là do suy đồi đạo đức nhưng đây là
                                                biểu hiện của bệnh rối loạn tâm thần hoặc do gene. Bên cạnh đó, có thể
                                                do tác dụng phụ của một số loại thuốc, sử dụng chất hoặc là biểu hiện
                                                của bệnh lý sa sút trí tuệ.
                                            </div>
                                            <div className={cx('article-datetime')}>
                                                <FontAwesomeIcon icon={faClock} className={cx('date-icon')} />
                                                <span className={cx('px-3')}>August 8, 2022</span>
                                            </div>
                                            <div className={cx('more', 'd-flex')}>
                                                <div className={cx('more-detail')}>Xem thêm</div>
                                                <FontAwesomeIcon icon={faChevronRight} className={cx('arrow-icon')} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={cx('col-4', 'list-item')}>
                                <Link to="">
                                    <div className={cx('article-wrapper')}>
                                        <img
                                            src={require('~/assets/article1.jpg')}
                                            alt="Anh"
                                            className={cx('article-img')}
                                        ></img>
                                        <div className={cx('article-content')}>
                                            <h3 className={cx('article-title')}>Các bác sĩ giải thích về cuồng dâm</h3>
                                            <div className={cx('article-description')}>
                                                TTO - Nhiều người nghĩ rằng cuồng dâm là do suy đồi đạo đức nhưng đây là
                                                biểu hiện của bệnh rối loạn tâm thần hoặc do gene. Bên cạnh đó, có thể
                                                do tác dụng phụ của một số loại thuốc, sử dụng chất hoặc là biểu hiện
                                                của bệnh lý sa sút trí tuệ.
                                            </div>
                                            <div className={cx('article-datetime')}>
                                                <FontAwesomeIcon icon={faClock} className={cx('date-icon')} />
                                                <span className={cx('px-3')}>August 8, 2022</span>
                                            </div>
                                            <div className={cx('more', 'd-flex')}>
                                                <div className={cx('more-detail')}>Xem thêm</div>
                                                <FontAwesomeIcon icon={faChevronRight} className={cx('arrow-icon')} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={cx('col-4', 'list-item')}>
                                <Link to="">
                                    <div className={cx('article-wrapper')}>
                                        <img
                                            src={require('~/assets/article1.jpg')}
                                            alt="Anh"
                                            className={cx('article-img')}
                                        ></img>
                                        <div className={cx('article-content')}>
                                            <h3 className={cx('article-title')}>Các bác sĩ giải thích về cuồng dâm</h3>
                                            <div className={cx('article-description')}>
                                                TTO - Nhiều người nghĩ rằng cuồng dâm là do suy đồi đạo đức nhưng đây là
                                                biểu hiện của bệnh rối loạn tâm thần hoặc do gene. Bên cạnh đó, có thể
                                                do tác dụng phụ của một số loại thuốc, sử dụng chất hoặc là biểu hiện
                                                của bệnh lý sa sút trí tuệ.
                                            </div>
                                            <div className={cx('article-datetime')}>
                                                <FontAwesomeIcon icon={faClock} className={cx('date-icon')} />
                                                <span className={cx('px-3')}>August 8, 2022</span>
                                            </div>
                                            <div className={cx('more', 'd-flex')}>
                                                <div className={cx('more-detail')}>Xem thêm</div>
                                                <FontAwesomeIcon icon={faChevronRight} className={cx('arrow-icon')} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={cx('col-4', 'list-item')}>
                                <Link to="">
                                    <div className={cx('article-wrapper')}>
                                        <img
                                            src={require('~/assets/article1.jpg')}
                                            alt="Anh"
                                            className={cx('article-img')}
                                        ></img>
                                        <div className={cx('article-content')}>
                                            <h3 className={cx('article-title')}>Các bác sĩ giải thích về cuồng dâm</h3>
                                            <div className={cx('article-description')}>
                                                TTO - Nhiều người nghĩ rằng cuồng dâm là do suy đồi đạo đức nhưng đây là
                                                biểu hiện của bệnh rối loạn tâm thần hoặc do gene. Bên cạnh đó, có thể
                                                do tác dụng phụ của một số loại thuốc, sử dụng chất hoặc là biểu hiện
                                                của bệnh lý sa sút trí tuệ.
                                            </div>
                                            <div className={cx('article-datetime')}>
                                                <FontAwesomeIcon icon={faClock} className={cx('date-icon')} />
                                                <span className={cx('px-3')}>August 8, 2022</span>
                                            </div>
                                            <div className={cx('more', 'd-flex')}>
                                                <div className={cx('more-detail')}>Xem thêm</div>
                                                <FontAwesomeIcon icon={faChevronRight} className={cx('arrow-icon')} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={cx('col-4', 'list-item')}>
                                <Link to="">
                                    <div className={cx('article-wrapper')}>
                                        <img
                                            src={require('~/assets/article1.jpg')}
                                            alt="Anh"
                                            className={cx('article-img')}
                                        ></img>
                                        <div className={cx('article-content')}>
                                            <h3 className={cx('article-title')}>Các bác sĩ giải thích về cuồng dâm</h3>
                                            <div className={cx('article-description')}>
                                                TTO - Nhiều người nghĩ rằng cuồng dâm là do suy đồi đạo đức nhưng đây là
                                                biểu hiện của bệnh rối loạn tâm thần hoặc do gene. Bên cạnh đó, có thể
                                                do tác dụng phụ của một số loại thuốc, sử dụng chất hoặc là biểu hiện
                                                của bệnh lý sa sút trí tuệ.
                                            </div>
                                            <div className={cx('article-datetime')}>
                                                <FontAwesomeIcon icon={faClock} className={cx('date-icon')} />
                                                <span className={cx('px-3')}>August 8, 2022</span>
                                            </div>
                                            <div className={cx('more', 'd-flex')}>
                                                <div className={cx('more-detail')}>Xem thêm</div>
                                                <FontAwesomeIcon icon={faChevronRight} className={cx('arrow-icon')} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <Pagination></Pagination>
                </div>
            </div>
        </>
    );
};

export default ArticleList;
