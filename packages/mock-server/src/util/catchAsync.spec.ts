import catchAsync from './catchAsync'; // Replace with the actual import path
import logger from './logger';

jest.mock('./logger', jest.fn(() => ({
    error: jest.fn,
})));

describe('catchAsync', () => {
    it('should call the provided function and call next on success', async () => {
        // Arrange
        const req: any = {};
        const res: any = {};
        const next: any = jest.fn();
        const successFn = jest.fn().mockResolvedValueOnce('Success');

        // Act
        const asyncMiddleware = catchAsync(successFn);
        await asyncMiddleware(req, res, next);

        // Assert
        expect(successFn).toHaveBeenCalledWith(req, res, next);
    });

    it('should call the provided function and call next with an error on failure', async () => {
        // Arrange
        const req: any = {};
        const res: any = {};
        const next: any = jest.fn();
        const errorFn = jest.fn().mockRejectedValueOnce('Error');

        // Act
        const asyncMiddleware = catchAsync(errorFn);
        await asyncMiddleware(req, res, next);

        // Assert
        expect(errorFn).toHaveBeenCalledWith(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith('Error');
    });

    it('should log the error in non-production environment', async () => {
        const req: any = {};
        const res: any = {};
        const next: any = jest.fn();
        const error = new Error('Error');
        const errorFn = jest.fn().mockRejectedValueOnce(error);
        const loggerErrorSpy = jest.spyOn(logger, 'error');

        // Act
        const asyncMiddleware = catchAsync(errorFn);
        await asyncMiddleware(req, res, next);

        // Assert
        expect(errorFn).toHaveBeenCalledWith(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
        expect(loggerErrorSpy).toHaveBeenCalledWith(error); // Should log the error
        expect(loggerErrorSpy).toHaveBeenCalledTimes(1);

        // Clean up spy
        loggerErrorSpy.mockRestore();
    });
});
