import {updateChrome} from "./updateChrome";
import {STORAGE_ACTIVE} from "../../constant";
import {ICON_ACTIVE, ICON_INACTIVE} from "../constant";

export const handlePluginToggle = async (activePlugin: boolean) => {
    await updateChrome(activePlugin);
    chrome.action.setIcon({ path: activePlugin ? ICON_ACTIVE : ICON_INACTIVE });

    console.log('Regeln aktualisiert: ', STORAGE_ACTIVE, activePlugin);
}