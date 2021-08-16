import { NextFunction, Request, Response } from 'express';
import IndexService from '../services/index.service';
import ApiResponse from '../responses/ApiResponse';

class IndexController {
    private indexService = new IndexService();
    public createMeeting = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const createdMeeting = await this.indexService.createMeeting(
                req.body
            );
            const resp: ApiResponse = new ApiResponse({
                success: true,
                message: 'Operation successful',
                data: createdMeeting
            });
            res.status(200).json(resp);
        } catch (error) {
            next(error);
        }
    };

    public joinMeeting = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const joinedMeeting = await this.indexService.joinMeeting(
                req.body
            );
            const resp: ApiResponse = new ApiResponse({
                success: true,
                message: 'Operation successful',
                data: joinedMeeting 
            });
            res.status(200).json(resp);
        } catch (error) {
            next(error);
        }
    };               
}

export default IndexController;