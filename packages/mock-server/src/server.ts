import app from './app';
import { API_PORT } from './constants';
import logger from './util/logger';

const server = app.listen(API_PORT, () => {
    logger.info(`Listening to port: ${API_PORT}`);
});

const exitHandler = () => {
    server && server.close(() => {
        logger.error('Server closed');
    });

    logger.error('process exit');
};

const unexpectedErrorHandler = error => {
    logger.error('unexpectedErrorHandler', error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    server && server.close();
});

