import dotenv from 'dotenv';

dotenv.config();

export const API_URL = process.env.API_URL || '127.0.0.1';
export const API_PORT = process.env.API_PORT || 1323;

export const ERROR_MSG_NOTHING_FOUND = 'Something went wrong! Please check your manifest.json and reimport ist to the browser plugin!'