import express from 'express';
import {ROUTE_MOCK} from "./constants";
import {mock} from "./controller/mock";

const router = express.Router();

router.route(ROUTE_MOCK).get(mock);

export default router;
