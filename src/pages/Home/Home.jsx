import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import styles from './Home.module.scss';
import { Button } from '~/components/Button';
import { faArrowRight, faBookMedical, faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import images from '~/assets';
import { httpRequest, handleDateResponse } from '~/utils';

const cx = classNames.bind(styles);

const GeneralSection = () => {
    const { t } = useTranslation('home');

    return (
        <section id="homeHeader" className={cx('wrapper')}>
            <div className={cx('container', 'h-100')}>
                <div className={cx('row', 'wrapper_inner')}>
                    <div className={cx('col-6', 'wrapper-item', 'offset-1', 'text-center')}>
                        <h1 className={cx('d-none', 'd-sm-block', 'title')}>{t('title1')}</h1>
                        <h1 className={cx('d-none', 'd-sm-block', 'title', 'primary')}>{t('title2')}</h1>
                        <div className={cx('separate', 'mx-auto')}></div>
                        <p className={cx('description')}>{t('contentTitle')}</p>
                        <Button primary className={cx('w-50', 'mx-auto')}>
                            {t('contactTitle')}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ServiceSection = () => {
    const { t } = useTranslation('home');

    return (
        <section id="service">
            <div className={cx('container')}>
                <h1 className={cx('service-title', 'text-center', 'mt-5', 'display-2', 'primary', 'fw-bold')}>
                    {t('featureTitle')}
                </h1>
                <div className={cx('separate', 'mx-auto')}></div>
                <div className={cx('row', 'pt-5')}>
                    <div className={cx('col-md-3', 'col-sm-2')}>
                        <div className={cx('card', 'service-wrapper')}>
                            <div className={cx('card-body', 'bg-primary', 'text-white')}>
                                <h2 className={cx('card-title', 'fw-bold')}>{t('featureItemTitle1')}</h2>
                                <p className={cx('card-text', 'py-2')}>{t('featureContent1')}</p>
                                <Button serviceBtn outline rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                                    {t('serviceReadmore')}
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-md-3', 'col-sm-2')}>
                        <div className={cx('card', 'service-wrapper')}>
                            <div className={cx('card-body', 'bg-secondary', 'text-white')}>
                                <h2 className={cx('card-title', 'fw-bold')}>{t('featureItemTitle2')}</h2>
                                <p className={cx('card-text', 'py-2')}>{t('featureContent2')}</p>
                                <Button serviceBtn outline rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                                    {t('serviceReadmore')}
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-md-3', 'col-sm-2')}>
                        <div className={cx('card', 'service-wrapper')}>
                            <div className={cx('card-body', 'bg-primary', 'text-white')}>
                                <h2 className={cx('card-title', 'fw-bold')}>{t('featureItemTitle3')}</h2>
                                <p className={cx('card-text', 'py-2')}>{t('featureContent3')}</p>
                                <Button serviceBtn outline rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                                    {t('serviceReadmore')}
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('col-md-3', 'col-sm-2')}>
                        <div className={cx('card', 'service-wrapper')}>
                            <div className={cx('card-body', 'bg-secondary', 'text-white')}>
                                <h2 className={cx('card-title', 'fw-bold')}>{t('featureItemTitle4')}</h2>
                                <p className={cx('card-text', 'py-2')}>{t('featureContent4')}</p>
                                <Button
                                    serviceBtn
                                    outline
                                    rightIcon={<FontAwesomeIcon icon={faArrowRight} className={cx('custom-btn')} />}
                                >
                                    {t('serviceReadmore')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const AboutSection = () => {
    const { t } = useTranslation('home');

    return (
        <section id="about">
            <div className={cx('container')}>
                <img src={images.aboutImage} alt="" className={cx('about-image')} />
                <div className={cx('row', 'about-head-wrapper')}>
                    <div className={cx('col-8', 'offset-4')}>
                        <div className={cx('about-head')}>
                            <h2 className={cx('display-4', 'fw-bold')}>{t('aboutTitle1')}</h2>
                            <div className={cx('separate')}></div>
                            <div className={cx('about-info')}>
                                <h1 className={cx('primary', 'fw-bold', 'about-title')}>{t('aboutTitle2')}</h1>
                                <h1 className={cx('about-title')}>{t('aboutTitle3')}</h1>
                                <p className={cx('py-4', 'about-text')}>{t('aboutContent1')}</p>
                            </div>
                            <div
                                className={cx('about-signature', 'd-flex', 'justify-content-end', 'align-items-center')}
                            >
                                <div className={cx('d-flex', 'flex-column', 'px-5')}>
                                    <h2 className={cx('about-signature-text', 'primary', 'fw-bold')}>Khuong Tri</h2>
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
                                            <h2 className={cx('fw-bold')}>{t('aboutItemTitle1')}</h2>
                                            <p className={cx('text-muted', 'about-footer-info')}>
                                                {t('aboutItemContent1')}
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
                                            <h2 className={cx('fw-bold')}>{t('aboutItemTitle2')}</h2>
                                            <p className={cx('text-muted', 'about-footer-info')}>
                                                {t('aboutItemContent2')}
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
    );
};

const ConsultantsSection = () => {
    const { t } = useTranslation('home');
    const [consultantList, setConsultantList] = useState([]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            try {
                const {
                    data: { consultantList }
                } = await httpRequest.get('/info', { cancelToken: cancelToken.token });
                setConsultantList(consultantList);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAPI();
        return () => {
            cancelToken.cancel();
        };
    }, []);

    return (
        <section id="staff" className={cx('staff-wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('display-2', 'fw-bold', 'text-black', 'd-inline-block')}>{t('consultantTitle1')}</h1>
                <h1 className={cx('display-2', 'primary', 'fw-bold', 'd-inline-block', 'ms-4')}>
                    {t('consultantTitle2')}
                </h1>
                <hr />
                <p className={cx('staff-description', 'w-50')}>{t('consultantContent')}</p>
                <div className={cx('row')}>
                    {consultantList.length >= 1 &&
                        consultantList.map((consultant) => (
                            <div className={cx('col-3')} key={consultant.id}>
                                <div className={cx('card')}>
                                    <div className={cx('card-body', 'bg-staff', 'p-0')}>
                                        <img src={consultant.avatar} alt="Anh" className={cx('card-header-image')} />
                                        <div className={cx('p-4')}>
                                            <h1
                                                className={cx('fw-bold')}
                                            >{`${consultant.first_name} ${consultant.last_name}`}</h1>
                                            <div className={cx('separate')}></div>
                                            <p className={cx('py-4')}>
                                                {consultant.descriptions.slice(0, 110) + '...'}
                                            </p>
                                            <Button
                                                primary
                                                rightIcon={
                                                    <FontAwesomeIcon icon={faArrowRight} className={cx('px-2')} />
                                                }
                                            >
                                                {t('consultantContact')}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <div className={cx('consultants-btn')}>
                    <Button primary rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                        {t('consultantReadmore')}
                    </Button>
                </div>
                <hr />
            </div>
        </section>
    );
};

const DiseaseSection = () => {
    const { t } = useTranslation('home');
    const [diseaseList, setDiseaseList] = useState([]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            try {
                const {
                    data: { news }
                } = await httpRequest.get('/info', { cancelToken: cancelToken.token });
                setDiseaseList(news);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAPI();
        return () => {
            cancelToken.cancel();
        };
    }, []);

    return (
        <section id="disease" className={cx('disease-wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('display-2', 'fw-bold', 'text-black', 'd-inline-block')}>{t('newsTitle1')}</h1>
                <h1 className={cx('display-2', 'fw-bold', 'primary', 'd-inline-block', 'ms-4')}>{t('newsTitle2')}</h1>
                <div className={cx('separate')}></div>
                <p className={cx('text-info', 'w-50')}>{t('newsContent')}</p>
                <div className={cx('row')}>
                    {diseaseList.length >= 1 &&
                        diseaseList.map((diseaseItem) => (
                            <div className={cx('col-4')} key={diseaseItem.id}>
                                <div className={cx('card')}>
                                    <div className={cx('card-body', 'bg-staff', 'p-0')}>
                                        <img src={diseaseItem.name} alt="Anh" className={cx('card-header-image')} />
                                        <div className={cx('p-4')}>
                                            <div className={cx('d-flex', 'align-items-center', 'py-2')}>
                                                <FontAwesomeIcon icon={faClock} className={cx('disease-date-icon')} />
                                                <span
                                                    className={cx('px-3')}
                                                    style={{ color: 'var(--color-blue-bold)' }}
                                                >
                                                    {handleDateResponse(diseaseItem.created_date)}
                                                </span>
                                            </div>
                                            <h1 className={cx('fw-bold', 'py-3', 'disease_title')}>
                                                {diseaseItem.title.length >= 63
                                                    ? diseaseItem.title.slice(0, 62) + '...'
                                                    : diseaseItem.title}
                                            </h1>
                                            <p className={cx('pb-3')}>{diseaseItem.content.slice(0, 130) + '...'}</p>
                                            <div className={cx('mt-4')}>
                                                <Button primary rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                                                    {t('newsDBReadmore')}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <div className={cx('consultants-btn')}>
                    <Button primary rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                        {t('newsReadmore')}
                    </Button>
                </div>
            </div>
<<<<<<< HEAD
        </section>
    );
};
=======
        </div>
    </section>
);

const ServiceSection = () => (
    <section id="service">
        <div className={cx('container')}>
            <h1 className={cx('service-title', 'text-center', 'mt-5', 'display-2', 'primary', 'fw-bold')}>
                Tính năng tiêu biểu
            </h1>
            <div className={cx('separate', 'mx-auto')}></div>
            <div className={cx('row', 'pt-5')}>
                <div className={cx('col-md-3', 'col-sm-2')}>
                    <div className={cx('card', 'service-wrapper')}>
                        <div className={cx('card-body', 'bg-primary', 'text-white')}>
                            <h2 className={cx('card-title', 'fw-bold')}>Liên hệ tư vấn</h2>
                            <p className={cx('card-text', 'py-2')}>
                                Với đội ngũ chuyên gia tư vấn giàu kinh nghiệm, chúng tôi luôn đưa ra những lời khuyên,
                                tư vấn hợp lý để giúp cho các bệnh nhân khắc phục các vấn đề về sức khỏe của mình.
                            </p>
                            <Button serviceBtn outline rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                                Tìm hiểu thêm
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('col-md-3', 'col-sm-2')}>
                    <div className={cx('card', 'service-wrapper')}>
                        <div className={cx('card-body', 'bg-secondary', 'text-white')}>
                            <h2 className={cx('card-title', 'fw-bold')}>Tìm bệnh viện</h2>
                            <p className={cx('card-text', 'py-2')}>
                                Bằng cách sử dụng dịch vụ này của chúng tôi, bệnh nhân có thể tìm được tới bệnh viện gần
                                vị trí mình nhất, giúp tiết kiệm thời gian cho việc điều trị và khám chữa bệnh.
                            </p>
                            <Button serviceBtn outline rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                                Tìm hiểu thêm
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('col-md-3', 'col-sm-2')}>
                    <div className={cx('card', 'service-wrapper')}>
                        <div className={cx('card-body', 'bg-primary', 'text-white')}>
                            <h2 className={cx('card-title', 'fw-bold')}>Xem tin tức bệnh</h2>
                            <p className={cx('card-text', 'py-2')}>
                                Chúng tôi có các bài viết bao gồm rất nhiều loại bệnh theo chuyên mục, giúp bạn có thể
                                biết được chính xác những thông tin cần thiết về bệnh mà bạn đang mắc phải.
                            </p>
                            <Button serviceBtn outline rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                                Tìm hiểu thêm
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('col-md-3', 'col-sm-2')}>
                    <div className={cx('card', 'service-wrapper')}>
                        <div className={cx('card-body', 'bg-secondary', 'text-white')}>
                            <h2 className={cx('card-title', 'fw-bold')}>Cộng đồng</h2>
                            <p className={cx('card-text', 'py-2')}>
                                Tạo một môi trường nơi bạn có thể chia sẻ những vấn đề về sức khỏe bạn gặp phải cho
                                người khác vào góp ý, từ đó giúp bạn có thêm nhiều thông tin hơn về bệnh của mình.
                            </p>
                            <Button
                                serviceBtn
                                outline
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
);

const AboutSection = () => (
    <section id="about">
        <div className={cx('container')}>
            <img src={images.aboutImage} alt="" className={cx('about-image')} />
            <div className={cx('row', 'about-head-wrapper')}>
                <div className={cx('col-8', 'offset-4')}>
                    <div className={cx('about-head')}>
                        <h2 className={cx('display-4', 'fw-bold')}>About Us</h2>
                        <div className={cx('separate')}></div>
                        <div className={cx('about-info')}>
                            <h1 className={cx('primary', 'fw-bold', 'about-title')}>Great Passion</h1>
                            <h1 className={cx('about-title')}>for caring</h1>
                            <p className={cx('py-4', 'about-text')}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias sint provident libero
                                fugiat ad repellat quo nulla asperiores esse dolor sunt pariatur, error porro maxime!
                                Magnam, voluptatum tempora sint id, ex placeat atque repellendus sapiente qui dolorem
                                nam, ullam asperiores?
                            </p>
                        </div>
                        <div className={cx('about-signature', 'd-flex', 'justify-content-end', 'align-items-center')}>
                            <div className={cx('d-flex', 'flex-column', 'px-5')}>
                                <h2 className={cx('about-signature-text', 'primary', 'fw-bold')}>Khuong Tri</h2>
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
                                        <h2 className={cx('fw-bold')}>Dedicated</h2>
                                        <p className={cx('text-muted', 'about-footer-info')}>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione unde
                                            voluptate non officia voluptatum quaerat dignissimos.
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
                                        <h2 className={cx('fw-bold')}>Great Service</h2>
                                        <p className={cx('text-muted', 'about-footer-info')}>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione unde
                                            voluptate non officia voluptatum quaerat dignissimos.
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
);

const ConsultantsSection = () => (
    <section id="staff" className={cx('staff-wrapper')}>
        <div className={cx('container')}>
            <h1 className={cx('display-2', 'fw-bold', 'text-black', 'd-inline-block')}>Professional</h1>
            <h1 className={cx('display-2', 'primary', 'fw-bold', 'd-inline-block', 'ms-4')}>Consultants</h1>
            <hr />
            <p className={cx('staff-description', 'w-50')}>
                Dưới đây là danh sách các chuyên gia tư vấn giàu kinh nghiệm của chúng tôi, luôn hỗ trợ bạn mọi lúc khi
                bạn gặp vấn đề về sức khỏe của mình.
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
                                <h1 className={cx('fw-bold')}>Ngọc Phan</h1>
                                <div className={cx('separate')}></div>
                                <p className={cx('py-4')}>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, maiores. Iure
                                    eligendi voluptatum neque quia accusamus dolorum.
                                </p>
                                <Button
                                    primary
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
                                <h1 className={cx('fw-bold')}>Đăng Khoa</h1>
                                <div className={cx('separate')}></div>
                                <p className={cx('py-4')}>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, maiores. Iure
                                    eligendi voluptatum neque quia accusamus dolorum.
                                </p>
                                <Button
                                    primary
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
                                <h1 className={cx('fw-bold')}>Viết Anh</h1>
                                <div className={cx('separate')}></div>
                                <p className={cx('py-4')}>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, maiores. Iure
                                    eligendi voluptatum neque quia accusamus dolorum.
                                </p>
                                <Button
                                    primary
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
                                <h1 className={cx('fw-bold')}>Khương Trí</h1>
                                <div className={cx('separate')}></div>
                                <p className={cx('py-4')}>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, maiores. Iure
                                    eligendi voluptatum neque quia accusamus dolorum.
                                </p>
                                <Button
                                    primary
                                    rightIcon={<FontAwesomeIcon icon={faArrowRight} className={cx('px-2')} />}
                                >
                                    Liên hệ tư vấn ngay
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('consultants-btn')}>
                <Button primary rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                    Xem thêm danh sách chuyên gia
                </Button>
            </div>
            <hr />
        </div>
    </section>
);

const DiseaseSection = () => (
    <section id="disease" className={cx('disease-wrapper')}>
        <div className={cx('container')}>
            <h1 className={cx('display-2', 'fw-bold', 'text-black', 'd-inline-block')}>Latest</h1>
            <h1 className={cx('display-2', 'primary', 'fw-bold', 'd-inline-block', 'ms-4')}>Medicare news</h1>
            <div className={cx('separate', 'mx-auto')}></div>
            <p className={cx('text-info', 'w-50')}>
                Đọc những tin tức y tế mới nhất để biết thêm thông tin về các loại bệnh hiện nay và cách điều trị, phòng
                tránh chúng.
            </p>
            <div className={cx('row')}>
                <div className={cx('col-4')}>
                    <div className={cx('card')}>
                        <div className={cx('card-body', 'bg-staff', 'p-0')}>
                            <img
                                src={require('../../assets/disease1.jpg')}
                                alt="Anh"
                                className={cx('card-header-image')}
                            />
                            <div className={cx('p-4')}>
                                <div className={cx('d-flex', 'align-items-center', 'py-2')}>
                                    <FontAwesomeIcon icon={faClock} className={cx('disease-date-icon')} />
                                    <span className={cx('px-3')}>August 8, 2022</span>
                                </div>
                                <h1 className={cx('fw-bold', 'py-3')}>Bị đau mắt đỏ, cách điều trị như thế nào?</h1>
                                <p className={cx('pb-3')}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque dolorem commodi animi
                                    qui quo, similique nulla sapiente deleniti incidunt atque hic, voluptatibus ea
                                    ratione facilis error. Eaque, molestiae!
                                </p>
                                <div className={cx('mt-4')}>
                                    <Button primary rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                                        Xem thêm
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('col-4')}>
                    <div className={cx('card')}>
                        <div className={cx('card-body', 'bg-staff', 'p-0')}>
                            <img
                                src={require('../../assets/disease2.jpg')}
                                alt="Anh"
                                className={cx('card-header-image')}
                            />
                            <div className={cx('p-4')}>
                                <div className={cx('d-flex', 'align-items-center', 'py-2')}>
                                    <FontAwesomeIcon icon={faClock} className={cx('disease-date-icon')} />
                                    <span className={cx('px-3')}>August 8, 2022</span>
                                </div>
                                <h1 className={cx('fw-bold', 'py-3')}>Bị đau mắt đỏ, cách điều trị như thế nào?</h1>
                                <p className={cx('pb-3')}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque dolorem commodi animi
                                    qui quo, similique nulla sapiente deleniti incidunt atque hic, voluptatibus ea
                                    ratione facilis error. Eaque, molestiae!
                                </p>
                                <div className={cx('mt-4')}>
                                    <Button primary rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                                        Xem thêm
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('col-4')}>
                    <div className={cx('card')}>
                        <div className={cx('card-body', 'bg-staff', 'p-0')}>
                            <img
                                src={require('../../assets/disease3.jpg')}
                                alt="Anh"
                                className={cx('card-header-image')}
                            />
                            <div className={cx('p-4')}>
                                <div className={cx('d-flex', 'align-items-center', 'py-2')}>
                                    <FontAwesomeIcon icon={faClock} className={cx('disease-date-icon')} />
                                    <span className={cx('px-3')}>August 8, 2022</span>
                                </div>
                                <h1 className={cx('fw-bold', 'py-3')}>Bị đau mắt đỏ, cách điều trị như thế nào?</h1>
                                <p className={cx('pb-3')}>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque dolorem commodi animi
                                    qui quo, similique nulla sapiente deleniti incidunt atque hic, voluptatibus ea
                                    ratione facilis error. Eaque, molestiae!
                                </p>
                                <div className={cx('mt-4')}>
                                    <Button primary rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                                        Xem thêm
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('consultants-btn')}>
                <Button primary rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                    Xem thêm tin tức bệnh
                </Button>
            </div>
        </div>
    </section>
);
>>>>>>> front_end_dev

const Home = () => {
    return (
        <>
            <GeneralSection />
            <DiseaseSection />
            <ConsultantsSection />
            <ServiceSection />
            <AboutSection />
        </>
    );
};

export default Home;
