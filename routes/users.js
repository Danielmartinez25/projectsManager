const express = require('express');
const router = express.Router();

const {profile} = require('../controllers/usersController')

/* /api/users */
router.get('/', profile);

module.exports = router;
