import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import * as morgan from 'morgan';
import * as swaggerUi from 'swagger-ui-express';
import * as bodyParser from 'body-parser';
import * as promBundle from 'express-prom-bundle';
import Route from './interfaces/routes.interface';
import * as log4jsConfig from '../log4js.json';
import errorMiddleware from './middlewares/error.middleware'
import { getLogger, configure } from 'log4js';
const path = require('path');
configure(log4jsConfig);
const logger = getLogger('App');

const metricsMiddleware = promBundle({
    includeMethod: false,
    includePath: true
});

class App {
    public app: express.Application;
    public port: string | number;
    public env: boolean;

    constructor(routes: Route[]) {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.env = process.env.NODE_ENV === 'production' ? true : false;

        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeReactRouteHandling();
        this.initializeErrorHandling();
        
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`🚀 App listening on the port ${this.port}`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        this.app.use(express.static(path.join(__dirname, "..", "..", "app", "build")));
        if (this.env) {
            this.app.use(hpp());
            this.app.use(helmet());
            this.app.use(morgan('combined'));
            this.app.use(
                cors({
                    origin: '*',
                    credentials: true
                })
            );
        } else {
            this.app.use(morgan('dev'));
            this.app.use(cors({ origin: true, credentials: true }));
        }
        this.app.use(bodyParser.json({ limit: '5mb' })); // support json encoded bodies
        this.app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
        this.app.use(metricsMiddleware);
        this.app.use(express.json());
    }

    private initializeRoutes(routes: Route[]) {
        routes.forEach((route) => {
            if (route.path === '/') {
                this.app.use('/', route.router); // for serving react app
            }
            this.app.use('/api/', route.router);
        });
    }

    private initializeReactRouteHandling() {
        this.app.use('*', (req, res, next) => {
            res.sendFile(path.join(__dirname, "..", "..", "app", "build", "index.html"));
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
}

export default App;