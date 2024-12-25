import {MODE_DEV} from "../../constant";

const getItem = async (key: string) => {
    if(import.meta.env.MODE === MODE_DEV) {
        const item = window.sessionStorage.getItem(key)
        return item ? JSON.parse(item) : null;
    }

    const data = await chrome.storage.local.get();
    return data? data[key] : null;
}

const setItem = async (key: string, data: Object) => {
    if(import.meta.env.MODE === MODE_DEV) {
        return window.sessionStorage.setItem(key, JSON.stringify(data));
    }

    return await chrome.storage.local.set({[key]: data});
}

export const getStorageItem = async (key: string) => {
    return  await getItem(key) || {};
}

export const setStorageItem = async (key: string, obj: Object) => {
    return await setItem(key, obj);
}

export const mergeStorageItem = async (key: string, obj: Object) => {
    const sItem = await getStorageItem(key);

    return await setStorageItem(key, {
        ...sItem,
        ...obj,
    });
}

export const removeStorageItem = async (key: string) => {
    if(import.meta.env.MODE === MODE_DEV) {
        return window.sessionStorage.removeItem(key);
    }

    return await chrome.storage.local.remove(key);
}