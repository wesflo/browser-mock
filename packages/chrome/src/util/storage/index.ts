import {MODE_DEV} from "../../constant";

const getItem = (key: string) => {
    if (import.meta.env.MODE === MODE_DEV) {
        const item = window.sessionStorage.getItem(key)
        return item ? JSON.parse(item) : null;
    }

    const data = chrome.storage.local.get();
    return data ? data[key] : null;
}

const setItem = (key: string, data: Object) => {
    if (import.meta.env.MODE === MODE_DEV) {
        return window.sessionStorage.setItem(key, JSON.stringify(data));
    }

    return chrome.storage.local.set({[key]: data});
}

export const getStorageItem = (key: string, fallback = {}) => {
    return getItem(key) || fallback;
}

export const setStorageItem = (key: string, obj: Object) => {
    return setItem(key, obj);
}

export const mergeStorageItem = (key: string, obj: Object) => {
    const sItem = getStorageItem(key);

    return setStorageItem(key, {
        ...sItem,
        ...obj,
    });
}

export const deleteFromStorageItem = (sKey: string, oKeys: string[]) => {
    const obj = getStorageItem(sKey);
    oKeys.forEach((oKey: string) => delete obj[oKey]);
    setStorageItem(sKey, obj);
}

export const removeStorageItem = (key: string) => {
    if (import.meta.env.MODE === MODE_DEV) {
        return window.sessionStorage.removeItem(key);
    }

    return chrome.storage.local.remove(key);
}

export const flushStorage = () => {
    if (import.meta.env.MODE === MODE_DEV) {
        return window.sessionStorage.clear();
    }

    return chrome.storage.local.clear();
}
