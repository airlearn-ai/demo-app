import { cleanEnv, port, str, num } from 'envalid';

function validateEnv() {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        PORT: port(),

        AMS_URL: str(),
        CLIENT_ID: str(),
        CLIENT_SECRET: str(),
    });
}

export default validateEnv;
