import {forEach} from "../nodeListHelper";
import {errorMessages, inputFieldTypesChangeOnly} from "./constant";
import {ICheckObj, TChecks, TCheckFn, TDefaultCheckAttributes} from "./interface";
import {required} from "./validators/required";
import {min} from "./validators/min";
import {max} from "./validators/max";
import {minLength} from "./validators/minLength";
import {maxLength} from "./validators/maxLength";
import {LitElement} from "lit";

declare class Form extends LitElement {
    inputFields: NodeListOf<HTMLElement>;
}

export class FormController<T extends Form, N> {
    private host: T;

    checks: TChecks = {};
    values: unknown = {};
    invalidFields: string[] = [];

    private _isValide: boolean = !this.invalidFields.length;

    constructor(host: T, checks?: TChecks) {
        this.host = host;
        checks && (this.checks = checks);

        host.addController(this);
    }

    validateFormField = (value, item: HTMLElement): boolean => {
        const name = item.getAttribute('name');
        const checks: (TCheckFn | ICheckObj)[] = this.checks[name];

        if (!checks) {
            return true;
        }
        for (let i = 0; i < checks.length; i++) {
            const check = checks[i];
            let {fn: checkFn, errorMsg, ...args} = check as ICheckObj;

            if (typeof check === 'function') {
                checkFn = check;
            }

            const isValid = checkFn(value, item, ...Object.values(args));

            if (!isValid) {
                const key = checkFn.name;
                !this.invalidFields.includes(name) && this.invalidFields.push(name);
                errorMsg = errorMsg || errorMessages[key] as string;
                const patterns = errorMsg && errorMsg.match(/\{(.*?)}/g);
                patterns && patterns.forEach((pattern: string) => {
                    const attr: string = pattern.replace(/[{}]/g, '');
                    const val: string = item.getAttribute(attr) || 'n/a';
                    errorMsg && (errorMsg = errorMsg.replace(pattern, val));
                });

                item.setAttribute('error', errorMsg);
                return false;
            }
        }

        item.removeAttribute('error');
        this.invalidFields = this.invalidFields.filter((field) => field !== name);
        return true;
    }

    handleInput: EventListener = ({currentTarget, detail}: CustomEvent) => {
        this.setValue(currentTarget, detail);
    };

    handleChange: EventListener = ({currentTarget, detail}: CustomEvent) => {
        this.setValue(currentTarget, detail);
    };

    handleBlur: EventListener = (evt: CustomEvent) => {
        const {currentTarget} = evt;
        this.validateFormField(evt.detail, currentTarget as HTMLElement);
        this._isValide = !this.invalidFields.length;
    };

    addEventListeners = () => {
        this.toggleEventListeners(true);
    }

    removeEventListeners = () => {
        this.toggleEventListeners(false);
    }

    toggleEventListeners = (add: boolean) => {
        const funcName = add ? 'addEventListener' : 'removeEventListener';
        forEach(this.host.inputFields, (item: Element) => {
            if (!inputFieldTypesChangeOnly.includes(item.nodeName.toLowerCase())) {
                item[funcName]('onBlur', this.handleBlur);
                item[funcName]('onInput', this.handleInput);
            }
            item[funcName]('onChange', this.handleChange);
        });
    }

    setInitialChecks = () => {
        forEach(this.host.inputFields, (item: Element) => {
            const name = item.getAttribute('name');
            const defaults = this.getDefaultValidationAttributes(item);
            const checks: (TCheckFn | ICheckObj)[] = this.checks[name] || [];
            defaults.forEach((key) => this.addCheckToArray(key, checks));

            this.checks[name] = checks;
        });
    }

    defaultCheckMap = {
        required: required,
        min: min,
        max: max,
        minLength: minLength,
        maxLength: maxLength,
    }

    addCheckToArray = (key: string, checks: (TCheckFn | ICheckObj)[]) => {
        const check = this.defaultCheckMap[key];

        if (!checks.includes(check)) {
            checks.push(check);
        }
        return checks;
    }

    getDefaultValidationAttributes = (item: Element) => {
        const arr: TDefaultCheckAttributes = [];
        const required = item.hasAttribute('required');
        const min = item.hasAttribute('min');
        const max = item.hasAttribute('max');
        const minLength = item.hasAttribute('min-length');
        const maxLength = item.hasAttribute('max-length');

        required && arr.push('required');
        min && arr.push('min');
        max && arr.push('max');
        minLength && arr.push('minLength');
        maxLength && arr.push('maxLength');

        return arr
    }

    isValide = () => {
        return this._isValide
    }

    validate = () => {
        forEach(this.host.inputFields, (item: Element) => {
            const {value} = item as HTMLInputElement;
            this.validateFormField(value, item as HTMLElement);
        });
        this._isValide = !this.invalidFields.length;
        return this.isValide();
    }

    getValues = () => this.values as Partial<N>;

    setValue = (item, value) => {
        const key: keyof N = item.getAttribute('name');
        this.values[key] = value;
    };

    setInitialValues = () => {
        forEach(this.host.inputFields, (item: Element) => {
            const {value} = item as HTMLInputElement;
            this.setValue(item as HTMLElement, value);
        });
    }

    hostConnected() {
        setTimeout(() => {
            this.addEventListeners();
            this.setInitialChecks();
            this.setInitialValues();
        }, 1);
    }

    hostDisconnected() {
        this.removeEventListeners();
    }
}
