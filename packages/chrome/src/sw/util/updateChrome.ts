import {buildRules} from "./buildRules";
import Rule = chrome.declarativeNetRequest.Rule;
import UpdateRuleOptions = chrome.declarativeNetRequest.UpdateRuleOptions;

export const updateChrome = async (activePlugin: boolean) => {
    const allRules: Rule[] = await chrome.declarativeNetRequest.getDynamicRules();
    let rules: Rule[] = [];

    if(activePlugin) {
        rules = await buildRules();
    }

    const options: UpdateRuleOptions = {
        addRules: rules
    }

    allRules && (options.removeRuleIds = allRules.map((rule) => rule.id))

    await chrome.declarativeNetRequest.updateDynamicRules(options);

    console.log('Rules updated:', rules, await chrome.declarativeNetRequest.getDynamicRules());
}