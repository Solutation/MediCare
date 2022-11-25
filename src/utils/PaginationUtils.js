const db = require('../config/mysqlConfig');

function handlePaginate(tableName, pageSize, pageNumber) {
    const sql = `Select COUNT(*) as count from ${tableName}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        const dataResult = {};
        const totalRows = result[0].length;
        const totalPages = Math.ceil(totalRows / pageSize);
        let skipValue = 0;
        if (pageNumber > totalPages) return dataResult;
        if (pageNumber > 1) skipValue = (pageNumber - 1) * pageSize;
        dataResult = { totalPages, pageSize, pageNumber, skipValue };
        return dataResult;
    });
}

module.exports = handlePaginate;
