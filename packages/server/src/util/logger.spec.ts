import logger, {
    loggerOptions,
    enumerateErrorFormat,
} from './logger';
import { createLogger } from 'winston';

jest.mock('winston', () => ({
    ...jest.requireActual('winston'),
    createLogger: jest.fn(),
}));

describe('Logger', () => {
    it('should create a logger with the correct default level', () => {
        logger;

        expect(createLogger).toBeCalledWith(loggerOptions);
    });
    it('should create the correct options', () => {
        expect(loggerOptions.level).toBe('info');
    });
});
