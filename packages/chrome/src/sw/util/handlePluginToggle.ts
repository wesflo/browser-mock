import {updateChrome} from "./updateChrome";
import {STORAGE_ACTIVE} from "../../constant";

export const handlePluginToggle = async (activePlugin: boolean) => {
    await updateChrome(activePlugin);
    console.log('Regeln aktualisiert: ', STORAGE_ACTIVE);
}