
import {
    format,
    createLogger,
    transports,
} from 'winston';

// TODO: tmp implementation till Prometheus
export const enumerateErrorFormat = format(info => {
    if (info instanceof Error) {
        info.message = info.stack;
    }

    return info;
});

export const loggerOptions = {
    level: 'info',
    format: format.combine(
        enumerateErrorFormat(),
        format.colorize(),
        format.splat(),
        format.printf(({ level, message }) => `${level}: ${message}`)
    ),
    transports: [
        new transports.Console({
            stderrLevels: ['error'],
        }),
    ],
};

const logger = createLogger(loggerOptions);
export default logger;
