const db = require('../config/mysqlConfig');
const ResponseDTO = require('../dto/ResponseDTO');

class HomeController {
    getHomeData(req, res) {
        const getNewsSql = `CALL GetNewsBy3()`;
        const getConsultantSql = `CALL GetConsultantBy4()`;
        db.query(getNewsSql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            const news = result[0];
            db.query(getConsultantSql, (err, result) => {
                if (err) {
                    res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                    return;
                }
                const consultant = result[0];
                const dataResult = { news, consultantList: consultant };
                res.status(200).json(dataResult);
            });
        });
    }
}

module.exports = new HomeController();
