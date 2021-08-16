import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import ApiResponse from '../responses/ApiResponse';

import { getLogger } from 'log4js';
const logger = getLogger('ErrorMiddleware');

function errorMiddleware(
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';

    logger.error('Status', status, 'message', message);

    const resp: ApiResponse = new ApiResponse({
        success: false,
        errorCode: status,
        message: message,
        data: null
    });
    res.status(status).json(resp);
}

export default errorMiddleware;