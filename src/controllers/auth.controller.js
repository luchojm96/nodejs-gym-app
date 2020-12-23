const { response } = require('express');
const bcrypt = require('bcryptjs');

const { User } = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const signUp = async (req, res = response) => {
	try {
		const { email, password } = req.body;
		let user = await User.findOne({ where: { email } })

		if (user) {
			return res.status(400).json({
				ok: false,
				msg: 'There is already a registered user with that email',
			});
		}

		user = User.build(req.body);
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);
		await user.save();

		const token = await generateJWT(user.id, user.name);

		return res.status(201).json({
			ok: true,
			msg: 'Successfully registered',
			id: user.id,
			name: user.name,
			token,
		});
	} catch (err) {
		return res.status(500).json({
			ok: false,
			msg: err.message,
		});
	}
};

const signIn = async (req, res = response) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(400).json({
				ok: false,
				msg: 'There is no user with that email',
			});
		}

		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Password is incorrect',
			});
		}

		const token = await generateJWT(user.id, user.name);

		return res.json({
			ok: true,
			msg: 'Successfully logged',
			id: user.id,
			name: user.name,
			token,
		});
	} catch (err) {
		return res.status(500).json({
			ok: false,
			msg: err.message,
		});
	}
};

const renewToken = async (req, res = response) => {
	const { id, name } = req;

	const token = await generateJWT(id, name);

	return res.json({
		ok: true,
		msg: 'Token successfully renewed',
		token,
	});
};

module.exports = {
	signUp,
	signIn,
	renewToken,
};
