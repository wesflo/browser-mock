import {STORAGE_ACTIVE_PROJECTS} from "../../constant";
import {updateChrome} from "./updateChrome";

export const handleProjectToggle = async (activePlugin: boolean) => {
    await updateChrome(activePlugin);
    console.log('Regeln aktualisiert: ', STORAGE_ACTIVE_PROJECTS, activePlugin);
}