import {getStorageItem} from "../../util/storage";
import {STORAGE_ACTIVE_PROJECTS, STORAGE_ACTIVE_REQUESTS, STORAGE_PROJECTS} from "../../constant";
import {IActiveMock, IActiveMocks, IProjects} from "../../interface";
import Rule = chrome.declarativeNetRequest.Rule;
import RuleActionType = chrome.declarativeNetRequest.RuleActionType;
import RequestMethod = chrome.declarativeNetRequest.RequestMethod;

export const buildRules = async () => {
    const projects: IProjects = await getStorageItem(STORAGE_PROJECTS, []);
    const activeProjects: string[] = await getStorageItem(STORAGE_ACTIVE_PROJECTS, []);
    const allActiveRequests: {[key: string]: IActiveMocks} = await getStorageItem(STORAGE_ACTIVE_REQUESTS, []);

    return activeProjects.map((pid: string, pIndex: number) => {
        if(allActiveRequests[pid]) {
            const {pathPartials} = projects[pid]
            return buildRule(allActiveRequests[pid], pathPartials, pIndex);
        }
    })
        .flat();
}

const buildRule = (activeRequests: IActiveMocks, partials: string[], pIndex: number): Rule[] => {
    return Object.values(activeRequests).map((activeRequest: IActiveMock, index: number) => buildRuleset(activeRequest, partials, index, pIndex))
        .flat();
}

const buildRuleset = (activeRequest: IActiveMock, partials: string[], sIndex: number, pIndex: number): Rule[] => {
    return activeRequest.domains.map((domain: string, index: number) => {
        const params = [
                `status=${activeRequest.status}`,
                `to=${activeRequest.timeout || 0}`,
                `path=${activeRequest.mockPath.replace('/', '%2B')}`,
                `pDir=${partials.join('%2B')}`,
        ]
        return {
            id: Number(`${pIndex + 1}00${sIndex + 1}00${index + 1}`),
            priority: 1,
            action: {
                type: RuleActionType.REDIRECT,
                redirect: {
                    url: `http://127.0.0.1:2313/latest/mock?${params.join('&')}`
                }
            },
            condition: {
                requestMethods: [RequestMethod[activeRequest.method]],
                regexFilter: domain + activeRequest.path
            }
        }
    })
}