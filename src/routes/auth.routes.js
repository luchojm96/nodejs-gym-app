const { Router } = require('express');
const { check } = require('express-validator');

const { signUp, signIn, renewToken } = require('../controllers/auth.controller');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');

const router = Router();

router.post(
	'/new',
	[
		check('name', 'The name is required').trim().not().isEmpty(),
		check('surname', 'The surname is required').trim().not().isEmpty(),
		check('email', 'The email is required').trim().isEmail(),
		check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
		fieldValidator,
	],
	signUp
);

router.post(
	'/',
	[
		check('email', 'The email is required').trim().isEmail(),
		check('password', 'The password must be at least 6 characters').isLength({ min: 6 }),
		fieldValidator,
	],
	signIn
);

router.get('/renew', jwtValidator, renewToken);

module.exports = router;
