import {getStorageItem, mergeStorageItem} from "../storage";
import {STORAGE_PROJECTS} from "../../constant";
import {IProject, IProjects} from "../../interface";

export const updateStorageProject = async (id: string, obj: Partial<IProject>) => {
    const storageItem = await getStorageItem(STORAGE_PROJECTS)
    const projectMeta = storageItem[id] || {};
    const projectsData: IProjects = {
        [id]: {
            ...projectMeta,
            ...obj,
        }
    };
    await mergeStorageItem(STORAGE_PROJECTS, projectsData);
}