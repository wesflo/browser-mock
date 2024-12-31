import {buildRules} from "./buildRules";
import Rule = chrome.declarativeNetRequest.Rule;

export const updateChrome = async (activePlugin: boolean) => {
    const allRules: Rule[] = await chrome.declarativeNetRequest.getDynamicRules();
    let rules: Rule[] = [];

    if(activePlugin) {
        rules = await buildRules();
    }

    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: allRules.map((rule) => rule.id),
        addRules: rules
    });

    console.log('Rules updated:', rules, await chrome.declarativeNetRequest.getDynamicRules());
}