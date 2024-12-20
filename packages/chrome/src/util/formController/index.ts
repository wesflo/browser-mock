import {forEach} from "../nodeListHelper";
import {errorMessages, inputFieldTypesChangeOnly} from "./constant";
import {ICheckObj, IChecks, TChecks} from "./interface";

export class FormController<T, N> {
    private host: N;

    checks: IChecks<T>;
    values: Partial<T>;
    invalidFields: string[] = [];

    valide: boolean = !!this.invalidFields.length;

    constructor(host: N, checks: IChecks<T>) {
        this.host = host;
        this.checks = checks;
        host.addController(this);
    }

    validateFormField = (value, item: HTMLElement): boolean => {
        const name = item.getAttribute('name');
        const checks: TChecks = this.checks[name];

        if(!checks) {
            return true;
        }

        for(let i = 0; i < checks.length; i++) {
            const check = checks[i];
            let {fn: checkFn, errorMsg, ...args} = check as ICheckObj;

            if(typeof check === 'function') {
                checkFn = check;
            }

            const isValid =  checkFn(value, item);

            if(!isValid) {
                const key = checkFn.name;
                !this.invalidFields.includes(name) && this.invalidFields.push(name);
                errorMsg = errorMsg || errorMessages[key] as string;
                const patterns = errorMsg.match(/\{(.*?)}/g);
                patterns && patterns.forEach((pattern: string) => {
                    const attr: string = pattern.replace(/[{}]/g, '');
                    const val: string = item.getAttribute(attr) || 'n/a';
                    errorMsg = errorMsg?.replace(pattern, val);
                });

                item.setAttribute('error', errorMsg);
                return false;
            }
        }

        item.removeAttribute('error');
        this.invalidFields = this.invalidFields.filter((field) => field !== name);

        return true;
    }

    handleInput: EventListener = (evt: CustomEvent) => {
        // console.log('handleInput', evt.detail );
    };

    handleChange: EventListener = (evt: CustomEvent) => {
        // console.log('handleChange', evt.detail );
    };

    handleBlur: EventListener = (evt: CustomEvent) => {
        const {currentTarget} = evt;
        this.validateFormField(evt.detail, currentTarget as HTMLElement);
    };

    addEventListeners = () => {
        forEach(this.host.inputFields, (item: Element) => {
            if (!inputFieldTypesChangeOnly.includes(item.nodeName.toLowerCase())) {
                item.addEventListener('onBlur', this.handleBlur);
                item.addEventListener('onInput', this.handleInput);
            }
            item.addEventListener('onChange', this.handleChange);
        });
    }

    removeEventListeners = () => {
        forEach(this.host.inputFields, (item: Element) => {
            if (!inputFieldTypesChangeOnly.includes(item.nodeName.toLowerCase())) {
                item.removeEventListener('onBlur', this.handleBlur);
                item.removeEventListener('onInput', this.handleInput);
            }
            item.removeEventListener('onChange', this.handleChange);
        });
    }

    hostConnected() {
        setTimeout(this.addEventListeners, 1);
    }

    hostDisconnected() {
        this.removeEventListeners();
    }
}
