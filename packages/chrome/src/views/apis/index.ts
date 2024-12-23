import {property, queryAll} from 'lit/decorators.js';
import {css, html, LitElement} from 'lit';
import {defaultStyle} from "../../util/style/defaultStyle";
import {style} from "./style";
import {buttonsWrapperStyles} from "../../component/button/style";

import "../../component/button";

import {inputFieldTypes} from "../../util/formController/constant";
import CollapseComponent from "../../component/collapse";

export class ViewDefault extends LitElement {
    @property({type: String}) error: string = '';

    @queryAll('wf-collapse') collapses: NodeListOf<CollapseComponent>;
    @queryAll(inputFieldTypes.join(',')) inputFields: NodeListOf<HTMLElement>;


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