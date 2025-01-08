import logger from '../../../util/logger';

export interface IApiError {
    res: any
    msg: string,
    code?: number,
    status?: number,
    err?: string,
}

const apiError = ({ res, msg, err, code = 500, status = 500 }: IApiError) => {
    logger.error(err);

    return res.status(status).json({
        msg,
        code,
    });
};

export default apiError;
