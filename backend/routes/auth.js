// const express = require('express');
// const { signup, login } = require('../controllers/authController');
// const router = express.Router();

// router.post('/signup', signup);
// router.post('/login', login);

// module.exports = router;



// routes/auth.js
const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;