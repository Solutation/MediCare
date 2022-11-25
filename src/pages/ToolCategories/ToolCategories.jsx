import React from 'react';
import classNames from 'classnames/bind';
import { Navigator } from '~/components/Navigator';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './ToolCategories.module.scss';

const cx = classNames.bind(styles);

const ToolCategories = () => {
    const { t } = useTranslation('tools');

    const pageItem = [{ id: 1, name: t('tool'), to: '' }];

    return (
        <>
            <Navigator title={t('health-tool')} page={pageItem} bgPrimaryBold />
            <div className={cx('tools-wrapper')}>
                <h3 className={cx('header', 'text-center')}>{t('title')}</h3>
                <div className={cx('container')}>
                    <div className={cx('row', 'd-flex', 'flex-wrap')}>
                        <div className={cx('tools', 'd-flex', 'flex-wrap')}>
                            <div className={cx('col-4', 'tool-item')}>
                                <Link to="">
                                    <div className={cx('tool-wrapper')}>
                                        <img
                                            src={require('~/assets/bmi.png')}
                                            alt="Anh"
                                            className={cx('tool-img')}
                                        ></img>
                                        <div className={cx('content-wrapper')}>
                                            <h3 className={cx('tool-content')}>Đo chỉ số BMI</h3>
                                            <h3 className={cx('tool-description')}>
                                                Chỉ số BMI (Body Mass Index) được tính dựa trên tỉ lệ giữa cân nặng và
                                                chiều cao bình phương, nói lên tình trạng cân nặng hiện tại của bạn.
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={cx('col-4', 'tool-item')}>
                                <Link to="">
                                    <div className={cx('tool-wrapper')}>
                                        <img
                                            src={require('~/assets/ovulation.png')}
                                            alt="Anh"
                                            className={cx('tool-img')}
                                        ></img>
                                        <div className={cx('content-wrapper')}>
                                            <h3 className={cx('tool-content')}>Tính ngày rụng trứng</h3>
                                            <h3 className={cx('tool-description')}>
                                                Ngày rụng trứng chính là thời gian dễ thụ thai nhất bởi vì giai đoạn này
                                                tinh trùng có thể gặp trứng nếu quan hệ tình dục. Theo dõi chu kỳ kinh
                                                nguyệt của bạn, xác định những ngày dễ thụ thai nhất để tăng cơ hội thụ
                                                thai hoặc áp dụng biện pháp tránh thai.
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={cx('col-4', 'tool-item')}>
                                <Link to="">
                                    <div className={cx('tool-wrapper')}>
                                        <img
                                            src={require('~/assets/bmr.png')}
                                            alt="Anh"
                                            className={cx('tool-img')}
                                        ></img>
                                        <div className={cx('content-wrapper')}>
                                            <h3 className={cx('tool-content')}>Đo chỉ số BMR</h3>
                                            <h3 className={cx('tool-description')}>
                                                Chỉ số BMR (Basal Metabolic Rate) là tỷ lệ trao đổi chất cơ bản trong cơ
                                                thể con người. Chỉ số này cho biết mức năng lượng tối thiểu mà cơ thể
                                                cần, để thực hiện các chức năng cơ bản nhằm đảm bảo duy trì sự sống của
                                                cơ thể, khi bạn ở trạng thái nghỉ ngơi.
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={cx('col-4', 'tool-item')}>
                                <Link to="">
                                    <div className={cx('tool-wrapper')}>
                                        <img
                                            src={require('~/assets/bmi.png')}
                                            alt="Anh"
                                            className={cx('tool-img')}
                                        ></img>
                                        <div className={cx('content-wrapper')}>
                                            <h3 className={cx('tool-content')}>Đo chỉ số BMI</h3>
                                            <h3 className={cx('tool-description')}>
                                                Chỉ số BMI (Body Mass Index) được tính dựa trên tỉ lệ giữa cân nặng và
                                                chiều cao bình phương, nói lên tình trạng cân nặng hiện tại của bạn.
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={cx('col-4', 'tool-item')}>
                                <Link to="">
                                    <div className={cx('tool-wrapper')}>
                                        <img
                                            src={require('~/assets/bmi.png')}
                                            alt="Anh"
                                            className={cx('tool-img')}
                                        ></img>
                                        <div className={cx('content-wrapper')}>
                                            <h3 className={cx('tool-content')}>Đo chỉ số BMI</h3>
                                            <h3 className={cx('tool-description')}>
                                                Chỉ số BMI (Body Mass Index) được tính dựa trên tỉ lệ giữa cân nặng và
                                                chiều cao bình phương, nói lên tình trạng cân nặng hiện tại của bạn.
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className={cx('col-4', 'tool-item')}>
                                <Link to="">
                                    <div className={cx('tool-wrapper')}>
                                        <img
                                            src={require('~/assets/bmi.png')}
                                            alt="Anh"
                                            className={cx('tool-img')}
                                        ></img>
                                        <div className={cx('content-wrapper')}>
                                            <h3 className={cx('tool-content')}>Đo chỉ số BMI</h3>
                                            <h3 className={cx('tool-description')}>
                                                Chỉ số BMI (Body Mass Index) được tính dựa trên tỉ lệ giữa cân nặng và
                                                chiều cao bình phương, nói lên tình trạng cân nặng hiện tại của bạn.
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ToolCategories;
