import catchAsync from '../../../util/catchAsync';
import apiError from '../util/apiError';
import {Request, Response} from "express";

import {ERROR_MSG_NOTHING_FOUND} from "../../../constants";
import {generateFilePath} from "../util/generateFilePath";
import {readFileSync} from "node:fs";

interface IReqParams {
    status: string,
    to: string,
    path: string,
    pDir: string
}

export const mockHandler = async (req: Request, res: Response, next): Promise<void> => {
    const {status, to, path, pDir}: IReqParams = req.query;
    const mockPath = path.length ? generateFilePath(path, pDir) : null;
    let fileCnt;

    if (mockPath) {
        try {
            fileCnt = readFileSync(mockPath, 'utf8');
        } catch (err) {
            apiError({
                res,
                err,
                status: 404,
                msg: ERROR_MSG_NOTHING_FOUND,
            });
        }
    }

    await res.setTimeout(Number(to));
    res.status(Number(status))
    fileCnt && res.json(JSON.parse(fileCnt))

    res.send();
};

export const mockController = catchAsync(mockHandler);
