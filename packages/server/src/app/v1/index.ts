import {Router} from 'express';
import {mockController} from "./controller/mockController";

const router = Router();

router.route(/^\/mock/).all(mockController);

export default router;
