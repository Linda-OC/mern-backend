const multer = require('multer');
//const { v1: uuidv1 } = require('uuid');
const uuid = require('uuid').v1;

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jng'
};
const fileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images');
        },
        filename: (req, file, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, uuid() + '.' + ext);
            console.log('fileUpload.storage.destination = ', fileUpload.storage.destination);
            console.log('fileUpload.storage.filename = ', fileUpload.storage.filename);
            console.log('req=', req);
            console.log('file=', file);

        }
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error('Invalid mime type');
        cb(error, isValid);
    }
});

module.exports = fileUpload;