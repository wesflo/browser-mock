import {STORAGE_ACTIVE_PROJECTS} from "../../constant";
import {updateChrome} from "./updateChrome";

export const handleProjectToggle = async (activePlugin: boolean) => {
    console.log( activePlugin )
    activePlugin && await updateChrome(activePlugin);
    console.log('Regeln aktualisiert: ', STORAGE_ACTIVE_PROJECTS);
}