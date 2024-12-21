import {capitalizeFirstLetter} from "../string/capitalizeFirstLetter";

export class FormFieldController<T> {
    private host: T;

    constructor(host: T) {
        this.host = host;
        host.addController(this);
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
