import catchAsync from '../../../util/catchAsync';
import apiError from '../util/apiError';

import {ERROR_MSG_NOTHING_FOUND} from "../../../constants";

export const mockHandler = async (req, res): Promise<void> => {
    try {
        res.status(201).json({
            status: 'w  -jeyyy!',
        });
    }
    catch (err) {
        apiError({
            res,
            err,
            status: 404,
            msg: ERROR_MSG_NOTHING_FOUND,
        });
    }
};

export const mock = catchAsync(mockHandler);
