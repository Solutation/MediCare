class ResponseDTO {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    init() {
        return { code: this.code, message: this.message };
    }
}

module.exports = ResponseDTO;
