import {property, queryAll} from 'lit/decorators.js';
import {css, html, LitElement} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {style} from "./style";
import {buttonsWrapperStyles} from "../../component/button/style";
import {openAllCollapses} from "../../component/collapse/util/openAllCollapses";
import {closeAllCollapses} from "../../component/collapse/util/closeAllCollapses";

import "../../component/button";
import "../../component/switch";
import "../../component/select";
import "../../component/input";
import "../../component/options";
import "../../component/textarea";
import "../../component/file";
import "../../component/collapse";
import {FormController} from "../../util/formController";
import {IFormValues} from "./interface";
import {inputFieldTypes} from "../../util/formController/constant";
import {required} from "../../util/formController/validators/required";
import {minLength} from "../../util/formController/validators/minLength";
import {resizeCollapses} from "../../component/collapse/util/resizeCollapses";
import CollapseComponent from "../../component/collapse";

export class ViewDefault extends LitElement {
    @property({type: String}) error: string = '';

    @queryAll('wf-collapse') collapses: NodeListOf<CollapseComponent>;
    @queryAll(inputFieldTypes.join(',')) inputFields: NodeListOf<HTMLElement>;

    form: FormController<IFormValues, ViewDefault> = new FormController(this, {
        text: [required, minLength],
    });

    static styles = [defaultStyle, buttonsWrapperStyles, style];

    render() {
        return html`
            <header>
                <h1>API Calls</h1>
                <div class="buttons">
                    <wf-button @click="${this.addNewProject}">Add new Project</wf-button>
                </div>
            </header>
        `;
    }

    addNewProject = () => {
        console.log( 1 )
    }
}

if (!customElements.get('wf-view-config')) {
    customElements.define('wf-view-config', ViewDefault);
}