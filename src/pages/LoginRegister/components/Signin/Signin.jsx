import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import styles from './Signin.module.scss';
import { Button } from '~/components/Button';
import { SlideContext } from '~/context/SlideContext';
import { httpRequest } from '~/utils';

const cx = classNames.bind(styles);
const cookies = new Cookies();

const initialValues = {
    email: '',
    pass_word: ''
};

const Signin = () => {
    const { slide } = useContext(SlideContext);
    const [formData, setFormData] = useState(initialValues);
    const navigate = useNavigate();

    const handleValueChange = async (e) => {
        setFormData((prevFormData) => ({ ...prevFormData, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: userData } = await httpRequest.post('/login', formData);
            cookies.set('chatToken', userData.chatToken);
            cookies.set('userId', userData.userId);
            navigate('/');
        } catch ({
            response: {
                data: { message }
            }
        }) {
            //alert(message);
        }
    };

    return (
        <form action="" className={cx('form_wrapper', 'col-6', { slideUp: slide === true })} onSubmit={handleSubmit}>
            <h1 className={cx('form-title', 'display-4', 'fw-bold')}>Login</h1>
            <div className={cx('form_inner_wrapper')}>
                <div className={cx('form-group', 'py-2', 'mt-5')}>
                    <label htmlFor="email" className={cx('form-label', 'py-2', 'text-muted', 'fs-3')}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={cx('form-control', 'py-3', 'fs-3', 'form-input')}
                        placeholder="Nhập email của bạn"
                        onChange={handleValueChange}
                    />
                </div>
                <div className={cx('form-group', 'py-2')}>
                    <label htmlFor="pass_word" className={cx('form-label', 'py-2', 'text-muted', 'fs-3')}>
                        Mật khẩu
                    </label>
                    <input
                        type="password"
                        id="pass_word"
                        name="pass_word"
                        className={cx('form-control', 'py-3', 'fs-3', 'form-input')}
                        placeholder="Nhập mật khẩu của bạn"
                        onChange={handleValueChange}
                    />
                </div>
                <div className={cx('d-flex', 'password-save-wrapper', 'py-4', 'justify-content-between')}>
                    <div className={cx('d-flex', 'align-items-center')}>
                        <input type="checkbox" className={cx('form-check')} />
                        <label htmlFor="" className={cx('ms-2', 'text-muted', 'fs-3')}>
                            Lưu mật khẩu
                        </label>
                    </div>
                    <Link to="" className={cx('form-forget-password', 'fs-3')}>
                        Quên mật khẩu?
                    </Link>
                </div>

                <Button rounded warning className={cx('custom-btn', 'fs-3')} type="submit">
                    Đăng nhập
                </Button>
                <p className={cx('py-3', 'text-center')}>
                    Chưa có tài khoản?
                    <Link to="/register" className={cx('form-text-register', 'ms-2')}>
                        Đăng ký
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default Signin;
