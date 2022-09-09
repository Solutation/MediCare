import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './DiseaseItem.module.scss';

const cx = classNames.bind(styles);

function DiseaseItem() {
    return (
        <Link to="" className={cx('wrapper')}>
            <img src={require('~/assets/waifu.jpg')} className={cx('disease-image')} alt="Anh" />
            <div className={cx('disease-info')}>
                <h4 className={cx('disease-name')}>
                    <span>Bệnh về mắt</span>
                </h4>
                <span className={cx('disease-description')}>
                    Mắt là một trong những cơ quan cảm giác phát triển nhất trong cơ thể. Ta phụ thuộc vào thị lực để có
                    thể thực hiện hầu hết các hoạt động hàng ngày. Vì vậy, việc duy trì sức khỏe đôi mắt tốt là điều cần
                    được ưu tiên.
                </span>
            </div>
        </Link>
    );
}

export default DiseaseItem;
