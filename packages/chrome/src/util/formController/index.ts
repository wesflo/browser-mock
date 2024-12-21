import {forEach} from "../nodeListHelper";
import {errorMessages, inputFieldTypesChangeOnly} from "./constant";
import {ICheckObj, IChecks, TChecks, TDefaultCheckAttributes} from "./interface";
import {required} from "./validators/required";
import {min} from "./validators/min";
import {max} from "./validators/max";
import {minLength} from "./validators/minLength";
import {maxLength} from "./validators/maxLength";

export class FormController<T, N> {
    private host: N;

    checks: IChecks<T>;
    values: Partial<T>;
    invalidFields: string[] = [];

    private _isValide: boolean = !this.invalidFields.length;

    constructor(host: N, checks?: IChecks<T>) {
        this.host = host;
        checks && (this.checks = checks);

        host.addController(this);
    }

    validateFormField = (value, item: HTMLElement): boolean => {
        const name = item.getAttribute('name');
        const checks: TChecks = this.checks[name];

        if (!checks) {
            return true;
        }
        for (let i = 0; i < checks.length; i++) {
            const check = checks[i];
            let {fn: checkFn, errorMsg, ...args} = check as ICheckObj;

            if (typeof check === 'function') {
                checkFn = check;
            }

            const isValid = checkFn(value, item);

            if (!isValid) {
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
            const checks: TChecks[] = this.checks[name] || [];
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

    addCheckToArray = (key: string, checks: TChecks[]) => {
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
        return this.isValide();
    }

    hostConnected() {
        setTimeout(() => {
            this.addEventListeners();
            this.setInitialChecks();
        }, 1);
    }

    hostDisconnected() {
        this.removeEventListeners();
    }
}
