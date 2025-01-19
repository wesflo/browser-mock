import * as express from "express";
import helmet from "helmet";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import router_v1 from './v1';

const app = express();
app.use((req, res, next) => {
    res.setHeader('Cache-control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Security-Policy', 'script-src \'sha256-n8bqUidM8/C+OIZXDnAivV4oVAVtSK2nYW6iJgUSbSM=\'');
    next();
});
app.disable('x-powered-by');
app.use(helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            'script-src': ['\'self\'', '\'unsafe-inline\''], // allow inline js and JS from same origin
        },
    },
}));
app.use(compression());
app.use(cors({}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/v1', router_v1);
app.use('/latest', router_v1);
app.get('/ping', async (req, res) => {
    res.status(200).json({
        status: 'pong',
    })
});
app.use((req, res, next) => {
    res.status(404).send('Mock not found!');
});

export default app;
