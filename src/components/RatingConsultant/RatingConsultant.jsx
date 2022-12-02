import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './RatingConsultant.module.scss';
import { Rating } from '~/components/Rating';
import { Button } from '../Button';
import SadIcon from '~/assets/sad.png';
import SmileIcon from '~/assets/smile.png';
import { Alert } from '../Alert';
import { httpRequest } from '~/utils';

const cx = classNames.bind(styles);

const RatingConsultant = ({ setPopupRating, image, patientId, consultantId }) => {
    const [score, setScore] = useState();
    const [content, setContent] = useState();
    const [iconState, setIconState] = useState(0);
    const [messageResult, setMessageResult] = useState('');
    const [alertPopup, setAlertPopup] = useState(false);

    const handleRating = (ratingValue) => {
        setScore(ratingValue);
    };

    const handleChangeContent = (e) => {
        setContent(e.target.value);
    };

    const handleCancelRating = () => {
        setPopupRating(false);
    };

    const handleSubmitRating = async () => {
        try {
            const {
                data: { message }
            } = await httpRequest.post('/consultant/rating', null, {
                params: { patientId, consultantId, score, content }
            });
            setMessageResult(message);
            setIconState(1);
            setAlertPopup(true);
        } catch ({ response }) {
            setMessageResult(response.data.message);
            setIconState(2);
            setAlertPopup(true);
        }
    };

    return (
        <>
            <div className={cx('blur')}>
                <div className={cx('blur_overllay')}></div>
                <div className={cx('wrapper')}>
                    <div className={cx('py-3')}>
                        <img src={image} alt="" className={cx('doctor_image')} />
                    </div>
                    <span className={cx('rating_feeling_text')}>Bạn thấy chuyên gia này như thế nào?</span>
                    <span className={cx('rating_text')}>Vui lòng chọn ngôi sao ở phía dưới để đánh giá</span>
                    <div className={cx('rating_wrapper')}>
                        <Rating handleRating={handleRating} value={score} />
                    </div>
                    <div className={cx('w-100', 'rating_input_wrapper')}>
                        <textarea
                            className={cx('rating_input')}
                            placeholder="Nội dung đánh giá (không bắt buộc)"
                            type="text"
                            rows="4"
                            onInput={handleChangeContent}
                        ></textarea>
                    </div>
                    <div className={cx('cancel_wrapper')}>
                        <div style={{ marginRight: '3.4rem', padding: '1.2rem 0' }}>
                            <Button primary style={{ marginRight: '2rem' }} onClick={handleSubmitRating}>
                                Đánh giá
                            </Button>
                        </div>
                        <div onClick={handleCancelRating} style={{ padding: '1.2rem 0' }}>
                            <Button secondary>Hủy đánh giá</Button>
                        </div>
                    </div>
                </div>
            </div>
            {alertPopup && iconState === 1 && (
                <Alert
                    iconImage={SmileIcon}
                    content={messageResult}
                    setAlertPopup={setAlertPopup}
                    setPopupRating={setPopupRating}
                />
            )}
            {alertPopup && iconState === 2 && (
                <Alert
                    iconImage={SadIcon}
                    content={messageResult}
                    setAlertPopup={setAlertPopup}
                    setPopupRating={setPopupRating}
                />
            )}
        </>
    );
};

export default RatingConsultant;
