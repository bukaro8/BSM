// const fs = require('fs');
// import { MongoDatabase } from './mongo';

// import { envs } from '../config/plugins/envs/envs.plugin';

// const mockData = JSON.parse(
// 	fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
// );

// (async () => {
// 	await MongoDatabase({
// 		mongoUrl: envs.MONGO_URL,
// 		dbName: envs.MONGO_NAME,
// 	});
// })();

// //? Insert mock data
// const loadData = async () => {
// 	try {
// 		await TourModel.create(mockData);
// 		console.log('mock data successfully loaded! 😃✨');
// 		process.exit();
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
// const deleteData = async () => {
// 	try {
// 		await TourModel.deleteMany();
// 		console.log('Data Successfully Deleted!🙀');
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// deleteData();

// setTimeout(() => {
// 	loadData();
// }, 1000);
