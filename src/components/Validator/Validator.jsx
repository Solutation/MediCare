import React, { useCallback, useEffect, useState, useContext } from 'react';
import classNames from 'classnames/bind';

import styles from './Validator.module.scss';
import { ValidatorContext } from '~/context/ValidatorContext';

const cx = classNames.bind(styles);

let messageError = '';

const Validator = ({
    target,
    name,
    isEmpty,
    isEmail,
    isSpace,
    isSize,
    isSpecialCharacter,
    isNumber,
    isCharacter,
    isPassword,
    isSubmit
}) => {
    const [message, setMessage] = useState('');
    const { check, setCheck, setSubmit } = useContext(ValidatorContext);

    const validate = useCallback(() => {
        if (target) {
            if (isEmpty) {
                if (target.value.trim() === '') {
                    messageError = name ? `${name} không được để trống` : 'Trường không được để trống';
                    setMessage(messageError);
                    setCheck(true);
                    return;
                }
            }
            if (isEmail) {
                // eslint-disable-next-line
                const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!regex.test(target.value)) {
                    messageError = 'Email không hợp lệ';
                    setMessage(messageError);
                    setCheck(true);
                    return;
                }
            }
            if (isSpace) {
                const regex = /^\S*$/;
                if (!regex.test(target.value)) {
                    messageError = name ? `${name} không được có ký tự trắng` : 'Trường không được có ký tự trắng';
                    setCheck(true);
                    setMessage(messageError);
                    return;
                }
            }
            if (isSize) {
                const { min, max } = isSize;
                if ((min && !max) || (!min && max)) {
                    if (min) {
                        if (target.value.length < min) {
                            messageError = name
                                ? `${name} phải chứa ít nhất ${min} ký tự`
                                : `Trường phải chứa ít nhất ${min} ký tự`;
                            setCheck(true);
                            setMessage(messageError);
                            return;
                        }
                    }
                    if (max) {
                        // prettier-ignore
                        if(target.value.length > max) {
                            messageError = name ? `${name} chỉ chứa tối đa ${max} ký tự` : `Trường chỉ chứa tối đa ${max} ký tự`;
                            setCheck(true);
                            setMessage(messageError);
                            return;
                        }
                    }
                }
                if (min && max) {
                    if (target.value.length < min || target.value.length > max) {
                        // prettier-ignore
                        messageError = name ? `${name} phải nằm giữa ${min} và ${max} ký tự` : `Trường phải nằm giữa ${min} và ${max} ký tự`;
                        setCheck(true);
                        setMessage(messageError);
                        return;
                    }
                }
            }
            if (isSpecialCharacter) {
                // eslint-disable-next-line
                const regex = /[`!@#$%&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                if (regex.test(target.value)) {
                    messageError = name
                        ? `${name} không được chứa ký tự đặc biệt`
                        : 'Trường không được chứa ký tự đặc biệt';
                    setCheck(true);
                    setMessage(messageError);
                    return;
                }
            }
            if (isNumber) {
                // eslint-disable-next-line
                const regex = /^\d+$/;
                if (!regex.test(target.value)) {
                    messageError = name ? `${name} chỉ được chứa số` : 'Trường chỉ được chứa số';
                    setCheck(true);
                    setMessage(messageError);
                    return;
                }
            }
            if (isCharacter) {
                // eslint-disable-next-line
                const regex = /^[a-zA-Z]+$/;
                if (!regex.test(target.value)) {
                    messageError = name ? `${name} chỉ được chứa chữ cái` : 'Trường chỉ được chứa chữ cái';
                    setCheck(true);
                    setMessage(messageError);
                    return;
                }
            }
            if (isPassword) {
                // eslint-disable-next-line
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/;
                if (!regex.test(target.value)) {
                    // prettier-ignore
                    messageError = 'Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ in hoa, 1 chữ số và 1 ký tự đặc biệt';
                    setCheck(true);
                    setMessage(messageError);
                    return;
                }
            }
            setCheck(false);
        }
        // eslint-disable-next-line
    }, [target, name, isEmpty, isEmail, isSize, isSpace, isSpecialCharacter, isNumber, isCharacter, isPassword]);

    const handleValidate = useCallback(() => {
        if (target) {
            target.onblur = () => {
                validate();
            };
            target.oninput = () => {
                setCheck(false);
            };
            if (isSubmit) {
                validate();
            }
        }
    }, [target, isSubmit]);

    useEffect(() => {
        handleValidate();
        //eslint-disable-next-line
    }, [target, isSubmit]);

    return <span className={cx('error_message')}>{check && message}</span>;
};

export default Validator;
