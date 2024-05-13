import { MongoDatabase } from '.';

import { envs } from '../config/plugins/envs/envs.plugin';
import { UserModel } from './mongo/models/user.model';

(async () => {
	await MongoDatabase({
		mongoUrl: envs.MONGO_URL,
		dbName: envs.MONGO_NAME,
	});
})();

//? Delete previous data
const deleteData = async () => {
	try {
		await UserModel.deleteMany();
		console.log('Data Successfully Deleted!🙀');
		process.exit();
	} catch (error) {
		console.log(error);
		process.exit();
	}
};
deleteData();
