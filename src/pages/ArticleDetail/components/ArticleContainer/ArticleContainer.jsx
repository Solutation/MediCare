import React from 'react';
import classNames from 'classnames/bind';
import { CarouselContainer } from '../CarouselContainer';
import { SidebarContainer } from '../SidebarContainer';

import styles from './ArticleContainer.module.scss';
const cx = classNames.bind(styles);

const ArticleContainer = () => {
    return (
        <>
            <section id="article">
                <div className={cx('container', 'flex-wrap')}>
                    <div className={cx('row', 'mx-auto', 'd-flex')}>
                        <div className={cx('col-7', 'offset-1', 'article-content')}>
                            <div className={cx('article-wrapper')}>
                                <h1 className={cx('article-title')}>Các bác sĩ giải thích về cuồng dâm.</h1>
                                <div className={cx('article-time')}>Thứ 6, 23/09/2022 - 7:00 (GMT + 7)</div>
                                <p>
                                    TTO - Nhiều người nghĩ rằng cuồng dâm là do suy đồi đạo đức nhưng đây là biểu hiện
                                    của bệnh rối loạn tâm thần hoặc do gene. Bên cạnh đó, có thể do tác dụng phụ của một
                                    số loại thuốc, sử dụng chất hoặc là biểu hiện của bệnh lý sa sút trí tuệ.
                                </p>
                                <p>
                                    Đây là thông tin bác sĩ Nguyễn Thị Phương Mai - phòng điều trị rối loạn liên quan
                                    stress và sức khỏe tình dục, Viện Sức khỏe tâm thần, Bệnh viện Bạch Mai - chia sẻ
                                    tại hội thảo Xu hướng tình dục quá mức, chiều 20-9 tại Bệnh viện Bạch Mai.
                                </p>
                                <img
                                    src={require('../../../../assets/article1.jpg')}
                                    alt="Anh"
                                    className={cx('article-image')}
                                ></img>
                                <h3>Cuồng dâm vì quan điểm tình dục lệch lạc</h3>
                                <p>
                                    TS Trịnh Thanh Hương (Viện Sức khỏe tâm thần, Bệnh viện Bạch Mai) chia sẻ về trường
                                    hợp nữ bệnh nhân 20 tuổi phải điều trị tâm lý gần 6 tháng vì xu hướng tình dục quá
                                    mức.
                                </p>
                                <p>
                                    Cô gái từng là nạn nhân của lạm dụng tình dục, sau đó cô có suy nghĩ lệch lạc rằng
                                    mình không còn gì để "mất" nên đã quan hệ tình dục với nhiều người. Sau đó hình
                                    thành thói quen, sự ham muốn tình dục và nhu cầu quan hệ tình dục ngày càng gia
                                    tăng.
                                </p>
                                <p>
                                    "Cô gái này tìm kiếm bạn tình và thay đổi bạn tình liên tục. Sau đó số lần quan hệ
                                    ngày càng nhiều hơn nhưng vẫn không thỏa mãn. Mỗi ngày cô gái này quan hệ tình dục
                                    3-5 lần và luôn nghĩ đến việc quan hệ tình dục, gây ảnh hưởng đến cuộc sống. Sau đó
                                    cô nhận thấy sự bất thường về tâm lý và tìm đến bác sĩ để tư vấn", TS Hương cho hay.
                                </p>
                            </div>
                            <CarouselContainer></CarouselContainer>
                        </div>
                        <div className={cx('col-3', 'sidebar')}>
                            <SidebarContainer></SidebarContainer>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ArticleContainer;
