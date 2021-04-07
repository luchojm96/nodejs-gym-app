const { Router } = require('express');
const { check } = require('express-validator');

const {
  signUp,
  signIn,
  renewToken,
} = require('../controllers/auth.controller');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');

const router = Router();

router.post(
  '/new',
  [
    check('username', 'The username is required').trim().not().isEmpty(),
    check('email', 'The email is required').trim().isEmail(),
    check('password', 'The password must be at least 8 characters').isLength({
      min: 8,
    }),
    check('type', 'The type is required').not().isEmpty(),
    fieldValidator,
  ],
  signUp
);

router.post(
  '/',
  [
    check('email', 'The email is required').trim().isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    fieldValidator,
  ],
  signIn
);

router.get('/renew', jwtValidator, renewToken);

module.exports = router;
