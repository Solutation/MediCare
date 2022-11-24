import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './HealthyItem.module.scss';
const cx = classNames.bind(styles);

const HealthyItem = ({ className }) => {
    return (
        <>
            <section className={cx('wr')}>
                <div className={cx('container')}>
                    <div className={cx('row', 'pd')}>
                        <div className={cx('col-4', 'left-cc')}>
                            <h3>Công cụ sức khỏe</h3>
                            <div className={cx('list-cc')}>
                                <div className={cx('item-heart')}>
                                    <img src={require('../../assets/heartitem.png')} alt="" />
                                    <Link to="">
                                        <span>Công cụ đo nhịp tim</span>
                                    </Link>
                                </div>
                                <div className={cx('item-heart')}>
                                    <img src={require('../../assets/mental-health.png')} alt="" />
                                    <Link to="">
                                        <span>Công cụ đo chỉ số BMI</span>
                                    </Link>
                                </div>
                                <div className={cx('item-heart')}>
                                    <img src={require('../../assets/cancer.png')} alt="" />
                                    <Link to="">
                                        <span>Công cụ đo chỉ số BMR</span>
                                    </Link>
                                </div>
                                <div className={cx('item-heart')}>
                                    <img src={require('../../assets/eyes.png')} alt="" />
                                    <Link to="">
                                        <span>Tính kỳ kinh nguyệt</span>
                                    </Link>
                                </div>
                                <div className={cx('item-heart')}>
                                    <img src={require('../../assets/heartitem.png')} alt="" />
                                    <Link to="">
                                        <span>Công cụ đo nhịp tim</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-8', 'left-ccc')}>
                            <h3>Công cụ nổi bật</h3>
                            <div className={cx('list-cc')}>
                                <div className={cx('col-md-4', 'item-ccnb')}>
                                    <Link to="">
                                        <div className={cx('item__content')}>
                                            <img
                                                className={cx('img-bmi')}
                                                src={require('../../assets/icons8-dialysis-100.png')}
                                                alt=""
                                            />
                                            <span> Tính chỉ số BMI</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className={cx('col-md-4', 'item-ccnb')}>
                                    <Link to="">
                                        <div className={cx('item__content')}>
                                            <img
                                                className={cx('img-csnt')}
                                                src={require('../../assets/icons8-heart-beat-64.png')}
                                                alt=""
                                            />
                                            <span> Đo chỉ số nhịp tim</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className={cx('col-md-4', 'item-ccnb')}>
                                    <Link to="">
                                        <div className={cx('item__content')}>
                                            <img
                                                className={cx('img-tnrt')}
                                                src={require('../../assets/icons8-bladder-flush-90.png')}
                                                alt=""
                                            />
                                            <span> Tính ngày rụng trứng</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default HealthyItem;
