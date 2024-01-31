const { getAll, postImage } = require('../controllers/image.controllers');
const express = require('express');
const upload = require('../utils/multer');
const { remove } = require('../controllers/image.controllers');
const verifyJWT = require('../utils/verifyJWT')


const imageRouter = express.Router();

imageRouter.route('/images')
    .get(getAll)
    .post(verifyJWT, upload.single('image'), postImage);

imageRouter.route('/images/:id')
		.delete(verifyJWT, remove)



module.exports = imageRouter;