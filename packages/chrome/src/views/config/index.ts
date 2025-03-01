import {css, html, LitElement} from 'lit';
import {queryAll, state} from "lit/decorators.js";
import {inputFieldTypes} from "../../util/formController/constant";
import {FormController} from "../../util/formController";
import {IFormValues} from "./interface";
import {ifDefined} from "lit-html/directives/if-defined.js";
import {getStorageItem, setStorageItem} from "../../util/storage";
import {STORAGE_APP_CONFIG} from "../../constant";
import {toastFactory} from "../../component/toast/util/toastFactory";
import {defaultStyle} from "../../style/defaultStyle";
import {textStyle} from "../../style/textStyle";
import {buttonsWrapperStyles} from "../../component/button/style";
import {style} from "./style";

import "../../component/switch";
import "../../component/button";
import "../../component/input";
import {regex} from "../../util/formController/validators/regex";

export class ConfigView extends LitElement {
    @queryAll(inputFieldTypes.join(',')) inputFields: NodeListOf<HTMLElement>;

    form: FormController<ConfigView, IFormValues> = new FormController(this, {
        port: [{
            fn: regex,
            errorMsg: 'Only 4 digits are allowed!',
            regex: /^\d{4}$/g
        }]
    });
    toast = toastFactory();

    @state() values: Partial<IFormValues> = {};

    static styles = [defaultStyle, textStyle, buttonsWrapperStyles, style];

    render() {
        return html`
            <wf-input
                    name="port"
                    label="Port for Mock Server"
                    value="${ifDefined(this.values.port)}"
                    required

            ></wf-input>
            <wf-switch name="darkMode" ?checked="${this.values.darkMode}">
                Dark mode
            </wf-switch>
            <div class="buttons right">
                <wf-button @onClick="${this.handleFormSubmit}" size="l">save</wf-button>
            </div>
        `;
    }
    // min-length="4"
    // max-length="4"
    async connectedCallback() {
        this.values = {
            port: '2313',
            darkMode: false,
            ...await getStorageItem(STORAGE_APP_CONFIG),
        }
        super.connectedCallback();
    }

    handleFormSubmit = async () => {
        if (this.form.validate()) {
            await setStorageItem(STORAGE_APP_CONFIG, this.form.getValues());
            this.toast.add('Config saved', 'success');
            window.dispatchEvent(new Event('wfReloadApp'));
        }
    }
}

if (!customElements.get('wf-view-config')) {
    customElements.define('wf-view-config', ConfigView);
}