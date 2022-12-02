import React, { useState, useContext } from 'react';
import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import ProfileIcon from '~/assets/profile.png';
import KeyIcon from '~/assets/key.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { InfoProfile } from './components/InfoProfile';
import { EditInfoProfile } from './components/EditInfoProfile';
import { ChangePassword } from './components/ChangePassword';
import { ProfileProvider } from '~/context/ProfileContext';
import { ProfileContext } from '~/context/ProfileContext';

const cx = classNames.bind(styles);

const Sidebar = ({ flagState, setFlagState }) => {
    const { patientInfoProfile } = useContext(ProfileContext);

    return (
        <div className={cx('d-flex', 'flex-column', 'col-2', 'justify-content-start')}>
            <div className={cx('d-flex', 'align-items-center')}>
                <img src={patientInfoProfile.avatar} alt="" className={cx('sidebar_avatar')} />
                <div className={cx('px-4', 'd-flex', 'flex-column')}>
                    <span
                        className={cx('sidebar_username')}
                    >{`${patientInfoProfile.first_name} ${patientInfoProfile.last_name}`}</span>
                    <div className={cx('d-flex', 'h-100', 'align-items-center')}>
                        <FontAwesomeIcon icon={faPen} className={cx('edit_icon')} />
                        <span
                            className={cx('edit_text')}
                            onClick={() => {
                                setFlagState(2);
                            }}
                        >
                            Sửa hồ sơ
                        </span>
                    </div>
                </div>
            </div>
            <div className={cx('d-flex', 'flex-column')} style={{ marginTop: '3rem' }}>
                <div className={cx('d-flex', 'h-100', 'align-items-center')}>
                    <img src={ProfileIcon} alt="" />
                    <span
                        className={cx('text-black', 'px-4', 'sidebar_text', { primary: flagState === 1 })}
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => {
                            setFlagState(1);
                        }}
                    >
                        Hồ sơ
                    </span>
                </div>
                <div className={cx('d-flex', 'h-100', 'align-items-center')} style={{ marginTop: '2.6rem' }}>
                    <img src={KeyIcon} alt="" />
                    <span
                        className={cx('text-black', 'px-4', 'sidebar_text', { primary: flagState === 3 })}
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => {
                            setFlagState(3);
                        }}
                    >
                        Đổi mật khẩu
                    </span>
                </div>
            </div>
        </div>
    );
};

const Profile = () => {
    const [flagState, setFlagState] = useState(1);

    return (
        <ProfileProvider>
            <div style={{ height: '80vh' }}>
                <div className={cx('container')} style={{ marginTop: '12rem' }}>
                    <div className={cx('overllay')}></div>
                    <div className={cx('row', { height: flagState === 2, heightPassword: flagState === 3 })}>
                        <Sidebar flagState={flagState} setFlagState={setFlagState} />
                        {flagState === 1 && <InfoProfile />}
                        {flagState === 2 && <EditInfoProfile setFlagState={setFlagState} />}
                        {flagState === 3 && <ChangePassword />}
                    </div>
                </div>
            </div>
        </ProfileProvider>
    );
};

export default Profile;
