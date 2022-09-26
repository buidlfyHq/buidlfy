import App from '@/app';
import DeploymentsRoute from '@routes/deployments.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new DeploymentsRoute()]);

app.listen();
