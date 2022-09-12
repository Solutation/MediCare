import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Home.module.scss';
import { Button } from '~/components/Button';
import { faArrowRight, faBookMedical, faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets';

const cx = classNames.bind(styles);

function Home() {
    return (
        <>
            <section id="homeHeader" className={cx('wrapper')}>
                <div className={cx('container', 'h-100')}>
                    <div className={cx('row')}>
                        <div className={cx('col-4', 'wrapper-item', 'offset-1', 'text-center')}>
                            <h1 className={cx('d-none', 'd-sm-block', 'title')}>Your health is</h1>
                            <h1 className={cx('d-none', 'd-sm-block', 'title', 'primary')}>our mission</h1>
                            <div className={cx('separate', 'mx-auto')}></div>
                            <p className={cx('description')}>
                                Chúng tôi luôn đưa ra các lời khuyên hợp lý từ các chuyên gia tư vấn hàng đầu, giúp cải
                                thiện sức khỏe của bạn cũng như cung cấp thêm cho bạn các thông tin về những bệnh lý
                                thường gặp.
                            </p>
                            <Button primary className={cx('w-50', 'mx-auto')}>
                                Liên hệ tư vấn ngay
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section id="service">
                <div className={cx('container')}>
                    <h1
                        className={cx(
                            'service-title',
                            'text-center',
                            'mt-5',
                            'display-2',
                            'primary',
                            'font-weight-bold',
                        )}
                    >
                        Our Service
                    </h1>
                    <div className={cx('separate')}></div>
                    <div className={cx('row', 'pt-5')}>
                        <div className={cx('col-md-3', 'col-sm-2')}>
                            <div className={cx('card', 'service-wrapper')}>
                                <div className={cx('card-body', 'bg-primary', 'text-white')}>
                                    <h2 className={cx('card-title', 'font-weight-bold')}>Consultations</h2>
                                    <p className={cx('card-text', 'py-2')}>
                                        Với đội ngũ chuyên gia tư vấn giàu kinh nghiệm, chúng tôi luôn đưa ra những lời
                                        khuyên, tư vấn hợp lý để giúp cho các bệnh nhân khắc phục các vấn đề về sức khỏe
                                        của mình.
                                    </p>
                                    <Button
                                        serviceBtn
                                        outline
                                        rounded
                                        rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                                    >
                                        Tìm hiểu thêm
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-md-3', 'col-sm-2')}>
                            <div className={cx('card', 'service-wrapper')}>
                                <div className={cx('card-body', 'bg-secondary', 'text-white')}>
                                    <h2 className={cx('card-title', 'font-weight-bold')}>Finding Hospital</h2>
                                    <p className={cx('card-text', 'py-2')}>
                                        Bằng cách sử dụng dịch vụ này của chúng tôi, bệnh nhân có thể tìm được tới bệnh
                                        viện gần vị trí mình nhất, giúp tiết kiệm thời gian cho việc điều trị và khám
                                        chữa bệnh.
                                    </p>
                                    <Button
                                        serviceBtn
                                        outline
                                        rounded
                                        rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                                    >
                                        Tìm hiểu thêm
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-md-3', 'col-sm-2')}>
                            <div className={cx('card', 'service-wrapper')}>
                                <div className={cx('card-body', 'bg-primary', 'text-white')}>
                                    <h2 className={cx('card-title', 'font-weight-bold')}>Disease Information</h2>
                                    <p className={cx('card-text', 'py-2')}>
                                        Chúng tôi có các bài viết bao gồm rất nhiều loại bệnh theo chuyên mục, giúp bạn
                                        có thể biết được chính xác những thông tin cần thiết về bệnh mà bạn đang mắc
                                        phải.
                                    </p>
                                    <Button
                                        serviceBtn
                                        outline
                                        rounded
                                        rightIcon={<FontAwesomeIcon icon={faArrowRight} />}
                                    >
                                        Tìm hiểu thêm
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-md-3', 'col-sm-2')}>
                            <div className={cx('card', 'service-wrapper')}>
                                <div className={cx('card-body', 'bg-secondary', 'text-white')}>
                                    <h2 className={cx('card-title', 'font-weight-bold')}>Community</h2>
                                    <p className={cx('card-text', 'py-2')}>
                                        Tạo một môi trường nơi bạn có thể chia sẻ những vấn đề về sức khỏe bạn gặp phải
                                        cho người khác vào góp ý, từ đó giúp bạn có thêm nhiều thông tin hơn về bệnh của
                                        mình.
                                    </p>
                                    <Button
                                        serviceBtn
                                        outline
                                        rounded
                                        rightIcon={<FontAwesomeIcon icon={faArrowRight} className={cx('custom-btn')} />}
                                    >
                                        Tìm hiểu thêm
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="about" className={cx('mt-5')}>
                <div className={cx('container')}>
                    <img src={images.aboutImage} alt="" className={cx('about-image')} />
                    <div className={cx('row', 'about-head-wrapper')}>
                        <div className={cx('col-8', 'offset-4')}>
                            <div className={cx('about-head')}>
                                <h2 className={cx('display-4', 'font-weight-bold')}>About Us</h2>
                                <div className={cx('separate')}></div>
                                <div className={cx('about-info')}>
                                    <h1 className={cx('primary', 'font-weight-bold', 'about-title')}>Great Passion</h1>
                                    <h1 className={cx('about-title')}>for caring</h1>
                                    <p className={cx('py-4', 'about-text')}>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias sint provident
                                        libero fugiat ad repellat quo nulla asperiores esse dolor sunt pariatur, error
                                        porro maxime! Magnam, voluptatum tempora sint id, ex placeat atque repellendus
                                        sapiente qui dolorem nam, ullam asperiores?
                                    </p>
                                </div>
                                <div
                                    className={cx(
                                        'about-signature',
                                        'd-flex',
                                        'justify-content-end',
                                        'align-items-center',
                                    )}
                                >
                                    <div className={cx('d-flex', 'flex-column', 'px-5')}>
                                        <h2 className={cx('about-signature-text', 'primary', 'font-weight-bold')}>
                                            Khuong Tri
                                        </h2>
                                        <cite className={cx('text-muted')}>{`Coder & Member`}</cite>
                                    </div>
                                    <img src={images.aboutSignature} alt="" />
                                </div>
                            </div>
                            <hr className={cx('mt-5')} />
                            <div className={cx('about-footer', 'pt-5')}>
                                <div className={cx('container', 'px-0')}>
                                    <div className={cx('row')}>
                                        <div className={cx('col-6', 'd-flex', 'align-items-center')}>
                                            <div className={cx('about-footer-icon-wrapper')}>
                                                <FontAwesomeIcon
                                                    icon={faHeartPulse}
                                                    className={cx('primary', 'about-footer-icon')}
                                                />
                                            </div>
                                            <div className={cx('d-flex', 'flex-column', 'mt-1')}>
                                                <h2 className={cx('font-weight-bold')}>Dedicated</h2>
                                                <p className={cx('text-muted', 'about-footer-info')}>
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
                                                    unde voluptate non officia voluptatum quaerat dignissimos.
                                                </p>
                                            </div>
                                        </div>
                                        <div className={cx('col-6', 'd-flex', 'align-items-center')}>
                                            <div className={cx('about-footer-icon-wrapper')}>
                                                <FontAwesomeIcon
                                                    icon={faBookMedical}
                                                    className={cx('primary', 'about-footer-icon')}
                                                />
                                            </div>
                                            <div className={cx('d-flex', 'flex-column')}>
                                                <h2 className={cx('font-weight-bold')}>Great Service</h2>
                                                <p className={cx('text-muted', 'about-footer-info')}>
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
                                                    unde voluptate non officia voluptatum quaerat dignissimos.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="staff" className={cx('staff-wrapper')}>
                <div className={cx('container')}>
                    <h1 className={cx('display-2', 'font-weight-bold', 'text-black', 'd-inline-block')}>
                        Professional
                    </h1>
                    <h1 className={cx('display-2', 'primary', 'font-weight-bold', 'd-inline-block', 'ml-4')}>
                        Consultants
                    </h1>
                    <hr />
                    <p className={cx('staff-description', 'w-50', 'text-muted')}>
                        Dưới đây là danh sách các chuyên gia tư vấn giàu kinh nghiệm của chúng tôi, luôn hỗ trợ bạn mọi
                        lúc khi bạn gặp vấn đề về sức khỏe của mình.
                    </p>
                    <div className={cx('row')}>
                        <div className={cx('col-3')}>
                            <div className={cx('card')}>
                                <div className={cx('card-body', 'bg-staff', 'p-0')}>
                                    <img
                                        src={require('../../assets/doctor1.jpg')}
                                        alt="Anh"
                                        className={cx('card-header-image')}
                                    />
                                    <div className={cx('p-4')}>
                                        <h1 className={cx('font-weight-bold')}>Ngọc Phan</h1>
                                        <div className={cx('separate')}></div>
                                        <p className={cx('py-4')}>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, maiores.
                                            Iure eligendi voluptatum neque quia accusamus dolorum.
                                        </p>
                                        <Button
                                            primary
                                            rounded
                                            rightIcon={<FontAwesomeIcon icon={faArrowRight} className={cx('px-2')} />}
                                        >
                                            Liên hệ tư vấn ngay
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-3')}>
                            <div className={cx('card')}>
                                <div className={cx('card-body', 'bg-staff', 'p-0')}>
                                    <img
                                        src={require('../../assets/doctor2.jpg')}
                                        alt="Anh"
                                        className={cx('card-header-image')}
                                    />
                                    <div className={cx('p-4')}>
                                        <h1 className={cx('font-weight-bold')}>Đăng Khoa</h1>
                                        <div className={cx('separate')}></div>
                                        <p className={cx('py-4')}>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, maiores.
                                            Iure eligendi voluptatum neque quia accusamus dolorum.
                                        </p>
                                        <Button
                                            primary
                                            rounded
                                            rightIcon={<FontAwesomeIcon icon={faArrowRight} className={cx('px-2')} />}
                                        >
                                            Liên hệ tư vấn ngay
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-3')}>
                            <div className={cx('card')}>
                                <div className={cx('card-body', 'bg-staff', 'p-0')}>
                                    <img
                                        src={require('../../assets/doctor3.jpg')}
                                        alt="Anh"
                                        className={cx('card-header-image')}
                                    />
                                    <div className={cx('p-4')}>
                                        <h1 className={cx('font-weight-bold')}>Viết Anh</h1>
                                        <div className={cx('separate')}></div>
                                        <p className={cx('py-4')}>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, maiores.
                                            Iure eligendi voluptatum neque quia accusamus dolorum.
                                        </p>
                                        <Button
                                            primary
                                            rounded
                                            rightIcon={<FontAwesomeIcon icon={faArrowRight} className={cx('px-2')} />}
                                        >
                                            Liên hệ tư vấn ngay
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-3')}>
                            <div className={cx('card')}>
                                <div className={cx('card-body', 'bg-staff', 'p-0')}>
                                    <img
                                        src={require('../../assets/doctor4.jpg')}
                                        alt="Anh"
                                        className={cx('card-header-image')}
                                    />
                                    <div className={cx('p-4')}>
                                        <h1 className={cx('font-weight-bold')}>Khương Trí</h1>
                                        <div className={cx('separate')}></div>
                                        <p className={cx('py-4')}>
                                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, maiores.
                                            Iure eligendi voluptatum neque quia accusamus dolorum.
                                        </p>
                                        <Button
                                            primary
                                            rounded
                                            rightIcon={<FontAwesomeIcon icon={faArrowRight} className={cx('px-2')} />}
                                        >
                                            Liên hệ tư vấn ngay
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
