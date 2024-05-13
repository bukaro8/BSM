import app from './app';
import { envs } from './config/plugins/envs/envs.plugin';
import { MongoDatabase } from './data';

const MongoConnection = async () => {
	await MongoDatabase({
		mongoUrl: envs.MONGO_URL,
		dbName: envs.MONGO_NAME,
	});
};

app.listen(envs.PORT, () => {
	MongoConnection();
	console.log(`Running on port ${envs.PORT}`);
});
