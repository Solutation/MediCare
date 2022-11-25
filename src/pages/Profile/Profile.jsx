import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import CharlotteIcon from '~/assets/charlotte.jpg';
import ProfileIcon from '~/assets/profile.png';
import KeyIcon from '~/assets/key.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { InfoProfile } from './components/InfoProfile';
import { EditInfoProfile } from './components/EditInfoProfile';
import { ChangePassword } from './components/ChangePassword';

const cx = classNames.bind(styles);

const Sidebar = ({ setEdit, setProfile, profile, edit, setPassword, password }) => {
    return (
        <div className={cx('d-flex', 'flex-column', 'col-2', 'justify-content-start')}>
            <div className={cx('d-flex', 'align-items-center')}>
                <img src={CharlotteIcon} alt="" className={cx('sidebar_avatar')} />
                <div className={cx('px-4', 'd-flex', 'flex-column')}>
                    <span className={cx('sidebar_username')}>Lâm Khương Trí</span>
                    <div className={cx('d-flex', 'h-100', 'align-items-center')}>
                        <FontAwesomeIcon icon={faPen} className={cx('edit_icon')} />
                        <span
                            className={cx('edit_text')}
                            onClick={() => {
                                setEdit(true);
                                setProfile(false);
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
                        className={cx('text-black', 'px-4', 'sidebar_text', { primary: profile || edit })}
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => {
                            setProfile(true);
                            setEdit(false);
                            setPassword(false);
                        }}
                    >
                        Hồ sơ
                    </span>
                </div>
                <div className={cx('d-flex', 'h-100', 'align-items-center')} style={{ marginTop: '2.6rem' }}>
                    <img src={KeyIcon} alt="" />
                    <span
                        className={cx('text-black', 'px-4', 'sidebar_text', { primary: password })}
                        style={{ fontSize: '1.6rem' }}
                        onClick={() => {
                            setEdit(false);
                            setProfile(false);
                            setPassword(true);
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
    const [edit, setEdit] = useState(false);
    const [profile, setProfile] = useState(true);
    const [password, setPassword] = useState(false);

    return (
        <div style={{ height: '80vh' }}>
            <div className={cx('container')} style={{ marginTop: '12rem' }}>
                <div className={cx('overllay')}></div>
                <div className={cx('row', { height: edit, heightPassword: password })}>
                    <Sidebar
                        setEdit={setEdit}
                        setProfile={setProfile}
                        profile={profile}
                        edit={edit}
                        password={password}
                        setPassword={setPassword}
                    />
                    {profile && <InfoProfile />}
                    {edit && <EditInfoProfile />}
                    {password && <ChangePassword />}
                </div>
            </div>
        </div>
    );
};

export default Profile;
