import App from '@/app';
import DeploymentsRoute from '@routes/deployments.route';
import validateEnv from '@utils/validateEnv';
import UploadRoute from './routes/upload.route';

validateEnv();

const app = new App([new DeploymentsRoute(), new UploadRoute()]);

app.listen();
