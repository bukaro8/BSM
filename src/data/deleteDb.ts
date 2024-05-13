import { MongoDatabase } from '.';
import { TourModel } from './mongo/models';
import { envs } from '../config/plugins/envs/envs.plugin';

(async () => {
	await MongoDatabase({
		mongoUrl: envs.MONGO_URL,
		dbName: envs.MONGO_NAME,
	});
})();

//? Delete previous data
const deleteData = async () => {
	try {
		await TourModel.deleteMany();
		console.log('Data Successfully Deleted!🙀');
		process.exit();
	} catch (error) {
		console.log(error);
		process.exit();
	}
};
deleteData();
