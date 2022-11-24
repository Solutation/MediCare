import React from 'react';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './RateDoctors.module.scss';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
const cx = classNames.bind(styles);
function RateDocTors() {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={show} className={cx('modal--content-1')}>
                <Modal.Body className={cx('modal--body', 'abcd')}>
                    <div className={cx('modal-form')}>
                        <div className={cx('div-content')}>
                            <div className={cx('div-img')}>
                                <img src={require('../../assets/doctor2.jpg')} alt="" />
                            </div>
                            <div className={cx('div-doctor')}>
                                <h2>Lâm Đăng Khoa</h2>
                            </div>
                            <div className={cx('div-formdanhgia')}>
                                <h5>Bình chọn Ngôi sao ở đây :</h5>
                                <form action="">
                                    <textarea
                                        class={cx('input-rate')}
                                        placeholder="Đánh giá cho chuyên gia này..."
                                        name=""
                                        id=""
                                        cols="30"
                                        rows="4"
                                    ></textarea>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={cx('modal---footer')}>
                    <Button className={cx('btn-hdg')} onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button className={cx('btn-hdg')}>Đánh giá</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default RateDocTors;
