const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.DB_CONN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});

		console.log('Database is connected');
	} catch (err) {
		console.log(err);
		throw new Error('Error, database could not be connected');
	}
};

module.exports = {
	dbConnection,
};
