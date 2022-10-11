import React, { useEffect, useContext, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Register.module.scss';
import { Button } from '~/components/Button';
import { SlideContext } from '~/context/SlideContext';
import { httpRequest } from '~/utils';

const cx = classNames.bind(styles);

const initialState = {
    first_name: '',
    last_name: '',
    email: '',
    pass_word: '',
    address: '',
    birth_day: '',
    phone_number: '',
    avatar: ''
};

const Register = () => {
    const [form, setForm] = useState(initialState);
    const { slide, setSlide } = useContext(SlideContext);
    const navigate = useNavigate();

    useEffect(() => {
        setSlide(true);
        // eslint-disable-next-line
    }, [slide]);

    const handleValueChange = (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0];
            if (file) setForm((prevForm) => ({ ...prevForm, [e.target.name]: file.name }));
            else alert('Không tìm thấy file!');
        } else setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // prettier-ignore
        const { data: { message } } = await httpRequest.post('/signup', form);
        alert(message);
        navigate('/login');
    };

    return (
        <form action="" className={cx('form_wrapper', 'col-6')} onSubmit={handleSubmit}>
            <h1 className={cx('form-title', 'display-4', 'fw-bold')}>Register</h1>
            <div className={cx('row', 'form_inner_wrapper')}>
                <div className={cx('form-group', 'col-6')}>
                    <label htmlFor="first_name" className={cx('form-label', 'text-muted', 'ps-2', 'fs-3')}>
                        Họ lót
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className={cx('form-control', 'fs-3', 'form-input')}
                        placeholder="Nhập họ lót của bạn"
                        onChange={handleValueChange}
                    />
                </div>
                <div className={cx('form-group', 'col-6')}>
                    <label htmlFor="last_name" className={cx('form-label', 'text-muted', 'ps-2', 'fs-3')}>
                        Tên
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className={cx('form-control', 'fs-3', 'form-input')}
                        placeholder="Nhập tên của bạn"
                        onChange={handleValueChange}
                    />
                </div>
                <div className={cx('form-group', 'col-6', 'py-2')}>
                    <label htmlFor="email" className={cx('form-label', 'pt-2', 'text-muted', 'ps-2', 'fs-3')}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={cx('form-control', 'fs-3', 'form-input')}
                        placeholder="Nhập email của bạn"
                        onChange={handleValueChange}
                    />
                </div>
                <div className={cx('form-group', 'col-6', 'py-2')}>
                    <label htmlFor="pass_word" className={cx('form-label', 'pt-2', 'text-muted', 'ps-2', 'fs-3')}>
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        id="pass_word"
                        name="pass_word"
                        className={cx('form-control', 'fs-3', 'form-input')}
                        placeholder="Nhập mật khẩu của bạn"
                        onChange={handleValueChange}
                    />
                </div>
                <div className={cx('form-group', 'col-12', 'py-2')}>
                    <label htmlFor="address" className={cx('form-label', 'pt-2', 'text-muted', 'ps-2', 'fs-3')}>
                        Địa chỉ
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className={cx('form-control', 'fs-3', 'form-input')}
                        placeholder="Nhập địa chỉ của bạn"
                        onChange={handleValueChange}
                    />
                </div>
                <div className={cx('form-group', 'col-6', 'py-2')}>
                    <label htmlFor="birth_day" className={cx('form-label', 'pt-2', 'text-muted', 'ps-2', 'fs-3')}>
                        Ngày sinh
                    </label>
                    <input
                        type="date"
                        id="birth_day"
                        name="birth_day"
                        className={cx('form-control', 'fs-3', 'form-input-date', 'text-muted')}
                        placeholder="Nhập ngày sinh của bạn"
                        onChange={handleValueChange}
                    />
                </div>
                <div className={cx('form-group', 'col-6', 'py-2')}>
                    <label htmlFor="phone_number" className={cx('form-label', 'pt-2', 'text-muted', 'ps-2', 'fs-3')}>
                        Số điện thoại
                    </label>
                    <input
                        type="text"
                        id="phone_number"
                        name="phone_number"
                        className={cx('form-control', 'fs-3', 'form-input', 'text-muted')}
                        placeholder="Nhập số điện thoại của bạn"
                        onChange={handleValueChange}
                    />
                </div>
                <div>
                    <label htmlFor="avatar" className={cx('form-label', 'pt-2', 'text-muted', 'ps-2', 'fs-3')}>
                        Ảnh
                    </label>
                    <div className={cx('input-group', 'col-12', 'py-1')}>
                        <input
                            className={cx('form-control', 'fs-3', 'form-input', 'file_wrapper')}
                            type="file"
                            id="avatar"
                            name="avatar"
                            onChange={handleValueChange}
                        />
                    </div>
                </div>
                <Button rounded warning className={cx('custom-btn', 'fs-3', 'mt-5')} type="submit">
                    Đăng ký
                </Button>
                <p className={cx('py-3', 'text-center')}>
                    Đã có tài khoản?
                    <Link to="/login" className={cx('form-text-register', 'ms-2')}>
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default Register;
