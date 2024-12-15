import { LitElement, nothing} from 'lit';
import {style} from "./style";

export default class Component extends LitElement {
    static styles = [style];

    render() {
        return nothing
    }
}

if (!customElements.get('wf-progress')) {
    customElements.define('wf-progress', Component);
}
