import express from 'express';
import {mockController} from "./controller/mockController";

const router = express.Router();

router.route(/^\/mock/).all(mockController);

export default router;
