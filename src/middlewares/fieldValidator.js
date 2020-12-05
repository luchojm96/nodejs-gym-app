const { response } = require('express');
const { validationResult } = require('express-validator');

const fieldValidator = (req, res = response, next) => {
	// Manejo de errores
	const err = validationResult(req);

	if (!err.isEmpty()) {
		return res.status(400).json({
			ok: false,
			errors: err.mapped(),
		});
	}

	next();
};

module.exports = {
	fieldValidator,
};
