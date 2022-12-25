const db = require('../config/mysqlConfig');
const StreamChat = require('stream-chat').StreamChat;
const ResponseDTO = require('../dto/ResponseDTO');
const handlePaginate = require('../utils/PaginationUtils');
const bcrypt = require('bcrypt');

require('dotenv').config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const api_id = process.env.STREAM_API_ID;

class AdminController {
    getAllPatient(req, res) {
        const getPatientSql = 'CALL GetAllPatient()';
        const { pageSize, pageNumber } = req.query;
        const pageNumberResult = pageNumber == undefined ? 1 : pageNumber;
        const pageSizeResult = pageSize == undefined ? 5 : pageSize;
        db.query(getPatientSql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            const totalRows = result[0].length;
            const totalPages = Math.ceil(totalRows / pageSizeResult);
            if (pageNumberResult > totalPages) {
                res.status(400).json(new ResponseDTO(400, 'Số trang vượt quá tổng số trang,vui lòng nhập lại'));
                return;
            }
            const startIndex = (pageNumberResult - 1) * pageSizeResult;
            const endIndex = pageNumberResult * pageSizeResult;
            const resultData = [];
            const resultArray = result[0].slice(startIndex, endIndex);
            resultArray.forEach((item, index) => {
                let statusResponse = '';
                if (item.status == 0) statusResponse = 'Chưa kích hoạt';
                if (item.status == 1) statusResponse = 'Đã kích hoạt';
                if (item.status == 2) statusResponse = 'Bị chặn';
                const dataToPush = {
                    id: item.id,
                    avatar: item.avatar,
                    fullName: `${item.first_name} ${item.last_name}`,
                    email: item.email,
                    status: statusResponse,
                };
                resultData.push(dataToPush);
            });
            const dataResult = {
                totalPages,
                pageSize: parseInt(pageSizeResult),
                pageNumber: parseInt(pageNumberResult),
                data: { patientList: resultData },
            };
            res.status(200).json(dataResult);
        });
    }
    getPatientById(req, res) {
        const patientId = req.params.patientId;
        const sql = `CALL GetPatientByPatientId(${patientId})`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            if (result[0][0].status == 0) result[0][0].status = 'Chưa kích hoạt';
            if (result[0][0].status == 1) result[0][0].status = 'Đã kích hoạt';
            if (result[0][0].status == 2) result[0][0].status = 'Bị chặn';
            res.status(200).json({ patientInfo: result[0][0] });
        });
    }
    updatePatientInfo(req, res) {
        const { first_name, last_name, birth_day, phone_number, address, avatar } = req.body;
        const chatClient = StreamChat.getInstance(api_key, api_secret);
        const patientId = req.params.patientId;
        const sql = `CALL UpdatePatientAdmin(N'${first_name}', N'${last_name}', N'${birth_day}', '${phone_number}', N'${address}', '${avatar}', ${patientId});`;
        db.query(sql, async (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            const { users } = await chatClient.queryUsers({ email: result[0][0].email });
            const userData = {
                id: users[0].id,
                user_role: 'patient',
                email: result[0][0].email,
                first_name: result[0][0].first_name,
                last_name: result[0][0].last_name,
                phone_number: result[0][0].phone_number,
                avatar: avatar,
            };
            await chatClient.upsertUser(userData);
            if (result[0][0].status == 0) result[0][0].status = 'Chưa kích hoạt';
            if (result[0][0].status == 1) result[0][0].status = 'Đã kích hoạt';
            if (result[0][0].status == 2) result[0][0].status = 'Bị chặn';
            res.status(200).json({ patientInfo: result[0][0] });
        });
    }
    blockPatient(req, res) {
        const patientId = req.params.patientId;
        const sql = `CALL BlockPatientById(${patientId})`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json(new ResponseDTO(200, 'Chặn bệnh nhân thành công'));
        });
    }
    getAllConsultant(req, res) {
        const { pageSize, pageNumber } = req.query;
        const getConsultantSql = `CALL GetAllConsultant()`;
        const pageNumberResult = pageNumber == undefined ? 1 : pageNumber;
        const pageSizeResult = pageSize == undefined ? 5 : pageSize;
        db.query(getConsultantSql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            const totalRows = result[0].length;
            const totalPages = Math.ceil(totalRows / pageSizeResult);
            if (pageNumberResult > totalPages) {
                res.status(400).json(new ResponseDTO(400, 'Số trang vượt quá tổng số trang,vui lòng nhập lại'));
                return;
            }
            const startIndex = (pageNumberResult - 1) * pageSizeResult;
            const endIndex = pageNumberResult * pageSizeResult;
            const consultantList = [];
            const resultArray = result[0].slice(startIndex, endIndex);
            resultArray.forEach((item, index) => {
                const sql = `CALL GetCategoryByConsultantId(${item.id})`;
                const average_score = item.average_score == 0.0 ? 'Chưa có đánh giá' : item.average_score;
                let statusResponse = '';
                if (item.status == 0) statusResponse = 'Chưa kích hoạt';
                if (item.status == 1) statusResponse = 'Đã kích hoạt';
                if (item.status == 2) statusResponse = 'Bị chặn';
                db.query(sql, (err, result) => {
                    if (err) {
                        res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                        return;
                    }
                    let categoryResult = '';
                    result[0].forEach((categoryItem, index) => {
                        if (index == 0) categoryResult = categoryResult + categoryItem.name;
                        else categoryResult = categoryResult + `, ${categoryItem.name}`;
                    });
                    const dataToPush = {
                        id: item.id,
                        avatar: item.avatar,
                        fullName: `${item.first_name} ${item.last_name}`,
                        email: item.email,
                        status: statusResponse,
                        category: categoryResult,
                        average_score,
                    };
                    consultantList.push(dataToPush);
                    if (index == resultArray.length - 1) {
                        res.status(200).json({
                            totalPages,
                            pageSize: parseInt(pageSizeResult),
                            pageNumber: parseInt(pageNumberResult),
                            data: { consultantList },
                        });
                    }
                });
            });
        });
    }
    getAllCategory(req, res) {
        const sql = `CALL GetAllCategory()`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json({ categoryList: result[0] });
        });
    }
    getConsultantDetailAdmin(req, res) {
        const consultantId = req.params.consultantId;
        const sql = `CALL GetConsultantDetail(${consultantId})`;
        const categorySql = `CALL GetCategoryByConsultantId(${consultantId})`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            const averageScoreResult =
                result[0][0].average_score == 0.0 ? 'Chưa có đánh giá' : result[0][0].average_score;
            const certificateResult = [];
            result[0].forEach((consultantDetailItem, index) => {
                certificateResult.push(consultantDetailItem.certificate_name);
            });
            if (result[0][0].status == 0) result[0][0].status = 'Chưa kích hoạt';
            if (result[0][0].status == 1) result[0][0].status = 'Đã kích hoạt';
            if (result[0][0].status == 2) result[0][0].status = 'Bị chặn';
            const consultantInfo = {
                id: result[0][0].id,
                email: result[0][0].email,
                first_name: result[0][0].first_name,
                last_name: result[0][0].last_name,
                phone_number: result[0][0].phone_number,
                address: result[0][0].address,
                birth_day: result[0][0].birth_day,
                descriptions: result[0][0].descriptions,
                avatar: result[0][0].avatar,
                average_score: averageScoreResult,
                status: result[0][0].status,
            };
            db.query(categorySql, (err, result) => {
                if (err) {
                    res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                    return;
                }
                const categoryList = result[0];
                res.status(200).json({ consultantInfo, categoryList });
            });
        });
    }
    updateConsultantDetailAdmin(req, res) {
        const { first_name, last_name, birth_day, phone_number, address, avatar, descriptions } = req.body;
        const chatClient = StreamChat.getInstance(api_key, api_secret);
        const consultantId = req.params.consultantId;
        const updateConsultantSql = `CALL UpdateConsultantById(${consultantId}, N'${first_name}', N'${last_name}', '${phone_number}', N'${address}', '${birth_day}', N'${descriptions}', '${avatar}')`;
        db.query(updateConsultantSql, async (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            const { users } = await chatClient.queryUsers({ email: result[0][0].email });
            const userData = {
                id: users[0].id,
                user_role: 'consultant',
                email: result[0][0].email,
                first_name: result[0][0].first_name,
                last_name: result[0][0].last_name,
                phone_number: result[0][0].phone_number,
                avatar: result[0][0].avatar,
            };
            await chatClient.upsertUser(userData);
            res.status(200).json(new ResponseDTO(200, 'Cập nhật thông tin chuyên gia thành công'));
        });
    }
    getCertificateByConsultantId(req, res) {
        const consultantId = req.params.consultantId;
        const { pageSize, pageNumber } = req.query;
        const sql = `CALL GetCertificateByConsultantId(${consultantId})`;
        handlePaginate(sql, 'certificateList', pageSize, pageNumber, res);
    }
    addCertificateByConsultantId(req, res) {
        const { consultantId } = req.query;
        const { certificate_type, date_granted } = req.body;
        const sql = `CALL AddCertificateByConsultantId(${consultantId}, '${certificate_type}', '${date_granted}')`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json(new ResponseDTO(200, 'Thêm chứng chỉ thành công'));
        });
    }
    deleteCertificateById(req, res) {
        const certificateId = req.params.certificateId;
        const { consultantId } = req.query;
        const sql = `CALL DeleteCertificateById(${certificateId}, ${consultantId})`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json(new ResponseDTO(200, 'Xóa chứng chỉ thành công'));
        });
    }
    async addConsultant(req, res) {
        const {
            email,
            first_name,
            last_name,
            pass_word,
            phone_number,
            address,
            birth_day,
            descriptions,
            avatar,
            checkedList,
            certificateList,
        } = req.body;
        const hashPassword = await bcrypt.hash(pass_word, 12);
        const checkConsultantEmail = `CALL GetConsultantByEmail('${email}')`;
        const addConsultantSql = `CALL AddConsultant('${email}', '${hashPassword}', N'${first_name}', N'${last_name}', '${phone_number}', N'${address}', '${birth_day}', N'${descriptions}', '${avatar}')`;
        db.query(checkConsultantEmail, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            if (result[0].length >= 1) {
                res.status(400).json(new ResponseDTO(400, 'Email đã được sử dụng. Vui lòng chọn email khác'));
                return;
            }
            db.query(addConsultantSql, (err, result) => {
                if (err) {
                    res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                    return;
                }
                const consultantId = result[0][0].id;
                checkedList.forEach((checkListItem, index) => {
                    const addConsultantCategorySql = `CALL AddConsultantCategory(${consultantId}, ${checkListItem.id})`;
                    db.query(addConsultantCategorySql, (err, result) => {
                        if (err) {
                            res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                            return;
                        }
                        if (index == checkedList.length - 1) {
                            certificateList.forEach((certificateItem, certificateIndex) => {
                                const addCertificateSql = `CALL AddCertificateByConsultantId(${consultantId}, '${certificateItem.certificate_type}', '${certificateItem.date_granted}')`;
                                db.query(addCertificateSql, (err, result) => {
                                    if (err) {
                                        res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                                        return;
                                    }
                                    if (certificateIndex == certificateList.length - 1) {
                                        res.status(200).json(new ResponseDTO(200, 'Thêm chuyên gia thành công'));
                                    }
                                });
                            });
                        }
                    });
                });
            });
        });
    }
    blockConsultant(req, res) {
        const consultantId = req.params.consultantId;
        const sql = `CALL BlockConsultantById(${consultantId})`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json(new ResponseDTO(200, 'Chặn chuyên gia thành công'));
        });
    }
    getAllRating(req, res) {
        const sql = `CALL GetAllRatingAdmin()`;
        const { pageSize, pageNumber } = req.query;
        const pageNumberResult = pageNumber == undefined ? 1 : pageNumber;
        const pageSizeResult = pageSize == undefined ? 5 : pageSize;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            const totalRows = result[0].length;
            const totalPages = Math.ceil(totalRows / pageSizeResult);
            if (pageNumberResult > totalPages) {
                res.status(400).json(new ResponseDTO(400, 'Số trang vượt quá tổng số trang,vui lòng nhập lại'));
                return;
            }
            const startIndex = (pageNumberResult - 1) * pageSizeResult;
            const endIndex = pageNumberResult * pageSizeResult;
            const resultArray = result[0].slice(startIndex, endIndex);
            const dataResult = {
                totalPages,
                pageSize: parseInt(pageSizeResult),
                pageNumber: parseInt(pageNumberResult),
                data: { ratingList: resultArray },
            };
            res.status(200).json(dataResult);
        });
    }
    deleteRatingById(req, res) {
        const ratingId = req.params.ratingId;
        const sql = `CALL DeleteRatingById(${ratingId})`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json(new ResponseDTO(200, 'Xóa đánh giá thành công'));
        });
    }
    getAllCategory(req, res) {
        const { pageSize, pageNumber } = req.query;
        const sql = `CALL GetAllCategory()`;
        handlePaginate(sql, 'categoryList', pageSize, pageNumber, res);
    }
    addCategory(req, res) {
        const { categoryName, descriptions, image } = req.body;
        const sql = `CALL AddCategory('${categoryName}', '${descriptions}', '${image}')`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json(new ResponseDTO(200, 'Thêm chuyên mục thành công'));
        });
    }
    getCategoryById(req, res) {
        const categoryId = req.params.categoryId;
        const sql = `CALL GetCategoryDetailById(${categoryId})`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json({ categoryInfo: result[0][0] });
        });
    }
    updateCategoryById(req, res) {
        const categoryId = req.params.categoryId;
        const { categoryName, descriptions, image } = req.body;
        const sql = `CALL UpdateCategoryDetail(${categoryId}, '${categoryName}', '${descriptions}', '${image}')`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json({ categoryInfo: result[0][0] });
        });
    }
    deleteCategoryById(req, res) {
        const categoryId = req.params.categoryId;
        const sql = `CALL DeleteCategoryById(${categoryId})`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json(new ResponseDTO(200, 'Xóa chuyên mục thành công'));
        });
    }
    getAllArticle(req, res) {
        const getArticleSql = 'CALL GetAllArticleAdmin()';
        const { pageSize, pageNumber } = req.query;
        const pageNumberResult = pageNumber == undefined ? 1 : pageNumber;
        const pageSizeResult = pageSize == undefined ? 5 : pageSize;
        db.query(getArticleSql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            const totalRows = result[0].length;
            const totalPages = Math.ceil(totalRows / pageSizeResult);
            if (pageNumberResult > totalPages) {
                res.status(400).json(new ResponseDTO(400, 'Số trang vượt quá tổng số trang,vui lòng nhập lại'));
                return;
            }
            const startIndex = (pageNumberResult - 1) * pageSizeResult;
            const endIndex = pageNumberResult * pageSizeResult;
            const resultData = [];
            const resultArray = result[0].slice(startIndex, endIndex);
            resultArray.forEach((item, index) => {
                let statusResponse = '';
                if (item.status == 0) statusResponse = 'Chưa phê duyệt';
                if (item.status == 1) statusResponse = 'Đã phê duyệt';
                const dataToPush = {
                    id: item.id,
                    title: item.title,
                    consultant_name: `${item.first_name} ${item.last_name}`,
                    category_name: item.name,
                    status: statusResponse,
                };
                resultData.push(dataToPush);
            });
            const dataResult = {
                totalPages,
                pageSize: parseInt(pageSizeResult),
                pageNumber: parseInt(pageNumberResult),
                data: { articleList: resultData },
            };
            res.status(200).json(dataResult);
        });
    }
    getArticleDetailById(req, res) {
        const articleId = req.params.articleId;
        const sql = `CALL GetArticleByArticleId(${articleId})`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            if (result[0][0].status === 0) result[0][0].status = 'Chưa phê duyệt';
            if (result[0][0].status === 1) result[0][0].status = 'Đã phê duyệt';
            res.status(200).json({ articleInfo: result[0][0] });
        });
    }
    updateArticleDetailById(req, res) {
        const articleId = req.params.articleId;
        const { categoryId, title } = req.body;
        const sql = `CALL UpdateArticleDetailById(${articleId}, ${categoryId}, N'${title}')`;
        db.query(sql, (err, result) => {
            if (err) {
                console.log('error');
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json(new ResponseDTO(200, 'Cập nhật thông tin chi tiết bài viết thành công'));
        });
    }
    deleteArticleById(req, res) {
        const articleId = req.params.articleId;
        const sql = `CALL DeleteArticleById(${articleId})`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json(new ResponseDTO(200, 'Xóa bài viết thành công'));
        });
    }
    getAllPost(req, res) {
        const { pageSize, pageNumber } = req.query;
        const sql = `CALL GetAllPostAdmin()`;
        handlePaginate(sql, 'postList', pageSize, pageNumber, res);
    }
    deletePostById(req, res) {
        const postId = req.params.postId;
        const sql = `CALL DeletePostById(${postId})`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json(new ResponseDTO(200, 'Xóa bài đăng thành công'));
        });
    }
    getListAllCategory(req, res) {
        const sql = `CALL GetAllCategory()`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json({ categoryList: result[0] });
        });
    }
    adminLogin(req, res) {
        const { email, pass_word } = req.body;
        const sql = `CALL GetAdminByEmail('${email}')`;
        db.query(sql, async (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            if (result[0].length < 1) {
                res.status(400).json(new ResponseDTO(400, 'Tên đăng nhập hoặc mật khẩu không đúng'));
                return;
            }
            const success = await bcrypt.compare(pass_word, result[0][0].password);
            if (!success) {
                res.status(400).json(new ResponseDTO(400, 'Tên đăng nhập hoặc mật khẩu không đúng'));
                return;
            }
            const dataToSend = {
                adminId: result[0][0].id,
                email: result[0][0].username,
            };
            res.status(200).json({ adminInfo: dataToSend });
        });
    }
}

module.exports = new AdminController();
