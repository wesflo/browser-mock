import catchAsync from '../../../util/catchAsync';
import apiError from '../util/apiError';
import {Request, Response} from "express";

import {ERROR_MSG_NOTHING_FOUND} from "../../../constants";
import {generateFilePath} from "../util/generateFilePath";
import {readFileSync} from "node:fs";
import {toPromise} from "../util/toPromise";

interface IReqParams {
    status: string,
    to: string,
    path: string,
    pDir: string
}

export const mockHandler = async (req: Request, res: Response, next): Promise<void> => {
    try {
        const {status, to, path, pDir}: IReqParams = req.query;
        if(path.length) {
            const mockPath = generateFilePath(path, pDir);
            const [fileCnt] = await Promise.all([
                readFileSync(mockPath, 'utf8'),
                toPromise(to)
            ])

            await req.setTimeout(Number(to))

            const respObj = typeof fileCnt.value === 'object' && Object.keys(fileCnt).length === 1 ? fileCnt.value : fileCnt

            res.status(Number(status)).json(JSON.parse(respObj));
            return
        }

        res.status(Number(status)).send();
    } catch (err) {
        apiError({
            res,
            err,
            status: 404,
            msg: ERROR_MSG_NOTHING_FOUND,
        });
    }
};

export const mockController = catchAsync(mockHandler);
