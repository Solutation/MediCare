import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';

import styles from './Admin.module.scss';
import UserIcon from '~/assets/user.png';
import ConsultantIcon from '~/assets/doctor.png';
import RatingIcon from '~/assets/rating.png';
import CategoryIcon from '~/assets/category.png';
import ArticleIcon from '~/assets/blog.png';
import CommunityIcon from '~/assets/communityAdmin.png';
import { UserManagement } from './components/UserManagement';
import { ConsultantsManagement } from './components/ConsultantsManagement';
import { RatingManagement } from './components/RatingManagement';
import { CategoryManagement } from './components/CategoryManagement';
import { ArticleManagement } from './components/ArticleManagement';
import { CommunityManagement } from './components/CommunityManagement';
import { Alert } from '~/components/Alert';
import SmileIcon from '~/assets/smile.png';
import { AdminLogin } from '../AdminLogin';
import { HeaderAdmin } from '~/Layouts/AdminLayout/components/HeaderAdmin';

const cx = classNames.bind(styles);

const cookies = new Cookies();

const Admin = () => {
    const [flag, setFlag] = useState(1);
    const [checkAccess, setCheckAccess] = useState(false);
    const adminAccessInfo = cookies.get('adminAccess');
    const [loginAlert, setLoginAlert] = useState(false);

    useEffect(() => {
        if (adminAccessInfo) setCheckAccess(true);
        else setCheckAccess(false);
    }, [adminAccessInfo]);

    return (
        <>
            {checkAccess ? (
                <>
                    <HeaderAdmin setCheckAccess={setCheckAccess} />
                    <div className={cx('admin_overllay')}></div>
                    <div className={cx('container-fluid')}>
                        <div className={cx('row')}>
                            <div className={cx('col-2', 'sidebar_wrapper')}>
                                <div className={cx('px-2')}>
                                    <div
                                        className={cx('d-flex', 'align-items-center', 'mt-3')}
                                        style={{ paddingBottom: '3.7px' }}
                                    >
                                        <FontAwesomeIcon icon={faGear} className={cx('manager_icon')} />
                                        <span className={cx('manager_text')}>Quản lý website</span>
                                    </div>
                                    <hr />
                                    <div className={cx('d-flex', 'flex-column', 'py-3')}>
                                        <div className={cx('d-flex', 'align-items-center', 'py-5')}>
                                            <img src={UserIcon} alt="" />
                                            <span
                                                className={cx('option_text', { primary: flag === 1 })}
                                                onClick={() => setFlag(1)}
                                            >
                                                Quản lý bệnh nhân
                                            </span>
                                        </div>
                                        <div className={cx('d-flex', 'align-items-center', 'py-5')}>
                                            <img src={ConsultantIcon} alt="" />
                                            <span
                                                className={cx('option_text', { primary: flag === 2 })}
                                                onClick={() => setFlag(2)}
                                            >
                                                Quản lý chuyên gia
                                            </span>
                                        </div>
                                        <div className={cx('d-flex', 'align-items-center', 'py-5')}>
                                            <img src={RatingIcon} alt="" />
                                            <span
                                                className={cx('option_text', { primary: flag === 3 })}
                                                onClick={() => setFlag(3)}
                                            >
                                                Quản lý đánh giá
                                            </span>
                                        </div>
                                        <div className={cx('d-flex', 'align-items-center', 'py-5')}>
                                            <img src={CategoryIcon} alt="" />
                                            <span
                                                className={cx('option_text', { primary: flag === 4 })}
                                                onClick={() => setFlag(4)}
                                            >
                                                Quản lý chuyên mục
                                            </span>
                                        </div>
                                        <div className={cx('d-flex', 'align-items-center', 'py-5')}>
                                            <img src={ArticleIcon} alt="" />
                                            <span
                                                className={cx('option_text', { primary: flag === 5 })}
                                                onClick={() => setFlag(5)}
                                            >
                                                Quản lý bài viết
                                            </span>
                                        </div>
                                        <div className={cx('d-flex', 'align-items-center', 'py-5')}>
                                            <img src={CommunityIcon} alt="" />
                                            <span
                                                className={cx('option_text', { primary: flag === 6 })}
                                                onClick={() => setFlag(6)}
                                            >
                                                Quản lý cộng đồng
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-10')}>
                                <div className={cx('manager_body_wrapper')}>
                                    {flag === 1 && <UserManagement />}
                                    {flag === 2 && <ConsultantsManagement />}
                                    {flag === 3 && <RatingManagement />}
                                    {flag === 4 && <CategoryManagement />}
                                    {flag === 5 && <ArticleManagement />}
                                    {flag === 6 && <CommunityManagement />}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <AdminLogin setLoginAlert={setLoginAlert} />
            )}
            {loginAlert && <Alert iconImage={SmileIcon} content="Đăng nhập thành công" setAlertPopup={setLoginAlert} />}
        </>
    );
};

export default Admin;
