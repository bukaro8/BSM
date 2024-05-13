const fs = require('fs');

import { envs } from '../config/plugins/envs/envs.plugin';
import { MongoDatabase } from './mongo/init';
import { UserModel } from './mongo/models/user.model';

const mockData = JSON.parse(
	fs.readFileSync(`${__dirname}/mockUsers.json`, 'utf-8')
);

(async () => {
	await MongoDatabase({
		mongoUrl: envs.MONGO_URL,
		dbName: envs.MONGO_NAME,
	});
})();

//? Insert mock data
const loadData = async () => {
	try {
		await UserModel.create(mockData);
		console.log('mock data successfully loaded! 😃✨');
		process.exit();
	} catch (error) {
		console.log(error);
	}
};
const deleteData = async () => {
	try {
		await UserModel.deleteMany();
		console.log('Data Successfully Deleted!🙀');
	} catch (error) {
		console.log(error);
	}
};

deleteData();

setTimeout(() => {
	loadData();
}, 1000);
