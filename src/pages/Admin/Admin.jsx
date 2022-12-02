import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

import styles from './Admin.module.scss';
import UserIcon from '~/assets/user.png';
import ConsultantIcon from '~/assets/doctor.png';
import CertificateIcon from '~/assets/certificate.png';
import RatingIcon from '~/assets/rating.png';
import SpecializeIcon from '~/assets/specialize.png';
import CategoryIcon from '~/assets/category.png';
import ArticleIcon from '~/assets/blog.png';
import ImageArticleIcon from '~/assets/imageArticle.png';
import PostIcon from '~/assets/post.png';
import ImagePostIcon from '~/assets/imagePost.png';
import ReactionIcon from '~/assets/reaction.png';
import { UserManagement } from './components/UserManagement';
import { ConsultantsManagement } from './components/ConsultantsManagement';
import { CertificateManagement } from './components/CertificateManagement';
import { RatingManagement } from './components/RatingManagement';
import { ConsultantCategoryManagement } from './components/ConsultantCategoryManagement';
import { CategoryManagement } from './components/CategoryManagement';
import { ArticleManagement } from './components/ArticleManagement';
import { ImageArticleManagement } from './components/ImageArticleManagement';
import { PostManagement } from './components/PostManagement';
import { ImagePostManagement } from './components/ImagePostManagement';
import { ReactionManagement } from './components/ReactionManagement';

const cx = classNames.bind(styles);

const Admin = () => {
    const [flag, setFlag] = useState(1);

    return (
        <>
            <div className={cx('admin_overllay')}></div>
            <div className={cx('container-fluid')}>
                <div className={cx('row')}>
                    <div className={cx('col-2', 'sidebar_wrapper')}>
                        <div className={cx('px-2')}>
                            <div className={cx('d-flex', 'align-items-center', 'mt-3')}>
                                <FontAwesomeIcon icon={faGear} className={cx('manager_icon')} />
                                <span className={cx('manager_text')}>Quản lý website</span>
                            </div>
                            <hr />
                            <div className={cx('d-flex', 'flex-column', 'py-3')}>
                                <div className={cx('d-flex', 'align-items-center', 'py-4')}>
                                    <img src={UserIcon} alt="" />
                                    <span
                                        className={cx('option_text', { primary: flag === 1 })}
                                        onClick={() => setFlag(1)}
                                    >
                                        Quản lý người dùng
                                    </span>
                                </div>
                                <div className={cx('d-flex', 'align-items-center', 'py-4')}>
                                    <img src={ConsultantIcon} alt="" />
                                    <span
                                        className={cx('option_text', { primary: flag === 2 })}
                                        onClick={() => setFlag(2)}
                                    >
                                        Quản lý chuyên gia
                                    </span>
                                </div>
                                <div className={cx('d-flex', 'align-items-center', 'py-4')}>
                                    <img src={CertificateIcon} alt="" />
                                    <span
                                        className={cx('option_text', { primary: flag === 3 })}
                                        onClick={() => setFlag(3)}
                                    >
                                        Quản lý chứng chỉ
                                    </span>
                                </div>
                                <div className={cx('d-flex', 'align-items-center', 'py-4')}>
                                    <img src={RatingIcon} alt="" />
                                    <span
                                        className={cx('option_text', { primary: flag === 4 })}
                                        onClick={() => setFlag(4)}
                                    >
                                        Quản lý đánh giá
                                    </span>
                                </div>
                                <div className={cx('d-flex', 'align-items-center', 'py-4')}>
                                    <img src={SpecializeIcon} alt="" />
                                    <span
                                        className={cx('option_text', { primary: flag === 5 })}
                                        onClick={() => setFlag(5)}
                                    >
                                        Quản lý chuyên môn chuyên gia
                                    </span>
                                </div>
                                <div className={cx('d-flex', 'align-items-center', 'py-4')}>
                                    <img src={CategoryIcon} alt="" />
                                    <span
                                        className={cx('option_text', { primary: flag === 6 })}
                                        onClick={() => setFlag(6)}
                                    >
                                        Quản lý chuyên mục
                                    </span>
                                </div>
                                <div className={cx('d-flex', 'align-items-center', 'py-4')}>
                                    <img src={ArticleIcon} alt="" />
                                    <span
                                        className={cx('option_text', { primary: flag === 7 })}
                                        onClick={() => setFlag(7)}
                                    >
                                        Quản lý bài viết
                                    </span>
                                </div>
                                <div className={cx('d-flex', 'align-items-center', 'py-4')}>
                                    <img src={ImageArticleIcon} alt="" />
                                    <span
                                        className={cx('option_text', { primary: flag === 8 })}
                                        onClick={() => setFlag(8)}
                                    >
                                        Quản lý ảnh bài viết
                                    </span>
                                </div>
                                <div className={cx('d-flex', 'align-items-center', 'py-4')}>
                                    <img src={PostIcon} alt="" />
                                    <span
                                        className={cx('option_text', { primary: flag === 9 })}
                                        onClick={() => setFlag(9)}
                                    >
                                        Quản lý bài đăng
                                    </span>
                                </div>
                                <div className={cx('d-flex', 'align-items-center', 'py-4')}>
                                    <img src={ImagePostIcon} alt="" />
                                    <span
                                        className={cx('option_text', { primary: flag === 10 })}
                                        onClick={() => setFlag(10)}
                                    >
                                        Quản lý ảnh bài đăng
                                    </span>
                                </div>
                                <div className={cx('d-flex', 'align-items-center', 'py-4')}>
                                    <img src={ReactionIcon} alt="" />
                                    <span
                                        className={cx('option_text', { primary: flag === 11 })}
                                        onClick={() => setFlag(11)}
                                    >
                                        Quản lý phản ứng bài đăng
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-10')}>
                        <div className={cx('manager_body_wrapper')}>
                            {flag === 1 && <UserManagement />}
                            {flag === 2 && <ConsultantsManagement />}
                            {flag === 3 && <CertificateManagement />}
                            {flag === 4 && <RatingManagement />}
                            {flag === 5 && <ConsultantCategoryManagement />}
                            {flag === 6 && <CategoryManagement />}
                            {flag === 7 && <ArticleManagement />}
                            {flag === 8 && <ImageArticleManagement />}
                            {flag === 9 && <PostManagement />}
                            {flag === 10 && <ImagePostManagement />}
                            {flag === 11 && <ReactionManagement />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
