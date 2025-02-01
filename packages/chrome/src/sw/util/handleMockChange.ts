import {STORAGE_ACTIVE_REQUESTS} from "../../constant";
import {updateChrome} from "./updateChrome";

export const handleMockChange = async (activePlugin: boolean) => {
    activePlugin && await updateChrome(activePlugin);

    console.log('Regeln aktualisiert: ', STORAGE_ACTIVE_REQUESTS);
}