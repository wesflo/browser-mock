import {capitalizeFirstLetter} from "../string/capitalizeFirstLetter";
import {LitElement, ReactiveController} from "lit";

declare class FormField extends LitElement {
    disabled: boolean;
    value: unknown;
}

export class FormFieldController<T extends FormField> {
    private host: T;

    constructor(host: T) {
        this.host = host;
        host.addController(this as ReactiveController);
    }

    handleInput = ({ target, type }: Event) => {
        const { value } = target as HTMLSelectElement;
        const eventName = `on${capitalizeFirstLetter(type)}`;
        this.handleUpdate(eventName, value);
    }

    handleUpdate = (eventName: string, value: string | File[]) => {
        if(this.host.disabled) {
            return;
        }

        this.host.value = value;
        this.host.dispatchEvent(new CustomEvent(eventName, {detail: value}));
    }
}
