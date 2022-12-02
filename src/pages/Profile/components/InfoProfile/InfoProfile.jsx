import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import { ProfileContext } from '~/context/ProfileContext';

import styles from './InfoProfile.module.scss';
import { handleDateResponse } from '~/utils';

const cx = classNames.bind(styles);

const InfoProfile = () => {
    const { patientInfoProfile } = useContext(ProfileContext);

    return (
        <>
            <div className={cx('col-10', 'wrapper')}>
                <div className={cx('px-3', 'h-100')}>
                    <h2 className={cx('text-black', 'fw-bold', 'mt-3')}>Hồ sơ của tôi</h2>
                    <span className={cx('text-black', 'py-2', 'd-block')}>
                        Quản lý thông tin hồ sơ để bảo mật tài khoản
                    </span>
                    <hr />
                    <form className={cx('px-2')}>
                        <div className={cx('row')}>
                            <div className={cx('col-8', 'd-flex', 'align-items-center')} style={{ padding: '1.6rem' }}>
                                <div className={cx('d-flex', 'flex-column')}>
                                    <span className={cx('form_label')}>Họ lót</span>
                                    <span className={cx('form_label')}>Tên</span>
                                    <span className={cx('form_label')}>Email</span>
                                    <span className={cx('form_label')}>Ngày sinh</span>
                                    <span className={cx('form_label')}>Địa chỉ</span>
                                    <span className={cx('form_label')}>Số điện thoại</span>
                                </div>
                                <div className={cx('d-flex', 'flex-column', 'px-5')}>
                                    <span className={cx('form_info')}>{patientInfoProfile.first_name}</span>
                                    <span className={cx('form_info')}>{patientInfoProfile.last_name}</span>
                                    <span className={cx('form_info')}>{patientInfoProfile.email}</span>
                                    <span className={cx('form_info')}>
                                        {handleDateResponse(patientInfoProfile.birth_day)}
                                    </span>
                                    <span className={cx('form_info')}>{patientInfoProfile.address}</span>
                                    <span className={cx('form_info')}>{patientInfoProfile.phone_number}</span>
                                </div>
                            </div>
                            <div className={cx('col-4', 'right_section')}>
                                <div
                                    className={cx(
                                        'd-flex',
                                        'justify-content-center',
                                        'align-items-center',
                                        'w-100',
                                        'h-100',
                                        'flex-column',
                                        'px-2'
                                    )}
                                >
                                    <img src={patientInfoProfile.avatar} alt="" className={cx('avatar')} />
                                    <span
                                        className={cx('text-black')}
                                        style={{ fontSize: '1.6rem', marginTop: '1.4rem' }}
                                    >
                                        Ảnh của bạn
                                    </span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default InfoProfile;
