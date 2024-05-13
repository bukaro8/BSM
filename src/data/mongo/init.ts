import mongoose from 'mongoose';

interface ConnectOptions {
	mongoUrl: string;
	dbName: string;
}
export const MongoDatabase = async (options: ConnectOptions) => {
	const { mongoUrl, dbName } = options;
	try {
		await mongoose.connect(mongoUrl, {
			dbName,
		});
		console.log(`Mongo Connected!`);
	} catch (error) {
		console.error('Mongo Connection Error');
		throw error;
	}
};
