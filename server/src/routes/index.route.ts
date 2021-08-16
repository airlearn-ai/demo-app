import { Router } from 'express';
import IndexController from '../controllers/index.controller';
import Route from '../interfaces/routes.interface';

class IndexRoute implements Route {
    public path = '/';
    public router = Router();
    public indexController = new IndexController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}createMeeting`, this.indexController.createMeeting);
        this.router.post(`${this.path}joinMeeting`, this.indexController.joinMeeting);
    }
}

export default IndexRoute;