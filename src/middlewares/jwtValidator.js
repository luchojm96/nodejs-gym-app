const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const jwtValidator = (req = request, res = response, next) => {
	const token = req.header('x-token');

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: 'Token was not provided',
		});
	}

	try {
		const { id, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

		req.id = id;
		req.name = name;
	} catch (err) {
		return res.status(401).json({
			ok: false,
			msg: 'Invalid or expired token',
		});
	}

	next();
};

module.exports = {
	jwtValidator,
};
