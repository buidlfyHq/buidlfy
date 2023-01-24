import App from '@/app';
import validateEnv from '@utils/validateEnv';
import DeploymentsRoute from '@routes/deployments.route';
import HealthRoute from '@/routes/health.route';
import UploadRoute from '@/routes/upload.route';
import AuthRoute from '@/routes/auth.route';

validateEnv();

const app = new App([new DeploymentsRoute(), new UploadRoute(), new HealthRoute(), new AuthRoute()]);

app.listen();
