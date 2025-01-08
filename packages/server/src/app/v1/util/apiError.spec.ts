import apiError from './apiError';

describe('apiError', () => {
    const response = 'foo';
    const mockError = 'bar';
    const mockJson = jest.fn(() => response);
    const mockStatus = jest.fn(() => ({
        json: mockJson,
    }));
    const mockRes: any = {
        status: mockStatus,
    };
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should send an API error response with default values', () => {
        // Arrange
        const errorMessage = 'Default error message';
        const errorCode = 500;

        // Act
        const result = apiError({
            res: mockRes,
            msg: errorMessage,
            err: mockError,
        });

        // Assert
        expect(result).toBe(response);
        expect(mockStatus).toHaveBeenCalledWith(500);
        expect(mockJson).toHaveBeenCalledWith({
            msg: errorMessage,
            code: errorCode,
        });
    });

    it('should send an API error response with custom values', () => {
        // Arrange
        const errorMessage = 'Custom error message';
        const errorCode = 404;
        const errorStatus = 404;

        // Act
        const result = apiError({
            res: mockRes,
            msg: errorMessage,
            err: mockError,
            code: errorCode,
            status: errorStatus,
        });

        // Assert
        expect(result).toBe(response);
        expect(mockStatus).toHaveBeenCalledWith(errorStatus);
        expect(mockJson).toHaveBeenCalledWith({
            msg: errorMessage,
            code: errorCode,
        });
    });
});
