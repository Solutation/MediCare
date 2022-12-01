const db = require('../config/mysqlConfig');
const ResponseDTO = require('../dto/ResponseDTO');
const reactionList = require('../utils/ReactionUtils');

class CommunityController {
    getReactionList(req, res) {
        res.status(200).json({ reactionList });
    }
    getReactionListByPostId(req, res) {
        const { postId } = req.query;
        let dataResult = [];
        reactionList.forEach((reactionItem, index) => {
            let sql = `CALL GetTotalReactionByTypeAndPostId(${reactionItem.id}, ${postId})`;
            db.query(sql, (err, result) => {
                if (err) {
                    res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                    return;
                }
                const data = { id: reactionItem.id, image: reactionItem.image, count: result[0].length };
                dataResult.push(data);
                if (index == reactionList.length - 1) {
                    res.status(200).json({ reactionList: dataResult });
                }
            });
        });
    }
    getPostByCategoryId(req, res) {
        const { userId, categoryId } = req.query;
        const postSql = `CALL GetPostByCategoryId(${categoryId})`;
        const dataResult = [];
        db.query(postSql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            const postLength = result[0].length;
            result[0].forEach((post, index) => {
                let imagePostSql = `CALL GetImagePostByPostId(${post.id})`;
                let commentPostSql = `CALL GetCommentByPostId(${post.id})`;
                const reactionCount = `CALL GetReactionByPostId(${post.id})`;
                db.query(imagePostSql, (err, result) => {
                    if (err) {
                        res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                        return;
                    }
                    let imagePost = result[0];
                    db.query(reactionCount, (err, result) => {
                        if (err) {
                            res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                            return;
                        }
                        let userAccessReaction = result[0].find(
                            (item) => item.user_id == userId && item.post_id == post.id
                        );
                        let reactionCount = result[0].length;
                        db.query(commentPostSql, (err, result) => {
                            if (err) {
                                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                                return;
                            }
                            let commentPost = result[0];
                            let commentCount = commentPost.length;
                            let data = {
                                post,
                                imagePost,
                                commentPost,
                                userAccessReaction,
                                reactionCount,
                                commentCount,
                            };
                            dataResult.push(data);
                            if (index == postLength - 1) {
                                res.status(200).json({ postList: dataResult });
                            }
                        });
                    });
                });
            });
        });
    }
    getPostAllCategory(req, res) {
        const { userId } = req.query;
        const postSql = `CALL GetAllPost()`;
        const dataResult = [];
        db.query(postSql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            const postLength = result[0].length;
            result[0].forEach((post, index) => {
                let imagePostSql = `CALL GetImagePostByPostId(${post.id})`;
                let commentPostSql = `CALL GetCommentByPostId(${post.id})`;
                const reactionCount = `CALL GetReactionByPostId(${post.id})`;
                db.query(imagePostSql, (err, result) => {
                    if (err) {
                        res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                        return;
                    }
                    let imagePost = result[0];
                    db.query(reactionCount, (err, result) => {
                        if (err) {
                            res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                            return;
                        }
                        let userAccessReaction = result[0].find(
                            (item) => item.user_id == userId && item.post_id == post.id
                        );
                        let reactionCount = result[0].length;
                        db.query(commentPostSql, (err, result) => {
                            if (err) {
                                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                                return;
                            }
                            let commentPost = result[0];
                            let commentCount = commentPost.length;
                            let data = {
                                post,
                                imagePost,
                                commentPost,
                                userAccessReaction,
                                reactionCount,
                                commentCount,
                            };
                            dataResult.push(data);
                            if (index == postLength - 1) {
                                res.status(200).json({ postList: dataResult });
                            }
                        });
                    });
                });
            });
        });
    }
    handleReactionByPost(req, res) {
        const { userId, postId, typeReaction } = req.query;
        const checkUserReactionSql = `CALL GetUserReactionByPost(${userId}, ${postId})`;
        db.query(checkUserReactionSql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            if (result[0].length >= 1) {
                const updateReactionSql = `CALL UpdateReactionByUserIdAndPostId(${userId}, ${postId}, ${typeReaction})`;
                db.query(updateReactionSql, (err, result) => {
                    if (err) {
                        res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                        return;
                    }
                    res.status(200).json(new ResponseDTO(200, 'Cập nhật reaction thành công!'));
                });
            } else {
                const addReactionSql = `CALL AddReaction(${userId}, ${postId}, ${typeReaction})`;
                db.query(addReactionSql, (err, result) => {
                    if (err) {
                        res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                        return;
                    }
                    res.status(200).json(new ResponseDTO(200, 'Thêm reaction thành công!'));
                });
            }
        });
    }
    handleDeleteReactionByPost(req, res) {
        const { postId, userId } = req.body;
        const sql = `CALL DeleteReactionByPostIdAndUSerId(${parseInt(postId)}, ${parseInt(userId)})`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json(
                new ResponseDTO(200, `Xóa reaction với postId ${postId} và userId ${userId} thành công`)
            );
        });
    }
    getUserReactionTypeByPost(req, res) {
        const { userId, postId, typeReaction } = req.query;
        const sql = `CALL GetUserReactionTypeByPostIdAndUserId(${parseInt(postId)}, ${parseInt(userId)}, ${parseInt(
            typeReaction
        )})`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json({ reactionTypeData: result[0] });
        });
    }
    addCommentPost(req, res) {
        const { postId, userId, categoryId, content } = req.query;
        if (content == undefined || content == '') {
            res.status(400).json(new ResponseDTO(400, 'Vui lòng nhập nội dung bình luận của bạn'));
            return;
        }
        const sql = `CALL AddCommentByPostIdAndUserId(${postId}, ${userId}, ${categoryId}, '${content}')`;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            res.status(200).json(new ResponseDTO(200, 'Thêm bình luận thành công!'));
        });
    }
    addPostByCategoryId(req, res) {
        const { userId, categoryId, content, imageListResult } = req.body;
        if (content == undefined || content == '') {
            res.status(400).json(new ResponseDTO(400, 'Vui lòng nhập nội dung bài đăng của bạn'));
            return;
        }
        const addPostSql = `CALL AddPostByUserIdAndCategoryId(${userId}, ${categoryId}, '${content}')`;
        db.query(addPostSql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            let postId = result[0][0].id;
            if (imageListResult && imageListResult.length >= 1) {
                imageListResult.forEach((imageItem, index) => {
                    const imageSql = `CALL AddImagePostByPostId(${postId}, '${imageItem.name}')`;
                    db.query(imageSql, (err, result) => {
                        if (index == imageListResult.length - 1) {
                            res.status(200).json(new ResponseDTO(200, 'Thêm bài đăng và ảnh thành công'));
                            return;
                        }
                    });
                });
            } else {
                console.log(2);
                res.status(200).json(new ResponseDTO(200, 'Thêm bài đăng thành công'));
                return;
            }
        });
    }
    handlePostCountAndReactCount(req, res) {
        const { userId } = req.query;
        const postCountSql = `CALL GetTotalPostByUserId(${userId})`;
        const reactionPostCountSql = `CALL GetTotalPostReactionByUserId(${userId})`;
        db.query(postCountSql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            let totalPost = result[0][0].count;
            db.query(reactionPostCountSql, (err, result) => {
                if (err) {
                    res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                    return;
                }
                let totalReaction = result[0][0].count;
                res.status(200).json({ totalPost, totalReaction });
            });
        });
    }
    getAllPostByUserId(req, res) {
        const { userId } = req.query;
        const postSql = `CALL GetListPostByUserId(${userId})`;
        const dataResult = [];
        db.query(postSql, (err, result) => {
            if (err) {
                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                return;
            }
            const postLength = result[0].length;
            result[0].forEach((post, index) => {
                let imagePostSql = `CALL GetImagePostByPostId(${post.id})`;
                let commentPostSql = `CALL GetCommentByPostId(${post.id})`;
                const reactionCount = `CALL GetReactionByPostId(${post.id})`;
                db.query(imagePostSql, (err, result) => {
                    if (err) {
                        res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                        return;
                    }
                    let imagePost = result[0];
                    db.query(reactionCount, (err, result) => {
                        if (err) {
                            res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                            return;
                        }
                        let userAccessReaction = result[0].find(
                            (item) => item.user_id == userId && item.post_id == post.id
                        );
                        let reactionCount = result[0].length;
                        db.query(commentPostSql, (err, result) => {
                            if (err) {
                                res.status(500).json(new ResponseDTO(500, 'Lỗi trong quá trình xử lý'));
                                return;
                            }
                            let commentPost = result[0];
                            let commentCount = commentPost.length;
                            let data = {
                                post,
                                imagePost,
                                commentPost,
                                userAccessReaction,
                                reactionCount,
                                commentCount,
                            };
                            dataResult.push(data);
                            if (index == postLength - 1) {
                                res.status(200).json({ postList: dataResult });
                            }
                        });
                    });
                });
            });
        });
    }
}

module.exports = new CommunityController();
