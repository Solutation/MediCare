const ResponseDTO = require('../dto/ResponseDTO');

class TollsController {
    handleBMI(req, res) {
        const { weight, height } = req.body;
        if (weight == undefined || height == undefined) {
            res.status(400).json(new ResponseDTO(400, 'Chưa có cân nặng và chiều cao!'));
            return;
        }
        const result = weight / ((height / 100) * 2);
        let dataResult = '';
        if (result < 18.5) dataResult = 'Thiếu cân';
        else if (result >= 18.5 && result <= 24.99) dataResult = 'Bình thường';
        else if (result >= 25 && result <= 29.99) dataResult = 'Thừa cân';
        else dataResult = 'Béo phì';
        res.status(200).json({ BMI: dataResult });
    }
    handleBMR(req, res) {
        const { weight, height, age, sex } = req.body;
        let result;
        if (sex === 'Nam') result = 9.99 * weight + 6.25 * height - 4.92 * age + 5;
        else result = 9.99 * weight + 6.25 * height - 4.92 * age - 161;
        res.status(200).json({ BMR: result.toFixed(3) });
    }
    handleOvulation(req, res) {
        const { dayCycle } = req.body;
        let result = dayCycle - 14;
        res.status(200).json({ 'Ngày rụng trứng': result });
    }
}

module.exports = new TollsController();
