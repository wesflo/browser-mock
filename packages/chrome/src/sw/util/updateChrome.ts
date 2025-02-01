import {buildRules} from "./buildRules";
import Rule = chrome.declarativeNetRequest.Rule;
import UpdateRuleOptions = chrome.declarativeNetRequest.UpdateRuleOptions;

export const updateChrome = async (activePlugin: boolean) => {
    const allRules: Rule[] = await chrome.declarativeNetRequest.getDynamicRules() || [];
    let rules: Rule[] = [];

    if(activePlugin) {
        rules = await buildRules();
    }

    const options: UpdateRuleOptions = {
        addRules: rules.filter(undefinedFilter),
        removeRuleIds: allRules.length ? allRules.map((rule) => rule.id).filter(undefinedFilter) : undefined
    }

    await chrome.declarativeNetRequest.updateDynamicRules(options);

    console.log('Rules updated:', rules, await chrome.declarativeNetRequest.getDynamicRules());
}

const undefinedFilter = (a: any) => typeof a !== 'undefined';