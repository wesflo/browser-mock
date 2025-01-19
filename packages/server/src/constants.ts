import * as dotenv from 'dotenv';

dotenv.config();

export const API_PORT = process.env.API_PORT || 2313;

export const ERROR_MSG_NOTHING_FOUND = 'Something went wrong! Please check your manifest.json and reimport ist to the browser plugin!'