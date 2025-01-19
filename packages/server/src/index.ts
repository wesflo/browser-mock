#!/usr/bin/env node

import app from './app';
import { API_PORT } from './constants';
import logger from './util/logger';
import * as yargs from 'yargs';

const argv: any = yargs.option('port', {
    alias: 'p',
    type: 'number',
    describe: 'Port für den Mock-Server',
    default: API_PORT,
}).argv;

const server = app.listen(argv.port, () => {
    logger.info(`Listening to port: ${argv.port}`);
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

