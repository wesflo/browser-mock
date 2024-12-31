import {STORAGE_ACTIVE, STORAGE_ACTIVE_PROJECTS, STORAGE_ACTIVE_REQUESTS} from "../constant.js";
import {handlePluginToggle} from "./util/handlePluginToggle";
import {handleProjectToggle} from "./util/handleProjectToggle";
import {handleMockChange} from "./util/handleMockChange";
import {getStorageItem} from "../util/storage";

const updateMap = {
    [STORAGE_ACTIVE]: handlePluginToggle,
    [STORAGE_ACTIVE_PROJECTS]: handleProjectToggle,
    [STORAGE_ACTIVE_REQUESTS]: handleMockChange,
}

const updateMockRules = async (changes) => {
    const activePlugin: boolean = await getStorageItem(STORAGE_ACTIVE, false);
    for (const key of Object.keys(changes)) {
        updateMap[key] && await updateMap[key](activePlugin);
    }
}

chrome.storage.onChanged.addListener(async (changes, namespace) => {
    if (namespace === 'local' && (changes[STORAGE_ACTIVE_PROJECTS] || changes[STORAGE_ACTIVE_REQUESTS] || changes[STORAGE_ACTIVE])) {
        await updateMockRules(changes);
    }
});

chrome.runtime.onInstalled.addListener(async () => {
    const activePlugin: boolean = await getStorageItem(STORAGE_ACTIVE, false);
    await handlePluginToggle(activePlugin);
});

chrome.declarativeNetRequest.onRuleMatchedDebug?.addListener((details) => {
    console.log("Regel used:", details);
});

